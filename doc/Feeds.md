<a name="Feeds"></a>

## Feeds
Handles video feeds
(Not to be confused with Vfeeds, which are _virtual_ video feeds.)

**Kind**: global class  

* [Feeds](#Feeds)
    * [.all()](#Feeds+all) ⇒ <code>array</code>
    * [.allIds()](#Feeds+allIds) ⇒ <code>array</code>
    * [.byId(ID)](#Feeds+byId) ⇒ <code>Feed</code>
    * [.add(containing)](#Feeds+add) ⇒ <code>Feed</code>

<a name="Feeds+all"></a>

### feeds.all() ⇒ <code>array</code>
Returns all feeds

**Kind**: instance method of <code>[Feeds](#Feeds)</code>  
<a name="Feeds+allIds"></a>

### feeds.allIds() ⇒ <code>array</code>
Returns all feed IDs

**Kind**: instance method of <code>[Feeds](#Feeds)</code>  
**Returns**: <code>array</code> - of integers  
<a name="Feeds+byId"></a>

### feeds.byId(ID) ⇒ <code>Feed</code>
Get a feed by ID

**Kind**: instance method of <code>[Feeds](#Feeds)</code>  
**Returns**: <code>Feed</code> - object  

| Param | Type |
| --- | --- |
| ID | <code>integer</code> | 

<a name="Feeds+add"></a>

### feeds.add(containing) ⇒ <code>Feed</code>
Add a new (Video) feed, for when you have a new video source
Or, if a video feed of the specified ID is provided, updates it.

**Kind**: instance method of <code>[Feeds](#Feeds)</code>  
**Returns**: <code>Feed</code> - object

TODO - not yet working because apply() has not been built  

| Param | Type | Description |
| --- | --- | --- |
| containing | <code>object</code> | 'name' (required) and 'id' (optional) If omitted, id will be next highest value. |

