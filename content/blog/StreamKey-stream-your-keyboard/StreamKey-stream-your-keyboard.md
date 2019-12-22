---
title: StreamKey, stream your keyboard
date: 2016-12-02 11:06:59
description: StreamKey is my new app to stream your keyboard toward another PC
image: "./StreamKey.jpg"
slug: blog/streamkey-stream-your-keyboard
imgAuthor: drhemir
---

My new little app is about a need that I had to fullfill since my keyboard suddenly broke in a cold sunday night. It was the keyboard of my desktop PC and I use it almost only for videogames but now that the party was over I needed to find a way to use a real keyboard from another PC (not an emulated one on a touchscreen device) and send the keystrokes towards the desktop.
The one and only keyboard I could use was the laptop's one and so I started to think how to develop a little app for that even before thinking that it could be already online a software that could allow me to do what I wanted (I know it's wrong, but it never hurts to develop something for didactic purposes and considering that I didn't find any good free program, it wasn't a bad idea).

## What did I use?

I thought I could use [**socket.io**](http://socket.io/) to create "a communication channel" between the two PCs in the LAN area of my house (to do that I had to use also a nodejs version of the [**socket.io-client**](https://www.npmjs.com/package/socket.io-client)) and develop a client and server script with node: the first would have captured all the key presses of the only available keyboard while the server would have received it to simulate the keydown on the Operating System. To capture the key presses I used [**keypress**](https://www.npmjs.com/package/keypress) and to simulate them [**robotjs**](https://www.npmjs.com/package/robotjs).
Lastly I used the famous [**commander.js**](https://github.com/tj/commander.js) to handle ia fancy way the command options when calling StreamKey.

## Some caveats

Unluckily nothing's perfect and there are some problems with robotjs: the lib I used to simulate the keydown.
It is a very fascinating library, it is written in C as node addon, my bad I'm not that good with C... I studied it and gave also an exam on C89/C99, but the skill requested to touch a bit of the robotjs code are too high for me.
Anyway I saw that the issues that I am interested in are already opened [here](https://github.com/octalmage/robotjs/issues/210) and [here](https://github.com/octalmage/robotjs/issues/16) and I commented on that thread too.  
Basically there are problems with simulating key presses on Windows when an app is fullscreen and with letters that contain accents

## How to use it

You need node and npm on both the PCs of course, and then launch from terminal `npm install -g streamkey`. Once done this, on the PC that is missing the keyboard you just type `streamkey server`, while on the PC that has an available keyboard you just type `streamkey client -i <local-ip-of-your-server>`

## Final version

When the final bug free version of StreamKey will be available, I'd like to publish an handy executable file. To do that I'll use this project [https://github.com/jaredallard/nexe](nexe) in order to deploy an app for linux/OSX/Windows with just one codebase :) (some true magic there).

Hope you enjoy, and if you do so, don't forget to star the [**github**](https://github.com/giacomocerquone/streamkey) repo and here the [**npm**](https://www.npmjs.com/package/streamkey) package link :D
