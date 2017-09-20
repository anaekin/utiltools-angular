/*globals angular*/
var app = angular.module('app');
app.controller('MainController', function ($http, $scope) {
    $scope.NAV_ITEMS = [
        {
            title: 'Calculator',
            ref: '#!/calculator'
                }, {
            title: 'To-Do List',
            ref: '#!/todo-list'
                }, {
            title: 'Notepad',
            ref: '#!/notepad'
                }
            ];

    $scope.set = function (item) {
        $scope.number = item;
    };

    /*********************** HTTP Request example to fetch data from JSON Object ********************************/
    $http.get('config.json').then(function (response) {
        //console.log(data);
        $scope.welcome = response.data.records;
        console.log("Created By:", $scope.welcome.person.first_name);
        //defer.resolve();
    }).catch(function onError(response) {
        console.log("Error:", response);
    });
});
