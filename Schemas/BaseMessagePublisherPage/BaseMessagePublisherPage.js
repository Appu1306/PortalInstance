define("BaseMessagePublisherPage", ["ServiceHelper", "MaskHelper", "css!BaseMessagePublisherModule",
    "ConfigurationFileApi"],
    function(ServiceHelper, MaskHelper) {
        return {
                messages: {
                },
                diff: /**SCHEMA_DIFF*/[
                    {
                    "operation": "merge",
                    "name": "PublishButton",
                    "propertyName": "items",
                    "parentName": "PublishButtonContainer",
                    "values": {
                        "caption": {
                            "bindTo": "Resources.Strings.PublishButtonCaptionV2" //Changed the localizable string 
                        },
                    },
                    },
                ],
                attributes: {
                },
                methods: {

                },

        };
    });