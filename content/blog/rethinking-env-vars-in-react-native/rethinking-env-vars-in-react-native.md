---
title: Re-thinking env vars in React Native
date: 2019-12-02 09:00:00
description: If there is one thing I hate about react native it's the inexistent way of using environment variables
image:
imageAlt:
slug: blog/rethinking-env-vars-in-react-native
draft: true
---

We can say it: some parts of React Native are still missing and sometimes this may keep us on alert when developing an app made for the public.
One of the main pieces I think it's missing, is the use of **environment variables**.

For sure there are many packages that tries to help, yet I didn't find one that was correctly working with my requirements.

## Requirements

Let's go for steps:

- I need many builds of my app and each of them must be configured accordingly.
- The same way of applying the configuration is needed while developing.
- It's obvious that since the need of a build time configuration, the configuration must come from outside the javascript code.
- The configuration can also be guided by a single value.
  For example I could inject a 'stage' string, and let the javascript code picks up a particular configuration object with the correct values.

_NOTE: As you may have read from this other post, I'm recently excluding Expo from my complex apps I'm working on.
On Expo we have what it's called "ota channels". When we request a particular build, you are asked for a string that represents the channel of the app will listen to when retrieving the OTA updates. With that I could accomplished what I'm asking._

## My solution


## Alternatives

What are the available packages that didn't work out for me?

The problems with a common dotenv package in react-native are mainly two:

1. They set env vars on the machine you're running the code and very often, through the "boxed" frameworks I mentioned, it's hard to access them.
2. Once you find a way, it seems that's almost impossible to set them at build time in a clean way. Sometimes you can decide between a dev and prod env, but very often these are meaningless and depend on the `__DEV__` you're developing on and still you can't set them the way you want when you want (look at [react-native-dotenv](https://github.com/zetachang/react-native-dotenv))

If they don't have these problems, they're hard to configure and built as a dependency and not as a devDependency.<br/>
Meaning that stuff like [react-native-config](https://github.com/luggit/react-native-config) are native packages that must be linked and their code runs at runtime too.

### Alternatives

### React-native-dotenv

This package goes very close to accomplish what I want for my build workflow but sadly they reached a dead end for various reasons:

- No possibility to choose a certain env file.
  [Someone tried to implement](https://github.com/zetachang/react-native-dotenv/pull/34) the possibility to select a specific env file through an env var (a sort of parent env var to orchestrate everything) but hit a wall when working with gradle and xcode
- The package is not maintained anymore and there is some low level problem to the whole architecture that forces you to edit the files that import the env vars when you change them in order to let them retrieve the new values. (I assume because of babel)

---

# react-native-jsenv

A cli tool to inject values and env vars into code at build time or at runtime with zero dependency.

## Naming

I decided to call this package with a prefixed "react-native" because as far as my experience goes it's where it's needed.
Plus, like you'll see, if it wasn't for the possibility to inject env vars, it was merely a script to copy and paste one file, but still is a structured solution that almost no one uses and that I think must be discussed and used.

## Usage

`jsenv --input ./envsFiles/env.example.js --output ./src/constants/constants.js API_URL https://cat.it API_V=$API_V`

This will:

- take env.example.js and copy its content to constants.js
- set the API_URL variable of constants.js to https://cat.it
- set API_V variable of constants.js to the current env var value

You can also set nested properties with the limitation of **not being able to use dots** in your properties names'.

Ultimately you can get everything from the env vars in this way **without being limited from the dot notation**:

`jsenv --inputFromEnv --output ./src/constants.js`

### So I get OTA channels for free? You bet

Another problem we solve in a such easy way is the creation and definition of [release channels](https://docs.expo.io/versions/latest/distribution/release-channels/) (from expo terminology) with your favourite OTA updates system.<br />
With [Microsoft CodePush](https://github.com/microsoft/react-native-code-push), for example, you can import the CODE PUSH key from the env.js file edited with this package at build time and direct the updates wherever you want.

## Motivation

This package aims to solve a common front-end issue in the React Native ecosystem in a different way.<br /><br/>
It comes from problems and difficulties I experienced while building and working on pretty complex React Native apps.<br />
In fact this package ease down the complexities of defining env vars (or configuration variables I should say) in these "boxed" platforms/frameworks (like create-react-app, angular/cli, react-native etc. with complex webpack conf and thousands of plugin).<br/><br/>
So why use env vars when we already have the possibility to export something directly through the same language we're writing the code? Of course is a provocative question, but not stupid. Many tools do this (metro.config, .babelrc etc.) but we're not used to do it in our application's code.<br/>
The [12 factor app](https://12factor.net/config) bless this in a certain sense:

```
Another approach to config is the use of config files which are not checked into revision control, such as config/database.yml in Rails.
```

Of course then it tries to explain basically that it's prone to human errors (like everything I'd say) and then there are these assumptions:

```
Env vars are easy to change between deploys without changing any code.
Unlike config files, there is little chance of them being checked into the code repo accidentally.
They are a language and OS-agnostic standard.
```

- The first sentence is true, but only if the code runs in a machine we control.
- The second is pretty much false. We're used to have dotenv files, so there is the same risk of committing that instead of a config file, plus in frontend apps, like React Native too, env vars **are not** hidden to the end user and for this reason it's strongly advised to not store any sensitive information. So, again, it's just configuration.
- The third sentence implies that should be easy to read them. It should indeed, but in the current situation it's absolutely the opposite, it's hard as fuck.

In fact environment variables were started to be used in the developing world when you needed to configure an environment, indeeed, where your code would have run.

As a front-end developer, I know that what we're trying to accomplish isn't the configuration of an environment, but the configuration of a specific build in a specific way and in such cases what we miss is a value, even a single string, that we can inject into a build from where you can deduct every other internal config value.<br/>
All those tools I quoted, except expo, doesn't allow this as far as I know.
Create-React-App for example let you directly access the env vars in the system **OR** use a pre-defined file. It is something but I'd prefer a mix of the two, use an env var (or a CLI argv) that specify the file where to get the configuration from.

But in React-native instead we have an even harder deficiency of not having any possibility to set an env var in a usual manner into the terminal and get
