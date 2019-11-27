({
    initializeDatatable: function(component, event, helper) {
        helper.setDatatableMetadata(component, event, helper);
        helper.countRecords(component, event, helper);
        helper.fetchNotes(component, event, helper);
    },
    handleRowAction: function(component, event, helper) {
        var action = event.getParam('action');
        switch (action.name) {
            case 'editRecord':
                console.log('EDIT');                
                helper.redirectToRecordEditPage(component, event, helper);              
                break;
            case 'deleteRecord':
                helper.deleteNote(component, event, helper);
                break;
        }
    },
    previousPage: function(component, event, helper) {
        var pageNumber = component.get("v.pageNumber");
        if (pageNumber>1) {
            pageNumber--;
            component.set('v.pageNumber', pageNumber);
            helper.fetchNotes(component, event, helper);     
        }
    },
    nextPage: function(component, event, helper) {
        var pageNumber = component.get("v.pageNumber");
        var lastPageNumber = component.get("v.lastPageNumber");
        if (pageNumber<lastPageNumber) {
            pageNumber++;
            component.set('v.pageNumber', pageNumber);
            helper.fetchNotes(component, event, helper);
        }
    },
    firstPage: function(component, event, helper) {
        if (component.get('v.pageNumber') != 1) {
            component.set('v.pageNumber', 1);
            helper.fetchNotes(component, event, helper);  
        }
    },
    lastPage: function(component, event, helper) {
        var lastPageNumber = component.get('v.lastPageNumber');
        if (component.get('v.pageNumber') != lastPageNumber) {
            component.set('v.pageNumber', lastPageNumber);
            helper.fetchNotes(component, event, helper);  
        }
    },    
    search: function(component, event, helper) {
        var searchTxt = component.get("v.searchText")
        var filterTitle = '';
        var filterKeywords = '';
        if (searchTxt !== '') {
            filterTitle = helper.prepareFieldLikeFilter("Title__c", searchTxt, component.get("v.searchInTitles"));
            filterKeywords = helper.prepareFieldLikeFilter("Keywords__c", searchTxt, component.get("v.searchInKeywords"));
        }
        var filterActive = helper.prepareBooleanFieldFilter('Active__c', component.get("v.searchOnlyActive"));
        var filterStartDate = helper.prepareDateFilter("Effective_Date__c", ">", component.get("v.searchStartDate"));
        var filterEndDate = helper.prepareDateFilter("Effective_Date__c", "<", component.get("v.searchEndDate"));
        
        // prepare OR string
        var orArr = [filterTitle, filterKeywords].filter(x => x !== '');
        var orString = orArr.join(' OR ');
        if (orString !== '')
        orString = '(' + orString + ')';

        // prepare AND string
        var andArr = [orString, filterActive, filterStartDate, filterEndDate]
            .filter(x => x !== '' && x !== null && x !== undefined);
        var andString = andArr.join(' AND ');
        
        //update searchFilters in component
        component.set("v.searchFilters", andString);
        console.log(component.get("v.searchFilters"));        
    }
});
