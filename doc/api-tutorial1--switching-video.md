Tutorial 1 starts snowmix and sets it up to have to video intputs

## STEP 1: Create the simplest possible Snowmix config file containing:

    system control port 9999
    system geometry 1024 576 BGRA
    system frame rate 24
    system socket /tmp/mixer1

## STEP 2: Start Snowmix, passing the name of the config file as argument, e.g.

    snowmix snowmix.ini

## STEP 3: Create a feed (which allows video to be inputted):

    node-snowmix/examples/create-feed.js

## STEP 4: You can confirm .t exists with the following:

    node-snowmix/examples/list-feeds.js

Your feed should have an ID of 1;
(Video feed 0 is a base feed in Snowmix and can be ignored.)

## STEP 5: Now send some video to this input feed we've made:

Snowmix requires inputs to be sent via a gstreamer shared memory space.
This library doesn't help with this part (yet!?!)

If you're not an expert at gstreamer, an example script that can run it for you is [here](https://gist.github.com/matthew1000/473685eaa61e37c3cc67986486a3c501).
Run it like this:

    file-to-snowmix-no-audio.sh 1 <full path to MP4 file>

Note, it really must be a full path, relative paths don't work!

The first parameter '1' refers to the ID of the feed and audio feed that we created above.

You'll need to leave this command running and continue in a different shell.

## STEP 6: Preview Snowmix output

Type:

    av_output2screen

(which is part of Snowmix.)

However, you will have a blank screen and no sound!
We need to tell Snowmix to switch to the input we've provided.

## STEP 7: Switch the video

    node-snowmix/examples/switch-video.js 1

You should now see video. Horrah!

## STEP 8: switching

Repeat steps *3* and *5* to create a second source.

Now, switch between to this new source with:

    node-snowmix/examples/switch-video.js 2

And then back and forth as much as you likewise

## Next steps

Audio! Move on to *tutorial 2*
