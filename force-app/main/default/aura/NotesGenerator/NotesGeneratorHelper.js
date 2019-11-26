({
    createNote: function(component, newNote) {
        var action = component.get("c.saveNewNote");
        action.setParams({
            "newNote": newNote
        });
        var toastEvent = $A.get("e.force:showToast");
        console.log('TOAST EVENT: ' + toastEvent);
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been created successfully.",
            "type": "success"
        });
        console.log('TOAST EVENT2: ' + toastEvent);
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('SUCCESS!!!!');
                toastEvent.fire();
                // var expenses = component.get("v.expenses");
                // expenses.push(response.getReturnValue());
                // component.set("v.expenses", expenses);
            }
        });
        $A.enqueueAction(action);
    }
})
