(function() {
  'use strict';

  var fdrawModule = angular.module('fdrawModule');

  fdrawModule.factory('getColor', function() {

    return {
      wb: wb2rgb,
      nm: nm2rgb,
      hsv: hsv2rgb
    };

    /*
     * Light wavelength (380 .. 780 nm) to RGB
     */
    function nm2rgb(h) {
      var wavelength = 380 + h * 400;
      var Gamma = 0.80,
      IntensityMax = 255,
      factor, red, green, blue;

      if((wavelength >= 380) && (wavelength < 440)) {
          red = -(wavelength - 440) / (440 - 380);
          green = 0.0;
          blue = 1.0;
      } else if((wavelength >= 440) && (wavelength < 490)) {
          red = 0.0;
          green = (wavelength - 440) / (490 - 440);
          blue = 1.0;
      } else if((wavelength >= 490) && (wavelength < 510)) {
          red = 0.0;
          green = 1.0;
          blue = -(wavelength - 510) / (510 - 490);
      } else if((wavelength >= 510) && (wavelength < 580)) {
          red = (wavelength - 510) / (580 - 510);
          green = 1.0;
          blue = 0.0;
      } else if((wavelength >= 580) && (wavelength < 645)) {
          red = 1.0;
          green = -(wavelength - 645) / (645 - 580);
          blue = 0.0;
      } else if((wavelength >= 645) && (wavelength < 781)) {
          red = 1.0;
          green = 0.0;
          blue = 0.0;
      } else {
          red = 0.0;
          green = 0.0;
          blue = 0.0;
      };

      // Let the intensity fall off near the vision limits

      if((wavelength >= 380) && (wavelength < 420)){
          factor = 0.3 + 0.7*(wavelength - 380) / (420 - 380);
      } else if((wavelength >= 420) && (wavelength < 701)){
          factor = 1.0;
      } else if((wavelength >= 701) && (wavelength < 781)){
          factor = 0.3 + 0.7*(780 - wavelength) / (780 - 700);
      } else{
          factor = 0.0;
      };

      if(red !== 0){
          red = Math.round(IntensityMax * Math.pow(red * factor, Gamma));
      }
      if(green !== 0){
          green = Math.round(IntensityMax * Math.pow(green * factor, Gamma));
      }
      if(blue !== 0){
          blue = Math.round(IntensityMax * Math.pow(blue * factor, Gamma));
      }

      return {
        r: red,
        g: green,
        b: blue,
        a: 255
      };
    }

    /*
     * HSV standard: Red-Yellow-Green-Cyan-Blue-Magenta-Red
     * Usage: hsv2rgb(h, 1, h < 1);
     */
    function hsv2rgb(h, s, v) {
      var r, g, b, i, f, p, q, t;
      if(arguments.length === 1) {
        s = 1;
        v = h < 1;
      }
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
      i = (h === 1) ? 6 : Math.floor(h * 7);
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

  });

})();
