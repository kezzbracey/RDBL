RDBL
====

A simple script to help you design "Readable First" responsive layouts.

###Demo

[http://thekezzforge.kezzbracey.com/RDBL/](http://thekezzforge.kezzbracey.com/RDBL/)

###Readable First - A Responsive Design Approach That Is:

* Device Agnostic
* Resolution Agnostic
* Content First

###Principles:

* Don't set a base font size, leave that to the browser / user agent. (Props to [The Goldilocks Approach](RDBL) for this concept).
* Build your design in ems / rems, allowing flexible layout that adjusts to the browser / user default font size.
* Enter dummy content at the start of the design process
* Use the RDBL widget to check for readability of said content then create breakpoints where the readability breaks.

###Usage

Please see the demo for how to load up the widget.

Note, the 'characters per line' value is estimated via the first paragraph tag in your target readable element.

###Note on Readability

The default range 'characters per line' range used is 63 - 81 characters, aiming for optimal readability in consideration of saccades (eye movements) per line and comfort for the eye.

This is based on the eye taking in an average of 7 - 9 characters per saccade, and targeting approximately nine saccades per line.

[http://en.wikipedia.org/wiki/Eye_movement_in_language_reading](http://en.wikipedia.org/wiki/Eye_movement_in_language_reading)

However this is a guideline and you can adjust to whatever you personally think is right.

###Firefox only

Right now only Firefox support all the stuff this does, so please use that.

###Credits

Thanks to Leon Gersen for the noUISlider: [http://refreshless.com/nouislider/](http://refreshless.com/nouislider/)
