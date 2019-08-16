---
title: Angular 2/4/5 Routing
date: 2018-01-21 15:45:58
description: Routing is a fundamental part of every front-end web app. Let's see how to use it in Angular giving to it the superpowers.
image: "./Angular-routing.jpg"
imageAlt: cartoon city routes near angular logo
slug: blog/angular-routing
---

Since september, if I recall correctly, I started writing on [ItalianCoders.it](http://italiancoders.it) after being contacted by Dario Frongillo. I was happy at first to contribute and very soon we became a true community, helping one another to share knowledge. Right now I'm administrating and writing on that blog with Dario and other four people and I decided to translate some articles that I consider interesting also for non italian speakers.

# Routing, what is it?

Routing is a fundamental part of every front-end app. Thanks to it, we can switch views of an executing application requesting specific paths in the URL. It is the heart of every SPA (Single Page Application), so let's discover how to use it in Angular.

## Angular 2 Routing

In this post we're going to see how to install and use the routing package and which are the best practices in order to get the best from our app.
You can find all the code you'll read in this post in my [github repo](https://github.com/giacomocerquone/angular-routing).

- [Routing, what is it?](#routing-what-is-it)
  - [Angular 2 Routing](#angular-2-routing)
  - [Project setup with @Angular/Cli](#project-setup-with-angularcli)
  - [Configure @Angular/Router](#configure-angularrouter)
  - [Creation of 3 components](#creation-of-3-components)
  - [Router Link](#router-link)
  - [Router Outlet](#router-outlet)
  - [Parameters](#parameters)

## Project setup with @Angular/Cli

<a name="setup"></a>
The luck of working with Angular, and in general with famous frameworks, is that you can find plenty of documentation and help over the internet and that many users work on its codebase and from the ashes of ember.js, Angular Cli has born: a very handy utility to structure and maintain your ng project in the simplest possible way.
Install globally this package with your favourite package manager:

```bash
yarn global add @angular/cli
```

or

```bash
npm install -g @angular/cli
```

When the installation has terminated, we can continue:

```bash
ng set --global packageManager=yarn (se si vuole usare yarn)
ng new angular-routing
cd angular-routing
ng serve
```

With the first command we set yarn as the default PM to install the dependencies of the project that will be generated. The second command is responsible for creating the folder and all the necessary files and it will automatically install all the dependencies needed to run a basic CLI project (including the router). With the third line we move into the newly created directory and then we'll "ng serve" the application in order to access it at [localhost:4200](http://localhost:4200): the Angular logo should appear.
For an exhaustive list of commands made available by the CLI you can read the [official documentation](https://github.com/angular/angular-cli/wiki) and for ng serve, let it run in background so that when you'll modify the code of the project, it will automatically refresh the browser page in order to show the updated code.

Let's now proceed to the router configuration!

Info: _When Angular 2 wasn't even in a definitive release, the developers used to swim in uncharted waters and lots were the online examples that were showing how to setup a project. There were the ones who used a handmade webpack configuration and the ones who just used a simple systemjs build. Now these examples mustn't be followed anymore; while the Angular CLI isn't for sure the only way to put up an NG project, it is for sure the best way to do it and I strongly discourage any other kind of solutions._

## Configure @Angular/Router

<a name="configure"></a>
The module, as I just wrote, comes preinstalled with a basic cli project and you can find it in the package.json. Now we need to import it of course, so let's open this file: `angular-routing/src/app/app.module.ts` and in the imports array, add the router module.

```javascript
import { RouterModule } from '@angular/router';

...
@NgModule({
  ...
  imports: [
    BrowserModule,
    RouterModule
  ],
  ...
```

## Creation of 3 components

<a name="create"></a>
Before we can configure the routes, we need of course two components in order to navigate to navigate between them.

Info: _This is it actually when we talk about routing, we talk about navigation. They're nothing else than links that bring somewhere in the application without the need to reload the page._

Let's generate them with our CLI so that we don't need to create any file or import them manually in the module.

```bash
ng g c Photos/Components/Photo1
ng g c Photos/Components/Photo2
ng g c Default
```

Note the structure of the directory. Every developer use a certain naming convention. Mine is almost identical to the one that is showed in the [official Angular guidelines](https://angular.io/guide/styleguide#overall-structural-guidelines) and it is an approach based on models where every model has its own component, service etc. folder.

Now, create a file in the same directory of app.module.ts to define the routes and call it `app.routes.ts`. In here we import the 'Routes' type from `@angular/router` and the components created above.

```javascript
import { Routes } from "@angular/router"
import { DefaultComponent } from "./default/default.component"
import { Photo1Component } from "./photos/components/photo1/photo1.component"
import { Photo2Component } from "./photos/components/photo2/photo2.component"
export const AppRoutes: Routes = [
  { path: "", component: DefaultComponent },
  { path: "photo1", component: Photo1Component },
  { path: "photo2", component: Photo2Component },
]
```

Everything here should be clear and simple. In "path" you define the string that has to appear in the url in order to activate the component defined to the right.
Now, importing the routes and calling the forRoot function, we'll have the app.module configured like this:

```javascript
import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { AppComponent } from "./app.component"
import { Photo1Component } from "./photos/components/photo1/photo1.component"
import { Photo2Component } from "./photos/components/photo2/photo2.component"
import { DefaultComponent } from "./default/default.component"
import { AppRoutes } from "./app.routes"
@NgModule({
  declarations: [
    AppComponent,
    Photo1Component,
    Photo2Component,
    DefaultComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(AppRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

If you still have ng serve running and the browser tab opened, you should see that nothing changed.

## Router Link

<a name="link"></a>
What we did so far didn't change anything... how so?
There are two things to consider:

1. We didn't define a way to reach those paths (we could also just place a tags to do this)
2. We didn't told Angular where we want these componets, defined in the routes, to appear when we navigate between them.

Let's start to add the menu that will contain these links. Open app.component.html and delete entirely its content.
We can do what we're about to do in two different ways:

```html
<nav>
  <a routerLink="">Default</a>
  <a routerLink="/photo1">Photo1 Component</a>
  <a routerLink="/photo2">Photo2 Component</a>
</nav>
```

And the next one is commonly used to pass parameters:

```html
<nav>
  <a [routerLink]="['']">Default</a>
  <a [routerLink]="['/photo1']">Photo1 Component</a>
  <a [routerLink]="['/photo2']">Photo2 Component</a>
</nav>
```

And to know which route are we in, at a certain moment, we can add the `routerLinkActive` directive that accept as a parameter the name of the class to set to the element.
This directive does nothing else than a match between the routes defined and the path showed by the browser's url field. This means that if we have this path: `/`, the "Default" link will be active, if we navigate to `/photo1` the Default and Photo1 Component will be active. This behaviour, instead of being a bug [as someone tought](https://github.com/angular/angular/issues/8397), is a simple machanism that keeps track of sub-navigation. To avoid this, you just need to use the input property `[routerLinkActiveOptions]=”{ exact: true }”` that will do an exact match.
Let's change app.component.html and app.component.css (we'll add some css that never hurts):

```html
<nav>
  <a
    [routerLink]="['']"
    routerLinkActive="active"
    [routerLinkActiveOptions]="{ exact: true }"
    >Default</a
  >
  <a [routerLink]="['/photo1']" routerLinkActive="active">Photo1 Component</a>
  <a [routerLink]="['/photo2']" routerLinkActive="active">Photo2 Component</a>
</nav>
```

```css
a {
  text-decoration: none;
  color: #999;
}
a:hover {
  color: #333;
}
nav {
  margin: 2em;
  text-align: center;
  font-family: Arial;
}
.active {
  text-underline: none;
}
```

## Router Outlet

<a name="outlet"></a>
Clicking the link now, we still can't see the components because, as I just wrote, you need to tell angular where these components have to appear. We can do this through the <router-outlet> tag.
Basically wherever this tag is placed, it will be substituted with the html of the component that matches with the route.
The only _"place"_ that the three created components have in common is the app.component.html, let's add it there:

```html
  ...
</nav>
<main>
  <router-outlet></router-outlet>
</main>
```

```css
main {
  text-align: center;
  width: 50%;
}
```

Now we finally have a first working example of routing in an application, but a good introduction can't miss to show how to move information between routes with **parameters**.

## Parameters

<a name="params"></a>
Navigating from one component to another, it's possible to pass dynamic information in the url. In this way the component will not be activated with an exact match of the path defined in app.routes.ts.
Change it like this:

```javascript
...
export const AppRoutes: Routes = [
  { path: '', component: DefaultComponent },
  { path: 'photo1/:photoid', component: Photo1Component },
  { path: 'photo2', component: Photo2Component }
];
```

You'll be noticing the ":photoid" part after "photo1". It just means that the Photo1Component must activate every time he has a match like "photo1/string" with string being anything.
But how do we get that value in the component in question? Nothing too complicated, let's edit `angular-routing/src/app/photos/components/photo1/photo1.component.ts`

```javascript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-photo1',
  templateUrl: './photo1.component.html',
  styleUrls: ['./photo1.component.css']
})
export class Photo1Component implements OnInit {
  photoid: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => this.photoid = params.photoid);
  }
}
```

Import ActivatedRoute, inject it in the component through the constructor and the dependency injection and call the function subscribe on the parameters of a route. Through an arrow function we get the params returned from the observable and we assign to photoid the value that we got. Then we'll print it in `photo1.component.html`.

```html
<p>photo1 works! Il mio id è: {{ photoid }}</p>
```

Now let's mock a parameter to pass to our component in the link

```html
<a [routerLink]="['/photo1', '001']" routerLinkActive="active"
  >Photo1 Component</a
>
```

_Info: In a real application these links are generated through an iterative cycle. For example Angular makes an HTTP call to the following endpoint: http://mioserver.it/product getting then the list of the products with all their ids and iterating on it we'll obtain the links with routerLink that points to the relatives id._

If you followed all along correctly the tutorial, giving "ng serve" on the terminal, you should be able to click on Photo1 Component and read: `photo1 works! Il mio id è: 001`
