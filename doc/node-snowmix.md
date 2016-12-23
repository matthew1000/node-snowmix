## Classes

<dl>
<dt><a href="#Snowmix">Snowmix</a></dt>
<dd><p>The main Snowmix class. Use snowmix.new() to construct.</p>
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
    * [new Snowmix()](#new_Snowmix_new)
    * [.connect()](#Snowmix+connect)
    * [.close()](#Snowmix+close)
    * [.populate()](#Snowmix+populate)
    * [.sendCommand(commands, arguments)](#Snowmix+sendCommand)

<a name="new_Snowmix_new"></a>

### new Snowmix()
Constructor

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
Populates the information known about feeds, virutal feeds and texts from Snowmix.

**Kind**: instance method of <code>[Snowmix](#Snowmix)</code>  
<a name="Snowmix+sendCommand"></a>

### snowmix.sendCommand(commands, arguments)
Send a command, or array of commands, to Snowmix.
Optional arguments:
  set 'expectResonse' to false if no response is expected.
   (note very few don't set a response when in verbose mode, which this library enables automatically)
  set 'expectMultiline' to true if the command returns multiple lines
   (if not set, some lines may be missed)

**Kind**: instance method of <code>[Snowmix](#Snowmix)</code>  

| Param | Type |
| --- | --- |
| commands | <code>string_or_array</code> | 
| arguments | <code>object</code> | 

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
