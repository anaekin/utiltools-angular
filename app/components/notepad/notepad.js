/*globals angular*/

angular.module('app.notepad', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/notepad', {
            templateUrl: "app/components/notepad/notepad.html",
            controller: "NotepadController",
            controllerAs: "note"
        });
}])
    .controller('NotepadController', ['MyService', function (MyService) {

        this.master = {};
        this.notepadTitle = MyService.notepadTitle;
        this.notepadValue = {
            value: ''
        };
        this.renameNotepad = function () {
            if (this.notepadValue.value) {
                this.notepadTitle.value = this.notepadValue.value;
                MyService.updateNotepadTitle(this.notepadTitle);
            }
            this.notepadValue = angular.copy(this.master);
        };
}]);
