angular.module('subcontractorsApp.controllers', [])
    .controller('resultsController',function($scope, $http, subcontractorsAPIservice) {
        $scope.contracts = [];

        // more items (pagination)
        count = 2000;
        while(count) {
            $scope.contracts[count]  = count--;
        }
        $scope.totalDisplayed = 20;
        $scope.loadMore = function () {
            $scope.totalDisplayed += 20;
        };

        // sorting
        $scope.sortOrder = null;

        //init function
        init();
        function init() {
            $scope.contracts = subcontractorsAPIservice.getContracts();
        }

        // search for Company Name, NAICS Code or Description
        $scope.search = function (contractor) {
            return !!((contractor.contractor.indexOf($scope.query || '') !== -1 || contractor.naics_code.indexOf($scope.query || '') !== -1  || contractor.description.indexOf($scope.query || '') !== -1));
        };

        // search location
        $scope.search = function (contractor) {
            return !!((contractor.city.indexOf($scope.location || '') !== -1 || contractor.state.indexOf($scope.location || '') !== -1  || contractor.zip.indexOf($scope.location || '') !== -1));
        };

        /*
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


    })


