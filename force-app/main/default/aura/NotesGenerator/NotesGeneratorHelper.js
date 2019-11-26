({
    createNote: function(component, newNote) {
        var action = component.get("c.saveNewNote");
        action.setParams({
            "newNote": newNote
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                Console.log('SUCCESS!!!!');
                // var expenses = component.get("v.expenses");
                // expenses.push(response.getReturnValue());
                // component.set("v.expenses", expenses);
            }
        });
        $A.enqueueAction(action);
    }
})
