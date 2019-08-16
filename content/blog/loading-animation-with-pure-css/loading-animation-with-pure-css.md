---
title: Loading animation with pure CSS
description: A little and simple pure CSS loading animation took directly from my new project.
date: 2015-11-16 12:41:47
image: "./CSSLoading.jpg"
imageAlt: "captured css loading animation"
slug: blog/loading-animation-with-pure-css
---

This post contains just a little and simple example of an animation made with CSS only and no javascript or any other complicated libraries. This thing actually comes directly from the project I'm about to present here in a few days. Anyway if you want to jump right to the animation [here the snippet](http://jsfiddle.net/fk8ke82t/) on jsfiddle.

## Tell me the magic!

I love to keep things neat and as minimal as possible, so I'm sure this example will be better than a lot of others CSS snippets you can find out there because in these few lines of code you only see what you need to understand and nothing else can distract you.
So the animation consists in four dots that increase and decrease their dimension and an highlight color flows between them. It's made using the [keyframes CSS rule](http://www.w3schools.com/cssref/css3_pr_animation-keyframes.asp) (of course) and now let's take a look at the bare HTML structure:
``` xhtml
<span></span> <span></span> <span></span> <span></span>
```

So we have nothing more than 4 span tags. We'll apply now some styles:

``` css
@keyframes loading {
  0% {
    opacity: .2;
  }
  20% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: .2;
    transform: scale(0.3);
  }
}

span {
    display:inline-block;
    width:1.5em;
    height:1.5em;
    border-radius:50%;
    background:#3498DB;
    margin:.7em;
    opacity:.2;
    animation-name: loading;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    transform: scale(0.3);
}

span:nth-child(2) {
    animation-delay: .1s;
}
span:nth-child(3) {
    animation-delay: .2s;
}
span:nth-child(4) {
    animation-delay: .3s;
}
```

Well, here I defined a new animation through the @keyframes rule called "loading" and in the three phases of the animation I changed the opacity (to give the feeling of the sliding of the animation) and the dimension (through the [transform:scale()](http://www.w3schools.com/css/css3_2dtransforms.asp) property).

After I set the tag to [display:inline-block;](http://www.w3schools.com/css/css_inline-block.asp) so that it could keep the qualities of an inline element and a block element (so that we can define properties like width and height to make them visible). Following a list of simple properties until the [animations-delay](http://www.w3schools.com/cssref/css3_pr_animation-delay.asp) used here to execute the animation sequentially on the elements.

That's all, Stay tuned!
