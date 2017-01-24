## Classes

<dl>
<dt><a href="#Snowmix">Snowmix</a></dt>
<dd><p>The main Snowmix class. Use snowmix.new() to construct.</p>
</dd>
<dt><a href="#AudioFeed">AudioFeed</a> ⇐ <code><a href="#SnowmixItem">SnowmixItem</a></code></dt>
<dd><p>An single audio feed. Use AudioFeeds to create and delete.</p>
</dd>
<dt><a href="#AudioFeeds">AudioFeeds</a></dt>
<dd><p>Handles all audio feeds</p>
</dd>
<dt><a href="#AudioMixer">AudioMixer</a></dt>
<dd><p>An single audio mixer. Use <code>AudioMixers</code> to create and delete.
An audio mixer allows audio feeds to be mixed together, and then sent to
an AudioSink for output. You probably only have the need for one audio mixer.</p>
</dd>
<dt><a href="#AudioMixers">AudioMixers</a></dt>
<dd><p>Handles all audio mixers</p>
</dd>
<dt><a href="#AudioSink">AudioSink</a></dt>
<dd><p>An single audio sink</p>
</dd>
<dt><a href="#AudioSinks">AudioSinks</a></dt>
<dd><p>Handles all audio sinks</p>
</dd>
<dt><a href="#SnowmixCommands">SnowmixCommands</a></dt>
<dd><p>snowmix.commands - handles the manipulation of Snowmix commands (aka functions)</p>
</dd>
<dt><a href="#Feed">Feed</a></dt>
<dd><p>A single video feed (not to be confused with a vfeed - virtual video feed).
Feeds can be discovered and created with the Feeds class.</p>
</dd>
<dt><a href="#Feeds">Feeds</a></dt>
<dd><p>Handles video feeds
(Not to be confused with Vfeeds, which are <em>virtual</em> video feeds.)</p>
</dd>
<dt><a href="#General">General</a></dt>
<dd><p>Handles the General commands: <a href="https://sourceforge.net/p/snowmix/wiki/Reference%20General/">https://sourceforge.net/p/snowmix/wiki/Reference%20General/</a></p>
</dd>
<dt><a href="#SnowmixItem">SnowmixItem</a></dt>
<dd><p>Abstract superclass for a Snowmix item.
(Feed, Vfeed, Text, AudioMixer, and the rest.)</p>
</dd>
<dt><a href="#SnowmixItemCollection">SnowmixItemCollection</a></dt>
<dd></dd>
<dt><a href="#SystemInfo">SystemInfo</a></dt>
<dd><p>Stores the contents of the &#39;system info&#39; command.
includes <code>systemGeometry</code>, verbose, hostAllow, systemName
For the full list, run <code>examples/system-info.js</code></p>
</dd>
<dt><a href="#Text">Text</a></dt>
<dd><p>A Text object (that can be placed on a video).</p>
</dd>
<dt><a href="#Texts">Texts</a></dt>
<dd><p>Handles all texts</p>
</dd>
<dt><a href="#Vfeed">Vfeed</a></dt>
<dd><p>A virtual video feed</p>
</dd>
<dt><a href="#Vfeeds">Vfeeds</a> ⇐ <code><a href="#SnowmixItemCollection">SnowmixItemCollection</a></code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#new">new()</a></dt>
<dd><p>Snowmix Constructor.
Ensures the same instance is used for each host/port</p>
<p>Optional arguments as object: port, host</p>
</dd>
</dl>

<a name="Snowmix"></a>

## Snowmix
The main Snowmix class. Use snowmix.new() to construct.

**Kind**: global class  

* [Snowmix](#Snowmix)
    * [.connect()](#Snowmix+connect)
    * [.close()](#Snowmix+close)
    * [.populate()](#Snowmix+populate)
    * [.sendCommand(commands, arguments)](#Snowmix+sendCommand)

<a name="Snowmix+connect"></a>

### snowmix.connect()
Connect to Snowmix

**Kind**: instance method of <code>[Snowmix](#Snowmix)</code>  
**Example**  
```js
snowmix.connect().then(() => { snowmix.sendCommand(...) }
```
<a name="Snowmix+close"></a>

### snowmix.close()
Close the connection to Snowmix. (Does not stop Snowmix.)

**Kind**: instance method of <code>[Snowmix](#Snowmix)</code>  
**Example**  
```js
snowmix.close().then(() => { console.log('All done') })
```
<a name="Snowmix+populate"></a>

### snowmix.populate()
Populates the information known about feeds, virtual feeds and texts from Snowmix.

**Kind**: instance method of <code>[Snowmix](#Snowmix)</code>  
<a name="Snowmix+sendCommand"></a>

### snowmix.sendCommand(commands, arguments)
Send a command, or array of commands, to Snowmix.
Optional arguments:
  set 'expectResponse' to false if no response is expected.
   (note very few don't set a response when in verbose mode, which this library enables automatically)
  set 'expectMultiline' to true if the command returns multiple lines
   (if not set, some lines may be missed)

**Kind**: instance method of <code>[Snowmix](#Snowmix)</code>  

| Param | Type |
| --- | --- |
| commands | <code>string_or_array</code> | 
| arguments | <code>object</code> | 

<a name="AudioFeed"></a>

## AudioFeed ⇐ <code>[SnowmixItem](#SnowmixItem)</code>
An single audio feed. Use AudioFeeds to create and delete.

**Kind**: global class  
**Extends:** <code>[SnowmixItem](#SnowmixItem)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>integer</code> |  |
| name | <code>string</code> |  |
| state | <code>string</code> |  |
| channels | <code>integer</code> |  |
| muted | <code>boolean</code> |  |
| rate |  |  |
| delay |  |  |
| queues |  |  |
| bufferSize |  |  |
| bytePerSample |  |  |
| signess | <code>string</code> | (signed | unsigned | float) |


* [AudioFeed](#AudioFeed) ⇐ <code>[SnowmixItem](#SnowmixItem)</code>
    * [.remove()](#AudioFeed+remove) ⇒ <code>Promise</code>
    * [.assign(new, track)](#SnowmixItem+assign)

<a name="AudioFeed+remove"></a>

### audioFeed.remove() ⇒ <code>Promise</code>
Remove this audioFeed from Snowmix

**Kind**: instance method of <code>[AudioFeed](#AudioFeed)</code>  
<a name="SnowmixItem+assign"></a>

### audioFeed.assign(new, track)
Assign values to this item

**Kind**: instance method of <code>[AudioFeed](#AudioFeed)</code>  

| Param | Type | Description |
| --- | --- | --- |
| new | <code>Object</code> | values |
| track | <code>Boolean</code> | changes? Defaults to false, if true,sets changed=true if change found. |

<a name="AudioFeeds"></a>

## AudioFeeds
Handles all audio feeds

**Kind**: global class  
<a name="AudioFeeds+add"></a>

### audioFeeds.add(containing)
Add a new audio feed.
Of, if an audio feed of the specified ID is provided, updates it.

**Kind**: instance method of <code>[AudioFeeds](#AudioFeeds)</code>  

| Param | Type | Description |
| --- | --- | --- |
| containing | <code>object</code> | 'name' (required) and 'id' (optional) If omitted, id will be next highest value. |

<a name="AudioMixer"></a>

## AudioMixer
An single audio mixer. Use `AudioMixers` to create and delete.
An audio mixer allows audio feeds to be mixed together, and then sent to
an AudioSink for output. You probably only have the need for one audio mixer.

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

<a name="AudioMixers"></a>

## AudioMixers
Handles all audio mixers

**Kind**: global class  
<a name="AudioMixers+add"></a>

### audioMixers.add(containing)
Add a new audio mixer.
Of, if an audio mixer of the specified ID is provided, updates it.

**Kind**: instance method of <code>[AudioMixers](#AudioMixers)</code>  

| Param | Type | Description |
| --- | --- | --- |
| containing | <code>object</code> | 'name' (required) and 'id' (optional) If omitted, id will be next highest value. |

<a name="AudioSink"></a>

## AudioSink
An single audio sink

**Kind**: global class  

* [AudioSink](#AudioSink)
    * [.remove()](#AudioSink+remove) ⇒ <code>Promise</code>
    * [.addAudioMixer(audioMixer)](#AudioSink+addAudioMixer) ⇒ <code>Promise</code>

<a name="AudioSink+remove"></a>

### audioSink.remove() ⇒ <code>Promise</code>
Remove this audioSink from Snowmix

**Kind**: instance method of <code>[AudioSink](#AudioSink)</code>  
<a name="AudioSink+addAudioMixer"></a>

### audioSink.addAudioMixer(audioMixer) ⇒ <code>Promise</code>
Add an audioMixer to this sink

**Kind**: instance method of <code>[AudioSink](#AudioSink)</code>  

| Param | Type | Description |
| --- | --- | --- |
| audioMixer | <code>Integer</code> | ID |

<a name="AudioSinks"></a>

## AudioSinks
Handles all audio sinks

**Kind**: global class  
<a name="AudioSinks+add"></a>

### audioSinks.add(containing)
Add a new audio sink.
Of, if an audio sink of the specified ID is provided, updates it.

**Kind**: instance method of <code>[AudioSinks](#AudioSinks)</code>  

| Param | Type | Description |
| --- | --- | --- |
| containing | <code>object</code> | 'name' (required) and 'id' (optional) If omitted, id will be next highest value. |

<a name="SnowmixCommands"></a>

## SnowmixCommands
snowmix.commands - handles the manipulation of Snowmix commands (aka functions)

**Kind**: global class  

* [SnowmixCommands](#SnowmixCommands)
    * [.listAll()](#SnowmixCommands+listAll) ⇒ <code>Array</code>
    * [.list(commandName)](#SnowmixCommands+list) ⇒ <code>Promise</code>
    * [.create(commandName, Lines)](#SnowmixCommands+create) ⇒ <code>Promise</code>
    * [.delete(commandName)](#SnowmixCommands+delete) ⇒ <code>Promise</code>
    * [.updateShowCommand()](#SnowmixCommands+updateShowCommand) ⇒ <code>Promise</code>
    * [.resetShowCommand()](#SnowmixCommands+resetShowCommand) ⇒ <code>Promise</code>

<a name="SnowmixCommands+listAll"></a>

### snowmixCommands.listAll() ⇒ <code>Array</code>
Get the name of all commands

**Kind**: instance method of <code>[SnowmixCommands](#SnowmixCommands)</code>  
**Returns**: <code>Array</code> - of strings  
**Example**  
```js
snowmix.commands.listAll().then(arrayOfCommmandNames => { ... })
```
<a name="SnowmixCommands+list"></a>

### snowmixCommands.list(commandName) ⇒ <code>Promise</code>
List the lines of a command

**Kind**: instance method of <code>[SnowmixCommands](#SnowmixCommands)</code>  
**Returns**: <code>Promise</code> - of an array where the first entry is always undefined.
If the command does not exist, returns undefined.
If the command has no contents, returns [undefined]  

| Param | Type |
| --- | --- |
| commandName | <code>String</code> | 

**Example**  
```js
snowmix.commands.list('Show').then(arrayOfLines => { ... })
```
<a name="SnowmixCommands+create"></a>

### snowmixCommands.create(commandName, Lines) ⇒ <code>Promise</code>
Create a command. Replaces any that already exist with this name.

**Kind**: instance method of <code>[SnowmixCommands](#SnowmixCommands)</code>  

| Param | Type | Description |
| --- | --- | --- |
| commandName | <code>String</code> |  |
| Lines | <code>Array</code> | for command |

<a name="SnowmixCommands+delete"></a>

### snowmixCommands.delete(commandName) ⇒ <code>Promise</code>
Delete a command
Note if the command does not exist it will create a warning
(due to Snowmix's way of not responding unless it cannot be found)

**Kind**: instance method of <code>[SnowmixCommands](#SnowmixCommands)</code>  

| Param | Type |
| --- | --- |
| commandName | <code>String</code> | 

<a name="SnowmixCommands+updateShowCommand"></a>

### snowmixCommands.updateShowCommand() ⇒ <code>Promise</code>
updates the 'Show' Snowmix command to contain the relevant overlay commands

**Kind**: instance method of <code>[SnowmixCommands](#SnowmixCommands)</code>  
<a name="SnowmixCommands+resetShowCommand"></a>

### snowmixCommands.resetShowCommand() ⇒ <code>Promise</code>
Resets the Show command to containing nothing apart from the essential 'loop'

**Kind**: instance method of <code>[SnowmixCommands](#SnowmixCommands)</code>  
<a name="Feed"></a>

## Feed
A single video feed (not to be confused with a vfeed - virtual video feed).
Feeds can be discovered and created with the Feeds class.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>integer</code> | Unique ID. Feed 0 is a special internal feed. |
| name | <code>string</code> |  |
| state | <code>string</code> | e.g. 'STALLED' or 'PENDING' |
| geometry | <code>array</code> | [x,y] |
| live | <code>boolean</code> |  |
| offset | <code>integer</code> |  |
| socket | <code>string</code> |  |
| frames | <code>integer</code> |  |
| dropped | <code>integer</code> |  |
| missed | <code>integer</code> |  |


* [Feed](#Feed)
    * [.getVirtualFeedsUsingThisFeed()](#Feed+getVirtualFeedsUsingThisFeed) ⇒ <code>Array</code>
    * [.getOrMakePrimaryVfeed()](#Feed+getOrMakePrimaryVfeed) ⇒ <code>Promise</code>
    * [.switch()](#Feed+switch) ⇒ <code>Promise</code>

<a name="Feed+getVirtualFeedsUsingThisFeed"></a>

### feed.getVirtualFeedsUsingThisFeed() ⇒ <code>Array</code>
**Kind**: instance method of <code>[Feed](#Feed)</code>  
**Returns**: <code>Array</code> - of Vfeed objects  
<a name="Feed+getOrMakePrimaryVfeed"></a>

### feed.getOrMakePrimaryVfeed() ⇒ <code>Promise</code>
Finds, and if it can't be found makes, a 'primary' virtual feed for this video feed,
i.e. one that is full-screen.

**Kind**: instance method of <code>[Feed](#Feed)</code>  
<a name="Feed+switch"></a>

### feed.switch() ⇒ <code>Promise</code>
Switch the output to this feed.

**Kind**: instance method of <code>[Feed](#Feed)</code>  
<a name="Feeds"></a>

## Feeds
Handles video feeds
(Not to be confused with Vfeeds, which are _virtual_ video feeds.)

**Kind**: global class  

* [Feeds](#Feeds)
    * [.byId(ID)](#Feeds+byId) ⇒ <code>[Feed](#Feed)</code>
    * [.add(containing)](#Feeds+add) ⇒ <code>[Feed](#Feed)</code>

<a name="Feeds+byId"></a>

### feeds.byId(ID) ⇒ <code>[Feed](#Feed)</code>
Get a feed by ID

**Kind**: instance method of <code>[Feeds](#Feeds)</code>  
**Returns**: <code>[Feed](#Feed)</code> - object  

| Param | Type |
| --- | --- |
| ID | <code>integer</code> | 

<a name="Feeds+add"></a>

### feeds.add(containing) ⇒ <code>[Feed](#Feed)</code>
Add a new (video) feed, for when you have a new video source
Or, if a video feed of the specified ID is provided, updates it.

**Kind**: instance method of <code>[Feeds](#Feeds)</code>  
**Returns**: <code>[Feed](#Feed)</code> - object  

| Param | Type | Description |
| --- | --- | --- |
| containing | <code>object</code> | 'name' (required) and 'id' (optional) If omitted, id will be next highest value. |

<a name="General"></a>

## General
Handles the General commands: https://sourceforge.net/p/snowmix/wiki/Reference%20General/

**Kind**: global class  
<a name="SnowmixItem"></a>

## SnowmixItem
Abstract superclass for a Snowmix item.
(Feed, Vfeed, Text, AudioMixer, and the rest.)

**Kind**: global class  
<a name="SnowmixItem+assign"></a>

### snowmixItem.assign(new, track)
Assign values to this item

**Kind**: instance method of <code>[SnowmixItem](#SnowmixItem)</code>  

| Param | Type | Description |
| --- | --- | --- |
| new | <code>Object</code> | values |
| track | <code>Boolean</code> | changes? Defaults to false, if true,sets changed=true if change found. |

<a name="SnowmixItemCollection"></a>

## SnowmixItemCollection
**Kind**: global class  

* [SnowmixItemCollection](#SnowmixItemCollection)
    * [.all()](#SnowmixItemCollection+all) ⇒ <code>array</code>
    * [.allIds()](#SnowmixItemCollection+allIds) ⇒ <code>array</code>
    * [.byId(id)](#SnowmixItemCollection+byId) ⇒
    * [.removeAll()](#SnowmixItemCollection+removeAll)

<a name="SnowmixItemCollection+all"></a>

### feeds
Abstract superclass for a collection of one type of Snowmix item
(Feed, Vfeed, Text, AudioMixer, and the rest.).all() ⇒ <code>array</code>
Returns all

**Kind**: instance method of <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>  
<a name="SnowmixItemCollection+allIds"></a>

### feeds
Abstract superclass for a collection of one type of Snowmix item
(Feed, Vfeed, Text, AudioMixer, and the rest.).allIds() ⇒ <code>array</code>
Returns all IDs

**Kind**: instance method of <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>  
**Returns**: <code>array</code> - - IDs as integers  
<a name="SnowmixItemCollection+byId"></a>

### feeds
Abstract superclass for a collection of one type of Snowmix item
(Feed, Vfeed, Text, AudioMixer, and the rest.).byId(id) ⇒
Get by ID

**Kind**: instance method of <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>  
**Returns**: - object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>integer</code> | ID |

<a name="SnowmixItemCollection+removeAll"></a>

### feeds
Abstract superclass for a collection of one type of Snowmix item
(Feed, Vfeed, Text, AudioMixer, and the rest.).removeAll()
Remove all

**Kind**: instance method of <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>  
**Fulfill**: <code>undefined</code>  
<a name="SystemInfo"></a>

## SystemInfo
Stores the contents of the 'system info' command.
includes `systemGeometry`, verbose, hostAllow, systemName
For the full list, run `examples/system-info.js`

**Kind**: global class  
<a name="SystemInfo+populate"></a>

### systemInfo.populate()
Populates this object by running 'system info'
Done automatically on connection, so should not need running again.

**Kind**: instance method of <code>[SystemInfo](#SystemInfo)</code>  
**Example**  
```js
snowmix.systemInfo.populate().then( => { ... })
```
<a name="Text"></a>

## Text
A Text object (that can be placed on a video).

**Kind**: global class  
**Properties**

| Name | Type |
| --- | --- |
| id | <code>integer</code> | 
| string | <code>integer</code> | 
| fontId | <code>integer</code> | 
| anchor |  | 
| offset |  | 


* [Text](#Text)
    * [.applyAndShow()](#Text+applyAndShow)
    * [.apply()](#Text+apply) ⇒ <code>Promise</code>
    * [.show()](#Text+show) ⇒ <code>Promise</code>
    * [.hide()](#Text+hide) ⇒ <code>Promise</code>
    * [.commandsExceptStringCommand()](#Text+commandsExceptStringCommand)

<a name="Text+applyAndShow"></a>

### text.applyAndShow()
Inform Snowmix of the current settings, and then ensure it's visible.

**Kind**: instance method of <code>[Text](#Text)</code>  
<a name="Text+apply"></a>

### text.apply() ⇒ <code>Promise</code>
Inform Snowmix of the current settings.
Does not show or hide it (for that, use show() or hide())

**Kind**: instance method of <code>[Text](#Text)</code>  
<a name="Text+show"></a>

### text.show() ⇒ <code>Promise</code>
Shows the text. If already showing, does nothing.

**Kind**: instance method of <code>[Text](#Text)</code>  
<a name="Text+hide"></a>

### text.hide() ⇒ <code>Promise</code>
Hides the text. If already hiding, does nothing.

**Kind**: instance method of <code>[Text](#Text)</code>  
<a name="Text+commandsExceptStringCommand"></a>

### text.commandsExceptStringCommand()
Return all commands except the 'string' command.
This is becuase Snowmix responds differently to the string and other commands

**Kind**: instance method of <code>[Text](#Text)</code>  
<a name="Texts"></a>

## Texts
Handles all texts

**Kind**: global class  

* [Texts](#Texts)
    * [.getShowingIds()](#Texts+getShowingIds) ⇒ <code>array</code>
    * [.add(containing)](#Texts+add) ⇒ <code>Promise</code>

<a name="Texts+getShowingIds"></a>

### texts.getShowingIds() ⇒ <code>array</code>
Returns the IDs of all Texts that are showing (visible).

**Kind**: instance method of <code>[Texts](#Texts)</code>  
<a name="Texts+add"></a>

### texts.add(containing) ⇒ <code>Promise</code>
Add a new text, or update an existing one if the ID exists.

**Kind**: instance method of <code>[Texts](#Texts)</code>  
**Returns**: <code>Promise</code> - returning the created Text object  

| Param | Type | Description |
| --- | --- | --- |
| containing | <code>object</code> | 'string' (required) and 'id' (optional) If omitted, id will be next highest value. |

<a name="Vfeed"></a>

## Vfeed
A virtual video feed

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>integer</code> |  |
| name | <code>string</code> |  |
| state | <code>string</code> |  |
| source | <code>string</code> | 'feed' or 'image' |
| sourceId | <code>integer</code> | of the feed or image |
| coors | <code>array</code> | [x,y] |
| geometry | <code>array</code> | [x,y] |
| scale |  |  |
| clipCoordinates |  |  |
| clipGeometry |  |  |
| rotation |  |  |
| alpha |  |  |
| filter |  |  |


* [Vfeed](#Vfeed)
    * [.getFeed()](#Vfeed+getFeed) ⇒ <code>[Feed](#Feed)</code>
    * [.remove()](#Vfeed+remove) ⇒ <code>Promise</code>
    * [.switch()](#Vfeed+switch) ⇒ <code>Promise</code>

<a name="Vfeed+getFeed"></a>

### vfeed.getFeed() ⇒ <code>[Feed](#Feed)</code>
Returns the feed object that this virtual feed is for

**Kind**: instance method of <code>[Vfeed](#Vfeed)</code>  
<a name="Vfeed+remove"></a>

### vfeed.remove() ⇒ <code>Promise</code>
Remove this vfeed from Snowmix

**Kind**: instance method of <code>[Vfeed](#Vfeed)</code>  
<a name="Vfeed+switch"></a>

### vfeed.switch() ⇒ <code>Promise</code>
Switch the output to this feed.

**Kind**: instance method of <code>[Vfeed](#Vfeed)</code>  
<a name="Vfeeds"></a>

## Vfeeds ⇐ <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>
**Kind**: global class  
**Extends:** <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>  

* [Vfeeds](#Vfeeds) ⇐ <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>
    * [.getShowingIds()](#Vfeeds+getShowingIds) ⇒ <code>array</code>
    * [.add(containing)](#Vfeeds+add) ⇒ <code>[Vfeed](#Vfeed)</code>
    * [.all()](#SnowmixItemCollection+all) ⇒ <code>array</code>
    * [.allIds()](#SnowmixItemCollection+allIds) ⇒ <code>array</code>
    * [.byId(id)](#SnowmixItemCollection+byId) ⇒
    * [.removeAll()](#SnowmixItemCollection+removeAll)

<a name="Vfeeds+getShowingIds"></a>

### vfeeds.getShowingIds() ⇒ <code>array</code>
Returns the IDs of all Vfeeds that are showing (visible).

**Kind**: instance method of <code>[Vfeeds](#Vfeeds)</code>  
<a name="Vfeeds+add"></a>

### vfeeds.add(containing) ⇒ <code>[Vfeed](#Vfeed)</code>
Add a new vfeed
Or, if a vfeed of the specified ID is provided, updates it.

**Kind**: instance method of <code>[Vfeeds](#Vfeeds)</code>  
**Returns**: <code>[Vfeed](#Vfeed)</code> - object  

| Param | Type | Description |
| --- | --- | --- |
| containing | <code>object</code> | source & sourceId (essential), name & id (optional) If omitted, id will be next highest value. |

<a name="SnowmixItemCollection+all"></a>

### vfeeds.all() ⇒ <code>array</code>
Returns all

**Kind**: instance method of <code>[Vfeeds](#Vfeeds)</code>  
<a name="SnowmixItemCollection+allIds"></a>

### vfeeds.allIds() ⇒ <code>array</code>
Returns all IDs

**Kind**: instance method of <code>[Vfeeds](#Vfeeds)</code>  
**Returns**: <code>array</code> - - IDs as integers  
<a name="SnowmixItemCollection+byId"></a>

### vfeeds.byId(id) ⇒
Get by ID

**Kind**: instance method of <code>[Vfeeds](#Vfeeds)</code>  
**Returns**: - object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>integer</code> | ID |

<a name="SnowmixItemCollection+removeAll"></a>

### vfeeds.removeAll()
Remove all

**Kind**: instance method of <code>[Vfeeds](#Vfeeds)</code>  
**Fulfill**: <code>undefined</code>  
<a name="new"></a>

## new()
Snowmix Constructor.
Ensures the same instance is used for each host/port

Optional arguments as object: port, host

**Kind**: global function  
**Example**  
```js
let snowmix = Snowmix.new()
```
**Example**  
```js
let snowmix = Snowmix.new({ port: 1234, host: 'example.com' })
```
