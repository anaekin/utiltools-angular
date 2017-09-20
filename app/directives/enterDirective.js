/*globals angular*/
var app = angular.module('app');
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
