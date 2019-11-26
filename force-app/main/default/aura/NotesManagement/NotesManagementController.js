({
    initializeDatatable: function(component, event, helper) {
        helper.setDatatableMetadata(component, event, helper);
        helper.fetchNotes(component, event, helper);
    },
    handleRowAction: function(component, event, helper) {
        var action = event.getParam('action');
        switch (action.name) {
            case 'editRecord':
                console.log('EDIT')
                break;
            case 'deleteRecord':
                helper.deleteNote(component, event, helper);
                break;
        }
    },
});
