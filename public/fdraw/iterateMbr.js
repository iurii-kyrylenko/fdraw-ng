(function() {
   'use strict';

   var fdrawModule = angular.module('fdrawModule');

   fdrawModule.factory('iterateMbr', function(){
      return function(c, maxIter) {
         var z = {x:0, y:0};
         for(var i = 0 ;i < maxIter; i++) {
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
      };
   });

})();
