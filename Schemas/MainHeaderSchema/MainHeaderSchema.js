 define("MainHeaderSchema", [], function() {
      return {
            properties: {
                  
            },
            attributes: {
                  
            },
            messages: {
                  "SectionName": {
                "mode": Terrasoft.MessageMode.PTP,
                "direction": Terrasoft.MessageDirectionType.PUBLISH
            },
            },
            mixins: {
                  
            },
            methods: {

                  commandLineForCurrentUserEnable: function() {
                        
                        var schemaName = this.sandbox.publish("SectionName", null, ["SectionName"]);
                if(schemaName == "Case" ){    
                   return false;
                }
                else{
                        var userTypeSSP = this.$IsSSP;
                              var globalSearchEnabled = this.$IsGlobalSearchEnable;
                              var isEnabledIfUserSSP = userTypeSSP && globalSearchEnabled;
                              return isEnabledIfUserSSP || !userTypeSSP;
               }
                        
                  },
                  init:function(){    
                this.callParent(arguments);
                this.sandbox.registerMessages(this.messages);
            },                
            },
            diff: [
                  ]
      };
});

