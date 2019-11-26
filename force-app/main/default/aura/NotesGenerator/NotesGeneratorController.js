({
    clickCreateNewNote: function(component, event, helper) {
        var validNote = component.find('noteform').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        if(validNote){
            var newNote = component.get("v.newNote");
            helper.createNote(component, newNote);
        }
    },
})
