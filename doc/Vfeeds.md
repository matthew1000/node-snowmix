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
    * [.removeAll()](#Vfeeds+removeAll) ⇒ <code>Promise</code>
    * [.add(containing)](#Vfeeds+add) ⇒ <code>Vfeed</code>

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
<a name="Vfeeds+removeAll"></a>

### vfeeds.removeAll() ⇒ <code>Promise</code>
Remove all vfeeds

**Kind**: instance method of <code>[Vfeeds](#Vfeeds)</code>  
<a name="Vfeeds+add"></a>

### vfeeds.add(containing) ⇒ <code>Vfeed</code>
Add a new vfeed
Or, if a vfeed of the specified ID is provided, updates it.

**Kind**: instance method of <code>[Vfeeds](#Vfeeds)</code>  
**Returns**: <code>Vfeed</code> - object  

| Param | Type | Description |
| --- | --- | --- |
| containing | <code>object</code> | source & sourceId (essential), name & id (optional) If omitted, id will be next highest value. |

