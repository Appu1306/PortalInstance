 define("BaseDataView", ["terrasoft", "ConfigurationEnums", "ConfigurationConstants", "RightUtilities", 
      "ProcessModuleUtilities", "AcademyUtilities", "MenuUtilities", "TagConstantsV2",
      "performancecountermanager", "BaseDataViewResources", "DefaultProfileHelper", "ChangeLogUtilities",
      "FixedSectionGridCaptionsPlugin", "SysModuleAnalyticsReport", "TagUtilitiesV2", "GridUtilitiesV2", "DataUtilities",
      "ProcessEntryPointUtilities", "ProcessEntryPointUtilities", "BaseSectionGridRowViewModel",
      "HistoryStateUtilities", "PrintReportUtilities", "SecurityUtilities", "css!QuickFilterModuleV2",
      "WizardUtilities", "ContextHelpMixin", "CheckModuleDestroyMixin", "DcmMixin", "EmailLinksMixin",
      "FileImportMixin", "css!BaseSectionV2CSS", "FilterUtilities","css!UsrCssforDescription"
], function(Terrasoft, ConfigurationEnums, ConfigurationConstants, RightUtilities, ProcessModuleUtilities,
            AcademyUtilities, MenuUtilities, TagConstantsV2, performanceManager, resources, DefaultProfileHelper,
            changeLogUtilities, fixedSectionGridCaptionsPlugin, SysModuleAnalyticsReport) {
      return {
            methods:{
                  prepareEmptyGridMessageConfig: function(config) { 

                        const historyStateInfo = this.getHistoryStateInfo(); 

                        if (historyStateInfo.workAreaMode === ConfigurationEnums.WorkAreaMode.COMBINED) { 

                        return; 

                        } 

                         else if(this.entitySchemaName =="Case"){ 

                        return;       

                         } 

                         else{ 

                         const emptyGridMessageProperties = this.getDefaultEmptyGridMessageProperties(); 

                        const filterKey = this.getLastFilterKey(); 

                        const quickFilters = ["FixedFilters", "CustomFilters"]; 

                        if (filterKey === "FolderFilters") { 

                        const currentFilter = this.get("CurrentFolder"); 

                        if (currentFilter && 

                        (currentFilter.folderType.value === ConfigurationConstants.Folder.Type.Search)) { 

                        if (this.$QueryOptimizationFailed) { 

                        this._applyQueryOptimizationFailedGridMessageParameters(emptyGridMessageProperties); 

                        }  

                        else { 

                        this.applyEmptyDynamicFolderGridMessageParameters(emptyGridMessageProperties); 

                        } 

                        } 

                        else { 

                        this.applyEmptyFolderGridMessageParameters(emptyGridMessageProperties); 

                        } 

                        }  

                         else if (filterKey === TagConstantsV2.TagFilterKey) { 

                        this.applyEmptyFilterResultGridMessageParameters(emptyGridMessageProperties); 

                        }  

                         else if (quickFilters.indexOf(filterKey) >= 0) { 

                        this.applyEmptyFilterResultGridMessageParameters(emptyGridMessageProperties); 

                        } 

                        const emptyGridMessageViewConfig = 

                          this.getEmptyGridMessageViewConfig(emptyGridMessageProperties); 

                        Ext.apply(config, emptyGridMessageViewConfig); 

                         } 

                         },
            },    
            
      };
      });
