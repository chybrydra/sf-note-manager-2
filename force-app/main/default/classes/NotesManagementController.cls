public with sharing class NotesManagementController {
    
    @AuraEnabled
    public static List<My_Notes__c> getNotes(Integer pageSize, Integer pageNumber, String filters){
        Integer offset = (pageNumber-1)*pageSize;
        String whereFilters = filters == '' || filters == null ? '' : ' WHERE ' + filters + ' ';
        return Database.query(
            'SELECT  Id, Title__c, Description__c, Keywords__c, Effective_Date__c, Active__c '+
            'FROM My_Notes__c ' +
            whereFilters + 
            'ORDER BY Effective_Date__c DESC ' +
            'LIMIT ' + pageSize + ' ' +
            'OFFSET ' + offset
        );
       
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
    public static Integer countNotes(String filters){
        String whereFilters = filters == '' || filters == null ? '' : ' WHERE ' + filters;
        Integer count = Database.countQuery(
            'SELECT COUNT() FROM My_Notes__c ' + whereFilters
        );
        return count;
    }
}
