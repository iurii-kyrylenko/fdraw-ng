(function() {
   'use strict';

   var fdrawModule = angular.module('fdrawModule');
   fdrawModule.directive('fdraw',  fdraw);
   fdraw.$inject = ['iterate', 'getColor', 'mapPoint', 'interactions'];

   function fdraw(iterate, getColor, mapPoint, interactions) {

      return {
         restrict: "E",
         replace: true,
         template: '<canvas width="{{params.width}}" height="{{params.height}}"></canvas>',
         scope: {
            params: "="
         },

         link: function(scope, elem, attr) {

            var iterateFn =
               (attr.type === 'mandelbrot') ? iterate.mandelbrot : iterate.colorPalette;

            scope.$watch("params", function() {
               draw();
            }, true);
 
            interactions.bind(scope, elem, {
               move: function(dx, dy) {
                  scope.$apply(function() {
                     scope.params.x -= dx;
                     scope.params.y -= dy;
                  });
               },
               zoomIn: function() {
                  scope.$apply(function() {
                     scope.params.zoom *= 1.5;
                  });
               },
               zoomOut: function() {
                  scope.$apply(function() {
                     scope.params.zoom /= 1.5;
                  });
               }
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
                     var nIter = iterateFn(cPoint, maxIter);
                     var c = getColor.wb(nIter/maxIter);
                     imgData.data[ii+0] = c.r;
                     imgData.data[ii+1] = c.g;
                     imgData.data[ii+2] = c.b;
                     imgData.data[ii+3] = c.a;
                  }
               }
               context.putImageData(imgData, 0, 0);
            }
         }
      }
   }
   
})();
