@isTest
public class MyNotesControllerTest {
    
    @isTest
    private static void saveNewNoteShouldInsertOneNote() {
        My_Notes__c newNote = new My_Notes__c(
            Title__c='title1',
            Description__c='desc1',
            Keywords__c='key1'
        );
        Test.startTest();
        MyNotesController.saveNewNote(newNote);
        Test.stopTest();
        System.assertEquals(1, [SELECT Id FROM My_Notes__c].size());
    }

    @isTest
    private static void saveNewNoteShouldNotBeInserted() {
        My_Notes__c newNote = new My_Notes__c();
        boolean exceptionWasThrown = false;
        Test.startTest();
        try {
            MyNotesController.saveNewNote(newNote);
        } catch (DmlException e) {

        }
        Test.stopTest();
        System.assertEquals(0, [SELECT Id FROM My_Notes__c].size());
    }
}
