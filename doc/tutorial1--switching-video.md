# Node-Snowmix Tutorial 1: Video

This is tutorial 1. It explains how to switch between two video sources.

You will need:

* A Mac or Linux machine
* Gstreamer installed (use your package manager)
* Node.JS v6 or higher installed (test with `node -v` or `nodejs -v`)
* Snowmix installed ([instructions here](http://snowmix.sourceforge.net/Intro/compileandinstall.html))
* node-snowmix installed (best way is to `npm init` then `npm -i node-snowmix` then find `node_modules` dir)
* Two mp4 video files, to act as inputs

## STEP 1: Create the simplest possible Snowmix config file containing:

    system control port 9999
    system geometry 1024 576 BGRA
    system frame rate 24
    system socket /tmp/mixer1

## STEP 2: Start Snowmix, passing the name of the config file as argument, e.g.

    snowmix snowmix.ini

You will need to leave Snowmix running, and switch to a second terminal window to continue.

## STEP 3: Create a feed (which allows video to be inputted):

Tell Snowmix you'd like a new video input feed with:

    node-snowmix/examples/feed-create.js

You can confirm feed exists with:

    node-snowmix/examples/feed-list.js

Your feed should have an ID of 1;
(Video feed 0 is a base feed in Snowmix and can be ignored.)

## STEP 4: Sending video into Snowmix

Snowmix requires inputs to be sent via a gstreamer shared memory space.
This library doesn't officially provide this. But if you're not a gstreamer expert,
some helper scripts are available in the [scripts/](../scripts/) directory.

Run it like this:

    node-snowmix/scripts/file-to-snowmix-no-audio.sh 1 <full path to MP4 video file>

Note, it really must be a full path, relative paths don't work!

The first parameter '1' refers to the ID of the feed and audio feed that we created above.

You'll need to leave this command running and continue in a different shell.

## STEP 5: Preview Snowmix output

Type:

    av_output2screen

(which is a command that Snowmix should have installed.)

However, you will have a blank screen and no sound!
We need to tell Snowmix to switch to the input we've provided.

## STEP 6: Show source 1

    node-snowmix/examples/video-switch.js 1

You should now see video. Horrah!

## STEP 7: Switching between sources

Repeat steps *3* and *5* to create a second source.

Now, switch between to this new source with:

    node-snowmix/examples/video-switch.js 2

And then back and forth as much as you like.

## Next steps

Audio! Move on to [tutorial 2](tutorial2--switching-audio.md)
