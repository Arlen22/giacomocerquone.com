---
title: Re-thinking env vars in React Native
date: 2019-12-02 09:00:00
description: If there is one thing I hate about react native it's the inexistent way of using environment variables
image: "./rethinking-env-var.jpg"
imageAlt: monkey thinking
slug: blog/rethinking-env-vars-in-react-native
draft: true
imgAuthor: earbiscuits
---

We can say it: some parts of React Native are still missing and sometimes this may keep us on alert when developing an app made for the public.
One of the main pieces I think it's missing, is the use of **environment variables**.
<br /><br />
This post comes from problems and difficulties I experienced while building and working on pretty complex React Native apps.
For sure there are many packages that tries to help, yet I didn't find one that was satisfying my requirements.
So if you're searching for a straightforward solution, leave hope. Instead, if you know about this problem and didn't find a solution that fits your need, keep reading :)

## Requirements

Let's go for steps:

- I need many builds of my app and each of them must be configured in a specific way.
- The same way of applying the configuration is needed while developing (in order to have a "dev" configuration).
- It's obvious that needing a build time configuration (a configuration that gets applied in a specific build), the configuration must come from outside the javascript code. And this is due to the fact that we always build using the native tools (gradle/xcodebuild).
- The configuration can also be guided by a single value.
  For example I could inject a 'stage' string, and let the javascript code picks up a particular configuration object with the correct values.

In fact what we want isn't the configuration of an environment, but the configuration of a specific build in a specific way. Let's understand why in the next paragraph.

_NOTE: As you may have read from this other post, I'm recently excluding Expo from my complex apps I'm working on.
On Expo we have what it's called "ota channels". When we request a particular build, you are asked for a string that represents the channel of the app. It will listen to this channel and will retrieve the OTA updates. With that I could accomplished what I'm asking._

## Why not a standard solution?

First of all, why do we use env vars at all?
To **store secrets** and to **configure behaviours** of an application.
But everything in a front-end app is free to be seen by anyone, so in React Native, for example, we might use them only to configure behaviours in a standard way.
Then we must distinguish between:

1. using env vars in a boxed solution to create apps (one like create-react-app, react native, angular-cli etc.)
2. using them in a custom solution (one that reimplements a webpack configuration basically).

In the first kind you'll always be restricted somehow from the fact that those tools were born exactly to avoid the configuration pain.
In the second one you're free to go but almost alwats it's very hard to reimplement it and you will need to fix so many weird stuff during the journey that it may not worth the risk.

So in order to find a solution in React Native, we can spy on solutions implemented by other tools.
**Create react app**, for example, gives you this: https://create-react-app.dev/docs/adding-custom-environment-variables/ and it's done through a custom webpack configuration done by the facebook team [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js) that uses [this code](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/env.js) to collect all the env vars defined with a `REACT_` prefix for each of them.

Nice, but since in React Native we don't have this, we should reimplement a custom webpack conf.<br/>
Luckily there is already a [webpack plugin](https://github.com/mrsteele/dotenv-webpack#readme) to inject env vars, **but**, as we anticipated earlier, a custom configuration is really hard to achieve.
[This is the only attempt](https://github.com/reactnativecn/react-native-webpack) at doing it that I could find online but it's not updated and it's so awkward that I'd prefer to not embark myself into a thing like this. (plus I'm almost sure that it doesn't work as it is).

Let's find a different way to solve this issue then.

## The idea

This is the idea: why use env vars when we already have the possibility to export something directly through the same language we're writing the code?
Of course this doesn't come out of nowhere. Many tools do this already (metro.config, .babelrc etc.) but we're not used to do it in our application's code.<br/>
Examining the [12 factor app](https://12factor.net/config) manifesto we can get an intuition of why is that and what are the consequences of doing this:

> Another approach to config is the use of config files which are not checked into revision control, such as config/database.yml in Rails.

Of course then it tries to explain basically that it's prone to human errors (like everything I'd say) and then there are these assumptions:

> Env vars are easy to change between deploys without changing any code.<br/>
> Unlike config files, there is little chance of them being checked into the code repo accidentally.<br/>
> They are a language and OS-agnostic standard.

In React Native:

- The first sentence is true, but only if the code runs in a machine we control.
- The second is pretty much false. We're used to have dotenv files, so there is the same risk of committing that instead of a config file.<br/>Plus in front-end apps, as we said, env vars are just configuration values.
- The third sentence implies that should be easy to read them. It should indeed, but in the current situation it's absolutely the opposite.

Why do we have such inconsistencies with this manifesto? Simple, because environment variables were started to be used in the developing world when you needed to configure an environment, indeeed, where your code would have run, but not all kinds of development allow this.

## The solution

I won't go into details with all the implementations I tried and discarded, they're too many. Consider only that, luckily for you, I'm using the last solution in many production apps and it's going ok.

## OTA channels

Another problem we solve in a such easy way is the creation and definition of [release channels](https://docs.expo.io/versions/latest/distribution/release-channels/) (from expo terminology) with your favourite OTA updates system.<br />
With [Microsoft CodePush](https://github.com/microsoft/react-native-code-push), for example, you can import the CODE PUSH key from the active.env.js file edited with this package at build time and direct the updates wherever you want.

## Alternatives

What are the available packages that didn't work out for me?

The problems with a common dotenv package in react-native are mainly two:

1. They set env vars on the machine you're running the code and very often, through the "boxed" frameworks I mentioned, it's hard to access them.
2. Once you find a way, it seems that's almost impossible to set them at build time in a clean way. Sometimes you can decide between a dev and prod env, but very often these are meaningless and depend on the `__DEV__` you're developing on and still you can't set them the way you want when you want (look at [react-native-dotenv](https://github.com/zetachang/react-native-dotenv))

If they don't have these problems, they're hard to configure and built as a dependency and not as a devDependency.<br/>
Meaning that stuff like [react-native-config](https://github.com/luggit/react-native-config) are native packages that must be linked and their code runs at runtime too.

### React-native-dotenv

This package goes very close to accomplish what I want for my build workflow but sadly they reached a dead end for various reasons:

- No possibility to choose a certain env file.
  [Someone tried to implement](https://github.com/zetachang/react-native-dotenv/pull/34) the possibility to select a specific env file through an env var (a sort of parent env var to orchestrate everything) but hit a wall when working with gradle and xcode
- The package is not maintained anymore and there is some low level problem to the whole architecture that forces you to edit the files that import the env vars when you change them in order to let them retrieve the new values. (I assume because of babel)
