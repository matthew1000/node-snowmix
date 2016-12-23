# Future gazing

This describes what this library would hope to offer in the future.

## Outputs

Snowmix outputs to shared memory, which a gstreamer process can access. This library can create that gstreamer process for you.

```js
snowmix.createGstreamerOutput({type: 'file'})
.then(status => { ... })
.catch(e => { console.error('Oh no:', e)})
```

Output types available are:

* ```file``` - writing to a file
* ```rtmp``` - sending an RTMP stream (e.g. to YouTube, Facebook Live, or your own RTMP server)
* ```tcp``` - outputting to a TCP server (Using gstreamer's ```tcpserversink```)

### Multiple outputs

As described (here)[https://sourceforge.net/p/snowmix/discussion/Snowmix_Support_Forum/thread/a81d3117/], it's possible to have multiple 'secondary' outputs, by going via a TCP output server. e.g.

<pre>
                                   +----------------+
                              |--> | Facebook RTMP  |
                              |    +----------------+
+---------+     +---------+   |
| Snowmix | --> | TCP Out | --|
+---------+     +---------+   |
                              |    +----------------+
                              |--> |  YouTube RTMP  |
                                   +----------------+
</pre>

This could be achieved with:

```js
snowmix.createGstreamerOutput({type: 'tcp'})
.then(status => {
    return snowmix.createSecondaryGstreamerOutput({type: 'rtmp'})
})
.then(status => {
    return snowmix.createSecondaryGstreamerOutput({type: 'rtmp'})
})
```

You can have as many secondary outputs as you like (subject to the limits of your system). They can be a combination of the 'rtmp', 'file' and 'tcp' types.
