<a name="Text"></a>

## Text
A Text object (that can be placed on a video).

**Kind**: global class  
**Properties**

| Name | Type |
| --- | --- |
| id | <code>integer</code> | 
| string | <code>integer</code> | 
| fontId | <code>integer</code> | 
| anchor |  | 
| offset |  | 


* [Text](#Text)
    * [.applyAndShow()](#Text+applyAndShow)
    * [.apply()](#Text+apply)
    * [.show()](#Text+show)
    * [.hide()](#Text+hide)
    * [.commandsExceptStringCommand()](#Text+commandsExceptStringCommand)

<a name="Text+applyAndShow"></a>

### text.applyAndShow()
Inform Snowmix of the current settings, and then ensure it's visible.

**Kind**: instance method of <code>[Text](#Text)</code>  
<a name="Text+apply"></a>

### text.apply()
Inform Snowmix of the current settings.
Does not show or hide it (for that, use applyAndShow())

**Kind**: instance method of <code>[Text](#Text)</code>  
<a name="Text+show"></a>

### text.show()
Shows the text. If already showing, does nothing.

**Kind**: instance method of <code>[Text](#Text)</code>  
<a name="Text+hide"></a>

### text.hide()
Hides the text. If already hiding, does nothing.

**Kind**: instance method of <code>[Text](#Text)</code>  
<a name="Text+commandsExceptStringCommand"></a>

### text.commandsExceptStringCommand()
Return all commands except the 'string' command.
This is becuase Snowmix responds differently to the string and other commands

**Kind**: instance method of <code>[Text](#Text)</code>  
