angular.module('subcontractorsApp.routers',['ngRoute','ngAnimate'])
.config(function($routeProvider) {
    $routeProvider
        .when('/',
        {
            templateUrl: 'partials/intro.html'
        }
    )
        .when('/results',
        {
            controller: 'resultsController',
            templateUrl: 'partials/results.html'
        }
    )

        .otherwise({ redirectTo: '/'});
});
