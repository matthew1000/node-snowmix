<a name="Vfeeds"></a>

## Vfeeds
snowmix.vfeeds - controls all vfeeds (virtual video feeds)
(Not to be confused with Feeds, which are _non-virtual_ video feeds.)

**Kind**: global class  

* [Vfeeds](#Vfeeds)
    * [.all()](#Vfeeds+all) ⇒ <code>array</code>
    * [.allIds()](#Vfeeds+allIds) ⇒ <code>array</code>
    * [.byId(ID)](#Vfeeds+byId) ⇒ <code>Vfeed</code>
    * [.getShowingIds()](#Vfeeds+getShowingIds) ⇒ <code>array</code>
    * [.getNextAvailableId()](#Vfeeds+getNextAvailableId) ⇒ <code>integer</code>
    * [.addOrUpdate(arguments)](#Vfeeds+addOrUpdate) ⇒ <code>Vfeed</code>

<a name="Vfeeds+all"></a>

### vfeeds.all() ⇒ <code>array</code>
Returns all vfeeds

**Kind**: instance method of <code>[Vfeeds](#Vfeeds)</code>  
<a name="Vfeeds+allIds"></a>

### vfeeds.allIds() ⇒ <code>array</code>
Returns all vfeed IDs

**Kind**: instance method of <code>[Vfeeds](#Vfeeds)</code>  
**Returns**: <code>array</code> - of integers  
<a name="Vfeeds+byId"></a>

### vfeeds.byId(ID) ⇒ <code>Vfeed</code>
Get a vfeed by ID

**Kind**: instance method of <code>[Vfeeds](#Vfeeds)</code>  

| Param | Type |
| --- | --- |
| ID | <code>integer</code> | 

<a name="Vfeeds+getShowingIds"></a>

### vfeeds.getShowingIds() ⇒ <code>array</code>
Returns the IDs of all Vfeeds that are showing (visible).

**Kind**: instance method of <code>[Vfeeds](#Vfeeds)</code>  
<a name="Vfeeds+getNextAvailableId"></a>

### vfeeds.getNextAvailableId() ⇒ <code>integer</code>
Returns next available ID.
e.g. if existing IDs used are [1,2,3,5] return 4, then 6.

**Kind**: instance method of <code>[Vfeeds](#Vfeeds)</code>  
<a name="Vfeeds+addOrUpdate"></a>

### vfeeds.addOrUpdate(arguments) ⇒ <code>Vfeed</code>
Add a new (Video) virtual feed.
Of, if a video feed of the specified ID is provided, updates it.

**Kind**: instance method of <code>[Vfeeds](#Vfeeds)</code>  

| Param | Type | Description |
| --- | --- | --- |
| arguments | <code>object</code> | 'name' (required) and 'id' (optional) If omitted, id will be next highest value. |

