let app = angular.module('app', ["ngRoute"]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        template: '<h1>This is the default route</h1>'
    })
        .when('/', {
            templateUrl: 'components/homePage/login.html',
            controller : 'homeController as vm'
        })
        .otherwise({ redirectTo: '/' });
}]);