/*globals angular*/

angular.module('app.todo', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/todo-list', {
            templateUrl: "app/components/todo/todo-list.html",
            controller: "TodoController",
            controllerAs: "todo"
        });
}])
    .controller('TodoController', ['myService', function (myService) {
        this.todoValue = {
            value: ''
        };
        this.todoItemList = myService.todoItemList;
        this.todoTitle = myService.todoTitle;

        this.master = {};
        this.listItem = {};
        /**************************      TODO-List     **************************************************************/
        this.renameTodo = function () {
            if (this.todoValue.value) {
                this.todoTitle.value = this.todoValue.value;
                myService.updateTodoTitle(this.todoTitle);
            }
            this.todoValue = angular.copy(this.master);
        };
        /****************************** Adding item to TODO List ****************************************************/
        this.addListItem = function () {
            if (this.listItem.text) {
                this.listItem.val = false;
                myService.addItem(this.listItem);
            }
            this.listItem = {};
            //console.log(MyService);
            // console.log(this.todoItemList);
        };

        /****************************** Removing Item from TODO List ****************************************************/
        this.removeListItem = function () {
            console.log("Todo Controller", this.todoItemList);
            console.log("Todo Service", myService.todoItemList);
            myService.remove();
            this.todoItemList = myService.todoItemList;
        };
}]);
