public with sharing class NotesManagementController {
    
    @AuraEnabled
    public static List<My_Notes__c> getNotes(Integer pageSize, Integer pageNumber){
        Integer offset = (pageNumber-1)*pageSize;
        return [SELECT  Id, 
                        Title__c, 
                        Description__c, 
                        Keywords__c, 
                        Effective_Date__c, 
                        Active__c 
                FROM    My_Notes__c
                ORDER BY Effective_Date__c DESC
                LIMIT :pageSize
                OFFSET :offset
        ];
    }

    @AuraEnabled
    public static void deleteNote(Id noteId){
        try {
            My_Notes__c noteToDelete = [SELECT Id FROM My_Notes__c WHERE Id=:noteId LIMIT 1];
            delete noteToDelete;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
    }

    @AuraEnabled
    public static Integer countNotes(){
        Integer count = Database.countQuery(
            'SELECT COUNT() FROM My_Notes__c '
        );
        return count;
    }
}
