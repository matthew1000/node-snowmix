<a name="AudioFeeds"></a>

## AudioFeeds
Handles all audio feeds

**Kind**: global class  

* [AudioFeeds](#AudioFeeds)
    * [.all()](#AudioFeeds+all) ⇒ <code>array</code>
    * [.allIds()](#AudioFeeds+allIds) ⇒ <code>array</code>
    * [.byId(ID)](#AudioFeeds+byId) ⇒ <code>AudioFeed</code>
    * [.getNextAvailableId()](#AudioFeeds+getNextAvailableId) ⇒ <code>integer</code>
    * [.removeAll()](#AudioFeeds+removeAll) ⇒ <code>Promise</code>
    * [.add(containing)](#AudioFeeds+add)

<a name="AudioFeeds+all"></a>

### audioFeeds.all() ⇒ <code>array</code>
Returns all audio feeds

**Kind**: instance method of <code>[AudioFeeds](#AudioFeeds)</code>  
**Returns**: <code>array</code> - }  
<a name="AudioFeeds+allIds"></a>

### audioFeeds.allIds() ⇒ <code>array</code>
Returns all audioFeed IDs

**Kind**: instance method of <code>[AudioFeeds](#AudioFeeds)</code>  
**Returns**: <code>array</code> - of integers  
<a name="AudioFeeds+byId"></a>

### audioFeeds.byId(ID) ⇒ <code>AudioFeed</code>
Get an audioFeed by ID

**Kind**: instance method of <code>[AudioFeeds](#AudioFeeds)</code>  
**Returns**: <code>AudioFeed</code> - object  

| Param | Type |
| --- | --- |
| ID | <code>integer</code> | 

<a name="AudioFeeds+getNextAvailableId"></a>

### audioFeeds.getNextAvailableId() ⇒ <code>integer</code>
Returns next available ID.
e.g. if existing IDs used are [1,2,3,5] return 4, then 6.

**Kind**: instance method of <code>[AudioFeeds](#AudioFeeds)</code>  
<a name="AudioFeeds+removeAll"></a>

### audioFeeds.removeAll() ⇒ <code>Promise</code>
Remove all audioFeeds

**Kind**: instance method of <code>[AudioFeeds](#AudioFeeds)</code>  
<a name="AudioFeeds+add"></a>

### audioFeeds.add(containing)
Add a new audio feed.
Of, if an audio feed of the specified ID is provided, updates it.

**Kind**: instance method of <code>[AudioFeeds](#AudioFeeds)</code>  

| Param | Type | Description |
| --- | --- | --- |
| containing | <code>object</code> | 'name' (required) and 'id' (optional) If omitted, id will be next highest value. |

