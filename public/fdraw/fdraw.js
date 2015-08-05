(function() {
   'use strict';

   var fdrawModule = angular.module('fdrawModule');

   fdrawModule.directive('fdraw', function($timeout, iterateMbr, getColor, mapPoint) {
      return {
         restrict: "E",
         replace: true,
         template: '<canvas width="{{params.width}}" height="{{params.height}}"></canvas>',
         scope: {
            params: "="
         },

         link: function(scope, elem) {

            draw(elem, scope.params);

            function draw() {
               var el = elem[0];
               var context = el.getContext("2d");

               $timeout(function() {

                  context.fillStyle = '#eeeeee';
                  context.fillRect(10, 10, 100, 40);
                  context.globalAlpha = 0.8;
                  context.font = "normal 14px Arial";
                  context.fillStyle = '#000000';
                  context.fillText("Processing...", 20, 34);

               });

               $timeout(function() {

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

               });
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
               var needDraw = false;
               scope.$apply(function() {
                  switch(event.keyCode) {
                     case 107: case 187: scope.params.zoom *= 1.5; needDraw = true; break;
                     case 109: case 189: scope.params.zoom /= 1.5; needDraw = true; break;
                  }
               });
               if(needDraw) draw();
            });

            var state  = 0;
            var sx1 = 0, sy1 = 0, sx2 = 0, sy2 = 0, ex1 = 0, ey1 = 0, ex2 = 0, ey2 = 0;

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
                  var s = mapPoint(sx1, sy1, scope.params);
                  var e = mapPoint(ex1, ey1, scope.params);
                  scope.$apply(function() {
                     scope.params.x -= e.x - s.x;
                     scope.params.y -= e.y - s.y;
                  });
                  draw();
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

                  scope.$apply(function() {
                     if(ds > de) {
                        scope.params.zoom /= 1.5;
                     }
                     else {
                        scope.params.zoom *= 1.5;                        
                     }
                  });
                  draw();

               }

               state = 0;
            });

         }
      }
   });

})();
