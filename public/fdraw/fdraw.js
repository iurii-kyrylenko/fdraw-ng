(function() {
   'use strict';

   var fdrawModule = angular.module('fdrawModule');

   fdrawModule.directive('fdraw', function($timeout, iterateMbr, getColor, mapPoint) {
      return {
         restrict: "E",
         replace: true,
         template: '<canvas width="{{params.width}}" height="{{params.height}}"></canvas>',
         scope: {
            params: "=",
         },

         link: function(scope, elem) {

            $timeout(function() {
               draw(elem, scope.params);
            });

            function draw() {
               var el = elem[0];
               var context = el.getContext("2d");
               var width = scope.params.width,
               height = scope.params.height,
               halfWidth  = Math.floor(width / 2),
               halfHeight = Math.floor(height / 2);
               var imgData = context.createImageData(width, height);
               var maxIter = 300;

               for(var j = 0; j < height; j++) {
                  for(var i = 0; i < width; i++) {
                     var ii = 4*(j * width + i);
                     var cPoint = mapPoint(i - halfWidth, j - halfHeight, scope.params);
                     var nIter = iterateMbr(cPoint, maxIter)
                     var c = getColor(maxIter, nIter);
                     imgData.data[ii+0] = c.r;
                     imgData.data[ii+1] = c.g;
                     imgData.data[ii+2] = c.b;
                     imgData.data[ii+3] = c.a;
                  }
               }
               context.putImageData(imgData, 0, 0);
            }

            var cStart;

            elem.on("mousedown", function(event) {
               cStart = mapPoint(event.clientX, event.clientY, scope.params);
            });

            elem.on("mouseup", function(event) {
               var cEnd = mapPoint(event.clientX , event.clientY, scope.params);
               scope.$apply(function() {
                  scope.params.x -= cEnd.x - cStart.x;
                  scope.params.y -= cEnd.y - cStart.y;
               });
               draw();
            });

            elem.on('keydown', function(event) {
               scope.$apply(function() {
                  var needDraw = false;
                  switch(event.keyCode) {
                     case 107: case 187: scope.params.zoom *= 1.5; needDraw = true; break;
                     case 109: case 189: scope.params.zoom /= 1.5; needDraw = true; break;
                  }
                  if(needDraw) draw();
               });
            });

         }
      }
   });

})();
