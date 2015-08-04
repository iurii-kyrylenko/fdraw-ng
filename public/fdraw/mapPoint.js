(function() {
    'use strict';

    var fdrawModule = angular.module('fdrawModule');

    fdrawModule.factory('mapPoint', function() {
        return function(srcX, srcY, trgParams) {
            var target = {
                x: trgParams.x + srcX / trgParams.zoom,
                y: trgParams.y - srcY / trgParams.zoom
            };
            return target;
        };
    })

})();
