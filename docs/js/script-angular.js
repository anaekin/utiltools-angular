/* globals angular */
var app = angular.module('app', ['ngRoute']);

//myEnter directive to do function on clicking enter button
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

    /***************************** Constant variables and Initialization of variables ******************************/
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
    $scope.listItem = {};
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

    /**  *************************************** End of variable initalization ***************************  ***/


    $scope.set = function (item) {
        $scope.number = item;
    };
    $scope.flag = 0;
    $scope.negFlag = 0;
    /****************************************** Calculator *****************************************************/
    $scope.setVar = function (index) {

        if ($scope.NUM[index] === '.' && $scope.flag === 1) {
            console.log("You entered decimal");
        } else {
            if ($scope.seq[0].varNumber && !$scope.seq[0].operator) {
                $scope.seq[0].varNumber = '';
                $scope.first = '';
                $scope.negFlag = 0;
            }

            $scope.first = $scope.first + $scope.NUM[index];
            $scope.negFlag = 1; //variable 'first' is not empty, so negative input can't be done

            // To set decimal only once
            if ($scope.NUM[index] === '.') {
                $scope.flag = 1;
            }
            $scope.inputSeq = $scope.first;
        }
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
        }
        // Input negative number if flag is not zero and variable 'first' is empty
        else if ($scope.op === '-' && $scope.negFlag === 0 && !$scope.first) {
            $scope.first = '-';
            $scope.inputSeq = $scope.first;
            $scope.negFlag = 1;
        } else {
            //  console.log(' ' + $scope.op + ' ');
            // $scope.res = $scope.res + parseInt($scope.first);
            var length = $scope.seq.length;
            // Insert operator, if person continues after '=' operations
            if ($scope.seq[0].varNumber && !$scope.seq[0].operator) {
                $scope.seq[0].operator = $scope.op;
            }
            /* After '=' operation, new calculation started when number is entered, it will clear the value stored in seq and store the new number as first */
            else if (!$scope.seq[0].varNumber && !$scope.seq[0].operator) {
                $scope.seq[0].varNumber = $scope.first;
                $scope.seq[0].operator = $scope.op;
            }
            //On clicking of more than one operato, only last operator is considered 
            else if ($scope.seq[length - 1].varNumber && !$scope.first) {

                $scope.seq[length - 1].operator = $scope.op;
            } else {
                $scope.seq.push({
                    varNumber: $scope.first,
                    operator: $scope.op
                });
            }
            //        console.log($scope.seq);
            $scope.first = ''; // Resetting variable 'first' to store another number
            $scope.flag = 0;
            $scope.negFlag = 0;
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
    // Using 'C' to clear all variables   #resetEverything
    $scope.clear = function () {
        $scope.seq = [{
            varNumber: "",
            operator: ""
        }];
        $scope.inputSeq = '';
        $scope.first = '';
        $scope.op = '';
        $scope.res = 0;
        $scope.flag = 0;
        $scope.negFlag = 0;
    };
    /************************** End of Calculator ****************************************************************/

    /*********************** HTTP Request example to fetch data from JSON Object ********************************/
    $http.get('person_details.json').then(function (response) {
        //console.log(data);
        $scope.welcome = response.data.records;
        console.log("Created By:", $scope.welcome.person.first_name);
        //defer.resolve();
    }).catch(function onError(response) {
        console.log("Error:", response);
    });

    /********************************** Rename function for Notepad and TODO List ******************************/

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


    /**************************      TODO-List     **************************************************************
     ****************************** Adding item to TODO List ****************************************************/
    $scope.addListItem = function () {
        if ($scope.listItem.text) {
            $scope.listItem.val = false;
            $scope.todoItemList.push($scope.listItem);
        }
        $scope.listItem = {};
        // console.log($scope.todoItemList);
    };

    /****************************** Removing Item from TODO List ****************************************************/
    $scope.removeListItem = function () {
        $scope.todoItemList = $scope.todoItemList.filter(function (item) {
            return !item.val;
        });
    };

});

/*************************************** Routing *****************************************************************/
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
