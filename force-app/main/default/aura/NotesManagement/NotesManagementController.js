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
        component.set('v.pageNumber', 1);
        helper.fetchNotes(component, event, helper);  
    },
    lastPage: function(component, event, helper) {
        var lastPageNumber = component.get('v.lastPageNumber');
        component.set('v.pageNumber', lastPageNumber);
        helper.fetchNotes(component, event, helper);  
    },    
    search: function(component, event, helper) {
        console.log('search in titles: ' + component.get("v.searchInTitles"));
        console.log('search in keywords: ' + component.get("v.searchInKeywords"));
        console.log('search only active: ' + component.get("v.searchOnlyActive"));
        console.log('search from: ' + component.get("v.searchStartDate"));
        console.log('search to: ' + component.get("v.searchEndDate"));
        console.log('search phrase: ' + component.get("v.searchText"));
    }
});
