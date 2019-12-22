---
title: A very simple fetch wrapper ready to use
date: 2019-08-11 20:59:47
description: An handy thin fetch wrapper in less of 100 lines featuring abortion (with polyfill for non supporting envs), token setter etc.
image: "./wrapped-chocolate.jpg"
slug: blog/fetch-wrapper
imgAuthor: twinsfisch
---

Hi there, hope you're enjoying the new website and blog.
I graduated one month ago and so now that the university's gone, I hope I'll have some more time to dedicate to my personal stuff including this blog.

## What is a wrapper

We obtain many different results when "wrapping" something: there are wrappers that turns out to be libraries and wrappers that are so small that they're just an agglomerated amount of code that simplify other's lives. Mine is one of the second kind.<br>
I wanted to make this clear because I've seen projects like [this](https://github.com/elbywan/wretch) that are defined as wrappers but, despite the fact that it has no dependencies included, it has so many features and imposes so much syntax\* and structures that it isn't just a wrapper anymore, but a small lib.

\*_For syntax I mean functions and other named components of the lib that implements a pre-defined functionality_

## An API "service"

In my [older post](./aborting-fetch-react-native/) I mentioned of an Api "service" that I'd have share eventually.<br />
[Here](https://gist.github.com/giacomocerquone/61a3b016c1803d44573978c13452989f) you can find the last revision of the code (it's just a gist) but I won't assure you to update it since I'm preparing another repo relative to some react native resources and this service will be part of it.

I started to create my own Api service since the beginning of my work and the first one I used was found on a github repo that I don't have anymore (not that it's important since it's completely changed).
It stayed the same for a long time (and it is the same in some old projects) but also for the sake of this article I decided to mutate its syntax and enhance some functionalities.

## Abortion

I wrote the last article about cancellation and abortion of HTTP requests. I sent that article to some people that requested it on a github issue and a guy fixed a little error he spot in my post (it's about the support for xhr that is, indeed, supported in react native while I thought it wasn't, [go check yourself](https://github.com/facebook/react-native/blob/master/Libraries/Network/XMLHttpRequest.js#L534)).
In the meantime support for the AbortController API has **landed in react native 0.60** and so **in this module I've also put up an abortion implementation and a working polyfill** for environments that don't support it (based on the last article's code).

## The challenge: defining the api

It has been a little bit challenging not implementing it, which [jfet](https://github.com/jfet97) helped a bit with his wise advices, but setting the boundaries of the functionalities that this wrapper had to provide and you can observe the pinnacle of these indecisions in the exported "getToken" function which is actually a strange thing considering that you could just import there what you'd set to the getToken (in fact I've added a comment about this).

This is because I wanted to give some basic functionalities but I didn't want to impose almost anything to the develope since this code is intended to be used knowingly from a developer that **will need to modify it**. Consider like a piece of code you'd see on stackoverflow.

### How do we return a method to abort the call?

This has been the only true challenge. I needed a way to execute the call and at the same time return a method with which the user could abort it.
I basically started thinking to implement a function to "prepare" a call and then effectively make the call. Something like this:

```javascript
const { promise, cancel } = Api.get(url)
// and then
const data = await promise()
cancel()
```

But I wasn't satisfied with it. I find it too undirected and the promise method is just useless, you can't pass any new params to that function (nor there was the need) and all that structure was there just to allow me to return a cancel function along with the promise.<br />
So I had another idea...

## The code

For brevity I'll not insert every piece of code, to read it you can go to the gist.

```javascript
const _toQueryString = ...

// EDIT here if you prefer a storage implementation or a store subscription etc.
// you could actually also remove the getToken function and directly call it in the header below
const methods = {
  getToken: () => null
};

const _makeCancelable = promise => {
  let hasCanceled = false;

const cancelablePromise = ...

const _call = (method, route, params, setAbortMethod, auth = true) => {
  // EDIT you can always strip abortcontroller from here if you need different usages
  // since it can be tricky to handle the cancel function passed to setAbortMethod for specific usage
  // sadly this is the best I could think of
  const controller = AbortController ? new AbortController() : null;
  if (method === "GET" && params) {
    route += _toQueryString(params);
  }
  const url = "https://jsonplaceholder.typicode.com/" + route;
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(auth && methods.getToken() && { Authorization: `Bearer ${methods.getToken()}` }) // EDIT here based on your api
    },
    ...(params && method !== "GET" && { body: JSON.stringify(params) }),
    ...(controller && { signal: controller.signal })
  };
  const currentFetch = () => {
    return fetch(url, options).then(
      res => (res.ok ? res.json() : Promise.reject(res)) // ERROR handling highly depends on your api
    );
  };

  if (controller) {
    setAbortMethod && setAbortMethod(() => controller.abort());
    return currentFetch();
  } else {
    const { cancelablePromise, cancel } = _makeCancelable(currentFetch);
    setAbortMethod && setAbortMethod(cancel);
    return cancelablePromise();
  }
};

["POST", "PUT", "DELETE", "PATCH", "GET"].forEach(
  el => (methods[el.toLowerCase()] = (...data) => _call(el, ...data))
);

export default methods;
```

### Let's start from the end.

I've exported an object that contains various methods (collected in the methods object) which one of this is the getToken that allows the developer to instruct the module on how to retrieve the token to pass in the headers.<br />
You'd use it like this:

```javascript
import Api from "./api.js"
Api.getToken = () => store.getTokenSelector(getState()) // example of a redux implementation
// or simply
Api.getToken = () => "token"
```

Then we bind through an arrow function the five strings (that denote the method property of the fetch option) to one main `_call` method wich will be the handler of all the calls we make.<br />
These are the parameters:

- **method**: it corresponds to the HTTP methods; you'll never have access to this param
- **route**: the parte after the baseUrl we set after
- **params**: an object key value of the params to pass (in get it'll be converted to query string)
- **setAbortMethod**: the function to pass to obtain the abort method, (explanations down below)
- **auth**: a flag to manually disable the passing of the token

The last "auth" param is there to have a more fine-grained control over the headers added for authentication. I've encountered APIs that error out if passing a token when one isn't required and considering that it's not always convenient to edit or change the result of the getToken function, you can use this flag (it defaults to true).

**Now the _call method**.<br />

The first thing that `_call` does is to check if the AbortController "constructor" exists. If so it istantiate a controller otherwise the controller gets a `null` value.
Then we check if the request is a GET request and in that case we build a query string. I decided to not go for the URLSearchParams here since if I don't wrong in React Native isn't supported yet.

We store the full url in the `url` value and then we create the option object of our request. Here is were we pass the controller signal, the params, the token and all the other headers we need.

We then wrap the fetch in order to postpone the execution of the promise.
There is a following check for the existence of the AbortController and:
- if it exists, call the setAbortMethod and then return the unwrapped fetch we wrapped a few lines above
- if it doesn't exist, we lend the wrapped fetch to the `_makeCancelable` function that is the code analyzed in the last article and proposed by facebook that will return the right promise to await for and the fake cancel method.

### A note on the setAbortMethod

As anticipated earlier I had troubles finding the right way to return back the abort method to the user. The implementation I chose that you can see in the code, produces the following usage:

```javascript
let cancel;
const data = await Api.get('someRoute/1', null, c => cancel = c); // awaits the data
cancel() // cancel the request
```

## Conclusion

This should be enough to let you get started to use this code. You'll find more examples in a react ecosystem in a small repo I'm about to prepare and that will be the subject for the next article!