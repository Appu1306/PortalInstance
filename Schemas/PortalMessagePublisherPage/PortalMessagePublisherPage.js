   define("PortalMessagePublisherPage", [],
        function() {
            return {
                entitySchemaName: "PortalMessage",
                mixins: {},
                attributes: {},
                methods: {
					//T4: To allow save new case even without message being filled.
					publishMessage: function() {
						var complainMessage = arguments[0] && arguments[0].Message;
                        var message = this.get("Message") || complainMessage;
						if (this.Ext.isEmpty(message) || message===undefined) {
							//overridden the function by removed the dialog box condition
							return;
						}
						this.callParent(arguments);
					},
				},
                diff: /**SCHEMA_DIFF*/[
					//T6 : To change the description of the attachments
					{
                        "operation": "merge",
                        "name": "AttachFileButton",
                        "values": {
							"caption":{
								"bindTo": "Resources.Strings.AddFileCaption"
							}
						},
                    }
                ]
            };
   });

