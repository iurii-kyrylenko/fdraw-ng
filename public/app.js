(function() {
    'use strict';

    var app = angular.module('app', ['fdrawModule']);

    app.controller('fdrawCtrl', ['$scope', function($scope){
        $scope.params = {
            width: 300,
            height: 240,
            x: -0.6319544270909706,
            y: 0.38777660548031495,
            zoom: 3676846871693.3037
        };
    }]);
})();
