angular.module('subcontractorsApp.controllers', [])
    .controller('resultsController',function($scope,$http, subcontractorsAPIservice) {
        $scope.getData = function( ) {
            $('#info').fadeOut(600,function() {
                $('<div></div>').attr('id','load-display').insertAfter('.container');
                $('#load-display').attr('class','col-md-4').html('<h4>Help us improve this directory</h4><p>If you have ideas on what it would take to improve this experience, please <a target="_blank" href="#">send us your feedback</a></p>')
            });
            subcontractorsAPIservice.async().then(function(d) {
                // results loading
                $('#load-display').fadeOut(600, function() {
                    $('#results').fadeIn(1);
                });


                // INITIALIZE THE DATA
                $scope.makeContractors = function() {
                    // pagination
                    $scope.pageSize = 25;

                    $scope.contracts = [];
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
                        var abbrState = convert_state(contract.custom_fields.vendor_state[0],'abbrev');
                        var region = convert_state(contract.custom_fields.vendor_state[0],'region');
                        var naics = contract.custom_fields.naics_code[0];
                        var naicsFront = naics.substr(0, 3);
                        var naicsBack = naics.substr(naics.length - 3);
                        $scope.contracts.push({
                            contractor: contract.title,
                            description: finalDescription,
                            piid: contract.custom_fields.PIID[0],
                            naics_front : naicsFront,
                            naics_back : naicsBack,
                            naics_description : contract.custom_fields.naics_description[0],
                            product_code : contract.custom_fields.product_or_service_code[0],
                            street : contract.custom_fields.Street[0],
                            city : contract.custom_fields.vendor_city[0],
                            state : abbrState,
                            zip : shortZip,
                            phone : '('+areaCode+')'+firstThree+'-'+lastFour,
                            performance_city : contract.custom_fields.principal_performance_city[0],
                            performance_state : contract.custom_fields.principal_performance_state[0],
                            performance_zip : shortZipB+'-'+extendedZipB,
                            date_signed : contract.custom_fields.date_signed[0],
                            effective_date : contract.custom_fields.effective_date[0],
                            completion_date : contract.custom_fields.est_completion_date[0],
                            action_obligation : contract.custom_fields.action_obligation[0],
                            region : region
                        })
                    });
                }
                $scope.makeContractors();

            }); // close async
        }; // close getData function

        // clear filters for select menus
        $scope.clearNaics = function() {
            $scope.search.naics_front = undefined;
            $scope.filterNaics = false;
        };
        $scope.clearPerformPlace = function() {
            $scope.search.performance_state = undefined;
            $scope.filterPerformPlace = false;
        };
        $scope.clearCompLoc = function() {
            $scope.search.state = undefined;
            $scope.filterCompLoc = false;
        };
        $scope.clearRegion = function() {
            $scope.search.region = undefined;
            $scope.filterRegion = false;
        };

        //hide or show close button
        $scope.changeNaics = function() {
            if($scope.search.naics_front != undefined) {
                $scope.filterNaics = true;
            };
        }
        $scope.changePerformPlace = function() {
            if($scope.search.performance_state != undefined) {
                $scope.filterPerformPlace = true;
            };
        }
        $scope.changeCompLoc = function() {
            if($scope.search.state != undefined) {
                $scope.filterCompLoc = true;
            };
        }
        $scope.changeRegion = function() {
            if($scope.search.region != undefined) {
                $scope.filterRegion = true;
            };
        }


        // CONVERT STATES
        function convert_state(name, to) {
            var name = name.toUpperCase();
            var states = new Array(                         {'name':'Alabama', 'abbrev':'AL', 'region':'4'},          {'name':'Alaska', 'abbrev':'AK', 'region':'10'},
                {'name':'Arizona', 'abbrev':'AZ', 'region':'9'},          {'name':'Arkansas', 'abbrev':'AR', 'region':'7'},         {'name':'California', 'abbrev':'CA', 'region':'9'},
                {'name':'Colorado', 'abbrev':'CO', 'region':'8'},         {'name':'Connecticut', 'abbrev':'CT', 'region':'1'},      {'name':'Delaware', 'abbrev':'DE', 'region':'3'},
                {'name':'Florida', 'abbrev':'FL', 'region':'4'},          {'name':'Georgia', 'abbrev':'GA', 'region':'4'},          {'name':'Hawaii', 'abbrev':'HI', 'region':'9'},
                {'name':'Idaho', 'abbrev':'ID', 'region':'10'},            {'name':'Illinois', 'abbrev':'IL', 'region':'5'},         {'name':'Indiana', 'abbrev':'IN', 'region':'5'},
                {'name':'Iowa', 'abbrev':'IA', 'region':'6'},             {'name':'Kansas', 'abbrev':'KS', 'region':'6'},           {'name':'Kentucky', 'abbrev':'KY', 'region':'4'},
                {'name':'Louisiana', 'abbrev':'LA', 'region':'7'},        {'name':'Maine', 'abbrev':'ME', 'region':'1'},            {'name':'Maryland', 'abbrev':'MD', 'region':'3'},
                {'name':'Massachusetts', 'abbrev':'MA', 'region':'1'},    {'name':'Michigan', 'abbrev':'MI', 'region':'5'},         {'name':'Minnesota', 'abbrev':'MN', 'region':'5'},
                {'name':'Mississippi', 'abbrev':'MS', 'region':'4'},      {'name':'Missouri', 'abbrev':'MO', 'region':'6'},         {'name':'Montana', 'abbrev':'MT', 'region':'8'},
                {'name':'Nebraska', 'abbrev':'NE', 'region':'6'},         {'name':'Nevada', 'abbrev':'NV', 'region':'1'},           {'name':'New Hampshire', 'abbrev':'NH', 'region':'1'},
                {'name':'New Jersey', 'abbrev':'NJ', 'region':'2'},       {'name':'New Mexico', 'abbrev':'NM', 'region':'7'},       {'name':'New York', 'abbrev':'NY', 'region':'2'},
                {'name':'North Carolina', 'abbrev':'NC', 'region':'4'},   {'name':'North Dakota', 'abbrev':'ND', 'region':'8'},     {'name':'Ohio', 'abbrev':'OH', 'region':'5'},
                {'name':'Oklahoma', 'abbrev':'OK', 'region':'7'},         {'name':'Oregon', 'abbrev':'OR', 'region':'10'},           {'name':'Pennsylvania', 'abbrev':'PA', 'region':'3'},
                {'name':'Rhode Island', 'abbrev':'RI', 'region':'1'},     {'name':'South Carolina', 'abbrev':'SC', 'region':'4'},   {'name':'South Dakota', 'abbrev':'SD', 'region':'8'},
                {'name':'Tennessee', 'abbrev':'TN', 'region':'4'},        {'name':'Texas', 'abbrev':'TX', 'region':'7'},            {'name':'Utah', 'abbrev':'UT', 'region':'8'},
                {'name':'Vermont', 'abbrev':'VT', 'region':'1'},          {'name':'Virginia', 'abbrev':'VA', 'region':'3'},         {'name':'Washington', 'abbrev':'WA', 'region':'10'},
                {'name':'West Virginia', 'abbrev':'WV', 'region':'3'},    {'name':'Wisconsin', 'abbrev':'WI', 'region':'5'},        {'name':'Wyoming', 'abbrev':'WY', 'region':'8'}
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
                } else if (to == 'region') {
                    if (value.name.toUpperCase() == name){
                        returnthis = value.region;
                        return false;
                    }
                }
            });
            return returnthis;
        }

        // EXPORT DATA
        $scope.exportData = function () {
            var blob = new Blob([document.getElementById('csv-export').innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "subContractors.xls");
        };

        $scope.pageChangeHandler = function(num) {
        };

    })//close results controller





