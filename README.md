This project is about a timepicker widget for html web pages. Entering a date or a time with the keyboard is just not user-friendly. Most browsers support input elements of type date or time and show a nice widget to easily select a date or time, with the exception of Firefox. To support all major browsers including Firefox, we need to bring javascript plugins or addons for these widgets.

For entering a date, jQuery-UI provides for a nice datepicker, see: http://jqueryui.com/datepicker/ . 
Screenshot: 

![Screenshot of the jQuery-UI datepicker](/screenshots/jQueryUI_datepicker.jpg)

For entering a time, there are numerous javascript plugins, but all have inconveniences. Some are non-free, others are tied to frameworks like Angular or Bootstrap. I looked at the timepicker by Jonatas Walker, see: https://github.com/jonataswalker/timepicker.js . This one is lightweight and easy to use, but still has complexity. For example is it not possible to remove this widget from an element. By trying to trace this problem and find a fix, I found this very complex software, which probably means that I am not yet very experienced in javascript coding. 
Screenshot:

![Screenshot of Jonatas Walkers timepicker](/screenshots/JonatasWalker_timepicker.jpg)

Judging this a problem, I stumbled in some other inconveniences, like that the styling is much different from the jQuery-UI datepicker, and that you can only enter minutes that are multiples of 5.

When I started diving in the 800+ lines of javascript source code of this timepicker, I soon got the urge to try some coding myself. It took me only a couple of hours to come up with a completely new timepicker, which I am presenting in this project.

My timepicker has the following properties:

- even less code and much simpler code, presumably easier to understand by the novice javascript programmer

- styled more like the jQuery-UI datepicker, to be used together on the same web page

- implemented as a jQuery plugin (ok, not yet, but it should be easy to realise)

- shows choice buttons for either hours or minutes for easier user operation, inspired by the timepicker on Android

- selection of minutes that are multiples of 5, but also the minutes by simply adding four buttons for +1 to +4, this recognizes that most users need simple times as multiples of 5 minutes, but that someone who needs every minute, can do so with significantly less than 60 buttons

- easy to expand to support 24-hour times or AM/PM times, part of this is already implemented

- intelligent location: in principle right under the related input element, but if the timepicker would be partly out of the visible window, it is moved a bit to be completely in view

- in this project I include single-file stand-alone implementations that include a demo test page to make it easier to try it out and study the code

While I believe this is a great timepicker, I would like to get your feedback. Is this really useful? Could it be made better or easier? Can you implement the jQuery plugin version or AM/PM support faster than I do?
