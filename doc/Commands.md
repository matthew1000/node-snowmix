<a name="SnowmixCommands"></a>

## SnowmixCommands
snowmix.commands - handles the manipulation of Snowmix commands (aka functions)

**Kind**: global class  

* [SnowmixCommands](#SnowmixCommands)
    * [.listCommand(commandName)](#SnowmixCommands+listCommand) ⇒ <code>Promise</code>
    * [.createCommand(commandName, Lines)](#SnowmixCommands+createCommand) ⇒ <code>Promise</code>
    * [.updateShowCommand()](#SnowmixCommands+updateShowCommand) ⇒ <code>Promise</code>
    * [.resetShowCommand()](#SnowmixCommands+resetShowCommand) ⇒ <code>Promise</code>

<a name="SnowmixCommands+listCommand"></a>

### snowmixCommands.listCommand(commandName) ⇒ <code>Promise</code>
List the lines of a command

**Kind**: instance method of <code>[SnowmixCommands](#SnowmixCommands)</code>  
**Returns**: <code>Promise</code> - of an array where the first entry is always undefined.
If the command does not exist, returns undefined.
If the command has no contents, returns [undefined]  

| Param | Type |
| --- | --- |
| commandName | <code>String</code> | 

**Example**  
```js
snowmix.commands.listCommand('Show').then(arrayOfLines => { ... })
```
<a name="SnowmixCommands+createCommand"></a>

### snowmixCommands.createCommand(commandName, Lines) ⇒ <code>Promise</code>
Create a command. Replaces any that already exist with this name.

**Kind**: instance method of <code>[SnowmixCommands](#SnowmixCommands)</code>  

| Param | Type | Description |
| --- | --- | --- |
| commandName | <code>String</code> |  |
| Lines | <code>Array</code> | for command |

<a name="SnowmixCommands+updateShowCommand"></a>

### snowmixCommands.updateShowCommand() ⇒ <code>Promise</code>
updates the 'Show' Snowmix command to contain the relevant overlay commands

**Kind**: instance method of <code>[SnowmixCommands](#SnowmixCommands)</code>  
<a name="SnowmixCommands+resetShowCommand"></a>

### snowmixCommands.resetShowCommand() ⇒ <code>Promise</code>
Resets the Show command to containing nothing apart from the essential 'loop'

**Kind**: instance method of <code>[SnowmixCommands](#SnowmixCommands)</code>  
