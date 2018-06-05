angular.module('app')
    .controller('IndexController', [function () {
        vm = this;
        vm.hello = true;

        vm.flipHello = function () {
            vm.hello = !vm.hello
        }

        vm.checkNumber = function (number) {
            if (number % 2 == 0)
                return true
            else
                return false
        }

    }]);