---
title: jekyll (ruby) vs hexo (node)
description: From now on Hexo, the static site generator, will be powering this blog
date: 2016-01-03 18:19:21
image: "./jekyll-vs-hexo.jpg"
imageAlt: "jekyll and hexo logo"
slug: blog/jekyll-vs-hexo
---

Don't you think this blog has speeded up a little bit from the last time you visited it?
Since the day I started this blog I had countless problems with its time loading but only at certain times of the day, and in those times my site could take up to 50 seconds to load everything (the exciting thing was that on the server was running just a small istance of wordpress). I wrote several times to the support of the italian hosting company (netsons) and the only kind of things they were able to say (and also the most common answers from hosting companies that you can find on internet) were:
"we don't encounter any of your problems opening your website" and of course the number one of the answers is "your scripts are saturating our machine's capacity" when the statistics were showing a very low usage of resources.
After this:

![database error](./database-error.jpg)

I said enough.

# So what did you do to solve these bloggers' common problems?

Honestly I did something pretty much common, I finally switched to a [static site generator](https://davidwalsh.name/introduction-static-site-generators). You have for sure already heard of [jekyll](https://jekyllrb.com/) and how it's powering the [github pages](http://jekyllrb.com/docs/github-pages/), well Jekyll is a static site generator. Actually I discovered that there were these things only when I finished developing my theme on wordpress and so I said "well, it's great but who cares, wordpress should be perfect for my needs"... and it was really too soon to talk. So in the meantime, too much occupied to deal with a lot of other stuff, I completely forgot that I could solve this problems using those things to power my blog and just the other day a friend of mine adviced me to use Jekyll to host everything on github. I was truly annoyed from the situation and so I accepted the challenge to re-factor my wordpress blog in a Jekyll blog in one night (I absolutely didn't know what really Jekyll was, how it works and how I could use it). I had to install ruby (I hate to install additional software on my beautiful Dell) and so I started using jekyll with a default theme to understand the commands and it took me some time to know how to deploy the blog. Right after I started touching the configuration (where a lot of people seem to have problems due to some buggy code inside Jekyll) and in three hours I already had developed half of my theme.
A few moments after, I stopped using Jekyll.

# Why I dropped Jekyll

I started feeling crazy. I never used ruby before (I had also problems installing it on windows) and after a little bit I realized that every piece of Jekyll is built in this language: from the css preprocessor (scss), to the templating engine (liquid). Plus I was trying to install some plugins and as well as having problems with gem, I had read that Github Pages support for Jekyll is useless if external plugins are needed (for [security matter](http://www.sitepoint.com/jekyll-plugins-github/)).
So for obvious reasons, being a javascript developer as you know, I chose to use a static generator written in node for two reasons (not the main ones):

1. I would have been able to contribute to the code on github and "hack" it in any way
2. I would have been so much more confident using npm

And so I chose Hexo.

# Feeling at home with Hexo

So the two reasons, **but not the main ones**, why I switched from jekyll were basically the fact that I am confident with javascript. But actually there is a lot more than that. The real thing here was that I found **Jekyll too much disorganized** (from the documentation to the plugin management). With Hexo is the complete opposite, while you won't have a strong and big community ready to help you, you have everything already pre-installed with it, even a github deployment module that with a single command it pushes changes on it, making the story of "jekyll supported by Github" completely irrelevant.
Same thing when you want to install a theme: with jekyll usually you must follow several steps and very often you have to install manually the dependencies, while in hexo one command is enough to install also every sub-module for you.

Anyway only a javascript developer that started using Hexo after other non-javascript generators can understand what I mean when I say that with it I felt at home. Maybe it's not even that important, how many times we will change our themes or our plugins? Not much, but it's very important, to make things easier for the user right from the beginning.
