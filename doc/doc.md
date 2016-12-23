## Constants

<dl>
<dt><a href="#_">_</a></dt>
<dd><h1 id="snowmix-audiofeedobject">Snowmix/AudiofeedObject</h1>
<p>An audio feed</p>
</dd>
<dt><a href="#_">_</a></dt>
<dd><h1 id="snowmix-audiofeeds">Snowmix/Audiofeeds</h1>
<p>Handles audio feeds</p>
</dd>
<dt><a href="#_">_</a></dt>
<dd><h1 id="snowmix-commands">Snowmix/Commands</h1>
<p>Handles the manipulation of Snowmix commands (aka functions)</p>
</dd>
<dt><a href="#_">_</a></dt>
<dd><h1 id="snowmix-feedobject">Snowmix/FeedObject</h1>
<p>A video feed (not to be confused with a virutal feed).</p>
</dd>
<dt><a href="#_">_</a></dt>
<dd><h1 id="feeds">Feeds</h1>
<p>Handles video feeds
(Not to be confused with Vfeeds, which are <em>virtual</em> video feeds.)</p>
</dd>
<dt><a href="#_">_</a></dt>
<dd><h1 id="general">General</h1>
<p>Handles the General commands: <a href="https://sourceforge.net/p/snowmix/wiki/Reference%20General/">https://sourceforge.net/p/snowmix/wiki/Reference%20General/</a></p>
</dd>
<dt><a href="#_">_</a></dt>
<dd><h1 id="snowmix-text">Snowmix/Text</h1>
<p>A Text object (that can be placed on a video).</p>
</dd>
<dt><a href="#_">_</a></dt>
<dd><h1 id="snowmix-texs">Snowmix/Texs</h1>
<p>Handles all texts</p>
</dd>
<dt><a href="#_">_</a></dt>
<dd><h1 id="snowmix-vfeedobject">Snowmix/VfeedObject</h1>
<p>A virtual video feed</p>
<pre><code>var vfeed = snowmix.vfeeds.create({name: &#39;Camera 2&#39;})
vfeed.show()
</code></pre><p>Fields:
     id
     state
     source - string &#39;feed&#39;
     sourceId - id of the source feed
     coors - array [x,y]
     geometry
     scale
     clipCoordinates
     clipGeometry
     roration
     alpha
     filter</p>
</dd>
<dt><a href="#_">_</a></dt>
<dd><h1 id="snowmix-feeds">Snowmix/Feeds</h1>
<p>Handles virtual video feeds
(Not to be confused with Feeds, which are <em>non-virtual</em> video feeds.)</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#new">new()</a></dt>
<dd><p>Constructor, that ensures the same instance is used for each host/port</p>
<p>Optional arguments as object: port, host</p>
</dd>
</dl>

<a name="_"></a>

## _
# Snowmix/AudiofeedObject

An audio feed

**Kind**: global constant  
**Example**  
```js
let feedName = snowmix.audiofeeds.byId(1).name
```
<a name="_"></a>

## _
# Snowmix/Audiofeeds

Handles audio feeds

**Kind**: global constant  
<a name="_"></a>

## _
# Snowmix/Commands

Handles the manipulation of Snowmix commands (aka functions)

**Kind**: global constant  
<a name="_"></a>

## _
# Snowmix/FeedObject

A video feed (not to be confused with a virutal feed).

**Kind**: global constant  
**Example**  
```js
let feed = snowmix.feeds.byId(2)
    feed.switch().then(...)
```
<a name="_"></a>

## _
# Feeds

Handles video feeds
(Not to be confused with Vfeeds, which are _virtual_ video feeds.)

**Kind**: global constant  
<a name="_"></a>

## _
# General

Handles the General commands: https://sourceforge.net/p/snowmix/wiki/Reference%20General/

**Kind**: global constant  
<a name="_"></a>

## _
# Snowmix/Text

A Text object (that can be placed on a video).

**Kind**: global constant  
**Example**  
```js
var myText1 = snowmix.texts.add({ string: 'Snowmix is great!' })
  myText1.applyAndShow()
  .then(() => { ... })
```
<a name="_"></a>

## _
# Snowmix/Texs

Handles all texts

**Kind**: global constant  
<a name="_"></a>

## _
# Snowmix/VfeedObject

A virtual video feed

    var vfeed = snowmix.vfeeds.create({name: 'Camera 2'})
    vfeed.show()

Fields:
     id
     state
     source - string 'feed'
     sourceId - id of the source feed
     coors - array [x,y]
     geometry
     scale
     clipCoordinates
     clipGeometry
     roration
     alpha
     filter

**Kind**: global constant  
<a name="_"></a>

## _
# Snowmix/Feeds

Handles virtual video feeds
(Not to be confused with Feeds, which are _non-virtual_ video feeds.)

**Kind**: global constant  
<a name="new"></a>

## new()
Constructor, that ensures the same instance is used for each host/port

Optional arguments as object: port, host

**Kind**: global function  
**Example**  
```js
let snowmix = Snowmix.new()
```
