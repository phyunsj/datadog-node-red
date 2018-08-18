
Node-RED payload from a `function` node to `datadog` node. 

```
msg.payload = { 
  gauge :  [ { name: 'memory.rss' , value :  memUsage.rss },
             { name : 'memory.heapTotal', value : memUsage.heapTotal }, 
             { name : 'memory.heapUsed' , value : memUsage.heapUsed  } ],
  counter : [ { name : 'memory.statsReported'} ] 
};
```

- .gauge ( _name, value_ ) 
- counter  -> .increment ( _name, value_ ) or ( _name_ )
- .histogram ( _name, value_ )
