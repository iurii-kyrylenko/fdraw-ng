(function() {
   'use strict';

   var fdrawModule = angular.module('fdrawModule');

   fdrawModule.factory('iterate', function() {

      return {
         mandelbrot: mandelbrot,
         colorPalette: colorPalette
      };

      function colorPalette(c, maxIter) {
         if(c.x < 0 || c.x > 1 || c.y < 0 || c.y > 1) return 0;
         return c.x * maxIter;
      }

      function mandelbrot(c, maxIter) {
         var z = {x:0, y:0};
         for(var i = 0; i < maxIter; i++) {
            var zz = {
               x: z.x*z.x - z.y*z.y + c.x,
               y: 2*z.x*z.y + c.y
            };
            if(zz.x*zz.x + zz.y*zz.y > 4) {
               return i;
            }
            z = zz;
         }
         return maxIter;
      }
   });

})();
