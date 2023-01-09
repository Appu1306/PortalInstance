define("PortalCasePage", ["BaseDataView","BaseMessagePublisherPage","PortalMessagePublisherPage"], 
            function() {
                  return {
                        entitySchemaName: "Case",
                        details: /**SCHEMA_DETAILS*/{},
                        attributes: {
                              "UseTagModule": {
                        dataValueType: Terrasoft.DataValueType.BOOLEAN,
                        value: false
                  },
							//attribute to get status value to hide DCM
                        "Status": {
                        dependencies: [{
                              columns: ["Status"],
                              methodName: "publishVisibilityByStage"
                        }]
                  }
            },
            messages:{
				"SectionName": {
                "mode": Terrasoft.MessageMode.PTP,
                "direction": Terrasoft.MessageDirectionType.SUBSCRIBE
            },
                  "VisibiltyofDcm": {
                        mode: this.Terrasoft.MessageMode.BROADCAST,
                        direction: this.Terrasoft.MessageDirectionType.PUBLISH
                  },
                  "GetVisibiltyofDcm": {
                        mode: this.Terrasoft.MessageMode.BROADCAST,
                        direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
                  }
            },
           
            diff: /**SCHEMA_DIFF*/[
                   {
                              "operation": "insert",
                              "parentName": "CardContentContainer",
                              "name": "BasePageReplacedContainer",
                              "propertyName": "items",
                              "values": {
                                    "itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
                                    "items": []
                              },
                        "index": 0
          },
          {
                              "operation": "insert",
                              "parentName": "BasePageReplacedContainer",
                              "propertyName": "items",
                              "name": "CreatedOn",
                        "bindTo": "CreatedOn",
                        "values": {
                        "layout": {
                                          "colSpan": 12,
                                          "rowSpan": 1,
                                          "column": 0,
                                          "row": 0,
                              "layoutName": "BasePageReplacedContainer"
                                    },
                    }
 
                  },
                  {
                              "operation": "insert",
                              "parentName": "BasePageReplacedContainer",
                              "propertyName": "items",
                              "name": "CreatedBy",
                              "bindTo": "CreatedBy",
                        "values": {
                        "className": "Terrasoft.LookupEdit",
                        "layout": {
                                          "colSpan": 12,
                                          "rowSpan": 1,
                                          "column": 0,
                                          "row": 1,
                              "layoutName": "BasePageReplacedContainer"
                                    },
                    }
                  },
            {
                              "operation": "insert",
                              "parentName": "BasePageReplacedContainer",
                              "propertyName": "items",
                              "name": "ModifiedOn",
                        "bindTo": "ModifiedOn",
                        "values": {
                        "layout": {
                                          "colSpan": 12,
                                          "rowSpan": 1,
                                          "column": 12,
                                          "row": 0,
                              "layoutName": "BasePageReplacedContainer"
                                    },
                    }
 
                  },
          {
                              "operation": "insert",
                              "parentName": "BasePageReplacedContainer",
                              "propertyName": "items",
                              "name": "ModifiedBy",
                        "bindTo": "ModifiedBy",
                        "values": {
                        "layout": {
                                          "colSpan": 12,
                                          "rowSpan": 1,
                                          "column": 12,
                                          "row": 1,
                              "layoutName": "BasePageReplacedContainer"
                                    },
                    }
 
                  },
                  
                {
                              "operation": "remove",
                              "name": "PortalMessageBody"
                        },

                              {
                              "operation": "remove",
                              "name": "ComplainButton",
                              "parentName": "CombinedModeActionButtonsCardLeftContainer",
                              "propertyName": "items",
                        },
                              {
                                    "operation":"remove",
                                "name": "SaveButton",
                              },
                              {
                                    "operation": "remove",                           
                                "name": "DiscardChangesButton",
                              },
                   {
                              "operation": "merge",
                              "parentName": "ActionDashboardContainer",
                              "name": "ActionsDashboardModule",
                              "propertyName": "items",
                              "values": {
                                    "itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
                                    "items": []
                              },
                        "index": 2
          },
         
                              
                        ],
            modules: {},
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

				
				
				
				
				
                   //Redirecting the page to section page after a new record is created
                        onSaved: function() {
                              this.callParent(arguments);
                              this._closePage(true);
                        },        
                  
                   //Task 2 remove buttons in portal case section 
                   initActionButtonMenu: function() {
                        this.set("ActionsButtonVisible", false);
             },
				//Subscribing messages
                  subscribeSandboxEvents: function() {
                        this.callParent(arguments);
                        this.sandbox.subscribe("GetVisibiltyofDcm", this.publishVisibilityByStage, this);
                  },
				//Dcm visibility conditions
                  publishVisibilityByStage: function() {
                        var moduleIds = this.getModuleIds();
                        moduleIds.push(this.sandbox.id);
                        var value = this.get("Status").value;
                        if(value=="ae5f2f10-f46b-1410-fd9a-0050ba5d6c38"){
                              this.sandbox.publish("VisibiltyofDcm", false, moduleIds);
                        } 
                  },
                  //Hide Show Message Button for status=New Records  
                  getIsMessageHistoryV2FeatureDisabled:function(){
                              return false;
                  },
                  setMessageHistoryVisible: function() {
                        var StageId= this.get("Status").value;
                if(StageId === "AE5F2F10-F46B-1410-FD9A-0050BA5D6C38"){                                       
                                    this.$IsMessageHistoryVisible = false;
                              }
                        else{
                                    this.$IsMessageHistoryVisible = true;
                        }
                  },
                  onEntityInitialized: function(){
                this.callParent(arguments);
                this.showTabsForAllStagesExceptNew();
            },
            showTabsForAllStagesExceptNew: function(){
                var tabNames = {
                    Processing: "ProcessingTab",
                        
                };
                        var StageId= this.get("Status").value;
                if(StageId !== "ae5f2f10-f46b-1410-fd9a-0050ba5d6c38"){ 
                              this.hideTabByName(tabNames.Processing, false); 
                       
                    }
                        else{
                                     this.hideAllDynamicTabs(tabNames);       
                              }               
            },
            hideAllDynamicTabs: function(tabNamesConfig){
                this.hideTabByName(tabNamesConfig.Processing, true);               
            },
            hideTabByName: function(tabName, isHide){ 
                var tabsCollection = this.get("TabsCollection"); 
                if(tabsCollection){
                    var tabIndex = tabsCollection.collection.keys.indexOf(tabName); 
                    var tabsPanelDomElement = document.getElementById("PortalCasePageTabsTabPanel-tabpanel-items");
                    if(tabsPanelDomElement){
                        tabDomElement = tabsPanelDomElement.querySelector('[data-item-index="'+tabIndex.toString()+'"]');
                                          this.set("PortalCasePageTabsContainerContainer",false);
                        if(tabDomElement){
                            if(isHide){
                                tabDomElement.style.display = "none";
                            }else{
                                tabDomElement.style.display = null;
                            }
                        }
                    }
                    
                      
                }
                 

            },
                  // Hide Tab Ends Here
                  
                  //Goparna: T2 Task: Change the headline of new case: Starts here
                  getPageHeaderCaption: function() {
                        var template = this.getPageHeaderTemplate();
                        if (this.isNewMode()) {
                            template = this.get("Resources.Strings.PortalPageHeaderV2");
                            return template;
                        }
                        var number = this.get("Number");
                        var subject = this.get("Subject");
                        return this.Ext.String.format(template, number, subject);
                    },
                  //Goparna: T2 Task: Change the headline of new case: Ends here
                  
                  //Goparna: Ep3 Task: Change Header Template to portal section title: starts here
                  getPageHeaderTemplate: function() {
                                    return this.isNewMode() ?
                                                this.get("Resources.Strings.DefaultHeader") :
                                                this.get("Resources.Strings.HeaderTemplate");
                              },
                  //Goparna: Ep3 Task: Change Header Template to portal section title: ends here
            },
                  };
            });
