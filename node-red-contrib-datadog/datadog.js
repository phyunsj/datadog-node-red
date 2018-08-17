module.exports = function(RED) {
    "use strict";
    var os = require('os');
    var fs = require('fs');
    var dataDog = require('datadog-metrics');

    function DataDogMetrics(n) {
        RED.nodes.createNode(this,n);
        
        // 1. DataDog Account
        // API_KEY
        // APP_KEY
        // Prefix
       
        // 2. (optional) HTTPS Proxy
        // ProxyHost
        // ProxyPort
        var opts = {
           host :   n.hostname,
           prefix :  n.prefix,
           appKey : n.appkey,
           apiKey : n.apikey,
           flushIntervalSeconds : 0 // flush() flushIntervalSeconds == 0
        };
       
        //console.log( opts );
        dataDog.init( opts );
            
        var node = this;

        node.on('input', function(msg) {
            if ( opts.apiKey === "" || opts.apiKey === undefined ) {
                node.status({fill:"red",shape:"dot",text:"Invalid API Key"});
            } else {
                node.status({fill:"green",shape:"dot",text:"connected"});
                var report = msg.payload;

                if ( report.gauge !== undefined ) {
                    for ( var m in report.gauge ) {
                       console.log( report.gauge[m].name, report.gauge[m].value  );
                       dataDog.gauge( report.gauge[m].name, report.gauge[m].value );
                    }
                    
                }
                if ( report.counter !== undefined ) {
                    for ( var m in report.counter ) {
                        console.log( report.counter[m].name );
                        if ( report.gauge[m].value !== undefined )
                          dataDog.increment( report.counter[m].name, report.counter[m].value );
                        else 
                          dataDog.increment( report.counter[m].name );
                    }    
                }
                if ( report.histogram !== undefined ) {
                    for ( var m in report.histogram ) {
                        console.log( report.histogram[m].name, report.histogram[m].value  );
                        dataDog.histogram( report.histogram[m].name, report.histogram[m].value );
                    }
                }
            
                dataDog.flush( );
                
            }
        });
        
    }

    RED.nodes.registerType("datadog-metrics", DataDogMetrics);
}

