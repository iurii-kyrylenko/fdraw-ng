(function() {
    'use strict';

    var fdrawModule = angular.module('fdrawModule');

    fdrawModule.factory('interactions', ['mapPoint', function(mapPoint) {

        var bind = function(elem, trgParams, actions) {

            var cStart;
            var state  = 0;
            var sx1 = 0, sy1 = 0, sx2 = 0, sy2 = 0, ex1 = 0, ey1 = 0, ex2 = 0, ey2 = 0;

            elem.on("mousedown", function(event) {
               cStart = mapPoint(event.clientX, event.clientY, trgParams);
            });

            elem.on("mouseup", function(event) {
               var cEnd = mapPoint(event.clientX , event.clientY, trgParams);
               actions.move(cEnd.x - cStart.x, cEnd.y - cStart.y);
            });

            elem.on('keydown', function(event) {
                switch(event.keyCode) {
                    case 107: case 187: actions.zoomIn(); break;
                    case 109: case 189: actions.zoomOut(); break;
                }
            });

            elem.on('touchstart', function(event) {
               event.preventDefault();
               var pts = event.targetTouches.length;
               if(pts === 1) {
                  sx1 = event.targetTouches[0].clientX;
                  sy1 = event.targetTouches[0].clientY;
                  state = 1;   
               } else if(pts === 2) {
                  sx1 = event.targetTouches[0].clientX;
                  sy1 = event.targetTouches[0].clientY;
                  sx2 = event.targetTouches[1].clientX;
                  sy2 = event.targetTouches[1].clientY;
                  state = 2;
               }
               else {
                  state = 0;
               }
            });

            elem.on('touchend', function(event) {
               event.preventDefault();

               if(state === 1) {

                  ex1 = event.changedTouches[0].clientX;
                  ey1 = event.changedTouches[0].clientY;
                  var s = mapPoint(sx1, sy1, trgParams);
                  var e = mapPoint(ex1, ey1, trgParams);
                  actions.move(e.x - s.x, e.y - s.y);

               } else if(state === 2) {

                  ex1 = event.changedTouches[0].clientX;
                  ey1 = event.changedTouches[0].clientY;

                  if(event.changedTouches.length > 1) {
                     ex2 = event.changedTouches[1].clientX;
                     ey2 = event.changedTouches[1].clientY;
                  }
                  else {
                     ex2 = event.targetTouches[0].clientX;
                     ey2 = event.targetTouches[0].clientY;                     
                  }

                  var ds = (sx1-sx2)*(sx1-sx2) + (sy1-sy2)*(sy1-sy2);
                  var de = (ex1-ex2)*(ex1-ex2) + (ey1-ey2)*(ey1-ey2);

                 if(ds > de) {
                    actions.zoomOut();
                 }
                 else {
                    actions.zoomIn();
                 }

               }

               state = 0;
            });
        };

        return {
            bind: bind
        };
    }]);

})();
