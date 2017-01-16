The `node-snowmix` library is object-oriented. Objects exist for each snowmix,
and each snowmix object, such as a video feed or an audio mixer.

# Classes

### Core

* [Snowmix](./node-snowmix.md) - the primary Snowmix class
* [General](./General.md) - for general Snowmix commands
* [Commands](./Commands.md) - for handling Snowmix commands
* [SystemInfo](./SystemInfo.md) - Snowmix system info, including version

### Video

Each video input needs a Feed.
Then, to mix them, a Vfeed (virtual feed) is required.
You can use `Feed.getOrMakePrimaryVfeed()` to create a vfeed for a feed.

* [Feed](./Feed.md) - a single audio feed
* [Feeds](./Feeds.md) - the collection of all audio feeds
* [Vfeed](./Vfeed.md) - a single audio feed
* [Vfeeds](./Vfeeds.md) - the collection of all audio feeds

### Audio

Each audio input needs an AudioFeed.
They are then mixed together with an AudioMixer.
Finally, an AudioSink is needed to output the AudioMixer.

* [AudioFeed](./AudioFeed.md) - a single audio feed
* [AudioFeeds](./AudioFeeds.md) - the collection of all audio feeds
* [AudioMixer](./AudioFeed.md) - a single audio mixer
* [AudioMixers](./AudioMixers.md) - the collection of all audio mixers
* [AudioSink](./AudioSink.md) - a single audio sinks
* [AudioSinks](./AudioSinks.md) - the collection of all audio sinks

# Other Documentation

* [To-do](./todo.md) - general todo list
* [future](./future.md) - potential future documentation (based on the write-docs-first strategy)
