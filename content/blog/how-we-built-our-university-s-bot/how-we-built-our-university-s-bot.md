---
title: How we built our university's bot
description: Sharing this little story of how I created a Telegram bot for our university
date: 2016-03-10 11:38:09
image: "./univaq-telegram-bot.jpg"
slug: blog/how-we-built-our-university-s-bot
---

Hello my dear followers (is there someone following me? really? don't believe you!), hell if I've not been busy in these days. Actually I'm studying for the university, studying new technologies online (trying the fresh new Angular 2 and improving my confidence in general with the MEAN stack) and reading a lot of very good literature books advised from my trusted bookseller. Despite all this, I've been able to create something very funny with a friend of mine!

## How this Telegram university's bot started

Everything started from one of his ideas. He saw a repository on github where two southern italian students were publishing their telegram bot for their university. The code was quite simple but written in an awful way (classical example of spaghetti code with one script containing code that even the owners weren't probably able to understand what was in there).
So [Diego](http://www.diegomariani.com), the friend of mine who had this idea, came to me and showed me that repo. Initially I was a little skeptical, but within some days he changed my mind and we started this little "adventure" trying to write a telegram bot for our own university with a language that we both didn't know: Python. He works in Spain for a while now and he hadn't the time to contribute much to the code, but without him all this wasn't possible firstly for the idea and secondly for his VPS where the bot is running that he's paying with his own money!

## What did you use?

First of all, to be honest, I didn't know Python at all (and I still don't know it very well of course), this is my first project with it and I understand now why it's so appreciated: it's simply awesome, it offers an incredible number of different ways to write code and it really makes programming funny.
But coming to the resources, we used a [this good library](https://github.com/python-telegram-bot/python-telegram-bot) to communicate with telegram (we hadn't the time nor the willing to roll out our library) and two more libraries: requests and beautifulsoup for the intense scraping. Some weeks ago you could find also a library to parse an rss feed but unluckily, due to the inconsistence of the feed provided by the university were news is missing, I dropped that and directly scraped the news page with beautifulsoup like we were already doing for all the other information. In fact we made this bot able of answering about professors, their emails and phone numbers (with the ability to search for just one of them), timetables of different things such the canteen, retrieving the last news of the site (actually you can choose how many news you want) and, the more useful for the moment, notify you everytime a news appears on the website. And we're looking forward to add also notification and information about the lessons (timetables, teachers etc.).
All these data are stored in simple json files (we absolutely didn't want to complicate stuff introducing databases) and, while I'm writing this, I just changed the structure of the entire application, trying to partialize the code even more. When you're new in a language, it's better to learn how to do stuff properly from big companies and so I decided to create submodules. This is the actual folder structure:

```
telegramBot
  cron (All the files used to scan the website to set up in a Linux OS as cron jobs)
  docs
  json (The json files that contains the data)
  libs (The python packages that I created to partialize the code)
    news_commands
    other_commands
    utils
```

<br />

## Website and repo

The bot has also a [website](http://univaqtelegrambot.github.io) and a [repo](https://github.com/UnivaqTelegramBot/UnivaqInformaticaBot) (of course) where we hosted our code. Feel free to give us advices on how to improve the code or what functions we could add to make this bot better, we're absolutely opened to any new idea of any kind of opinion about our work (yes you can also say that we're shitty coders... isn't [this](https://pbs.twimg.com/media/CXa9kq2UAAI2tMD.jpg) just the most appropriate meme ever? And think that I didn't even create it... maybe we really should do other jobs). And after this sad thing, that's all. See you next time, stay awesome guys! :D
