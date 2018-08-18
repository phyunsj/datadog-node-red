
Node-RED payload from a `function` node to `datadog` node. 

```
msg.payload = { 
  gauge :  [ { name: 'memory.rss' , value :  memUsage.rss },
             { name : 'memory.heapTotal', value : memUsage.heapTotal }, 
             { name : 'memory.heapUsed' , value : memUsage.heapUsed  } ],
  counter : [ { name : 'memory.statsReported'} ] 
};
```

Triggers

- `datadog.gauge` ( _name, value_ ) 
- counter  -> `datadog.increment` ( _name, value_ ) or ( _name_ )
- `datadog.histogram` ( _name, value_ )
