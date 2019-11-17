---
title: Microsoft CodePush Integration in React Native 0.60+
date:
description: Microsoft CodePush is a powerful tool but can be very exhausting to configure. Let's cycle over the necessary details
image:
imageAlt: fast night city lights
slug: blog/microsoft-codepush-integration-in-react-native-0.60
draft: true
---

The world has been spinning pretty fast lately, hasn't it?
In the development process what we're used to call "**continuous delivery**" is what allowed us, as end users, to perceive changes in a blazingly fast way and it's what allows us, as developers, to push fixes and new features faster to the end user.
You'll find so many articles about it and maybe you still are figuring out what it really is but remember, these apparently abstract and hard to follow concepts that pops up here and there nowadays always boil down somehow to something practical: a tool, a service or an architecture that let you do something.

But how can we effectively do this in the world of mobile development? Through **over-the-air** udpates.
It's the ability of an app to receive bugfixes and new features that can be applied at runtime and refresh the experience to the user. This means no store approval, no build time and lots of other simplifications.

## General inner working

Clearly I won't talk about other platforms, but OTA updates aren't possible on every framework due to their different inner workings.
In React Native we are "required" to build a **JavaScript bundle** in order to produce a production app. That js bundle, called index.android.bundle in Android and main.jsbundle in iOS, is bundled within the aab/apk/ipa and then the Java/Obj-C code of React Native will "just" talk to that.
So how are OTA delivered? Simple, replacing that bundle, when certain conditions are met, through a native linked library and restarting the execution of that bundle at runtime.

Now understanding how something works is the only way you can improve yourself and become as independent as possible. I might also have tempted a personal implementation of this mechanism, but it'd be silly since we have Microsoft CodePush: a tool, inside the app center, made exactly to deliver OTA updates.

## Configuration

Online resources are a bit scarse on how to:

- Properly configure this library
- How to use the appcenter cli
- How to use the [appcenter.ms](http://appcenter.ms/) website dashboard

There is a [huge unhandy microsoft documentation](https://docs.microsoft.com/en-us/appcenter/) about it, but at the same time it's possible to find many commands out in the wild of the old version of the cli that don't works anymore.

## Linking

the following

## Important CLI commands

Now an handy collection of the main useful commands you can refer to

```
DEPLOY (to a deployment name)
appcenter codepush release-react -a <owner>/<appName> -d <deploymentName> -t vesion

LIST APPS FOR CURRENT USER
appcenter apps list

ADD A DEPLOYMENT (to an app)
appcenter codepush deployment add -a {owner}/{appName} Staging

LIST DEPLOYMENTS AND KEYS (of an app)
appcenter codepush deployment list -a {owner}/{appName} --displayKeys

DELETE ALL EXISTING DEPLOYS (of a deployment name)
appcenter codepush deployment clear -a <ownerName>/<appName> <deploymentName>

DELETE A SPECIFIC DEPLOY (of a deployment name)
```

If you need any kind of support, reach out to me on twitter, I'd be glad to help.
