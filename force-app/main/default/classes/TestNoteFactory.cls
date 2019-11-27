@isTest
public class TestNoteFactory {
    public static void generateMyNotes(Integer amount) {
        List<My_Notes__c> myNotes = new List<My_Notes__c>();
        for (Integer i=1; i<=amount; i++) {
            myNotes.add(
                new My_Notes__c(
                    Title__c='title' + i,
                    Description__c='desc'+i,
                    Keywords__c='key'+i
                )
            );
        }
        insert myNotes;
    }
}
