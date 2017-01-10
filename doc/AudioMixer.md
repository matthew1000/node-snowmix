<a name="AudioMixer"></a>

## AudioMixer
An single audio mixer

**Kind**: global class  

* [AudioMixer](#AudioMixer)
    * [.remove()](#AudioMixer+remove) ⇒ <code>Promise</code>
    * [.start()](#AudioMixer+start) ⇒ <code>Promise</code>
    * [.addAudioFeed(audioFeed)](#AudioMixer+addAudioFeed) ⇒ <code>Promise</code>
    * [.unmuteAudioFeed(audioFeed)](#AudioMixer+unmuteAudioFeed) ⇒ <code>Promise</code>
    * [.muteAudioFeed(audioFeed)](#AudioMixer+muteAudioFeed) ⇒ <code>Promise</code>
    * [.switchToAudioFeeds(of)](#AudioMixer+switchToAudioFeeds) ⇒ <code>Promise</code>

<a name="AudioMixer+remove"></a>

### audioMixer.remove() ⇒ <code>Promise</code>
Remove this audioMixer from Snowmix

**Kind**: instance method of <code>[AudioMixer](#AudioMixer)</code>  
<a name="AudioMixer+start"></a>

### audioMixer.start() ⇒ <code>Promise</code>
Start the mixer. Will fail if there are no audioFeeds connecte
(which you can do with addAudioFeed() method.)

**Kind**: instance method of <code>[AudioMixer](#AudioMixer)</code>  
<a name="AudioMixer+addAudioFeed"></a>

### audioMixer.addAudioFeed(audioFeed) ⇒ <code>Promise</code>
Add an audioFeed to this mixer

**Kind**: instance method of <code>[AudioMixer](#AudioMixer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| audioFeed | <code>Integer</code> | ID |

<a name="AudioMixer+unmuteAudioFeed"></a>

### audioMixer.unmuteAudioFeed(audioFeed) ⇒ <code>Promise</code>
Unmute an audiofeed at this mixer

**Kind**: instance method of <code>[AudioMixer](#AudioMixer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| audioFeed | <code>Integer</code> | ID |

<a name="AudioMixer+muteAudioFeed"></a>

### audioMixer.muteAudioFeed(audioFeed) ⇒ <code>Promise</code>
Mute an audiofeed at this mixer

**Kind**: instance method of <code>[AudioMixer](#AudioMixer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| audioFeed | <code>Integer</code> | ID |

<a name="AudioMixer+switchToAudioFeeds"></a>

### audioMixer.switchToAudioFeeds(of) ⇒ <code>Promise</code>
Ensures the audioFeed(s) provided are the only ones that aren't muted

**Kind**: instance method of <code>[AudioMixer](#AudioMixer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| of | <code>Array</code> | audioFeed IDs |

