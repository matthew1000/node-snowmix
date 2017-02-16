#!/bin/bash
if [ $# != 2 ] ; then
    echo "Two parameters required: <video feed id> <full path to filename>"
    exit
fi

FEED_NUM=$1
FILENAME=$2
CONTROL_PIPE=/tmp/feed-${FEED_NUM}-control-pipe
width=1024
height=576
framerate='24/1'
gstlaunch=gst-launch-1.0
DECODEBIN=decodebin
MIXERFORMAT='video/x-raw, format=BGRA, pixel-aspect-ratio=1/1, interlace-mode=progressive'
SCALENRATE='videoconvert ! videorate ! videoscale ! videoconvert'
SRC="uridecodebin uri=file:///$FILENAME "
SHMSIZE='shm-size='`echo "$width * $height * 4 * 22"|bc`
SHMOPTION="wait-for-connection=0 sync=true"
SHMSINK1="shmsink socket-path=$CONTROL_PIPE $SHMSIZE $SHMOPTION"

echo ====
echo Feed ID: $FEED_NUM
echo Filename: $FILENAME
echo Control pipe: $CONTROL_PIPE
echo ====

# Test locally:
# SHMSINK1=autovideosink

while true ; do
    # Remove the named pipe if it exist
    rm -f $CONTROL_PIPE
    $gstlaunch -v   \
        $SRC            !\
        $SCALENRATE     !\
        "$MIXERFORMAT,framerate=$framerate, width=$width, height=$height"    !\
        $SHMSINK1
    sleep 2
done
exit
