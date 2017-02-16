#!/bin/bash
if [ $# != 2 ] ; then
    echo "Two parameters required: <video feed id> <full path to filename>"
    exit
fi

if [ "X$SNOWMIX_PORT" = X ] ; then export SNOWMIX_PORT=9999 ;fi
if [ "X$SNOWMIX_IP" = X ] ; then export SNOWMIX_IP=127.0.0.1 ;fi

FEED_NUM=$1
FILENAME=$2
audio_feed_id=$FEED_NUM
CONTROL_PIPE=/tmp/feed-${FEED_NUM}-control-pipe
width=1024
height=576
framerate='24/1'
gstlaunch=gst-launch-1.0
DECODEBIN=decodebin
MIXERFORMAT='video/x-raw, format=BGRA, pixel-aspect-ratio=1/1, interlace-mode=progressive'
SCALENRATE='videoconvert ! videorate ! videoscale ! videoconvert'
SRC="uridecodebin uri=file://$FILENAME name=decoder"

SHMSIZE='shm-size='`echo "$width * $height * 4 * 22"|bc`
SHMOPTION="wait-for-connection=0 sync=true"
SHMSINK1="shmsink socket-path=$CONTROL_PIPE $SHMSIZE $SHMOPTION"
AUDIOFORMAT="audio/x-raw,format=S16LE,layout=interleaved,rate=44100,channels=2"

echo ====
echo Feed ID: $FEED_NUM
echo Filename: $FILENAME
echo Control pipe: $CONTROL_PIPE
echo ====

# Test locally (video only)
#SHMSINK1=autovideosink

while true ; do
    # Remove the named pipe if it exist
    rm -f $CONTROL_PIPE
	  (
	    echo 'audio feed ctr isaudio '$audio_feed_id
 	    $gstlaunch -v \
		$SRC				!\
        $SCALENRATE     !\
        "$MIXERFORMAT,framerate=$framerate, width=$width, height=$height"    !\
		queue ! $SHMSINK1 decoder.	!\
		queue ! audioconvert		!\
		audioresample ! $AUDIOFORMAT	!\
		fdsink fd=3 sync=true 3>&1 1>&2
	  ) | nc $SNOWMIX_IP $SNOWMIX_PORT
    sleep 2
done
exit
