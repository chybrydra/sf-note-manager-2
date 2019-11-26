({
    initializeDatatable: function(component, event, helper) {
        helper.setDatatableMetadata(component, event, helper);
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
        console.log('prev page');
    },
    nextPage: function(component, event, helper) {
        console.log('next page');
    },
    firstPage: function(component, event, helper) {
        console.log('first page');
    },
    lastPage: function(component, event, helper) {
        console.log('last page');
    },    
});
