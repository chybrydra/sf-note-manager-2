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
            "pageSize": component.get("v.pageSize")
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
            // "sth": sth
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
    prepareFieldLikeFilter: function(fieldName, searchTxt, filterActive) {
        return filterActive ? fieldName + " LIKE '%" + searchTxt + "%'" : '';
    },
    prepareBooleanFieldFilter: function(fieldName, isTrue) {
        return isTrue ? fieldName + "='true'" : '';
    },
    prepareDateFilter: function(fieldName, inequalityChar, dateValue) {
        if (dateValue===null || dateValue==='' ||dateValue===undefined) return '';
        return fieldName + inequalityChar + dateValue;
    }
});