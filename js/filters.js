angular.module('subcontractorsApp.filters', ['ngSanitize'])
    .filter('highlight', function() {
        return function(text, filter) {
            if (filter === undefined) {
                return text;
            } else {
                return text.replace(new RegExp(filter, 'gi'), '<span class="match">$&</span>');
            };
        };
    });
