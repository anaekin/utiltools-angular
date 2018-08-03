/*globals angular*/

angular.module('app.notepad', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/notepad', {
            templateUrl: "app/components/notepad/notepad.html",
            controller: "NotepadController",
            controllerAs: "note"
        });
}])
    .controller('NotepadController', ['myService', function (myService) {

        this.master = {};
        this.notepadTitle = myService.notepadTitle;
        this.notepadData = myService.notepadData;
//        this.notepadValue = {
//            value: ''
//        };
        this.renameNotepad = function () {
            if (this.notepadValue && this.notepadValue.value) {
                this.notepadTitle.value = this.notepadValue.value;
                myService.updateNotepadTitle(this.notepadTitle);
            }
            this.notepadValue = angular.copy(this.master);
        };
        this.saveNotepad = function() {
            myService.saveNotepadData(this.notepadData);
        };
}]);
