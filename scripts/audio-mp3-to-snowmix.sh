#!/bin/bash
if [ $# != 2 ] ; then
    echo "Two parameters required: <audio feed id> <full path to filename>"
    exit
fi

AUDIO_FEED=$1
FILENAME=$2

echo ====
echo Audio feed: $AUDIO_FEED
echo MP3 file: $FILENAME
echo ====

AUDIOFORMAT='audio/x-raw, format=S16LE, layout=interleaved'
gstlaunch=gst-launch-1.0
(
  echo "audio feed ctr isaudio $AUDIO_FEED\n"
  $gstlaunch -v uridecodebin uri="file://$FILENAME"  !\
        audioconvert !\
        audioresample !\
        $AUDIOFORMAT', rate=44100, channels=2' !\
    fdsink fd=3 sync=true 3>&1 1>&2
) | nc 127.0.0.1 9999
