/*globals angular */
angular.module('app.calculator', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/calculator', {
            templateUrl: "app/components/calculator/calculator.html",
            controller: "CalController",
            controllerAs: "cal"
        });
}])
    .controller('CalController', [function () {
        this.NUM = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
        this.OPS = ['+', '-', '/', '*', '='];
        this.inputSeq = '';
        this.first = '';
        this.res = 0;
        this.seq = [{
            varNumber: "",
            operator: ""
    }];
        this.flag = 0;
        this.negFlag = 0;

        this.setVar = function (index) {

            if (this.NUM[index] === '.' && this.flag === 1) {
                console.log("You entered decimal");
            } else {
                if (this.seq[0].varNumber && !this.seq[0].operator) {
                    this.seq[0].varNumber = '';
                    this.first = '';
                    this.negFlag = 0;
                }

                this.first = this.first + this.NUM[index];
                this.negFlag = 1; //variable 'first' is not empty, so negative input can't be done

                // To set decimal only once
                if (this.NUM[index] === '.') {
                    this.flag = 1;
                }
                this.inputSeq = this.first;
            }
        };
        // Creating operand if number is being entered or creating 'operator' if operator is entered EX: 123 + 1234 = 
        this.setOp = function (item) {
            this.op = this.OPS[item];
            if (this.op === '=') {
                this.seq.push({
                    varNumber: this.first,
                    operator: this.op
                });
                this.calculate(this.seq);
            }
            // Input negative number if flag is not zero and variable 'first' is empty
            else if (this.op === '-' && this.negFlag === 0 && !this.first) {
                this.first = '-';
                this.inputSeq = this.first;
                this.negFlag = 1;
            } else {
                //  console.log(' ' + this.op + ' ');
                // this.res = this.res + parseInt(this.first);
                var length = this.seq.length;
                // Insert operator, if person continues after '=' operations
                if (this.seq[0].varNumber && !this.seq[0].operator) {
                    this.seq[0].operator = this.op;
                }
                /* After '=' operation, new calculation started when number is entered, it will clear the value stored in seq and store the new number as first */
                else if (!this.seq[0].varNumber && !this.seq[0].operator) {
                    this.seq[0].varNumber = this.first;
                    this.seq[0].operator = this.op;
                }
                //On clicking of more than one operato, only last operator is considered 
                else if (this.seq[length - 1].varNumber && !this.first) {

                    this.seq[length - 1].operator = this.op;
                } else {
                    this.seq.push({
                        varNumber: this.first,
                        operator: this.op
                    });
                }
                //        console.log(this.seq);
                this.first = ''; // Resetting variable 'first' to store another number
                this.flag = 0;
                this.negFlag = 0;
            }
        };

        // Using loop to add 'varNumber' in 'seq' variable
        this.calculate = function (item) {
            for (var i = 0; i < item.length - 1; i++) {
                // console.log(this.seq);
                var operand_one = item[i].varNumber;
                var operand_two = item[i + 1].varNumber;
                var operator = item[i].operator;
                this.inputSeq = this.calc(operand_one, operand_two, operator); // call calc function to do operations
                item[i + 1].varNumber = this.inputSeq; // update next varNumber to the current result
                // console.log(this.calc(operand_one, operand_two, operator));
            }
            this.seq = [];
            this.seq.push({
                varNumber: this.inputSeq,
                operator: ''
            });
            this.first = this.inputSeq; // If someone chooses to continue operations after '=' operation
            //console.log(this.seq);
        };
        //Operation based on value of operator otherwise return empty string
        this.calc = function (one, two, operator) {
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
        this.clear = function () {
            this.seq = [{
                varNumber: "",
                operator: ""
        }];
            this.inputSeq = '';
            this.first = '';
            this.op = '';
            this.res = 0;
            this.flag = 0;
            this.negFlag = 0;
        };
}]);
