---
title: "Path Follower: Arduino+Rasp on ROS"
description: We've created a path follower and maze solver robot car with, arduino, raspberry, ROS, Vrep and a bunch of other stuff
date: 2018-02-22 02:58:29
image: "./robotcar-01.png"
slug: blog/path-follower-maze-solving-car-arduino
---

Without considering the headaches and insomnia that university gave me in this exams session, due to the overwork I did, I'm here to tell you about one of our 4 projects of this semester that we successfully delivered, the Intelligent systems and Robotics laboratory's one.
Me and my group have chosen this course and put it in our study plan because seemed something we could have fun with. In the project we basically learnt python 3 and it's OOP paradigm, V-REP and other robotic simulation tool and we also made a little written exam on Prolog: a very particular language that I hate from the deep of my heart.
So when the time of chosing a project arrived, I tried to join my knowledge of arduino with all the things we did in the course in order to build something to deliver that could follow the project's requirements of the course.

You can find all the developed code in [my repo](https://github.com/giacomocerquone/robotics-MazeSolver).

## Where everything started

Everything started from [this video](https://www.youtube.com/watch?v=mJV-KDqHgDQ&t=36s) I stepped on.
At the end of it, me and my teammate Gianluca, were too enthusiastic about the idea of creating a robot like that... so we went for it. We decided to go with arduino, a board that I've already used in the past, and we bought [this car kit](https://www.amazon.it/Elegoo-Ultrasuoni-Bluetooth-Intelligente-Educativo/dp/B01MCWZQJX/ref=sr_1_1_sspa?ie=UTF8&qid=1519259214&sr=8-1-spons&keywords=arduino+car+kit&psc=1) on Amazon to have something to start with.

## What did we use? (aka what do you need?)

There is an "as known as" in this paragraph's title for a specific reason. **This is not a guide to build the car we built**, as I always said, this is just a blog where I talk about my projects, my hobbies and my accomplishments. I always like to share what I do, but this time I didn't have the necessary time to write down the steps done to get the stuff working. For example all the raspberry configuration and the installation of: mate, pyswip for prolog, ROS, arduino_rosserial, couchdb and tons of other stuff, haven't been an easy task. Of course I'll leave you some resources where I got some hints but the rest is up to you.

Lets go to the list of the stuff we used:

1. An Arduino carkit that includes lots of stuff as you can see in the link I put above
2. A Raspberry
3. A PowerBank to power the Raspberry
4. A Buzzer and a resistor to play some notes

## Building the car

We started with building physically the car. Some pics follow:

<!-- <div id="gallery">
  [{% asset_img Robot1.jpg Robot1 %}](Robot1.jpg)
  [{% asset_img Robot2.jpg Robot2 %}](Robot2.jpg)
  [{% asset_img Robot3.jpg Robot3 %}](Robot3.jpg)
  [{% asset_img Robot4.jpg Robot4 %}](Robot4.jpg)
  [{% asset_img Robot5.jpg Robot5 %}](Robot5.jpg)
  [{% asset_img Robot6.jpg Robot6 %}](Robot6.jpg)
</div> -->

## Coding

Then I decided to go straight to the arduino code leaving at the end the Python ROS code of Raspberry.
So here I was trying to set up properly the sensors:

<iframe width="560" height="315" src="https://www.youtube.com/embed/RjgZcfa6AfQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

And here me and Gianluca could finally make the 90° curves work (this was the hardest part because we stressed the architecture of this car considering that performing 90° curves with only three sensors and a 4 wheel car is not an easy task honestly).

<iframe width="560" height="315" src="https://www.youtube.com/embed/GIVsGJr5Ixo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Then we took this code we written in arduino and we splitted the logic into multiple functions. I setup a ROS node on it (through the rosserial_arduino library) and we made publish the Arduino node the sensors reading and subscribed to some raspberry's call for those splitted functions.
So we setup a ROS node on the Raspberry too using the official ros library in Python and subscribed to arduino in order to get sensors reading and to publish signals in order to make the arduino execute those splitted functions.
This isn't the best approach. It would have been better to build directly all the code in python on the Raspberry, but for lack of time, as I say in the conclusion on this article, we ended up doing this.

### And this is the final result:

<iframe width="560" height="315" src="https://www.youtube.com/embed/1q4MwfDBh3s" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

_Curiosity: the way we resolved the "maze" is the same of the first video we saw. It's basically a depth first visit of a tree, from left to right (so we give precedence to a left turn if we have one, otherwise we go straight, otherwise we turn right)._

## Problems

For all of you that are thinking to build this thing (or a similar one), I'd tell you to not buy our kit. We’ve been very limited to the intrinsic structure of our car and here I collect the three main problems we encountered.

- Our vehicle has 4 wheels and having bought it as a kit, we couldn’t in any way adjust it to use just 2 of them like in the V-REP simulation.
  Why 2 wheels are better? Because rotating in the curves with two wheels, let you rotate without going to touch any new black line with the sensors.
- The grip of the wheels, sometimes, is missing (even on the board, where the surface is somehow rough) because it’s actually a problem of weight balance on the machine.
- There are only three sensors on the car and this limited us a lot! The algorithm to handle this situation wouldn’t have been so complicated if we had 2 more sensors.

To solve all these problems we came up with an algorithm full of timers and this is the reason why you see it a little bit glitchy during the run on the path.

## Resources

Some useful resources about ROS and the configuration of the raspberry follow:

- [Introrobotics ROS tutorials collection](https://www.intorobotics.com/ros-tutorials-start-working-arduino-raspberry-pi/) for arduino and raspberry
- [rosserial_arduino official tutorials](http://wiki.ros.org/rosserial_arduino/Tutorials) to understand how works with ROS in Arduino
- [Python and C++ official ROS tutorials](http://wiki.ros.org/ROS/Tutorials)
- [Set a persistent name for arduino](http://hintshop.ludvig.co.nz/show/persistent-names-usb-serial-devices/) connected via USB to a linux machine

## Conclusion

I hope you liked this little robot-boy. In general, as always, we could have done better than this. Especially the ROS python code could have been improved a lot. Sadly I had too much stuff going on and I had to close this project soon, so this is what we accomplished at the end... not too bad I'd say.

See ya in the next one!
