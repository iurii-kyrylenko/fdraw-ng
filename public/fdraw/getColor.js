(function() {
   'use strict';

  /*
   * HSV standard: Red-Yellow-Green-Cyan-Blue-Magenta-Red
   * Usage: hsv2rgb(h, 1, h < 1);
   */
   function hsv2rgb(h, s, v) {
      var r, g, b, i, f, p, q, t;
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
      }
      return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
        a: 255
      };
   }   

  /*
   * Custom: White-Magenta-Blue-Cyan-Green-Yellow-Red-Black
   * Usage: wb2rgb(h);
   */
   function wb2rgb(h) {
      var r, g, b, i, p, q;
      i = h === 1 ? 6 : Math.floor(h * 7);
      p = h * 7 - i;
      q = 1 - p;
      switch (i % 7) {
        case 0: r = 1, g = q, b = 1; break;
        case 1: r = q, g = 0, b = 1; break;
        case 2: r = 0, g = p, b = 1; break;
        case 3: r = 0, g = 1, b = q; break;
        case 4: r = p, g = 1, b = 0; break;
        case 5: r = 1, g = q, b = 0; break;
        case 6: r = q, g = 0, b = 0; break;
      }
      return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
        a: 255
      };
   }   

   var fdrawModule = angular.module('fdrawModule');

   fdrawModule.value('getColor', function(maxIter, n) {
      var h = n/maxIter;
      return wb2rgb(h);
   });

})();
