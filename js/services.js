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




        /*var subcontractorsAPI = [];
        var contracts = $http.jsonp('http://oagov.com/smartAmerica/?json=get_recent_posts&count=-1&callback=JSON_CALLBACK');
        contracts.success(function(data) {
            $('#load-display').fadeOut(600, function() {
                $('#results').fadeIn(1);
            });
            $.each(data.posts, function(i, contract) {
                // manipulating results
                var zipCode = contract.custom_fields.vendor_zip[0];
                var extendedZip = zipCode.substr(zipCode.length - 4);
                var shortZip = zipCode.substr(0, 5);
                var zipCodeB = contract.custom_fields.principal_performance_zip[0];
                var extendedZipB = zipCodeB.substr(zipCodeB.length - 4);
                var shortZipB = zipCodeB.substr(0, 5);
                var phoneNumber = contract.custom_fields.vendor_phone_number[0];
                var lastFour = phoneNumber.substr(phoneNumber.length - 4);
                var areaCode = phoneNumber.substr(0, 3);
                var firstThree = phoneNumber.substr(3, 3);
                var descriptionContract = contract.content;
                var frontCutDescrip = descriptionContract.slice(3);
                var finalDescription = frontCutDescrip.slice(0,-5);
                subcontractorsAPI.push({
                    contractor: contract.title,
                    description: finalDescription,
                    piid: contract.custom_fields.piid[0],
                    naics_code : contract.custom_fields.naics_code[0],
                    naics_description : contract.custom_fields.naics_description[0],
                    product_code : contract.custom_fields.product_or_service_code[0],
                    street : contract.custom_fields.street[0],
                    city : contract.custom_fields.vendor_city[0],
                    state : contract.custom_fields.vendor_state[0],
                    zip : shortZip,
                    phone : '('+areaCode+')'+firstThree+'-'+lastFour,
                    performance_city : contract.custom_fields.principal_performance_city[0],
                    performance_state : contract.custom_fields.principal_performance_state[0],
                    performance_zip : shortZipB+'-'+extendedZipB,
                    date_signed : contract.custom_fields.date_signed[0],
                    effective_date : contract.custom_fields.effective_date[0],
                    completion_date : contract.custom_fields.est_completion_date[0],
                    action_obligation : contract.custom_fields.action_obligation[0]
                })
            });
        });
        var factory = {};
        factory.getContracts = function () {
            return subcontractorsAPI;
        };
        return factory;
        */
    })


