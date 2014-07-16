angular.module('subcontractorsApp.controllers', [])
    .controller('resultsController',function($scope,$http, subcontractorsAPIservice) {

        $scope.getData = function() {
            // Call the async method and then do stuff with what is returned inside our own then function
            $('<div></div>').attr('id','load-display').insertAfter('#search');
            subcontractorsAPIservice.async().then(function(d) {
                // results loading
                $('#load-display').fadeOut(600, function() {
                    $('#results').fadeIn(1);
                });

                //holds all the contractors
                 $scope.contracts = [];

                //SEARCH
                $scope.search='';
                if($scope.query != undefined) {
                    $scope.search = function (contractor) {
                        $scope.query = $scope.query.toUpperCase();
                        return !!((contractor.contractor.indexOf($scope.query || '') !== -1 || contractor.description.indexOf($scope.query || '') !== -1 || contractor.naics_code.indexOf($scope.query || '') !== -1 ));
                    };
                }
                if($scope.location != undefined) {
                    $scope.search = function (contractor) {
                        $scope.location = $scope.location.toUpperCase();
                        return !!((contractor.googleLocation.indexOf($scope.location || '') !== -1 || contractor.googleLocation_zip.indexOf($scope.location || '') !== -1  ));
                    };
                }


                // INITIALIZE THE DATA
                 init();
                 function init() {
                     $.each(d.posts, function(i, contract) {
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
                         var metaLocation = contract.custom_fields.vendor_city[0] +', ' + contract.custom_fields.vendor_state[0]+', USA';
                         var convertedState = convert_state(contract.custom_fields.vendor_state[0],'abbrev');
                         var metaCityState = contract.custom_fields.vendor_city[0] +', ' + convertedState +' '+ shortZip +', USA';
                         $scope.contracts.push({
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
                             action_obligation : contract.custom_fields.action_obligation[0],
                             googleLocation : metaLocation,
                             googleLocation_zip : metaCityState
                         })
                     });
                 }
             });

            // CONVERT STATES
            function convert_state(name, to) {
                var name = name.toUpperCase();
                var states = new Array(                         {'name':'Alabama', 'abbrev':'AL'},          {'name':'Alaska', 'abbrev':'AK'},
                    {'name':'Arizona', 'abbrev':'AZ'},          {'name':'Arkansas', 'abbrev':'AR'},         {'name':'California', 'abbrev':'CA'},
                    {'name':'Colorado', 'abbrev':'CO'},         {'name':'Connecticut', 'abbrev':'CT'},      {'name':'Delaware', 'abbrev':'DE'},
                    {'name':'Florida', 'abbrev':'FL'},          {'name':'Georgia', 'abbrev':'GA'},          {'name':'Hawaii', 'abbrev':'HI'},
                    {'name':'Idaho', 'abbrev':'ID'},            {'name':'Illinois', 'abbrev':'IL'},         {'name':'Indiana', 'abbrev':'IN'},
                    {'name':'Iowa', 'abbrev':'IA'},             {'name':'Kansas', 'abbrev':'KS'},           {'name':'Kentucky', 'abbrev':'KY'},
                    {'name':'Louisiana', 'abbrev':'LA'},        {'name':'Maine', 'abbrev':'ME'},            {'name':'Maryland', 'abbrev':'MD'},
                    {'name':'Massachusetts', 'abbrev':'MA'},    {'name':'Michigan', 'abbrev':'MI'},         {'name':'Minnesota', 'abbrev':'MN'},
                    {'name':'Mississippi', 'abbrev':'MS'},      {'name':'Missouri', 'abbrev':'MO'},         {'name':'Montana', 'abbrev':'MT'},
                    {'name':'Nebraska', 'abbrev':'NE'},         {'name':'Nevada', 'abbrev':'NV'},           {'name':'New Hampshire', 'abbrev':'NH'},
                    {'name':'New Jersey', 'abbrev':'NJ'},       {'name':'New Mexico', 'abbrev':'NM'},       {'name':'New York', 'abbrev':'NY'},
                    {'name':'North Carolina', 'abbrev':'NC'},   {'name':'North Dakota', 'abbrev':'ND'},     {'name':'Ohio', 'abbrev':'OH'},
                    {'name':'Oklahoma', 'abbrev':'OK'},         {'name':'Oregon', 'abbrev':'OR'},           {'name':'Pennsylvania', 'abbrev':'PA'},
                    {'name':'Rhode Island', 'abbrev':'RI'},     {'name':'South Carolina', 'abbrev':'SC'},   {'name':'South Dakota', 'abbrev':'SD'},
                    {'name':'Tennessee', 'abbrev':'TN'},        {'name':'Texas', 'abbrev':'TX'},            {'name':'Utah', 'abbrev':'UT'},
                    {'name':'Vermont', 'abbrev':'VT'},          {'name':'Virginia', 'abbrev':'VA'},         {'name':'Washington', 'abbrev':'WA'},
                    {'name':'West Virginia', 'abbrev':'WV'},    {'name':'Wisconsin', 'abbrev':'WI'},        {'name':'Wyoming', 'abbrev':'WY'}
                );
                var returnthis = false;
                $.each(states, function(index, value){
                    if (to == 'name') {
                        if (value.abbrev == name){
                            returnthis = value.name;
                            return false;
                        }
                    } else if (to == 'abbrev') {
                        if (value.name.toUpperCase() == name){
                            returnthis = value.abbrev;
                            return false;
                        }
                    }
                });
                return returnthis;
            }
         };
         // GEOCODER
         $scope.getLocation = function(val) {
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                 address: val,
                 sensor: false,
                 components: 'country:US',
                 types: '(cities)'
                }
            }).then(function(res){
                 var addresses = [];
                 angular.forEach(res.data.results, function(item){
                    addresses.push(item.formatted_address);
                 });
                 return addresses;
            });
         };

        //LOAD MORE
        $scope.totalDisplayed = 20;
        $scope.loadMore = function () {
            $scope.totalDisplayed += 20;
        };

    })//close controller


/*init function
 $scope.contracts = [];
 init();
 function init() {
 $scope.contracts = subcontractorsAPIservice.getContracts();
 }

 // more items (pagination)
 count = 2000;
 while(count) {
 $scope.contracts[count]  = count--;
 }
 $scope.totalDisplayed = 20;
 $scope.loadMore = function () {
 $scope.totalDisplayed += 20;
 };



 /*search for Company Name, NAICS Code or Description
 $scope.search = function (contractor) {
 //$scope.query = $scope.query.toUpperCase();
 return !!((contractor.contractor.indexOf($scope.query || '') !== -1 || contractor.naics_code.indexOf($scope.query || '') !== -1  || contractor.description.indexOf($scope.query || '') !== -1));
 };

 //search location
 $scope.search = function (contractor) {
 // $scope.location = $scope.location.toUpperCase();
 return !!((contractor.city.indexOf($scope.location || '') !== -1 || contractor.state.indexOf($scope.location || '') !== -1  || contractor.zip.indexOf($scope.location || '') !== -1));
 }*/

/* geocoder locations
 $scope.getLocation = function(val) {
 return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
 params: {
 address: val,
 sensor: false,
 components: 'country:US'
 }
 }).then(function(res){
 var addresses = [];
 angular.forEach(res.data.results, function(item){
 addresses.push(item.formatted_address);
 });
 return addresses;
 });
 };*/


/*used for TEST.html only
 $scope.exportData = function () {
 var blob = new Blob([document.getElementById('table-test').innerHTML], {
 type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
 });
 saveAs(blob, "subContractors.xls");
 };*/







