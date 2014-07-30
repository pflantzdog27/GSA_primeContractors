angular.module('subcontractorsApp.services',[])
    .factory('subcontractorsAPIservice',function($http) {


        var promise;
        var myService = {
            async: function() {
                if ( !promise ) {
                    // $http returns a promise, which has a then function, which also returns a promise
                    promise = $http.jsonp('http://oagov.com/smartAmerica/?json=get_recent_posts&count=-1&callback=JSON_CALLBACK').then(function (response) {
                        // The then function here is an opportunity to modify the response
                        //console.log(response);
                        // The return value gets picked up by the then in the controller.
                        return response.data;
                    });
                }
                // Return the promise to the controller
                return promise;
            }
        };
        return myService;
    })


