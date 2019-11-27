({
    setDatatableMetadata: function(component, event, helper) {
        var actions = [
            { label: 'Edit', name: 'editRecord'},
            { label: 'Delete', name: 'deleteRecord'}
        ];
        component.set('v.columns', [
            {label: 'Title', fieldName: 'linkName', type: 'url', typeAttributes: 
                {label: { fieldName: 'Title__c' }, target: '_self'}},
            {label: 'Description', fieldName: 'Description__c', type: 'text'},
            {label: 'Keywords', fieldName: 'Keywords__c', type: 'text'},
            {label: 'Effective Date', fieldName: 'Effective_Date__c', type: 'date', typeAttributes: {  
                day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit',  
                minute: '2-digit', second: '2-digit', hour12: false}},
            {label: 'Active?', fieldName: 'Active__c', type: 'boolean'},
            { type: 'action', typeAttributes: { rowActions: actions } }
        ]);

    },
    fetchNotes: function(component, event, helper) {
        var action = component.get("c.getNotes");
        action.setParams({
            "pageNumber": component.get("v.pageNumber"),
            "pageSize": component.get("v.pageSize"),
            "filters": component.get("v.searchFilters")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var records =response.getReturnValue();
                records.forEach(function(record){
                    record.linkName = '/'+record.Id;
                });
                component.set("v.noteList", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    deleteNote: function(component, event, helper) {
        var row = event.getParam('row');
        var noteTitle = row.Title__c;
        var deleteAction = component.get("c.deleteNote");
        deleteAction.setParams({
            "noteId": row.Id
        });
        deleteAction.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var message = "Note deleted successfully: " + noteTitle;
                helper.fireSuccessEvent(component, event, helper, message);
                helper.countRecords(component, event, helper);
                helper.fetchNotes(component, event, helper);
            }
        });
        $A.enqueueAction(deleteAction);
    },
    fireSuccessEvent: function(component, event, helper, message) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": message,
            "type": "success"
        });
        toastEvent.fire();
    },
    redirectToRecordEditPage: function(component, event, helper) {
        var row = event.getParam('row');
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": row.Id,
            "slideDevName": "Detail"
        });
        navEvt.fire();  
    },
    countRecords: function(component, event, helper) {
        var countAction = component.get("c.countNotes");
        countAction.setParams({
            "filters": component.get("v.searchFilters")
        });
        countAction.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.recordCount", response.getReturnValue());
                helper.calculatePageNumber(component, event, helper);
            }
        });
        $A.enqueueAction(countAction);
    },
    calculatePageNumber: function(component, event, helper) {
        var recordCount = component.get('v.recordCount');
        var pageSize = component.get('v.pageSize');
        var amountOfPages = 
            recordCount%pageSize==0 
            ? Math.floor(recordCount/pageSize) 
            : Math.floor(recordCount/pageSize) + 1;
        component.set('v.lastPageNumber', amountOfPages);
    },
    updateSearchFiltersForQuery: function(component, event, helper) {
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
        
        var orString = helper.prepareOrString([filterTitle, filterKeywords]);
        var andString = helper.prepareAndString([orString, filterActive, filterStartDate, filterEndDate]);

        component.set("v.searchFilters", andString);
    },
    prepareFieldLikeFilter: function(fieldName, searchTxt, filterActive) {
        return filterActive ? fieldName + " LIKE '%" + searchTxt + "%'" : '';
    },
    prepareBooleanFieldFilter: function(fieldName, isTrue) {
        return isTrue ? fieldName + "=TRUE" : '';
    },
    prepareDateFilter: function(fieldName, inequalityChar, dateValue) {
        if (dateValue===null || dateValue==='' ||dateValue===undefined) return '';
        return fieldName + inequalityChar + dateValue;
    }, 
    prepareOrString: function(arrayOfFilters) {
        var orArr = arrayOfFilters.filter(x => x !== '');
        var orString = orArr.join(' OR ');
        if (orString !== '') orString = '(' + orString + ')';
        return orString;
    },
    prepareAndString: function(arrayOfFilters) {
        var andArr = arrayOfFilters.filter(x => x !== '' && x !== null && x !== undefined);
        return andArr.join(' AND ');
    },
});