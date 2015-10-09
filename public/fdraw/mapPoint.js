(function() {
    'use strict';

    var fdrawModule = angular.module('fdrawModule');

    fdrawModule.value('mapPoint', function(srcX, srcY, trgParams) {
        var target = {
            x: trgParams.x + srcX / trgParams.zoom,
            y: trgParams.y - srcY / trgParams.zoom
        };
        return target;
    });

})();
