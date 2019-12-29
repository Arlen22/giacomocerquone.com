---
title: Re-thinking env vars in React Native
date: 2019-12-29 11:20:00
description: If there is one thing I hate about react native it's the inexistent way of using environment variables
image: "./rethinking-env-var.jpg"
imageAlt: monkey thinking
slug: blog/rethinking-env-vars-in-react-native
imgAuthor: earbiscuits
---

We can say it: some parts of React Native are still **missing** and sometimes this may keep us on alert when developing an app made for the public.<br/>
One of the main pieces I think it's missing, is the use of **environment variables**.
<br /><br />
This post comes from problems and difficulties I experienced while building and working on **pretty complex** React Native apps.<br/>
For sure many packages tries to help, yet I didn't find one that was **satisfying my requirements**.<br/>
So if you're searching for a straightforward solution, leave hope. Instead, if you know about this problem and didn't find a solution that fits your need, keep reading :)

## Requirements

Let's go for steps:

- I need **many builds** of my app and each of them must be configured in a specific way.
- The same way of applying the configuration is needed **while developing** (so to have a "dev" configuration).
- It's obvious that needing a build time configuration (a configuration that gets applied in a specific build), the configuration **must come from outside** the javascript code. And this is because we always build using native tools (gradle/xcodebuild).
- The configuration can also be guided by a **single value**.
  For example, I could inject a 'stage' string, and let the javascript code picks up a particular **configuration object** with the correct values.

In fact, what we want **isn't** the configuration of an environment, but the configuration of a specific build in a specific way. Let's understand why in the next paragraph.<br/><br/>

_NOTE: As you may have read from this other post, I'm recently excluding Expo from the complex apps I'm working on.
On Expo, we have what it's called "**OTA channels**". When we request a particular build, you are asked for a string that represents the channel of the app. It will listen to this channel and will retrieve the OTA updates. With that I could accomplish what I'm asking._

## Why not a standard solution?

First of all, why do we use env vars at all?<br/>
To **store secrets** and to **configure behaviours** of an application.<br/>
But everything in a front-end app is **free to be seen** by anyone, so in React Native, for example, we might use them only to configure behaviors in a standard way.<br/>
Then we must distinguish between:

1. Using env vars in a **boxed solution** to create apps (one like create-react-app, react native, angular-cli, etc.)
2. Using them in a custom solution (one that **reimplements a webpack config** basically).

In the first kind, you'll always be restricted somehow from the fact that those tools were born exactly to avoid the configuration pain.<br/>
In the second one, you're free to go but it's very hard to reimplement it and you will need to fix so many weird stuff during the journey that **it may not worth the risk**.

So to find a solution in React Native, we can **spy on solutions** implemented by other tools.<br/>
**Create react app**, for example, gives you this: https://create-react-app.dev/docs/adding-custom-environment-variables/ and it's done through a custom webpack configuration done by the facebook team [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js) that uses [this code](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/env.js) to collect all the env vars defined with a `REACT_` prefix for each of them.

Nice, but since in React Native we're left alone, we should reimplement a custom webpack conf.<br/>
Luckily there is already a [webpack plugin](https://github.com/mrsteele/dotenv-webpack#readme) to inject env vars, **but**, as we anticipated earlier, a custom configuration is **really hard to achieve**.
[This is the only attempt](https://github.com/reactnativecn/react-native-webpack) at doing it that I could find online but it's **not updated** and it's so **awkward** that I'd prefer to not embark myself into a thing like this. (plus I'm almost sure that **it doesn't work as it is**).

Let's find a different way to solve this issue then.

## The idea

This is the idea: why use env vars when we already can export something directly through the same language we're writing the code?<br/>
Of course, this doesn't come out of nowhere. Many tools do this already (metro.config, .babelrc, etc.) but we're not used to do it in our application's code.<br/>
Examining the [twelve-factor app](https://12factor.net/config) manifesto we can get an intuition of why is that and what are the **consequences** of doing this:

> Another approach to config is the use of config files that are not checked into revision control, such as config/database.yml in Rails.

Then it basically says that this is prone to human errors (like everything I'd say) and then there are these assumptions:

> Env vars are easy to change between deploys without changing any code.<br/>
> Unlike config files, there is little chance of them being checked into the code repo accidentally.<br/>
> They are a language and OS-agnostic standard.

In React Native:

- The first sentence is **true** but **only** if the code runs in a machine we control.
- The second is pretty much **false**. We're used to have **dotenv files**, so there is the **same risk** of committing that instead of a config file.<br/>Plus in front-end apps, as we said, env vars are just configuration values.
- The third sentence implies that **should be easy** to read them from the code. It should be indeed, but in the current situation it's **absolutely the opposite**.

Why do we have such **inconsistencies** with this manifesto? Simple, because environment variables were started to be used in the developing world when you needed to configure an environment, indeed, where your code would have run, but not all kinds of development allow this.

# The solution

I won't go into details with all the implementations I tried and discarded, this post would become huge with all the considerations, the pros and cons. Consider only that, luckily for you, I'm using the following solution in many production apps and it's going ok.
It's very basic:

- Define an active.env.js file at the root of the project like this:

```javascript
export default "dev"
```

- Define configuration values in an env.js file like this:

```javascript
import { Platform } from "react-native"

import active from "./active.env"

const envs = {
  stage: {
    DEV_API: "http://staging.api.com",
    SOUNDS: Platform.OS === "android" || false,
  },
  prod: {
    DEV_API: "http://prod.api.com",
    SOUNDS: Platform.OS === "android" || false,
  },
  dev: {
    DEV_API: "http://dev.api.com",
    SOUNDS: Platform.OS === "android" || false,
  },
}

export default envs[active]
```

- You'll use a shell script (or an npm package) within an npm script called, for example, "set-stage" which will write inside the active.env.js file the right string (env) to apply to the project. Something like this:

```
"set-stage": "shx echo \"export default 'stage';\"> active.env.js",
```

- From wherever you want, import a configuration value like this:

```javascript
import { DEV_API } from "env.js"
```

Now within each build process, you just have to automatize the changing of the content of the active.env.js file and you and leave it as "dev" the rest of the time.<br/>
This can be done through command concatenation (&& inside the npm scripts).

## OTA channels

Another problem we solve in such easy way is the creation and definition of [release channels](https://docs.expo.io/versions/latest/distribution/release-channels/) (from expo terminology) with your favorite OTA updates system.<br />
With [Microsoft CodePush](https://github.com/microsoft/react-native-code-push), which [I talked about here](https://giacomocerquone.com/blog/microsoft-codepush-integration-in-react-native-0.60) for example, you can import the CODE PUSH key from the right env javascript file at build time and correctly direct the updates.

## Alternatives

### react-native-dotenv

This package goes **very close** to accomplish what I want for my build workflow but sadly they **reached a dead-end** for various reasons:

- No possibility to choose a certain env file.
  [Someone tried to implement it](https://github.com/zetachang/react-native-dotenv/pull/34) through an env var (a sort of parent env var to orchestrate everything) but hit a wall when working with gradle and xcode
- The package is not maintained anymore and there is some low-level problem to the whole architecture that forces you to edit the files that import the env vars when you change them to let them retrieve the new values. (I assume because of babel)

### react-native-config

This one is the best you can get without coming up with your own implementation.<br />
The problem is that to achieve all those functionalities, it's built as a dependency and not as a dev dependency (it must be linked and so **the code runs at runtime** too) and you have to tinker a bit on how to configure it properly both on xCode and Android Studio.