angular.module('subcontractorsApp.controllers', [])
    .controller('resultsController',function($scope,$http, subcontractorsAPIservice) {
        $scope.getData = function() {
            if($scope.search == undefined) {
                alert('Stop - you didn\'t enter any search terms!');
            } else {
                $('#info').fadeOut(600,function() {
                    $('<div></div>').attr('id','load-display').insertAfter('#search');
                    $('#load-display').attr('class','col-md-4').html('<h4>Help us improve this directory</h4><p>If you have ideas on what we it would take to improve this experience, please <a target="_blank" href="#">send us your feedback</a></p>')
                });
                subcontractorsAPIservice.async().then(function(d) {
                    // results loading
                    $('#load-display').fadeOut(600, function() {
                        $('#results').fadeIn(1);
                    });

                    //holds all the contractors
                     $scope.contracts = [];

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
                             var abbrState = convert_state(contract.custom_fields.vendor_state[0],'abbrev');
                             $scope.contracts.push({
                                 contractor: contract.title,
                                 description: finalDescription,
                                 piid: contract.custom_fields.piid[0],
                                 naics_code : contract.custom_fields.naics_code[0],
                                 naics_description : contract.custom_fields.naics_description[0],
                                 product_code : contract.custom_fields.product_or_service_code[0],
                                 street : contract.custom_fields.street[0],
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
                                 action_obligation : contract.custom_fields.action_obligation[0]
                             })
                         });
                     }
                });
            }

        }; // close getData function

        //LOAD MORE
        $scope.totalDisplayed = 20;
        $scope.loadMore = function () {
            $scope.totalDisplayed += 20;
        };

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

        // EXPORT DATA
        $scope.exportData = function () {
            var blob = new Blob([document.getElementById('table-test').innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "subContractors.xls");
        };

    })//close results controller


