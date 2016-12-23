<a name="Texts"></a>

## Texts
Handles all texts

**Kind**: global class  

* [Texts](#Texts)
    * [.all()](#Texts+all) ⇒ <code>array</code>
    * [.allIds()](#Texts+allIds) ⇒ <code>array</code>
    * [.byId(ID)](#Texts+byId) ⇒ <code>Text</code>
    * [.getById(ID)](#Texts+getById) ⇒ <code>Text</code>
    * [.getShowingIds()](#Texts+getShowingIds) ⇒ <code>array</code>
    * [.getNextAvailableId()](#Texts+getNextAvailableId) ⇒ <code>integer</code>
    * [.add(containing)](#Texts+add) ⇒ <code>Promise</code>

<a name="Texts+all"></a>

### texts.all() ⇒ <code>array</code>
Returns all texts

**Kind**: instance method of <code>[Texts](#Texts)</code>  
<a name="Texts+allIds"></a>

### texts.allIds() ⇒ <code>array</code>
Returns all text IDs

**Kind**: instance method of <code>[Texts](#Texts)</code>  
**Returns**: <code>array</code> - of integers  
<a name="Texts+byId"></a>

### texts.byId(ID) ⇒ <code>Text</code>
Get a text by ID

**Kind**: instance method of <code>[Texts](#Texts)</code>  
**Returns**: <code>Text</code> - object  

| Param | Type |
| --- | --- |
| ID | <code>integer</code> | 

<a name="Texts+getById"></a>

### texts.getById(ID) ⇒ <code>Text</code>
Get a text object by ID

**Kind**: instance method of <code>[Texts](#Texts)</code>  
**Returns**: <code>Text</code> - object  

| Param | Type |
| --- | --- |
| ID | <code>integer</code> | 

<a name="Texts+getShowingIds"></a>

### texts.getShowingIds() ⇒ <code>array</code>
Returns the IDs of all Texts that are showing (visible).

**Kind**: instance method of <code>[Texts](#Texts)</code>  
<a name="Texts+getNextAvailableId"></a>

### texts.getNextAvailableId() ⇒ <code>integer</code>
Returns next available ID.
e.g. if existing IDs used are [1,2,3,5] return 4, then 6.

**Kind**: instance method of <code>[Texts](#Texts)</code>  
<a name="Texts+add"></a>

### texts.add(containing) ⇒ <code>Promise</code>
Add a new text, or update an existing one if the ID exists.

**Kind**: instance method of <code>[Texts](#Texts)</code>  
**Returns**: <code>Promise</code> - returning the created Text object  

| Param | Type | Description |
| --- | --- | --- |
| containing | <code>object</code> | 'string' (required) and 'id' (optional) If omitted, id will be next highest value. |

