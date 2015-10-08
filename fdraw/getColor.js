(function() {
   'use strict';

   var fdrawModule = angular.module('fdrawModule');

   fdrawModule.factory('getColor', function() {
      return function(maxIter, n) {
         var max = 255;
         var del = Math.floor(maxIter / 7);

         var level = Math.floor(n / del);
         var ir = 0, ig = 0, ib = 0;

         switch (level) {
            case 0: // white to magenta
            ir = max;
            ig = Math.floor(-max / del * n + max);
            ib = max;
            break;

            case 1: // magenta to blue
            ir = Math.floor(-max / del * n + 2 * max);
            ig = 0;
            ib = max;
            break;

            case 2: // blue to cyan
            ir = 0;
            ig = Math.floor(max / del * n - 2 * max);
            ib = max;
            break;

            case 3: // cyan to green
            ir = 0;
            ig = max;
            ib = Math.floor(-max / del * n + 4 * max);
            break;

            case 4: // green to yellow
            ir = Math.floor(max / del * n - 4 * max);
            ig = max;
            ib = 0;
            break;

            case 5: // yellow to red
            ir = max;
            ig = Math.floor(-max / del * n + 6 * max);
            ib = 0;
            break;

            case 6: // red to black
            ir = Math.floor(-max / del * n + 7 * max);
            ig = 0;
            ib = 0;
            break;
         }

         return {"r": ir, "g": ig, "b": ib, "a": 255};    
      };
   });

})();
