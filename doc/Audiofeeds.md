<a name="Audiofeeds"></a>

## Audiofeeds
Handles all audio feeds

**Kind**: global class  

* [Audiofeeds](#Audiofeeds)
    * [.all()](#Audiofeeds+all) ⇒ <code>array</code>
    * [.allIds()](#Audiofeeds+allIds) ⇒ <code>array</code>
    * [.byId(ID)](#Audiofeeds+byId) ⇒ <code>Audiofeed</code>
    * [.getNextAvailableId()](#Audiofeeds+getNextAvailableId) ⇒ <code>integer</code>
    * [.addOrUpdate(containing)](#Audiofeeds+addOrUpdate)

<a name="Audiofeeds+all"></a>

### audiofeeds.all() ⇒ <code>array</code>
Returns all audio feeds

**Kind**: instance method of <code>[Audiofeeds](#Audiofeeds)</code>  
**Returns**: <code>array</code> - }  
<a name="Audiofeeds+allIds"></a>

### audiofeeds.allIds() ⇒ <code>array</code>
Returns all audiofeed IDs

**Kind**: instance method of <code>[Audiofeeds](#Audiofeeds)</code>  
**Returns**: <code>array</code> - of integers  
<a name="Audiofeeds+byId"></a>

### audiofeeds.byId(ID) ⇒ <code>Audiofeed</code>
Get an audiofeed by ID

**Kind**: instance method of <code>[Audiofeeds](#Audiofeeds)</code>  
**Returns**: <code>Audiofeed</code> - object  

| Param | Type |
| --- | --- |
| ID | <code>integer</code> | 

<a name="Audiofeeds+getNextAvailableId"></a>

### audiofeeds.getNextAvailableId() ⇒ <code>integer</code>
Returns next available ID.
e.g. if existing IDs used are [1,2,3,5] return 4, then 6.

**Kind**: instance method of <code>[Audiofeeds](#Audiofeeds)</code>  
<a name="Audiofeeds+addOrUpdate"></a>

### audiofeeds.addOrUpdate(containing)
Add a new audio feed.
Of, if an audio feed of the specified ID is provided, updates it.

**Kind**: instance method of <code>[Audiofeeds](#Audiofeeds)</code>  

| Param | Type | Description |
| --- | --- | --- |
| containing | <code>object</code> | 'name' (required) and 'id' (optional) If omitted, id will be next highest value. |

