public with sharing class MyNotesController {
    @AuraEnabled
    public static boolean saveNewNote(My_Notes__c newNote){
        try {
            insert newNote;
        } catch (DmlException e) {
            System.debug('Could not insert new note: ' + newNote);
            return false;
        }
        return true;
    }
}
