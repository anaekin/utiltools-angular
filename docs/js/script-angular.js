/* globals angular */
var app = angular.module('app', ['ngRoute']);
app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown", function (event) {
            if (event.which === 13 || event.keyCode === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);

                });

                event.preventDefault();
            }
        });
    };
});
app.controller('MainController', function MainController($scope, $http) {
    $scope.NUM = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    $scope.OPS = ['+', '-', '/', '*', '='];
    $scope.NAV_ITEMS = [
        {
            title: 'Calculator',
            ref: '#!calculator'
                }, {
            title: 'To-Do List',
            ref: '#!todo-list'
                }, {
            title: 'Notepad',
            ref: '#!notepad'
                }
            ];

    $scope.todoItemList = [
        {
            text: 'Java Training',
            val: false
        },
        {
            text: 'UI Training',
            val: false
        }
    ];
    $scope.inputSeq = '';
    $scope.first = '';
    $scope.res = 0;
    $scope.seq = [{
        varNumber: "",
        operator: ""
    }];
    $scope.set = function (item) {
        $scope.number = item;
    };
    $scope.setVar = function (index) {
        if ($scope.seq[0].varNumber && !$scope.seq[0].operator) {
            $scope.seq[0].varNumber = '';
            $scope.first = '';
        }
        $scope.first = $scope.first + $scope.NUM[index];
        $scope.inputSeq = $scope.first;
    };
    // Creating operand if number is being entered or creating 'operator' if operator is entered EX: 123 + 1234 = 
    $scope.setOp = function (item) {
        $scope.op = $scope.OPS[item];
        if ($scope.op === '=') {
            $scope.seq.push({
                varNumber: $scope.first,
                operator: $scope.op
            });
            $scope.calculate($scope.seq);
        } else {
            //  console.log(' ' + $scope.op + ' ');
            // $scope.res = $scope.res + parseInt($scope.first);
            var length = $scope.seq.length;
            if ($scope.seq[0].varNumber && !$scope.seq[0].operator) {
                $scope.seq[0].operator = $scope.op;
            } else if (!$scope.seq[0].varNumber && !$scope.seq[0].operator) {
                $scope.seq[0].varNumber = $scope.first;
                $scope.seq[0].operator = $scope.op;
            } else if ($scope.seq[length - 1].varNumber && !$scope.first) {
                $scope.seq[length - 1].operator = $scope.op;
            } else {
                $scope.seq.push({
                    varNumber: $scope.first,
                    operator: $scope.op
                });
            }
            //        console.log($scope.seq);
            $scope.first = '';
        }
    };

    // Using loop to add 'varNumber' in 'seq' variable
    $scope.calculate = function (item) {
        for (var i = 0; i < item.length - 1; i++) {
            // console.log($scope.seq);
            var operand_one = item[i].varNumber;
            var operand_two = item[i + 1].varNumber;
            var operator = item[i].operator;
            $scope.inputSeq = $scope.calc(operand_one, operand_two, operator); // call calc function to do operations
            item[i + 1].varNumber = $scope.inputSeq; // update next varNumber to the current result
            // console.log($scope.calc(operand_one, operand_two, operator));
        }
        $scope.seq = [];
        $scope.seq.push({
            varNumber: $scope.inputSeq,
            operator: ''
        });
        $scope.first = $scope.inputSeq; // If someone chooses to continue operations after '=' operation
        //console.log($scope.seq);
    };
    //Operation based on value of operator otherwise return empty string
    $scope.calc = function (one, two, operator) {
        switch (operator) {
            case '+':
                return parseFloat(one) + parseFloat(two);
            case '-':
                return parseFloat(one) - parseFloat(two);
            case '/':
                return parseFloat(one) / parseFloat(two);
            case '*':
                return parseFloat(one) * parseFloat(two);
            default:
                return "";
        }
    };
    // Using 'C' to clear all variables
    $scope.clear = function () {
        $scope.seq = [{
            varNumber: "",
            operator: ""
        }];
        $scope.inputSeq = '';
        $scope.first = '';
        $scope.op = '';
        $scope.res = 0;
    };
    $http.get('person_details.json').then(function (response) {
        //console.log(data);
        $scope.welcome = response.data.records;
        console.log($scope.welcome.person.first_name);
        //defer.resolve();
    }).catch(function onError(response) {
        console.log("Created By:", response);
    });


    $scope.master = {};
    $scope.notepadTitle = {
        value: 'Notes'
    };
    $scope.notepadValue = {
        value: ''
    };
    $scope.todoTitle = {
        value: 'Item List'
    };
    $scope.todoValue = {
        value: ''
    };
    $scope.renameNotepad = function () {
        if ($scope.notepadValue.value) {
            $scope.notepadTitle.value = $scope.notepadValue.value;
        }
        $scope.notepadValue = angular.copy($scope.master);
    };
    $scope.renameTodo = function () {
        if ($scope.todoValue.value) {
            $scope.todoTitle.value = $scope.todoValue.value;
        }
        $scope.todoValue = angular.copy($scope.master);
    };

    $scope.listItem = {};
    $scope.addListItem = function () {
        if ($scope.listItem.text) {
            $scope.listItem.val = false;
            $scope.todoItemList.push($scope.listItem);
        }
        $scope.listItem = {};
        // console.log($scope.todoItemList);
    };
    $scope.removeListItem = function () {

        for (var i = $scope.todoItemList.length - 1; i >= 0; i--) {
            if ($scope.todoItemList[i].val) {
                $scope.todoItemList.splice($scope.todoItemList[i], 1);
            }
        }
    };

});
app.config(['$routeProvider', '$locationProvider', function ($routeProvider) {
    $routeProvider.when('/calculator', {
        templateUrl: "docs/pages/calculator-new.html"
    }).when('/todo-list', {
        templateUrl: "docs/pages/todo-list.html"
    }).when('/notepad', {
        templateUrl: "docs/pages/notepad.html"
    }).when('/', {
        templateUrl: "docs/pages/calculator-new.html"
    });
}]);
