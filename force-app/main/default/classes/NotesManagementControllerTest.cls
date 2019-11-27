@isTest
public class NotesManagementControllerTest {
    
    @TestSetup
    static void init(){
        TestNoteFactory.generateMyNotes(10);
    }

    @isTest
    static void testInitializationWentWell() {
        System.assertEquals(10, [SELECT Id FROM My_Notes__c].size());
    }

    @isTest
    static void getNotesShouldReturnTenNotes() {
        List<My_Notes__c> notes = new List<My_Notes__c>();
        Test.startTest();
        notes = NotesManagementController.getNotes(20, 1, '');
        Test.stopTest();
        System.assertEquals(10, notes.size());
    }

    @isTest
    static void getNotesShouldReturnFiveNotes() {
        List<My_Notes__c> notes = new List<My_Notes__c>();
        Test.startTest();
        notes = NotesManagementController.getNotes(5, 1, '');
        Test.stopTest();
        System.assertEquals(5, notes.size());
    }

    @isTest
    static void getNotesShouldReturnNoNotes() {
        List<My_Notes__c> notes = new List<My_Notes__c>();
        Test.startTest();
        notes = NotesManagementController.getNotes(5, 3, '');
        Test.stopTest();
        System.assertEquals(0, notes.size());
    }

    @isTest
    static void deleteNoteTest() {
        My_Notes__c theNote = null;
        List<My_Notes__c> noteAfterDelete = null;
        Test.startTest();
        theNote = [SELECT Id FROM My_Notes__c LIMIT 1];
        NotesManagementController.deleteNote(theNote.Id);
        noteAfterDelete = [SELECT Id FROM My_Notes__c WHERE Id=:theNote.Id LIMIT 1];
        Test.stopTest();
        System.assert(theNote.Id != null);
        System.assertEquals(0, noteAfterDelete.size());
    }

    @isTest
    static void countNotesReturns10Records() {
        Integer notesNumber;
        Test.startTest();
        notesNumber = NotesManagementController.countNotes('');
        Test.stopTest();
        System.assertEquals(10, notesNumber);
    }
}
