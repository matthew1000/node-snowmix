<a name="SystemInfo"></a>

## SystemInfo
Stores the contents of the 'system info' command.
includes systemGeometry, verbose, hostAllow, systemName
For the full list, run examples/system-info.js

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
