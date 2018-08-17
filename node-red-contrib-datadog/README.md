
Node-RED payload format 

```
msg.payload = { 
  gauge :  [ { name: 'memory.rss' , value :  memUsage.rss },
             { name : 'memory.heapTotal', value : memUsage.heapTotal }, 
             { name : 'memory.heapUsed' , value : memUsage.heapUsed  } ],
  counter : [ { name : 'memory.statsReported'} ] 
};
```
