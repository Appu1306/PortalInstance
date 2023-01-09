define("PortalCaseSection", [], function() { 
      return {
            entitySchemaName: "Case",
            attributes: {
                  "UseTagModule": {
                        dataValueType: Terrasoft.DataValueType.BOOLEAN,
                        value: false
                  }
            },
            messages:{
                  "SectionName": {
                "mode": Terrasoft.MessageMode.PTP,
                "direction": Terrasoft.MessageDirectionType.SUBSCRIBE
            },
            },
            
            details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
            diff: /**SCHEMA_DIFF*/[
                   //Task 2 remove buttons in portal case section SL starts here
                  {
                    "operation": "remove",
                    "name": "ComplainButton",
                    "parentName": "CombinedModeActionButtonsCardLeftContainer",
                    "propertyName": "items",

                  },
                  {
                        "operation": "merge",
                        "name": "SeparateModeAddRecordButton",
                        "parentName": "SeparateModeActionButtonsLeftContainer",
                        "propertyName": "items",
                        "values": {
                              "caption": {"bindTo":"Resources.Strings.AddRecordButtonCaption"},
                        }
                  },
                  //T3: Hide the main “save” and “void” buttons
                  {
                        "operation": "remove",
                        "name": "SaveRecordButton",
                  },
                  {
                        "operation": "remove",
                        "name": "DiscardChangesButton",
                  },
                  //Task 2 remove buttons in portal case section SL ends here
                  
            ]/**SCHEMA_DIFF*/,
            methods: {
                  sendMessageToMainHeader:function(){
                this.getSchemaName(function(response){
                    if(response !== null){
                        this.sandbox.subscribe("SectionName", function() {
                            return response; }, this, ["SectionName"]);
                    }
                });
            },
            getSchemaName: function(callback,scope){
                callback.call(scope || this, this.entitySchemaName);            
            },

                  init: function() {
                        
                        this.callParent(arguments);   
                        this.sendMessageToMainHeader();
                  },
            }
                  
      };
});
