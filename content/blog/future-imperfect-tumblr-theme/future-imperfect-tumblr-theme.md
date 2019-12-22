---
title: Developing a Tumblr Theme, some advices
date: 2017-04-23 02:04:16
description: How should you develop a tumblr theme today? Look at this one developed by me and crafted by html5up and you'll see
image: "./tumblrtheme.jpg"
slug: blog/future-imperfect-tumblr-theme
imgAuthor: helloquence
---

Here we are again in another occasion talking about Tumblr. Being a faithful user of this blogging platform I already wrote something about it in a previous post: if you recall I was showing how is possible to backup all the written posts in one, safe txt file to keep wherever you want and now I come back to you to bring you this little new theme developed from an original design of [html5up](http://html5up.net).

## Where can I see and download this theme?
As always the project is hosted on my [github profile](https://github.com/giacomocerquone/FutureImperfect-TumblrTheme) and you have also the possibility to have a [preview of the theme](http://www.futureimperfect-theme.tumblr.com).
To download it you can either follow the instruction on the repo or just click [here](https://pastebin.com/bcxbwcrG) copy and paste it into your Tumblr blog.

## What did you use to develop this theme?
Considering we're in 2017, there are a lot of things that can be improved in the process of the development against the past with the modern available tools on the web. As usual, being a web developer, my build runner and package manager of choice is [NPM](https://www.npmjs.com/).
The goal here was to find something that could squeeze the entire theme in one single page. For you unfamiliar with Tumblr theming ([here some documentation](https://www.tumblr.com/docs/it/custom_themes)) when you develop a theme for a blog you can't rely on any external file (unless you include them from some other url, but that's convenient only when we're talking of html5shiv and other libs).
So I accomplished this using CDNs for famous libraries and including the external assets of the template with this essential package [inliner](https://www.npmjs.com/package/inliner). From there, a quick npm "script" did the trick.
This is the package.json:

```javascript
{
  "scripts": {
    "build": "rm dist/index.html && inliner --noimages --inlinemin --skip-absolute-urls index.html >> dist/index.html"
  },
  "devDependencies": {
    "inliner": "^1.12.1"
  }
}
```
In the build command we remove an already existing file created by this command (**rm dist/index.html**) and we call the "inliner module" to include the content of every file that we reference in the index.html like js, css, etc. (**index.html >> dist/index.html**). There are a few options here so to be sure it doesn't mess things up:
1. ```--noimages``` is needed to not let him convert images into base64 elements to include directly into the page
2. ```--inlinemin``` minify the files before it includes them into the dist/index.html file
3. ```--skip-absolute-urls``` it doesn't pull down external files hosted on some server

This script, as you will know, can be run with "npm run build".

### But... there is a slight problem

In the template it's not rare to find html conditional commands to include (or not) certain stylesheets for compatibility matters with older Internet Explorers and with my surprise the tool we have discussed in the previous paragraph doesn't recognize them, leaving them as links.
But I'm very glad I can help them some way, so as soon as possible I will make a PR to the project, coding this feature for them and reporting here on the blog how and what did I change.

## And for testing the theme live?
This is the only sad problem that I couldn't solve. At the moment there is no "emulator" for the Tumblr templating system... well at least no one that works very well.
Up to now, the only one that seems good to me (but I still have to give it a try) is this one: [tumblargh](https://github.com/jasonwebster/tumblargh)

I'll keep you updated. Bye and at the next news :)
