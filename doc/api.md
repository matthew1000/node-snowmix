## Classes

<dl>
<dt><a href="#Snowmix">Snowmix</a></dt>
<dd><p>The main Snowmix class. Use snowmix.new() to construct.</p>
</dd>
<dt><a href="#AudioFeed">AudioFeed</a> ⇐ <code><a href="#SnowmixItem">SnowmixItem</a></code></dt>
<dd><p>An single audio feed. Use AudioFeeds to create and delete.</p>
</dd>
<dt><a href="#AudioFeeds">AudioFeeds</a> ⇐ <code><a href="#SnowmixItemCollection">SnowmixItemCollection</a></code></dt>
<dd><p>A collection of all AudioFeeds</p>
</dd>
<dt><a href="#AudioMixer">AudioMixer</a> ⇐ <code><a href="#SnowmixItem">SnowmixItem</a></code></dt>
<dd><p>An single audio mixer. Use <code>AudioMixers</code> to create and delete.
An audio mixer allows audio feeds to be mixed together, and then sent to
an AudioSink for output. You probably only have the need for one audio mixer.</p>
</dd>
<dt><a href="#AudioMixers">AudioMixers</a> ⇐ <code><a href="#SnowmixItemCollection">SnowmixItemCollection</a></code></dt>
<dd><p>A collection of all AudioMixers. (Note: it&#39;s rare you need more than 1!)</p>
</dd>
<dt><a href="#AudioSink">AudioSink</a> ⇐ <code><a href="#SnowmixItem">SnowmixItem</a></code></dt>
<dd><p>An single audio sink</p>
</dd>
<dt><a href="#AudioSinks">AudioSinks</a> ⇐ <code><a href="#SnowmixItemCollection">SnowmixItemCollection</a></code></dt>
<dd><p>A collection of all AudioSinks. (Note: it&#39;s rare you need more than 1!)</p>
</dd>
<dt><a href="#SnowmixCommands">SnowmixCommands</a></dt>
<dd><p>snowmix.commands - handles the manipulation of Snowmix commands (aka functions)</p>
</dd>
<dt><a href="#Feed">Feed</a> ⇐ <code><a href="#SnowmixItem">SnowmixItem</a></code></dt>
<dd><p>A single video feed (not to be confused with a vfeed - virtual video feed).
Feeds can be discovered and created with the Feeds class.</p>
</dd>
<dt><a href="#Feeds">Feeds</a> ⇐ <code><a href="#SnowmixItemCollection">SnowmixItemCollection</a></code></dt>
<dd><p>A collection of all (video) Feeds.
(Not to be confused with Vfeeds, which are <em>virtual</em> video feeds.)</p>
</dd>
<dt><a href="#General">General</a></dt>
<dd><p>Handles the General commands: <a href="https://sourceforge.net/p/snowmix/wiki/Reference%20General/">https://sourceforge.net/p/snowmix/wiki/Reference%20General/</a></p>
</dd>
<dt><a href="#Image">Image</a> ⇐ <code><a href="#SnowmixItem">SnowmixItem</a></code></dt>
<dd><p>An image, that can be overlayed on the video.</p>
</dd>
<dt><a href="#ImagePlace">ImagePlace</a> ⇐ <code><a href="#VisibleItem">VisibleItem</a></code></dt>
<dd><p>An image placed on the video.</p>
</dd>
<dt><a href="#ImagePlaces">ImagePlaces</a> ⇐ <code><a href="#SnowmixItemCollection">SnowmixItemCollection</a></code></dt>
<dd><p>A collection of all ImagePlaces (that is, places where images can go on the video.)</p>
</dd>
<dt><a href="#Images">Images</a> ⇐ <code><a href="#SnowmixItemCollection">SnowmixItemCollection</a></code></dt>
<dd><p>Handles all images</p>
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
<dt><a href="#Text">Text</a> ⇐ <code><a href="#VisibleItem">VisibleItem</a></code></dt>
<dd><p>A Text object (that can be placed on a video).</p>
</dd>
<dt><a href="#Texts">Texts</a> ⇐ <code><a href="#SnowmixItemCollection">SnowmixItemCollection</a></code></dt>
<dd><p>Handles all texts</p>
</dd>
<dt><a href="#Vfeed">Vfeed</a> ⇐ <code><a href="#SnowmixItem">SnowmixItem</a></code></dt>
<dd><p>A virtual video feed</p>
</dd>
<dt><a href="#Vfeeds">Vfeeds</a> ⇐ <code><a href="#SnowmixItemCollection">SnowmixItemCollection</a></code></dt>
<dd><p>snowmix.vfeeds - controls all vfeeds (virtual video feeds)
(Not to be confused with Feeds, which are <em>non-virtual</em> video feeds.)</p>
</dd>
<dt><a href="#VisibleItem">VisibleItem</a> ⇐ <code><a href="#SnowmixItem">SnowmixItem</a></code></dt>
<dd><p>Abstract superclass for an item that is visible on the video
i.e. Vfeed, Text, Image</p>
</dd>
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

## AudioFeeds ⇐ <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>
A collection of all AudioFeeds

**Kind**: global class  
**Extends:** <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>  

* [AudioFeeds](#AudioFeeds) ⇐ <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>
    * [.add(containing)](#AudioFeeds+add)
    * [.all()](#SnowmixItemCollection+all) ⇒ <code>array</code>
    * [.allIds()](#SnowmixItemCollection+allIds) ⇒ <code>array</code>
    * [.byId(id)](#SnowmixItemCollection+byId) ⇒
    * [.removeAll()](#SnowmixItemCollection+removeAll)

<a name="AudioFeeds+add"></a>

### audioFeeds.add(containing)
Add a new audio feed.
Of, if an audio feed of the specified ID is provided, updates it.

**Kind**: instance method of <code>[AudioFeeds](#AudioFeeds)</code>  

| Param | Type | Description |
| --- | --- | --- |
| containing | <code>object</code> | 'name' (required) and 'id' (optional) If omitted, id will be next highest value. |

<a name="SnowmixItemCollection+all"></a>

### audioFeeds.all() ⇒ <code>array</code>
Returns all

**Kind**: instance method of <code>[AudioFeeds](#AudioFeeds)</code>  
<a name="SnowmixItemCollection+allIds"></a>

### audioFeeds.allIds() ⇒ <code>array</code>
Returns all IDs

**Kind**: instance method of <code>[AudioFeeds](#AudioFeeds)</code>  
**Returns**: <code>array</code> - IDs as integers  
<a name="SnowmixItemCollection+byId"></a>

### audioFeeds.byId(id) ⇒
Get by ID

**Kind**: instance method of <code>[AudioFeeds](#AudioFeeds)</code>  
**Returns**: - object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>integer</code> | ID |

<a name="SnowmixItemCollection+removeAll"></a>

### audioFeeds.removeAll()
Remove all

**Kind**: instance method of <code>[AudioFeeds](#AudioFeeds)</code>  
**Fulfill**: <code>undefined</code>  
<a name="AudioMixer"></a>

## AudioMixer ⇐ <code>[SnowmixItem](#SnowmixItem)</code>
An single audio mixer. Use `AudioMixers` to create and delete.
An audio mixer allows audio feeds to be mixed together, and then sent to
an AudioSink for output. You probably only have the need for one audio mixer.

**Kind**: global class  
**Extends:** <code>[SnowmixItem](#SnowmixItem)</code>  

* [AudioMixer](#AudioMixer) ⇐ <code>[SnowmixItem](#SnowmixItem)</code>
    * [.remove()](#AudioMixer+remove) ⇒ <code>Promise</code>
    * [.start()](#AudioMixer+start) ⇒ <code>Promise</code>
    * [.addAudioFeed(audioFeed)](#AudioMixer+addAudioFeed) ⇒ <code>Promise</code>
    * [.unmuteAudioFeed(audioFeed)](#AudioMixer+unmuteAudioFeed) ⇒ <code>Promise</code>
    * [.muteAudioFeed(audioFeed)](#AudioMixer+muteAudioFeed) ⇒ <code>Promise</code>
    * [.switchToAudioFeeds(of)](#AudioMixer+switchToAudioFeeds) ⇒ <code>Promise</code>
    * [.assign(new, track)](#SnowmixItem+assign)

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

<a name="SnowmixItem+assign"></a>

### audioMixer.assign(new, track)
Assign values to this item

**Kind**: instance method of <code>[AudioMixer](#AudioMixer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| new | <code>Object</code> | values |
| track | <code>Boolean</code> | changes? Defaults to false, if true,sets changed=true if change found. |

<a name="AudioMixers"></a>

## AudioMixers ⇐ <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>
A collection of all AudioMixers. (Note: it's rare you need more than 1!)

**Kind**: global class  
**Extends:** <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>  

* [AudioMixers](#AudioMixers) ⇐ <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>
    * [.add(containing)](#AudioMixers+add)
    * [.all()](#SnowmixItemCollection+all) ⇒ <code>array</code>
    * [.allIds()](#SnowmixItemCollection+allIds) ⇒ <code>array</code>
    * [.byId(id)](#SnowmixItemCollection+byId) ⇒
    * [.removeAll()](#SnowmixItemCollection+removeAll)

<a name="AudioMixers+add"></a>

### audioMixers.add(containing)
Add a new audio mixer.
Of, if an audio mixer of the specified ID is provided, updates it.

**Kind**: instance method of <code>[AudioMixers](#AudioMixers)</code>  

| Param | Type | Description |
| --- | --- | --- |
| containing | <code>object</code> | 'name' (required) and 'id' (optional) If omitted, id will be next highest value. |

<a name="SnowmixItemCollection+all"></a>

### audioMixers.all() ⇒ <code>array</code>
Returns all

**Kind**: instance method of <code>[AudioMixers](#AudioMixers)</code>  
<a name="SnowmixItemCollection+allIds"></a>

### audioMixers.allIds() ⇒ <code>array</code>
Returns all IDs

**Kind**: instance method of <code>[AudioMixers](#AudioMixers)</code>  
**Returns**: <code>array</code> - IDs as integers  
<a name="SnowmixItemCollection+byId"></a>

### audioMixers.byId(id) ⇒
Get by ID

**Kind**: instance method of <code>[AudioMixers](#AudioMixers)</code>  
**Returns**: - object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>integer</code> | ID |

<a name="SnowmixItemCollection+removeAll"></a>

### audioMixers.removeAll()
Remove all

**Kind**: instance method of <code>[AudioMixers](#AudioMixers)</code>  
**Fulfill**: <code>undefined</code>  
<a name="AudioSink"></a>

## AudioSink ⇐ <code>[SnowmixItem](#SnowmixItem)</code>
An single audio sink

**Kind**: global class  
**Extends:** <code>[SnowmixItem](#SnowmixItem)</code>  

* [AudioSink](#AudioSink) ⇐ <code>[SnowmixItem](#SnowmixItem)</code>
    * [.remove()](#AudioSink+remove) ⇒ <code>Promise</code>
    * [.addAudioMixer(audioMixer)](#AudioSink+addAudioMixer) ⇒ <code>Promise</code>
    * [.assign(new, track)](#SnowmixItem+assign)

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

<a name="SnowmixItem+assign"></a>

### audioSink.assign(new, track)
Assign values to this item

**Kind**: instance method of <code>[AudioSink](#AudioSink)</code>  

| Param | Type | Description |
| --- | --- | --- |
| new | <code>Object</code> | values |
| track | <code>Boolean</code> | changes? Defaults to false, if true,sets changed=true if change found. |

<a name="AudioSinks"></a>

## AudioSinks ⇐ <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>
A collection of all AudioSinks. (Note: it's rare you need more than 1!)

**Kind**: global class  
**Extends:** <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>  

* [AudioSinks](#AudioSinks) ⇐ <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>
    * [.add(containing)](#AudioSinks+add)
    * [.all()](#SnowmixItemCollection+all) ⇒ <code>array</code>
    * [.allIds()](#SnowmixItemCollection+allIds) ⇒ <code>array</code>
    * [.byId(id)](#SnowmixItemCollection+byId) ⇒
    * [.removeAll()](#SnowmixItemCollection+removeAll)

<a name="AudioSinks+add"></a>

### audioSinks.add(containing)
Add a new audio sink.
Of, if an audio sink of the specified ID is provided, updates it.

**Kind**: instance method of <code>[AudioSinks](#AudioSinks)</code>  

| Param | Type | Description |
| --- | --- | --- |
| containing | <code>object</code> | 'name' (required) and 'id' (optional) If omitted, id will be next highest value. |

<a name="SnowmixItemCollection+all"></a>

### audioSinks.all() ⇒ <code>array</code>
Returns all

**Kind**: instance method of <code>[AudioSinks](#AudioSinks)</code>  
<a name="SnowmixItemCollection+allIds"></a>

### audioSinks.allIds() ⇒ <code>array</code>
Returns all IDs

**Kind**: instance method of <code>[AudioSinks](#AudioSinks)</code>  
**Returns**: <code>array</code> - IDs as integers  
<a name="SnowmixItemCollection+byId"></a>

### audioSinks.byId(id) ⇒
Get by ID

**Kind**: instance method of <code>[AudioSinks](#AudioSinks)</code>  
**Returns**: - object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>integer</code> | ID |

<a name="SnowmixItemCollection+removeAll"></a>

### audioSinks.removeAll()
Remove all

**Kind**: instance method of <code>[AudioSinks](#AudioSinks)</code>  
**Fulfill**: <code>undefined</code>  
<a name="SnowmixCommands"></a>

## SnowmixCommands
snowmix.commands - handles the manipulation of Snowmix commands (aka functions)

**Kind**: global class  

* [SnowmixCommands](#SnowmixCommands)
    * [.listAll()](#SnowmixCommands+listAll) ⇒ <code>Array</code>
    * [.commandsOverlayedAtFrameEnd()](#SnowmixCommands+commandsOverlayedAtFrameEnd) ⇒ <code>Array</code>
    * [.setCommandsOverlayedAtFrameEnd(command)](#SnowmixCommands+setCommandsOverlayedAtFrameEnd)
    * [.list(commandName)](#SnowmixCommands+list) ⇒ <code>Promise</code>
    * [.create(commandName, Lines)](#SnowmixCommands+create) ⇒ <code>Promise</code>
    * [.delete(commandName)](#SnowmixCommands+delete) ⇒ <code>Promise</code>
    * [.populateFromShowCommand()](#SnowmixCommands+populateFromShowCommand) ⇒ <code>Promise</code>
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
<a name="SnowmixCommands+commandsOverlayedAtFrameEnd"></a>

### snowmixCommands.commandsOverlayedAtFrameEnd() ⇒ <code>Array</code>
Runs 'overlay finish' to discover the names of feeds being overlayed

**Kind**: instance method of <code>[SnowmixCommands](#SnowmixCommands)</code>  
**Returns**: <code>Array</code> - command names  
<a name="SnowmixCommands+setCommandsOverlayedAtFrameEnd"></a>

### snowmixCommands.setCommandsOverlayedAtFrameEnd(command)
Sets the commands to be run at the end (finish) of every frame

**Kind**: instance method of <code>[SnowmixCommands](#SnowmixCommands)</code>  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Array</code> | names |

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

<a name="SnowmixCommands+populateFromShowCommand"></a>

### snowmixCommands.populateFromShowCommand() ⇒ <code>Promise</code>
Looks at 'show' command to determine what's showing. Then updates each object's 'show' state to contain this.

**Kind**: instance method of <code>[SnowmixCommands](#SnowmixCommands)</code>  
<a name="SnowmixCommands+updateShowCommand"></a>

### snowmixCommands.updateShowCommand() ⇒ <code>Promise</code>
updates the 'Show' Snowmix command to contain the relevant overlay commands

**Kind**: instance method of <code>[SnowmixCommands](#SnowmixCommands)</code>  
<a name="SnowmixCommands+resetShowCommand"></a>

### snowmixCommands.resetShowCommand() ⇒ <code>Promise</code>
Resets the Show command to containing nothing apart from the essential 'loop'

**Kind**: instance method of <code>[SnowmixCommands](#SnowmixCommands)</code>  
<a name="Feed"></a>

## Feed ⇐ <code>[SnowmixItem](#SnowmixItem)</code>
A single video feed (not to be confused with a vfeed - virtual video feed).
Feeds can be discovered and created with the Feeds class.

**Kind**: global class  
**Extends:** <code>[SnowmixItem](#SnowmixItem)</code>  
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


* [Feed](#Feed) ⇐ <code>[SnowmixItem](#SnowmixItem)</code>
    * [.getVirtualFeedsUsingThisFeed()](#Feed+getVirtualFeedsUsingThisFeed) ⇒ <code>Array</code>
    * [.getOrMakePrimaryVfeed()](#Feed+getOrMakePrimaryVfeed) ⇒ <code>Promise</code>
    * [.switch()](#Feed+switch) ⇒ <code>Promise</code>
    * [.assign(new, track)](#SnowmixItem+assign)

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
<a name="SnowmixItem+assign"></a>

### feed.assign(new, track)
Assign values to this item

**Kind**: instance method of <code>[Feed](#Feed)</code>  

| Param | Type | Description |
| --- | --- | --- |
| new | <code>Object</code> | values |
| track | <code>Boolean</code> | changes? Defaults to false, if true,sets changed=true if change found. |

<a name="Feeds"></a>

## Feeds ⇐ <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>
A collection of all (video) Feeds.
(Not to be confused with Vfeeds, which are _virtual_ video feeds.)

**Kind**: global class  
**Extends:** <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>  

* [Feeds](#Feeds) ⇐ <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>
    * [.byId(ID)](#Feeds+byId) ⇒ <code>[Feed](#Feed)</code>
    * [.add(containing)](#Feeds+add) ⇒ <code>[Feed](#Feed)</code>
    * [.all()](#SnowmixItemCollection+all) ⇒ <code>array</code>
    * [.allIds()](#SnowmixItemCollection+allIds) ⇒ <code>array</code>
    * [.removeAll()](#SnowmixItemCollection+removeAll)

<a name="Feeds+byId"></a>

### feeds.byId(ID) ⇒ <code>[Feed](#Feed)</code>
Get a feed by ID

**Kind**: instance method of <code>[Feeds](#Feeds)</code>  
**Overrides:** <code>[byId](#SnowmixItemCollection+byId)</code>  
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

<a name="SnowmixItemCollection+all"></a>

### feeds.all() ⇒ <code>array</code>
Returns all

**Kind**: instance method of <code>[Feeds](#Feeds)</code>  
<a name="SnowmixItemCollection+allIds"></a>

### feeds.allIds() ⇒ <code>array</code>
Returns all IDs

**Kind**: instance method of <code>[Feeds](#Feeds)</code>  
**Returns**: <code>array</code> - IDs as integers  
<a name="SnowmixItemCollection+removeAll"></a>

### feeds.removeAll()
Remove all

**Kind**: instance method of <code>[Feeds](#Feeds)</code>  
**Fulfill**: <code>undefined</code>  
<a name="General"></a>

## General
Handles the General commands: https://sourceforge.net/p/snowmix/wiki/Reference%20General/

**Kind**: global class  
<a name="General+writeSnapshotImage"></a>

### general.writeSnapshotImage(filename)
Take a snapshot of the image and write to file.
Note this won't work unless there is something outputting the video,
and also that there is something being ouptutted. Otherwise it willf fail silently.

**Kind**: instance method of <code>[General](#General)</code>  

| Param | Type |
| --- | --- |
| filename | <code>String</code> | 

<a name="Image"></a>

## Image ⇐ <code>[SnowmixItem](#SnowmixItem)</code>
An image, that can be overlayed on the video.

**Kind**: global class  
**Extends:** <code>[SnowmixItem](#SnowmixItem)</code>  
**Properties**

| Name | Type |
| --- | --- |
| id | <code>integer</code> | 
| filename | <code>string</code> | 


* [Image](#Image) ⇐ <code>[SnowmixItem](#SnowmixItem)</code>
    * [.places()](#Image+places) ⇒ <code>Array</code>
    * [.addPlace(of)](#Image+addPlace)
    * [.apply()](#Image+apply) ⇒ <code>Promise</code>
    * [.applyCommands()](#Image+applyCommands) ⇒ <code>String</code>
    * [.remove()](#Image+remove) ⇒ <code>Promise</code>
    * [.assign(new, track)](#SnowmixItem+assign)

<a name="Image+places"></a>

### image.places() ⇒ <code>Array</code>
Returns the 0 or more places for this image to be placed on the video.
(A place defines where the image should be on the video.)

**Kind**: instance method of <code>[Image](#Image)</code>  
**Returns**: <code>Array</code> - of ImagePlace objects  
<a name="Image+addPlace"></a>

### image.addPlace(of)
Add (or update existing) a place for this image to go.

**Kind**: instance method of <code>[Image](#Image)</code>  

| Param | Type | Description |
| --- | --- | --- |
| of | <code>object</code> | imagePlace properties (id, x, y, etc) If no id is provided, one is assigned automatically. |

<a name="Image+apply"></a>

### image.apply() ⇒ <code>Promise</code>
Inform Snowmix of the current image.
An equivalent apply() method is available for the image places.

**Kind**: instance method of <code>[Image](#Image)</code>  
<a name="Image+applyCommands"></a>

### image.applyCommands() ⇒ <code>String</code>
**Kind**: instance method of <code>[Image](#Image)</code>  
**Returns**: <code>String</code> - load command for this image  
<a name="Image+remove"></a>

### image.remove() ⇒ <code>Promise</code>
Remove this image from Snowmix

**Kind**: instance method of <code>[Image](#Image)</code>  
<a name="SnowmixItem+assign"></a>

### image.assign(new, track)
Assign values to this item

**Kind**: instance method of <code>[Image](#Image)</code>  

| Param | Type | Description |
| --- | --- | --- |
| new | <code>Object</code> | values |
| track | <code>Boolean</code> | changes? Defaults to false, if true,sets changed=true if change found. |

<a name="ImagePlace"></a>

## ImagePlace ⇐ <code>[VisibleItem](#VisibleItem)</code>
An image placed on the video.

**Kind**: global class  
**Extends:** <code>[VisibleItem](#VisibleItem)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>integer</code> |  |
| imageId | <code>integer</code> |  |
| x | <code>integer</code> |  |
| y | <code>integer</code> |  |
| location | <code>string</code> | (n | s | e | w | c | ne | nw | se | sw) |
| horizontalAlign | <code>string</code> | (left | center | right) |
| verticalAlign | <code>string</code> | (top | middle | bottom) |


* [ImagePlace](#ImagePlace) ⇐ <code>[VisibleItem](#VisibleItem)</code>
    * [.image()](#ImagePlace+image) ⇒ <code>[Image](#Image)</code>
    * [.applyAndShow()](#ImagePlace+applyAndShow)
    * [.apply()](#ImagePlace+apply) ⇒ <code>Promise</code>
    * [.applyCommands()](#ImagePlace+applyCommands) ⇒ <code>String</code>
    * [.remove()](#ImagePlace+remove) ⇒ <code>Promise</code>
    * [.show()](#VisibleItem+show) ⇒ <code>Promise</code>
    * [.hide()](#VisibleItem+hide) ⇒ <code>Promise</code>
    * [.assign(new, track)](#SnowmixItem+assign)

<a name="ImagePlace+image"></a>

### imagePlace.image() ⇒ <code>[Image](#Image)</code>
**Kind**: instance method of <code>[ImagePlace](#ImagePlace)</code>  
**Returns**: <code>[Image](#Image)</code> - the corresponding image  
<a name="ImagePlace+applyAndShow"></a>

### imagePlace.applyAndShow()
Inform Snowmix of the current settings, and then ensure it's visible.

**Kind**: instance method of <code>[ImagePlace](#ImagePlace)</code>  
<a name="ImagePlace+apply"></a>

### imagePlace.apply() ⇒ <code>Promise</code>
Inform Snowmix of the current settings.
Does not show or hide it (for that, use show() or hide())

**Kind**: instance method of <code>[ImagePlace](#ImagePlace)</code>  
<a name="ImagePlace+applyCommands"></a>

### imagePlace.applyCommands() ⇒ <code>String</code>
**Kind**: instance method of <code>[ImagePlace](#ImagePlace)</code>  
**Returns**: <code>String</code> - the 'image place' command that will apply this place in Snowmix  
<a name="ImagePlace+remove"></a>

### imagePlace.remove() ⇒ <code>Promise</code>
Remove this ImagePlace from Snowmix

**Kind**: instance method of <code>[ImagePlace](#ImagePlace)</code>  
<a name="VisibleItem+show"></a>

### imagePlace.show() ⇒ <code>Promise</code>
Shows the item. If already showing, does nothing.

**Kind**: instance method of <code>[ImagePlace](#ImagePlace)</code>  
<a name="VisibleItem+hide"></a>

### imagePlace.hide() ⇒ <code>Promise</code>
Hides the item. If already not showing, does nothing.

**Kind**: instance method of <code>[ImagePlace](#ImagePlace)</code>  
<a name="SnowmixItem+assign"></a>

### imagePlace.assign(new, track)
Assign values to this item

**Kind**: instance method of <code>[ImagePlace](#ImagePlace)</code>  

| Param | Type | Description |
| --- | --- | --- |
| new | <code>Object</code> | values |
| track | <code>Boolean</code> | changes? Defaults to false, if true,sets changed=true if change found. |

<a name="ImagePlaces"></a>

## ImagePlaces ⇐ <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>
A collection of all ImagePlaces (that is, places where images can go on the video.)

**Kind**: global class  
**Extends:** <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>  

* [ImagePlaces](#ImagePlaces) ⇐ <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>
    * [.getShowingIds()](#ImagePlaces+getShowingIds) ⇒ <code>array</code>
    * [.all()](#SnowmixItemCollection+all) ⇒ <code>array</code>
    * [.allIds()](#SnowmixItemCollection+allIds) ⇒ <code>array</code>
    * [.byId(id)](#SnowmixItemCollection+byId) ⇒
    * [.removeAll()](#SnowmixItemCollection+removeAll)

<a name="ImagePlaces+getShowingIds"></a>

### imagePlaces.getShowingIds() ⇒ <code>array</code>
Returns the IDs of all Texts that are showing (visible).

**Kind**: instance method of <code>[ImagePlaces](#ImagePlaces)</code>  
<a name="SnowmixItemCollection+all"></a>

### imagePlaces.all() ⇒ <code>array</code>
Returns all

**Kind**: instance method of <code>[ImagePlaces](#ImagePlaces)</code>  
<a name="SnowmixItemCollection+allIds"></a>

### imagePlaces.allIds() ⇒ <code>array</code>
Returns all IDs

**Kind**: instance method of <code>[ImagePlaces](#ImagePlaces)</code>  
**Returns**: <code>array</code> - IDs as integers  
<a name="SnowmixItemCollection+byId"></a>

### imagePlaces.byId(id) ⇒
Get by ID

**Kind**: instance method of <code>[ImagePlaces](#ImagePlaces)</code>  
**Returns**: - object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>integer</code> | ID |

<a name="SnowmixItemCollection+removeAll"></a>

### imagePlaces.removeAll()
Remove all

**Kind**: instance method of <code>[ImagePlaces](#ImagePlaces)</code>  
**Fulfill**: <code>undefined</code>  
<a name="Images"></a>

## Images ⇐ <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>
Handles all images

**Kind**: global class  
**Extends:** <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>  

* [Images](#Images) ⇐ <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>
    * [.all()](#SnowmixItemCollection+all) ⇒ <code>array</code>
    * [.allIds()](#SnowmixItemCollection+allIds) ⇒ <code>array</code>
    * [.byId(id)](#SnowmixItemCollection+byId) ⇒
    * [.removeAll()](#SnowmixItemCollection+removeAll)

<a name="SnowmixItemCollection+all"></a>

### images.all() ⇒ <code>array</code>
Returns all

**Kind**: instance method of <code>[Images](#Images)</code>  
<a name="SnowmixItemCollection+allIds"></a>

### images.allIds() ⇒ <code>array</code>
Returns all IDs

**Kind**: instance method of <code>[Images](#Images)</code>  
**Returns**: <code>array</code> - IDs as integers  
<a name="SnowmixItemCollection+byId"></a>

### images.byId(id) ⇒
Get by ID

**Kind**: instance method of <code>[Images](#Images)</code>  
**Returns**: - object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>integer</code> | ID |

<a name="SnowmixItemCollection+removeAll"></a>

### images.removeAll()
Remove all

**Kind**: instance method of <code>[Images](#Images)</code>  
**Fulfill**: <code>undefined</code>  
<a name="SnowmixItem"></a>

## *SnowmixItem*
Abstract superclass for a Snowmix item.
(Feed, Vfeed, Text, AudioMixer, and the rest.)

**Kind**: global abstract class  
<a name="SnowmixItem+assign"></a>

### *snowmixItem.assign(new, track)*
Assign values to this item

**Kind**: instance method of <code>[SnowmixItem](#SnowmixItem)</code>  

| Param | Type | Description |
| --- | --- | --- |
| new | <code>Object</code> | values |
| track | <code>Boolean</code> | changes? Defaults to false, if true,sets changed=true if change found. |

<a name="SnowmixItemCollection"></a>

## *SnowmixItemCollection*
**Kind**: global abstract class  

* *[SnowmixItemCollection](#SnowmixItemCollection)*
    * *[.all()](#SnowmixItemCollection+all) ⇒ <code>array</code>*
    * *[.allIds()](#SnowmixItemCollection+allIds) ⇒ <code>array</code>*
    * *[.byId(id)](#SnowmixItemCollection+byId) ⇒*
    * *[.removeAll()](#SnowmixItemCollection+removeAll)*

<a name="SnowmixItemCollection+all"></a>

### *snowmixItemCollection.all() ⇒ <code>array</code>*
Returns all

**Kind**: instance method of <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>  
<a name="SnowmixItemCollection+allIds"></a>

### *snowmixItemCollection.allIds() ⇒ <code>array</code>*
Returns all IDs

**Kind**: instance method of <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>  
**Returns**: <code>array</code> - IDs as integers  
<a name="SnowmixItemCollection+byId"></a>

### *snowmixItemCollection.byId(id) ⇒*
Get by ID

**Kind**: instance method of <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>  
**Returns**: - object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>integer</code> | ID |

<a name="SnowmixItemCollection+removeAll"></a>

### *snowmixItemCollection.removeAll()*
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

## Text ⇐ <code>[VisibleItem](#VisibleItem)</code>
A Text object (that can be placed on a video).

**Kind**: global class  
**Extends:** <code>[VisibleItem](#VisibleItem)</code>  
**Properties**

| Name | Type |
| --- | --- |
| id | <code>integer</code> | 
| string | <code>integer</code> | 
| fontId | <code>integer</code> | 
| anchor |  | 
| offset |  | 


* [Text](#Text) ⇐ <code>[VisibleItem](#VisibleItem)</code>
    * [.applyAndShow()](#Text+applyAndShow)
    * [.apply()](#Text+apply) ⇒ <code>Promise</code>
    * [.commandsExceptStringCommand()](#Text+commandsExceptStringCommand)
    * [.show()](#VisibleItem+show) ⇒ <code>Promise</code>
    * [.hide()](#VisibleItem+hide) ⇒ <code>Promise</code>
    * [.assign(new, track)](#SnowmixItem+assign)

<a name="Text+applyAndShow"></a>

### text.applyAndShow()
Inform Snowmix of the current settings, and then ensure it's visible.

**Kind**: instance method of <code>[Text](#Text)</code>  
<a name="Text+apply"></a>

### text.apply() ⇒ <code>Promise</code>
Inform Snowmix of the current settings.
Does not show or hide it (for that, use show() or hide())

**Kind**: instance method of <code>[Text](#Text)</code>  
<a name="Text+commandsExceptStringCommand"></a>

### text.commandsExceptStringCommand()
Return all commands except the 'string' command.
This is becuase Snowmix responds differently to the string and other commands

**Kind**: instance method of <code>[Text](#Text)</code>  
<a name="VisibleItem+show"></a>

### text.show() ⇒ <code>Promise</code>
Shows the item. If already showing, does nothing.

**Kind**: instance method of <code>[Text](#Text)</code>  
<a name="VisibleItem+hide"></a>

### text.hide() ⇒ <code>Promise</code>
Hides the item. If already not showing, does nothing.

**Kind**: instance method of <code>[Text](#Text)</code>  
<a name="SnowmixItem+assign"></a>

### text.assign(new, track)
Assign values to this item

**Kind**: instance method of <code>[Text](#Text)</code>  

| Param | Type | Description |
| --- | --- | --- |
| new | <code>Object</code> | values |
| track | <code>Boolean</code> | changes? Defaults to false, if true,sets changed=true if change found. |

<a name="Texts"></a>

## Texts ⇐ <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>
Handles all texts

**Kind**: global class  
**Extends:** <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>  

* [Texts](#Texts) ⇐ <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>
    * [.getShowingIds()](#Texts+getShowingIds) ⇒ <code>array</code>
    * [.add(containing)](#Texts+add) ⇒ <code>Promise</code>
    * [.all()](#SnowmixItemCollection+all) ⇒ <code>array</code>
    * [.allIds()](#SnowmixItemCollection+allIds) ⇒ <code>array</code>
    * [.byId(id)](#SnowmixItemCollection+byId) ⇒
    * [.removeAll()](#SnowmixItemCollection+removeAll)

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

<a name="SnowmixItemCollection+all"></a>

### texts.all() ⇒ <code>array</code>
Returns all

**Kind**: instance method of <code>[Texts](#Texts)</code>  
<a name="SnowmixItemCollection+allIds"></a>

### texts.allIds() ⇒ <code>array</code>
Returns all IDs

**Kind**: instance method of <code>[Texts](#Texts)</code>  
**Returns**: <code>array</code> - IDs as integers  
<a name="SnowmixItemCollection+byId"></a>

### texts.byId(id) ⇒
Get by ID

**Kind**: instance method of <code>[Texts](#Texts)</code>  
**Returns**: - object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>integer</code> | ID |

<a name="SnowmixItemCollection+removeAll"></a>

### texts.removeAll()
Remove all

**Kind**: instance method of <code>[Texts](#Texts)</code>  
**Overrides:** <code>[removeAll](#SnowmixItemCollection+removeAll)</code>  
**Fulfill**: <code>undefined</code>  
<a name="Vfeed"></a>

## Vfeed ⇐ <code>[SnowmixItem](#SnowmixItem)</code>
A virtual video feed

**Kind**: global class  
**Extends:** <code>[SnowmixItem](#SnowmixItem)</code>  
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


* [Vfeed](#Vfeed) ⇐ <code>[SnowmixItem](#SnowmixItem)</code>
    * [.getFeed()](#Vfeed+getFeed) ⇒ <code>[Feed](#Feed)</code>
    * [.remove()](#Vfeed+remove) ⇒ <code>Promise</code>
    * [.switch()](#Vfeed+switch) ⇒ <code>Promise</code>
    * [.assign(new, track)](#SnowmixItem+assign)

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
<a name="SnowmixItem+assign"></a>

### vfeed.assign(new, track)
Assign values to this item

**Kind**: instance method of <code>[Vfeed](#Vfeed)</code>  

| Param | Type | Description |
| --- | --- | --- |
| new | <code>Object</code> | values |
| track | <code>Boolean</code> | changes? Defaults to false, if true,sets changed=true if change found. |

<a name="Vfeeds"></a>

## Vfeeds ⇐ <code>[SnowmixItemCollection](#SnowmixItemCollection)</code>
snowmix.vfeeds - controls all vfeeds (virtual video feeds)
(Not to be confused with Feeds, which are _non-virtual_ video feeds.)

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
**Returns**: <code>array</code> - IDs as integers  
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
<a name="VisibleItem"></a>

## *VisibleItem ⇐ <code>[SnowmixItem](#SnowmixItem)</code>*
Abstract superclass for an item that is visible on the video
i.e. Vfeed, Text, Image

**Kind**: global abstract class  
**Extends:** <code>[SnowmixItem](#SnowmixItem)</code>  

* *[VisibleItem](#VisibleItem) ⇐ <code>[SnowmixItem](#SnowmixItem)</code>*
    * *[.show()](#VisibleItem+show) ⇒ <code>Promise</code>*
    * *[.hide()](#VisibleItem+hide) ⇒ <code>Promise</code>*
    * *[.assign(new, track)](#SnowmixItem+assign)*

<a name="VisibleItem+show"></a>

### *visibleItem.show() ⇒ <code>Promise</code>*
Shows the item. If already showing, does nothing.

**Kind**: instance method of <code>[VisibleItem](#VisibleItem)</code>  
<a name="VisibleItem+hide"></a>

### *visibleItem.hide() ⇒ <code>Promise</code>*
Hides the item. If already not showing, does nothing.

**Kind**: instance method of <code>[VisibleItem](#VisibleItem)</code>  
<a name="SnowmixItem+assign"></a>

### *visibleItem.assign(new, track)*
Assign values to this item

**Kind**: instance method of <code>[VisibleItem](#VisibleItem)</code>  

| Param | Type | Description |
| --- | --- | --- |
| new | <code>Object</code> | values |
| track | <code>Boolean</code> | changes? Defaults to false, if true,sets changed=true if change found. |

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
