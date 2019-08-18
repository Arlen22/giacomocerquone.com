---
title: A very simple fetch wrapper ready to use
date: 2019-08-11 20:59:47
description: An handy thin fetch wrapper in less of 100 lines featuring abortion (with polyfill for non supporting envs), token setter etc.
image: "./wrapped-chocolate.jpg"
slug: blog/fetch-wrapper
draft: true
---

Hi there, hope you're enjoying the new website and blog.
I graduated one month ago and so I hope I'll have some more time to dedicate to my personal stuff, including this blog.

## What is a wrapper

We obtain many different results when "wrapping" something: there are wrappers that turns out to be libraries and wrappers that are so small that they're just an agglomerated amount of code that simplify other's lives. Mine is one of the second kind.<br>
I wanted to make this clear because I've seen projects like [this](https://github.com/elbywan/wretch) that are defined as wrappers but, despite the fact that it has no dependencies included, it has so many features and imposes so much syntax\* and structures that it isn't just a wrapper anymore, but a small lib.

> For syntax I mean functions and other named components of the lib that implements a pre-defined functionality

## An API "service"

In my [older post](./aborting-fetch-react-native/) I mentioned of an Api "service".<br />
[Here](https://gist.github.com/giacomocerquone/61a3b016c1803d44573978c13452989f) you can find the last revision of this module (it's just a gist) but I won't assure you to update that since I'm preparing another repo relative to some react native resources that you'll soon find a post in here.

I started to create my own Api service since the beginning of my work and the first one I used was found on a github repo that I don't have anymore (not that it's important since it's completely changed).
It stayed the same for a long time (and it is the same in some old projects) but also for the sake of this article I decided to mutate its syntax and enhance some functionalities.

## Abortion

I wrote the last article about cancellation and abortion of HTTP requests. I sent that article to some people that requested it on a github issue and a guy fixed a little error he spot in my post (it's about the support for xhr that is, indeed, supported in react native while I thought it wasn't, [go check yourself](https://github.com/facebook/react-native/blob/master/Libraries/Network/XMLHttpRequest.js#L534).
In the meantime support for the AbortController API has landed in react native 0.60 and so in this module I've also put up an abortion implementation and a working polyfill for environments that don't support it (based on the last article's code).

## The challenge: defining the api

It has been a little bit challenging not only implementing it, which [jfet](https://github.com/jfet97) helped a bit with his wise advices, but also setting the boundaries of the functionalities that this wrapper had to provide and you can observe the culprit of these indecisions in the "setGetToken" which is actually a strange thing considering that you could just import the getToken method there and use it.
But you know, it's open source and after all it's not that difficult.
