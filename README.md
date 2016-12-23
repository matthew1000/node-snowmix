# node-snowmix

*node-snowmix* is a Node.JS library for the excellent [Snowmix](http://snowmix.sourceforge.net/) video mixer.

## Installation

* This library has been tested on MacOS and Linux
* Snowmix must be [downloaded & installed](http://snowmix.sourceforge.net/Intro/compileandinstall.html)
* The gstreamer command-line, version 1.x, is also required. (Install this via your package manager.)
* Node.JS must be version 6 or higher
* Install node-snowmix using npm:

```shell
$ npm i --save node-snowmix
```

## Introduction

Snowmix is a powerful video and audio mixer. This library helps you control Snowmix, and provides methods that make it easy to do common tasks, such as switching video and adding text.

Support is currently limited to the following Snowmix concepts: feeds, vfeeds (virtual feeds), audio feeds, and texts.  Other things (e.g. images) can still be handled by sending the relevant Tcl commands.

This library does not currently help with the initial configuration of Snowmix, or with controlling the (gstreamer) inputs and outputs.

## Usage

`node-snowmix` is a class that needs instantiating.

```js
let Snowmix = require('node-snowmix'),
    snowmix = Snowmix.new()
```

`port` and `host` can be optionally provided, to override the defaults (which are `9999` and `127.0.0.1`, respectively), e.g.

```js
snowmix = Snowmix.new({ port: 1234 })
```

(Multiple Snowmix instances can be created you are running multiple Snowmixes on different ports/hosts. If the same host/port is requested multiple times, the same `Snowmix` instance is supplied to prevent multiple identical connections.)

Snowmix is controlled by (a range of commands)[http://snowmix.sourceforge.net/Documentation/reserved.html].
Use this library to send any Snowmix command with `sendCommand()`:

```js
snowmix.connect()
.then(() => {
    return snowmix.sendCommand('system geometry')
})
.then(response => {
    console.log('System geometry response:', response)
    return snowmix.close()
})
```

However, the real benefit comes when you use the helper functions, which make it easier to provide parameters and understand Snowmix's response. Fore example, geometry can be fetched with:

```js
snowmix.general.systemGeometry()
.then(geometry => {
    console.log(`The system width is ${geometry.width} and height is ${geometry.height}`)
})
```

Helper functions around video, audio and text overlays are available, and summarised below.

## Video control

In an OO style, Video feeds, and virtual feeds, are given instances of the 'Feed' and 'Vfeed' class (respectively).
These are automatically populated when this library first connects to Snowmix.

Access feeds by ID using `snowmix.feeds.byId(<ID NUMBER>)`
And likewise, vfeeds with `snowmix.vfeeds.byId(<ID NUMBER>)`

All feeds can be accessed with `snowmix.feeds.all()`, and the same for `vfeed`. For example, to see how many vfeeds there are:

```js
snowmix.connect()
.then(() => {
    console.log(`There are ${snowmix.vfeeds.all().length} vfeeds.`)
})
```

To switch to a vfeed (and only that vfeed), use `switch()`:

```js
snowmix.vfeeds.byId(1).switch()
.then(() => { console.log('Happy watching!') })
```

This is plain video switching - full-screen switching, nothing more.
It is hoped to offer more powerful video switching, such as picture-in-picture, in the future.
(In the mean time, you can use `sendCommand()` to access all of Snowmix's abilities.)

## Audio control

As with video, switch to an audio source using `switch()` on the relevant `AudioFeed` instance:

```js
snowmix.audioFeeds.byId(1).switch()
.then(() => { ... })
```

It is hoped to offer more flexible offers (e.g. volume control) in the future. Until then, if you need it, please raise an Issue, address with a pull request, or work around with `sendCommand()`.

## Text

To overlay text on your video:

```js
var myText1 = snowmix.texts.add({ string: 'Snowmix is great!' })
myText1.applyAndShow()
.then(() => { ... })
```

By default, text will be shown in the bottom-left, black on a translucent grey background.

All fields can be overridden, such as `x` and `y` (to set the location) and `location` (which can be one of `ne`, `nw`, `se`, ```sw```).

## Full Documentation

Is available (here)[./doc/doc.md]

## Further examples...

...can be found in the (examples/)[./examples/] directory.

## Debugging

To see the commands sent and responses received from Snowmix, and gstreamer, set the ```LOG_LEVEL``` environment variable to ```debug```:

```bash
export LOG_LEVEL=debug
```

(Or for even more, set to `silly`.)

## Conclusions, Contributions, Feedback

It is hoped that this library hits the sweet-spot between simplicity (helper functions that get you off the ground quickly) and flexibility (access to Snowmix's commands directly).

Feedback welcome via 'Issues'. Contributions (pull requests) also very welcome.
