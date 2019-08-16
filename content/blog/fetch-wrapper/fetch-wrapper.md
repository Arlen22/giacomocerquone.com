---
title: A very simple fetch wrapper ready to use
date: 2019-08-11 20:59:47
description: An handy thin fetch wrapper in less of 100 lines featuring abortion (with polyfill for non supporting envs), token setter etc.
image: "./wrapped-chocolate.jpg"
slug: blog/fetch-wrapper
---

We obtain many different results when "wrapping" something: there are wrappers that turns out to be libraries and wrappers that are so small that they're just an agglomerated amount of code that simplify other's lives. Mine is one of the second kind.<br>
I wanted to make this clear because I've seen projects like [this](https://github.com/elbywan/wretch) that are defined as wrappers but, despite the fact that it has no dependencies included, it has so many features and imposes so much syntax\* and structures that it isn't just a wrapper anymore, but a small lib.

> For syntax I mean functions and other named components of the lib that implements a pre-defined functionality

## An API "service"

In my [older post](./aborting-fetch-react-native/) I mentioned of an Api "service"

[Here](https://gist.github.com/giacomocerquone/61a3b016c1803d44573978c13452989f) you can find the last revision of this module (it's just a gist) but I won't assure you to update that since I'm preparing another repo relative to some react native resources that you'll soon find a post in here.
