public with sharing class MyNotesController {
    @AuraEnabled
    public static void saveNewNote(My_Notes__c newNote){
        try {
            insert newNote;
        } catch (DmlException e) {
            System.debug('Could not insert new note: ' + newNote);
        }
        System.debug('Note saved successfully: ' + newNote);
    }
}
