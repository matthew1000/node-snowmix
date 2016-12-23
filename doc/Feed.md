<a name="FeedObject"></a>

## FeedObject
A single video feed (not to be confused with a virutal feed).

**Kind**: global class  

* [FeedObject](#FeedObject)
    * [.getVirtualFeedsUsingThisFeed()](#FeedObject+getVirtualFeedsUsingThisFeed) ⇒ <code>Array</code>
    * [.getOrMakePrimaryVirtualFeed()](#FeedObject+getOrMakePrimaryVirtualFeed)
    * [.switch()](#FeedObject+switch) ⇒ <code>Promise</code>

<a name="FeedObject+getVirtualFeedsUsingThisFeed"></a>

### feedObject.getVirtualFeedsUsingThisFeed() ⇒ <code>Array</code>
**Kind**: instance method of <code>[FeedObject](#FeedObject)</code>  
**Returns**: <code>Array</code> - of Vfeed objects  
<a name="FeedObject+getOrMakePrimaryVirtualFeed"></a>

### feedObject.getOrMakePrimaryVirtualFeed()
Finds, and if it can't be found makes, a 'primary' virtual feed for this video feed,
i.e. one that is full-screen.

**Kind**: instance method of <code>[FeedObject](#FeedObject)</code>  
<a name="FeedObject+switch"></a>

### feedObject.switch() ⇒ <code>Promise</code>
Switch the output to this feed.

**Kind**: instance method of <code>[FeedObject](#FeedObject)</code>  
