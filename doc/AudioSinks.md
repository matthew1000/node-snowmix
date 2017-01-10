<a name="AudioSinks"></a>

## AudioSinks
Handles all audio sinks

**Kind**: global class  

* [AudioSinks](#AudioSinks)
    * [.all()](#AudioSinks+all) ⇒ <code>array</code>
    * [.allIds()](#AudioSinks+allIds) ⇒ <code>array</code>
    * [.byId(ID)](#AudioSinks+byId) ⇒ <code>AudioSink</code>
    * [.getNextAvailableId()](#AudioSinks+getNextAvailableId) ⇒ <code>integer</code>
    * [.removeAll()](#AudioSinks+removeAll) ⇒ <code>Promise</code>
    * [.add(containing)](#AudioSinks+add)

<a name="AudioSinks+all"></a>

### audioSinks.all() ⇒ <code>array</code>
Returns all audio sinks

**Kind**: instance method of <code>[AudioSinks](#AudioSinks)</code>  
**Returns**: <code>array</code> - }  
<a name="AudioSinks+allIds"></a>

### audioSinks.allIds() ⇒ <code>array</code>
Returns all audio sink IDs

**Kind**: instance method of <code>[AudioSinks](#AudioSinks)</code>  
**Returns**: <code>array</code> - of integers  
<a name="AudioSinks+byId"></a>

### audioSinks.byId(ID) ⇒ <code>AudioSink</code>
Get an audioSink by ID

**Kind**: instance method of <code>[AudioSinks](#AudioSinks)</code>  
**Returns**: <code>AudioSink</code> - object  

| Param | Type |
| --- | --- |
| ID | <code>integer</code> | 

<a name="AudioSinks+getNextAvailableId"></a>

### audioSinks.getNextAvailableId() ⇒ <code>integer</code>
Returns next available ID.
e.g. if existing IDs used are [1,2,3,5] return 4, then 6.

**Kind**: instance method of <code>[AudioSinks](#AudioSinks)</code>  
<a name="AudioSinks+removeAll"></a>

### audioSinks.removeAll() ⇒ <code>Promise</code>
Remove all audiosinks

**Kind**: instance method of <code>[AudioSinks](#AudioSinks)</code>  
<a name="AudioSinks+add"></a>

### audioSinks.add(containing)
Add a new audio sink.
Of, if an audio sink of the specified ID is provided, updates it.

**Kind**: instance method of <code>[AudioSinks](#AudioSinks)</code>  

| Param | Type | Description |
| --- | --- | --- |
| containing | <code>object</code> | 'name' (required) and 'id' (optional) If omitted, id will be next highest value. |

