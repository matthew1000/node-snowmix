This tutorial assumes you've completed *tutorial 1* and that you already have Snowmix running and a couple of inputs.
You can double-check this by running:

    node-snowmix/examples/list-feeds.js

## STEP 1: Create audio inputs

Audio inputs are called *audio feeds*.
Let's make two so we can switch between them:

    node-snowmix/examples/create-audiofeed.js
    node-snowmix/examples/create-audiofeed.js


## STEP 2: Create an audio mixer and audio sink

An audio mixer lets you switch/mix audiofeeds.
An audio sink lets the audio be joined with the video.
You'll almost always need exactly one of each.

    node-snowmix/examples/create-audiomixer.js
    node-snowmix/examples/create-audiosink.js

## STEP 3:
