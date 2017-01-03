<a name="Vfeed"></a>

## Vfeed
A virtual video feed

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>integer</code> |  |
| name | <code>string</code> |  |
| state | <code>string</code> |  |
| source | <code>string</code> | 'feed' or 'image' |
| sourceId | <code>integer</code> | of the feed or image |
| coors | <code>array</code> | [x,y] |
| geometry | <code>array</code> | [x,y] |
| scale |  |  |
| clipCoordinates |  |  |
| clipGeometry |  |  |
| rotation |  |  |
| alpha |  |  |
| filter |  |  |


* [Vfeed](#Vfeed)
    * [.getFeed()](#Vfeed+getFeed) ⇒ <code>Feed</code>
    * [.remove()](#Vfeed+remove) ⇒ <code>Promise</code>
    * [.switch()](#Vfeed+switch) ⇒ <code>Promise</code>

<a name="Vfeed+getFeed"></a>

### vfeed.getFeed() ⇒ <code>Feed</code>
Returns the feed object that this virtual feed is for

**Kind**: instance method of <code>[Vfeed](#Vfeed)</code>  
<a name="Vfeed+remove"></a>

### vfeed.remove() ⇒ <code>Promise</code>
Remove this vfeed from Snowmix

**Kind**: instance method of <code>[Vfeed](#Vfeed)</code>  
<a name="Vfeed+switch"></a>

### vfeed.switch() ⇒ <code>Promise</code>
Switch the output to this feed.

**Kind**: instance method of <code>[Vfeed](#Vfeed)</code>  
