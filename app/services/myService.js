/*globals angular*/
var app = angular.module('app');
app.factory('MyService', function () {
    return {
        todoTitle: {
            value: 'Item List'
        },
        notepadTitle: {
            value: 'Notes'
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
        addItem: function (t) {
            this.todoItemList.push(t);
        },
        remove: function () {
            this.todoItemList = this.todoItemList.filter(function (item) {
                return !item.val;
            });
        }
    };
});
