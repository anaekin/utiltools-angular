/* globals angular */
var app = angular.module('app', [
    'ngRoute',
    'app.calculator',
    'app.todo',
    'app.notepad'
]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({
        redirectTo: '/calculator'
    });
}]);
