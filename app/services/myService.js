/*globals angular*/
var app = angular.module('app');
app.factory('myService',['$http', function () {
    return {
        currentTab:{
            value: 0
        },
        todoTitle: {
            value: 'Item List'
        },
        notepadTitle: {
            value: 'Notes'
        },
        notepadData:{
            value:''
        },
        todoItemList: [
            {
                text: 'Java Training',
                val: false
        },
            {
                text: 'UI Training',
                val: false
        }],
        updateTodoTitle: function (n) {
            this.todoTitle = n;
        },
        updateNotepadTitle: function (n) {
            this.notepadTitle = n;
        },
        saveNotepadData: function(n){
            this.notepadData = n;
        },
        addItem: function (t) {
            this.todoItemList.push(t);
        },
        remove: function () {
            this.todoItemList = this.todoItemList.filter(function (item) {
                return !item.val;
            });
        }
    };
}]);
