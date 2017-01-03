<a name="Feed"></a>

## Feed
A single video feed (not to be confused with a vfeed - virtual video feed).

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>integer</code> |  |
| name | <code>string</code> |  |
| state | <code>string</code> | e.g. 'STALLED' or 'PENDING' |
| geometry | <code>array</code> | [x,y] |
| live | <code>boolean</code> |  |
| offset | <code>integer</code> |  |
| socket | <code>string</code> |  |
| frames | <code>integer</code> |  |
| dropped | <code>integer</code> |  |
| missed | <code>integer</code> |  |


* [Feed](#Feed)
    * [.getVirtualFeedsUsingThisFeed()](#Feed+getVirtualFeedsUsingThisFeed) ⇒ <code>Array</code>
    * [.getOrMakePrimaryVirtualFeed()](#Feed+getOrMakePrimaryVirtualFeed) ⇒ <code>Promise</code>
    * [.switch()](#Feed+switch) ⇒ <code>Promise</code>

<a name="Feed+getVirtualFeedsUsingThisFeed"></a>

### feed.getVirtualFeedsUsingThisFeed() ⇒ <code>Array</code>
**Kind**: instance method of <code>[Feed](#Feed)</code>  
**Returns**: <code>Array</code> - of Vfeed objects  
<a name="Feed+getOrMakePrimaryVirtualFeed"></a>

### feed.getOrMakePrimaryVirtualFeed() ⇒ <code>Promise</code>
Finds, and if it can't be found makes, a 'primary' virtual feed for this video feed,
i.e. one that is full-screen.

**Kind**: instance method of <code>[Feed](#Feed)</code>  
<a name="Feed+switch"></a>

### feed.switch() ⇒ <code>Promise</code>
Switch the output to this feed.

**Kind**: instance method of <code>[Feed](#Feed)</code>  
