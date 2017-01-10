<a name="AudioMixers"></a>

## AudioMixers
Handles all audio mixers

**Kind**: global class  

* [AudioMixers](#AudioMixers)
    * [.all()](#AudioMixers+all) ⇒ <code>array</code>
    * [.allIds()](#AudioMixers+allIds) ⇒ <code>array</code>
    * [.byId(ID)](#AudioMixers+byId) ⇒ <code>AudioMixer</code>
    * [.getNextAvailableId()](#AudioMixers+getNextAvailableId) ⇒ <code>integer</code>
    * [.removeAll()](#AudioMixers+removeAll) ⇒ <code>Promise</code>
    * [.add(containing)](#AudioMixers+add)

<a name="AudioMixers+all"></a>

### audioMixers.all() ⇒ <code>array</code>
Returns all audio mixers

**Kind**: instance method of <code>[AudioMixers](#AudioMixers)</code>  
**Returns**: <code>array</code> - }  
<a name="AudioMixers+allIds"></a>

### audioMixers.allIds() ⇒ <code>array</code>
Returns all audio mixer IDs

**Kind**: instance method of <code>[AudioMixers](#AudioMixers)</code>  
**Returns**: <code>array</code> - of integers  
<a name="AudioMixers+byId"></a>

### audioMixers.byId(ID) ⇒ <code>AudioMixer</code>
Get an audioMixer by ID

**Kind**: instance method of <code>[AudioMixers](#AudioMixers)</code>  
**Returns**: <code>AudioMixer</code> - object  

| Param | Type |
| --- | --- |
| ID | <code>integer</code> | 

<a name="AudioMixers+getNextAvailableId"></a>

### audioMixers.getNextAvailableId() ⇒ <code>integer</code>
Returns next available ID.
e.g. if existing IDs used are [1,2,3,5] return 4, then 6.

**Kind**: instance method of <code>[AudioMixers](#AudioMixers)</code>  
<a name="AudioMixers+removeAll"></a>

### audioMixers.removeAll() ⇒ <code>Promise</code>
Remove all audiomixers

**Kind**: instance method of <code>[AudioMixers](#AudioMixers)</code>  
<a name="AudioMixers+add"></a>

### audioMixers.add(containing)
Add a new audio mixer.
Of, if an audio mixer of the specified ID is provided, updates it.

**Kind**: instance method of <code>[AudioMixers](#AudioMixers)</code>  

| Param | Type | Description |
| --- | --- | --- |
| containing | <code>object</code> | 'name' (required) and 'id' (optional) If omitted, id will be next highest value. |

