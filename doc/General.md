<a name="General"></a>

## General
Handles the General commands: https://sourceforge.net/p/snowmix/wiki/Reference%20General/

**Kind**: global class  

* [General](#General)
    * [.framerate()](#General+framerate)
    * [.systemGeometry()](#General+systemGeometry)
    * [.systemInfoSingle()](#General+systemInfoSingle)
    * [.systemInfo()](#General+systemInfo)

<a name="General+framerate"></a>

### general.framerate()
Get the framerate, as an integer.

**Kind**: instance method of <code>[General](#General)</code>  
**Example**  
```js
snowmix.gerneral.framerate().then(frameRate => { ... })
```
<a name="General+systemGeometry"></a>

### general.systemGeometry()
Get the system geometry, as e.g. { width: 123, height: 456 }

**Kind**: instance method of <code>[General](#General)</code>  
**Example**  
```js
snowmix.gerneral.systemGeometry().spread((width, height) => { ... })
```
<a name="General+systemInfoSingle"></a>

### general.systemInfoSingle()
Get the contents of a single bit of system information from the 'system info' comand,
including:

 iniFile
 controlPortNumber
 outputFramesInuse
 snowmixVersion

**Kind**: instance method of <code>[General](#General)</code>  
**Example**  
```js
snowmix.gerneral.systemInfoSingle('frameRate').then(frameRate => { ... })
```
<a name="General+systemInfo"></a>

### general.systemInfo()
Get the contents of the 'system info' command, parsed into an associative array.
Caches the response unless {cached: false} is provided

**Kind**: instance method of <code>[General](#General)</code>  
**Example**  
```js
snowmix.gerneral.systemInfo().then(info => { ... })
```
