---
title: Why I Dropped Expo and embraced React Native
date: 2019-11-09 21:00:00
description: What are the main problems with Expo at this time? And what can be the advantages of using a pure React Native workflow?
image: "./why-i-dropped-expo.jpg"
imageAlt: gears bare metal
slug: blog/why-i-dropped-expo-and-embraced-react-native
---

As some of you may know, I'm currently working as a freelancer in React Native and constantly shipping and curating some apps. I may not have created 100+ apps like this guy on [dev.to](https://dev.to/kylessg/ive-released-over-100-apps-in-react-native-since-2015-ask-me-anything-1m9g), but I made quite a few of them and all were data centric with lots of screens and user inputs handling (we don't like simple challenges right?).
For one of the last I also needed a personalized component that required some tweaking around the two libs gesture-handler and reanimated.

## Disclaimer

The whole article isn't made to go against people who are passionate about what they do and believe in their projects like the Expo team.
The last thing I want to do is to discredit their work! They are awesome people and developers but, as every product, Expo gets its own reviews too and with this I'll give mine based on my little experience.

### Who is this post for

Having said that, things will surely change and opinions too. Plus we all might have different ideas and an important thing is that the advices you'll find in this post won't work for everyone, I believe they'll work for a developer who:

- Has always used expo and is forced to abandon it because of some requirements at work
- Wants to discover the internals of the framework
- Like me has been scared by the first versions of the framework and he's thinking to retry it
- Is tired of something in the expo ecosystem

## From the beginning

I started developing in pure React Native 3 years ago, it was surely a more immature framework than now and the major pain point for me was the unknown native side. After lots of fight with it (upgrading a React Native version was a huge pain, setting up some native modules just ended up screwing the entire project, and many other things) I wanted to gave expo a try, it looked like heaven: no native dependencies, no native manifest or plist to edit, nothing weird had to be done to create a splash screen and most of all, one command to build an ios app... **in pure React Native long ago I struggled so much more than I should have to build an iOS app** (probably because of the missing resources in the first days).
Expo has an awesome developer experience, so awesome that it became almost instantly poisonous to me.
They created a beautiful structure that locks you in, not on purpose of course, but based on the limitations that come from having such a painless experience. Simplification comes always at a cost, the world itself works in this way, and the cost suddenly became too high for me.
Especially because once you're in you soon start to think that without what expo does for you, would not be possible to build what you're building and that once made that choice, you cannot easily go back.

These limitations are of all kind of genres, some are explicit (they write them in [its website](https://docs.expo.io/versions/latest/introduction/why-not-expo/)) and others, well, are implicit of course, since questions like: "will that thing ever work?" "who knows? Maybe in v34, but not in v36" or like: "this core piece of my app is broken because one of your module doesn't work. What do I do now?" "eject of course" "well why I used expo in the first place?" don't have a straightforward answer and the answer comes at high costs

## We should not avoid what's native

The first thing you're trying to avoid when using expo is the very reason why React Native, or any other technology that follows the same structure, is better than any other previous cross-platform solution: the native side of your app.
It's comprehensible, it's a mistake I did too the one of trying to avoid at all costs touching the native projects with their respective IDEs and we're not even talking about writing native code (that is a thing I'm not yet comfortable with), but just configuration. But turns out that it's actually a strong point having at hand all the native side tools.
It's obvious that being web devs we know nothing about native development nor about its tools, but native developers needed simplifications too in all the tedious tasks so they built the icon generator, the visual tool to build UI and many other stuff that help us a lot (often not as much as expo but still it's almost equally simple).
And when you need to touch some code or some configuration file, I want you to remind of this: seeing react-native/Obj-c/Java code for the first time is a bit like reading complex math for the first time too! Initially you don't understand shit, but as you get comfortable with the notation, syntax and terminology you start solving problems.

## The technical problems I've found

Not that I'm leaving expo because I have encountered technical problems with it, but here there are a few I encountered in my pretty long and intense journey.

- An inconsistency between the dev and the prod environment, meaning that sometimes the app in prod will crash without knowing why (and it's such a painful experience since you don't know how to debug, logcat for android for example is almost never helpful in that) and it has very often to do with the app.json file of your app that is missing the right configurations.
- Some APIs that just do not work. I've followed all the new "background" geolocation implementation introduced in SDK 32 and, in SDK 34, it still doesn't work. They know it of course, but the expo team has such a large number of things to look for that I understand it's not easy at all.
- It feels horribly wrong when loading fonts, for example, to call that "[loadAsync](https://docs.expo.io/versions/latest/guides/using-custom-fonts/#loading-the-font-in-your-app)" (the fonts are normally imported in the native project in a bare React Native environment instead of being loaded at runtime).
- I could mention many many more problems that I encountered (or I'm still encountering) in certain version of the sdk and be clear that some of them (like the one that is still in almost 2020 [affecting the keyboard behaviour](https://github.com/expo/expo/issues/2172) in all of the screens of your app) aren't related to certain native modules provided by expo, but they're there just because you use expo.
- Apps weight [really too much](https://expo.canny.io/feature-requests/p/reducing-app-size).
- Requesting permissions you'll never use, IDFA and other bad stuff [almost no one talk about](https://github.com/expo/expo/issues/1138).


## Ejecting? No thanks. Better building from the ground up

This post was born from the needs to completely detach, but in the real meaning of the word, an app from expo for a client's project.
Using the `expo eject` command is something I completely discourage. It's something that even they are dismissing in favour of unimodules (more on later) and that will give you more headaches than directly porting back the entire app in a new bare react native project.

## The things I love of Expo and tried to bring to the native side

There is a but to all this matter.
It's true that I wouldn't rely on it for a working project no more (mainly for the constant fear of failing the release date because of some unexpected problem I **can't** quickly fix), but there are a couple of things I missed so much that I wanted to port somehow to the React Native side:

- OTA updates ([CodePush](https://github.com/microsoft/react-native-code-push) which is even a lot better and fine tuned to your needs)
- OTA channels configuration in the way I was used to create them in Expo at build time
- A simple way of building the app... couldn't they think of a simple damn command? lol

The last two will be the subject of a series of future posts :) Stay tuned

#### (Unimodules)

This is the "things will surely change" I was talking about in the beginning. Unimodules is an ambitious project of bringing the possibility to import even a single module between the many that are available in Expo in a pure React Native project.
How can they do this and what prevented it in the first place? Well, basically all the goodies we're used to have in Expo relies on the fact that all the code we write will run in an already well configured and predictive react native app heavily configured, but not necessarily through the use of custom native modules, in order to expose some primitives that many native features use.
So they did what they were doing but through a common way in the React Native ecosystem: using native modules.
But since there was the need of a base that could let all the other modules work, they created the [Core Unimodules](https://github.com/unimodules/react-native-unimodules) which requires itself all kind of permissions for your app (an old story, right?) [just because it's included](https://github.com/unimodules/react-native-unimodules#add-permission-usage-description-keys-to-infoplist), even if you don't require anything that needs those permissions to run (but I honestly believe it's a matter of time they enable some sort of three shaking to avoid this).