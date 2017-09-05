/* globals angular */


 var app = angular.module('app', ['ngRoute']);
        
        app.config(['$routeProvider', function($routeProvider) {
            $routeProvider
            .when('/calculator', {
                templateUrl:"calculator.html"                
            
            })
            .when('/todo-list', {
                templateUrl: "todo-list.html"
            })
            .when('/notepad', {
                templateUrl: "notepad.html"
            });
                  
        }]);
        app.controller('MainController', function(){
            this.number = 0;
            this.navItems = [
                {
                    title : 'Home',
                    ref: '#home'
                },
                {
                    title : 'Calculator',
                    ref: '#calculator'
                },
                {
                    title : 'TODO-List',
                    ref: '#todo-list'
                },
                {
                    title : 'Notepad',
                    ref: '#notepad'
                }
            ];
            this.set = function(item){
                this.number = item;
            };
        });


