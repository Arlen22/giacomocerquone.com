---
title: React Binding Patterns, the major pitfalls
date: 2018-05-06 18:44:02
description: Let's discover the most used ways of assigning the right 'this' to react components functions
image: "./binding_react.jpg"
slug: blog/react-binding-patterns-major-pitfalls
imgAuthor: me
---

In this post I assume you know and use the well known Facebook library React.
I've been working for a while on some React Native projects and during this whole time it happened to me to recognize, in some code I've read here and there, at least 4 common patterns to give the right context to the class methods of a component.

## What am I talking about?

Let's see a quick example (got from the [official doc](https://reactjs.org/docs/handling-events.html))

```jsx
class SayHello extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: "Hello!" }

    // Needed binding to access the state inside the handleClick method.
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    alert(this.state.message)
  }

  render() {
    return <button onClick={this.handleClick}>        Say hello       </button>
  }
}
```

In this piece of code we're analyzing a component defined through the standard ES6 syntax used to create classes and, as we can easily see, the button, once clicked, calls the method handleClick that, thanks to the bind made in the constructor, it can reference the components' state through the `this` keyword.

Nothing too weird. This has obviously nothing to do with React, but with how functions are designed in jsx harmony (more specifically the fact that the `this` is dynamic, [more here](https://www.smashingmagazine.com/2014/01/understanding-jsx harmony-function-prototype-bind/))

But there are different ways to create a component and handle the methods' contexts of that component.

## Two different ways of creating a component

So we can create stateful components in various way and one of them is considered legacy and so it's **strongly discouraged**, but I'll use it anyway in order to introduce the concept of **"autobinding"**.

In react, not too long ago, there was included a method called "createClass" that was used to create a component and, as a helper method, it made an automatic binding for all the method defined for that component. In order to discourage the usage of this function, Facebook pulled it out from the main library and extracted it in a external module.
[Here you can read](https://l.facebook.com/l.php?u=https%3A%2F%2Ftoddmotto.com%2Freact-create-class-versus-component%2F&h=ATPfcaq-a4FV6b_a4A8YRzvPmWNSTFGJfcuEXQHqkTJEg0_kJkmTepH1CAv3hk-vDGrimcGMw_C_HJ6fCOMrbLAWPga8cwfbX70mGUZ9JLeJQ53swQ) why they prefer you to use the standard ES6 way to create classes instead of this one.

The following example that is **strongly discourage** use this module: let's rewrite the component from the previous paragraph:

```jsx
var SayHello = createReactClass({
  getInitialState: function() {
    return { message: "Hello!" }
  },

  handleClick: function() {
    alert(this.state.message)
  },

  render: function() {
    return <button onClick={this.handleClick}>Say hello</button>
  },
})
```

As you see the code is less verbose, let's see now how to use standard es6 class to create components that are inline with the modern standards.

## The most 4 common patterns

Firstly we'll see two anti-patterns used way too often throughout a lot of react's projects that can bring serious bad performance to the whole project.
Then we'll continue with the other two where the last one is a slightly fixed version of the second-last.

### 1. Binding in render - _wrong_

In this pattern the binding is made at every render, this mean that everytime React call this method, we're creating a new function passing the right this to it. Re-doing my first example:

```jsx
class SayHello extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: "Hello!" }
  }

  handleClick() {
    alert(this.state.message)
  }

  render() {
    return (
      // Here the interesting code
      <button onClick={this.handleClick.bind(this)}>
                Say hello       
      </button>
    )
  }
}
```

What are the real problems of this approach? First of all the exact same fact that we're creating a new function. Apart from the computational waste of creating a new reference in memory and let the "Garbage Collector" do the dirty work, things like this kill every optimization inside the shouldComponentUpdate since the function will be always different, no matter what.
All the people out there that use Redux, like me, know what I'm talking about and writing this kind of code in presence of the connect function, is the worst you can do.
Plus:

[Here](https://gist.github.com/armw4/869ffb834f6cfa0b4e14a30746d44933#shouldcomponentupdate) some additional info on the _magical_ connect function of react-redux, [Here](https://stackoverflow.com/questions/36677733/why-shouldnt-jsx-props-use-arrow-functions-or-bind/36677798) some info about the optimization problem I referenced above about the componentShouldUpdate lifecycle method.

### 2. Arrow function in render - _wrong_

This pattern too suffers from the same problem of the previous one... it's just a syntax change and the "bleeding edge technologies" lovers (like me) will find it more good looking being less verbose. Following the previous examples:

```jsx
class SayHello extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: "Hello!" }
  }

  handleClick() {
    alert(this.state.message)
  }

  render() {
    return (
      // Here the interesting code
      <button onClick={() => this.handleClick()}>
                Say hello       
      </button>
    )
  }
}
```

### 3. Binding in constructor - *Ok, but not optimal*

This is what we've done in the very first example:

```jsx
class SayHello extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: "Hello!" }

    // Needed binding to access the state inside the handleClick method.
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    alert(this.state.message)
  }

  render() {
    return <button onClick={this.handleClick}>        Say hello       </button>
  }
}
```

You will agree with me that the binding, in this way, will be executed only when a new instance of the component is created, and that's clearly the right way to do it in terms of performance.
The only downside of this approach is that we'll have to list every method we want to bind inside the constructor and call `.bind()` on each of them... we can do better!

### 4. Arrow function as class methods - _Optimal_

In conclusion, here we are at the last pattern, the one I hope you'll use in the future after reading this post.
Using always the same example, let's see how does it become applying this pattern:

```jsx
class SayHello extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: "Hello!" }
  }

  // We don't use .bind() anymore, but thanks to a Babel plugin (or typescript if you use it with React)
  // and the arrow functions, we can define a property of the class that contains
  // an anonymous function defined through an arrow function and so with the `this` value set to the external one

  handleClick = () => {
    alert(this.state.message)
  }

  render() {
    return <button onClick={this.handleClick}>        Say hello       </button>
  }
}
```

Notice what I've written in the comments.
To use this syntax you gotta include a babel plugin (already included in react-native and create-react-app) that allows us to define properties inside of a ES6 class.

Anyway, in this property, we store an anonymous function through a af that allows us to set the this value inside the function equal to the external one.

## Extra

### Parameters

The major takeaway here is that when you have to pass parameters, instead of doing a bind in the render with the params we want to pass, we can split the chain of components and divide them.

Given this initial basic example (where at every render a function is recreated):

```jsx
class SayHello extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: "Hello!" }
  }

  handleClick = string => () => {
    alert(this.state.message + " " + string)
  }

  render() {
    return (
      <button onClick={this.handleClick("this is a long string")}>
                Say hello       
      </button>
    )
  }
}
```

We can convert it in the following way, where no method is recreated at each render:

```jsx
class SayHello extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: "Hello!" }
  }

  handleClickFn = string => {
    alert(this.state.message + " " + string)
  }

  render() {
    return <Button text="this is my text" handleClickFn={this.handleClickFn} />
  }
}

// Stateless Component

class Button extends React.Component {
  render() {
    return <button onClick={this.handleClick}>    Say hello</button>
  }

  handleClick = () => {
    this.props.handleClickFn(this.props.text)
  }
}
```

I put up a slightly more advanced example in [CodeSandbox](https://codesandbox.io/s/zx9j93km3l)

### @autobind decorator

There is also a decorator you can use, it's just a babel module. This is [its repo](https://github.com/andreypopp/autobind-decorator) where you can see how to install it and a little example follows:

```jsx
class MyClass extends Component {
  state = { isLoading: true }

  @autobind
  onChange() {}

  @autobind
  handleSubmit() {}
}
```

_Attention: You could use this decorator over the entire class, but this is highly inconvenient and no-sense. Use it only on the methods you need to bind_
