---
title: Aborting requests in React Native
date: 2019-04-14 11:11:30
description: How can we close an active connection initiated with Fetch? And most important, what do we mean by "closing a connection"?
image: "./closed-connection.jpg"
imageAlt: market closed sign
slug: blog/aborting-fetch-react-native
imgAuthor: gaspanik
---

EDIT: this post is now, happily, outdated since the AbortController implementation has been included in React Native 0.60.0 ([comment here](https://github.com/facebook/react-native/issues/18115#issuecomment-508389569))

I'm doing this post since there is a lot of confusion going on around the react native (and web too actually) community around the matter of "cancelling a request" and many people asked me through the github issues to clear up the matter.

## What do we mean by "closing a connection"?

This is really an important thing to understand.

1. One thing is the interface exposed by the method used to request something
2. And one thing is the actual method used to request something

### What is this differentiation?

Because since we know that Fetch exposes its functionalities through Promises, we easily know how to reject the Promise relative to the request and doing so we "shut the door" to **every future** data that may come from that Promise. (1)
But what is the actual meaning of just rejecting the Promise that initiated the connection? It means that the connection will continue to live and, potentially, download lots of data in background. This because rejecting a promise **operates just with the Fetch's Promise but not with Fetch itself** that won't stop the work it is doing (examples and demonstrations later on).

When we're talking about few kilobytes (a json response that we're waiting from a REST API for example) this is completely fine, and in that case rejecting the promise without stopping the real connection will be enough. This solution has come to the surface especially in relation to a famous issue about calling setState on an unmounted component. This issue has to do with the [React internals](https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html) and it's pretty easy to understand, also lot of blogs talk about it.
Anyway this thing we just talked about may not affect you depending on how you wrote your code (for example you will not notice this problem if you use Redux).

But what if we're talking about the download of a heavier kind of data? This is the exact situation where I was in during the development of an enterprise application in React Native.
Imagine the UI showing a button to the user, while he's in a mobile application, in a PWA or in a responsive website from a smartphone, that says "start downloading data" and then, when he press that button, the text of it changes with "stop downloading data" and he press that button again.
What do we do? If we're just rejecting the Promise it will continue to download those data since, as we said, **rejecting the promise doesn't result in a terminated connection**. (2)
As a matter of fact, in this way, we potentially expose the user to pay extra money for his mobile carrier contract and this is something we want absolutely to avoid.

So how can we tell Fetch to stop the connection and let the network module of our device rest?

## What the specs says

If you ask me, the Fetch API is good but not that much. Not to be rude, but it seems like they almost forgot to design something that could be production ready.
So long story short, after a first 2015 "abort functionality" request, they succesfully introduced it in 2017.
[Here the MDN specs](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort) and here [Jake Archibald talking about it in google developers](https://developers.google.com/web/updates/2017/09/abortable-fetch).

Shortly this is an example of a cancelled request through the abort method (I will not go into details here since it isn't in the scope of this article):

```javascript
const controller = new AbortController()
const signal = controller.signal

setTimeout(() => controller.abort(), 5000)

fetch(url, { signal })
  .then(response => {
    return response.text()
  })
  .then(text => {
    console.log(text)
  })
```

Really cool, isn't it? When I discovered this I ran into my code editor to edit my "api service" that wraps and enhance fetch, and implemented it.
Started the React Native project I was trying to abort my requests but nothing was happening (not even an error), so I immediately opened an [issue on the React Native github project](https://github.com/facebook/react-native/issues/18115).
Unfortunately, as I said at the beginning of this article, there is a lot of confusion about this issue and on that github thread there are a lot of wrong explanations (my included).

## Polyfills, fake things that pretend to be true

I didn't stop there. Noticing that it wasn't working, I started trying available polyfills on NPM and they were actually (**not**) working. At first I wasn't noticing that the connections weren't killed, rather the polyfills were wrapping the originl window.fetch and rejecting the promise... they were doing the exact same thing I explained above and that you can easily do with ten/fifteen lines of code (actually these lines of code are the exact ones that are showed in the facebook blog post I linked above).

### xhr.abort()? Can this be done?

Well it turns out that the xhr obscene syntax [had an abort method](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort) used to terminate connections. ~~While this could be a good approach to support old browsers when you're doing a webapp, this isn't a viable option in React Native since only fetch is baked inside the core.~~<br>
Actually I was wrong. As specified in this [doc page](https://facebook.github.io/react-native/docs/network#using-other-networking-libraries) xhr **is** backed into the React Native core and can be used to abort connection.<br>
The problem is that the fetch api is really cleaner than the xhr one and further more the migration from fetch to xhr may not be simple for certain apps (and honestly it seems a step back).

### So are polyfills useless in React Native?

Yes, Yes and Yes. **There will be no possible polyfills for this feature if the React Native core team doesn't implement this first.**. The only thing that it's actually possible is to build a native module (or search for an existing one) that implement this feature on the native side too. Someone talked about this in a [rn-fetch-blob issue](https://github.com/joltup/rn-fetch-blob/issues/140) for example but I think that not even with that lib it'd work and it's such a core functionality that I'd not rely on an external lib to accomplish it.

## Conclusion

In React Native, right now, the best you can do is to use the trick showed in the previous facebook blog link and it's something like this:

```javascript
const makeCancelable = promise => {
  let hasCanceled_ = false

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
      error => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
    )
  })

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true
    },
  }
}
```

Anyway stay tuned because in the next article I will post my personal API service that I use for work that I built and tested time over time that implements this among other useful features that will let you forget about all the libs you know like axios, isomorphic-fetch etc. also diving even deeper on the code pasted above.
