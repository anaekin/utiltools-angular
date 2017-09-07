/* globals angular */
var app = angular.module('app', ['ngRoute']);
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/calculator', {
        templateUrl: "calculator-new.html"
    }).when('/todo-list', {
        templateUrl: "todo-list.html"
    }).when('/notepad', {
        templateUrl: "notepad.html"
    }).otherwise('/calculator', {
        templateUrl: "calculator.html"
    });
    $locationProvider.html5Mode(true);
        }]);
app.controller('MainController', function MainController($scope) {
    $scope.num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    $scope.ops = ['+', '-', '/', '*', '='];
    $scope.inputSeq = '';
    $scope.first = '';
    $scope.res = 0;
    $scope.number = 0;
    $scope.seq = [{
        varNumber: "",
        operator: ""
    }];
    $scope.navItems = [
        {
            title: 'Calculator',
            ref: 'calculator'
                }, {
            title: 'TODO-List',
            ref: 'todo-list'
                }, {
            title: 'Notepad',
            ref: 'notepad'
                }
            ];


    $scope.set = function (item) {
        $scope.number = item;
    };


    $scope.setVar = function (index) {
        $scope.first = $scope.first + $scope.num[index];
        $scope.inputSeq = $scope.first;
    };


    $scope.setOp = function (item) {

        $scope.op = $scope.ops[item];

        if ($scope.op === '=') {
            $scope.seq.push({
                varNumber: $scope.first,
                operator: $scope.op
            });
            $scope.calculate($scope.seq);

        } else {
            //  console.log(' ' + $scope.op + ' ');
            // $scope.res = $scope.res + parseInt($scope.first);
            if ($scope.seq[0].varNumber && !$scope.seq[0].operator) {
                $scope.seq[0].operator = $scope.op;
            } else if (!$scope.seq[0].varNumber && !$scope.seq[0].operator) {
                $scope.seq[0].varNumber = $scope.first;
                $scope.seq[0].operator = $scope.op;
            } else {
                $scope.seq.push({
                    varNumber: $scope.first,
                    operator: $scope.op
                });
            }
            // console.log($scope.seq);
            $scope.first = '';
        }
    };

    $scope.calculate = function (item) {

        for (var i = 0; i < item.length - 1; i++) {
            console.log($scope.seq);
            var operand_one = item[i].varNumber;
            var operand_two = item[i + 1].varNumber;
            var operator = item[i].operator;
            $scope.inputSeq = $scope.calc(operand_one, operand_two, operator);
            item[i + 1].varNumber = $scope.inputSeq;
            console.log($scope.calc(operand_one, operand_two, operator));
        }
        $scope.seq = [];
        $scope.seq.push({
            varNumber: $scope.inputSeq,
            operator: ''
        });
        $scope.first = $scope.inputSeq;
        console.log($scope.seq);
    };


    $scope.calc = function (one, two, ope) {
        switch (ope) {
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
});
