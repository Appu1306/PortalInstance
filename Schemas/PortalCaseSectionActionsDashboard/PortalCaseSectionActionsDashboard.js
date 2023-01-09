define("PortalCaseSectionActionsDashboard", [], function() { 
      return {
            messages: {
                  "VisibiltyofDcm": {
                        mode: this.Terrasoft.MessageMode.BROADCAST,
                        direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
                  },
                  "GetVisibiltyofDcm": {
                        mode: this.Terrasoft.MessageMode.BROADCAST,
                        direction: this.Terrasoft.MessageDirectionType.PUBLISH
                  }
            },
            methods: {
                   onRender: function(){
					   //Setting portal messag etab visibility for only new mode.
                         if (this.isNewMode()){
                               var tab = this.get("TabsCollection").get("PortalMessageTab");
                        tab.set("Visible", true);
                         }
                         else{
                               var tab = this.get("TabsCollection").get("PortalMessageTab");
                        tab.set("Visible", false);
                         }
                        
                  },
				initDefaultTab: function() {
					if (this.isNewMode()){
						//Initiating default tab as portalmessagetab for new mode and hide in already existing records
                        this.set("DefaultTabName", "PortalMessageTab");
                        this.callParent(arguments);
					}
					else{
						this.set("PortalMessageTab", false);
					}
				},
				//subscribing messages for hiding DCM by stage.
                  subscribeSandboxEvents: function() {
                        this.callParent(arguments);
                        var sandbox = this.sandbox;
                        var tags = [sandbox.id];
                        sandbox.subscribe("VisibiltyofDcm", this.initVisibilityByStage, this, tags);
                        sandbox.publish("GetVisibiltyofDcm");
                  },
 
                  /*Initializes the visibility of the DCM Cycle */
                  initVisibilityByStage: function(value) {
                        this.set("DcmSchema", value);
                  },
                  
            },
            diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
      };
});
