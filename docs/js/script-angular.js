/* globals angular */
var app = angular.module('app', ['ngRoute']);
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/calculator', {
        templateUrl: "calculator.html"
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
    $scope.number = 0;
    $scope.navItems = [
        {
            title: 'Calculator',
            ref: 'calculator'
                }
        , {
            title: 'TODO-List',
            ref: 'todo-list'
                }
        , {
            title: 'Notepad',
            ref: 'notepad'
                }
            ];
    $scope.set = function (item) {
        $scope.number = item;
    };
});
