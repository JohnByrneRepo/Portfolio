(function() {
  'use strict';

 app.directive('typewrite', ['$timeout', function ($timeout) {
    function linkFunction (scope, iElement, iAttrs) {
      var timer = null,
        initialDelay = iAttrs.initialDelay ?
          getTypeDelay(iAttrs.initialDelay) : 200,
        typeDelay = iAttrs.typeDelay ?
          getTypeDelay(iAttrs.typeDelay) : 200,
        blinkDelay = iAttrs.blinkDelay ?
          getAnimationDelay(iAttrs.blinkDelay) : false,
        cursor = iAttrs.cursor ?
          iAttrs.cursor : '|',
        blinkCursor = iAttrs.blinkCursor ?
          iAttrs.blinkCursor === 'true' : true,
        auxStyle,
        messages = [],
        messageNumber,
        colorIndex = 0,
        colors = [
          '#F92672',
          '#66D9EF',
          '#A6E22E',
          '#FD971F',
          '#FFFFFF'
        ];

      if (iAttrs.text) {
        messageNumber = 0;
        messages = iAttrs.text.split(',');
        timer = $timeout(function() {
          updateIt(iElement, 0, messages[messageNumber], colors[colorIndex]);
        }, initialDelay);
      }

      function wrapColor(aString, aColor) {
        return '<span style="color:' + aColor + ' !important">' +
          aString + '</span>';
      }

      function updateIt(element, i, text, aColor) {
        if (i <= text.length) {
          element.html(wrapColor(text.substring(0, i) + cursor, aColor));
          i++;
          timer = $timeout(function() {
            updateIt(iElement, i, text, aColor);
          }, typeDelay);
          return;
        } else {
          if (blinkCursor) {
            if (blinkDelay) {
              auxStyle = '-webkit-animation:blink-it steps(1) ' +
                blinkDelay + ' infinite;-moz-animation:blink-it steps(1) ' +
                blinkDelay + ' infinite ' + '-ms-animation:blink-it steps(1) ' +
                blinkDelay + ' infinite;-o-animation:blink-it steps(1) ' +
                blinkDelay + ' infinite; ' + 'animation:blink-it steps(1) ' +
                blinkDelay + ' infinite;';
              element.html(wrapColor(text.substring(0, i) +
                '<span class="blink" style="' + auxStyle + '">' + cursor +
                '</span>', aColor));
            } else {
              element.html(wrapColor(text.substring(0, i) +
                '<span class="blink">' + cursor + '</span>', aColor));
            }
          } else {
            element.html(wrapColor(text.substring(0, i), aColor));
          }
          messageNumber += 1;
          colorIndex += 1;

          if (messageNumber > messages.length - 1) {
            messageNumber = 0;
          }

          if (colorIndex > colors.length - 1) {
            colorIndex = 0;
          }

          $timeout(function() {
            updateIt(iElement, 0, messages[messageNumber], colors[colorIndex]);
          }, 2000);
        }
      }

      function getTypeDelay(delay) {
        if (typeof delay === 'string') {
          return delay.charAt(delay.length - 1) === 's' ?
            parseInt(delay.substring(0, delay.length - 1), 10) * 1000 : +delay;
        }
      }

      function getAnimationDelay(delay) {
        if (typeof delay === 'string') {
          return delay.charAt(delay.length - 1) === 's' ? delay :
            parseInt(delay.substring(0, delay.length - 1), 10) / 1000;
        }
      }

      scope.$on('$destroy', function() {
        if(timer) {
          $timeout.cancel(timer);
        }
      });
    }

    return {
      restrict: 'A',
      link: linkFunction,
      scope: false
    };

  }]);

}());