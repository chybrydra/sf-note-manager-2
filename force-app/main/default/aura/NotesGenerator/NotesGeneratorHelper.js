({
    createNote: function(component, newNote) {
        var action = component.get("c.saveNewNote");
        action.setParams({
            "newNote": newNote
        });
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been created successfully.",
            "type": "success"
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('SUCCESS!!!!');
                toastEvent.fire();
            }
            var emptyNote ={ 'sobjectType': 'My_Notes__c',
                            'Title__c': '',
                            'Description__c': '',
                            'Keywords__c': '',
                            'Effective_Date__c': '',
                            'Active__c': false }
            component.set("v.newNote", emptyNote);
        });
        $A.enqueueAction(action);
    }
})
