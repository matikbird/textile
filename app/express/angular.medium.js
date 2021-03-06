/*global MediumEditor */
'use strict';

angular.module('angular-medium-editor', [])

  .directive('mediumEditor', function() {

    function toInnerText(value) {
      var tempEl = document.createElement('div'),
          text;
      tempEl.innerHTML = value;
      text = tempEl.textContent || '';
      return text.trim();
    }

    return {
      require: 'ngModel',
      restrict: 'AE',
      scope: { bindOptions: '=' },
      link: function(scope, iElement, iAttrs, ngModel) {

        angular.element(iElement).addClass('angular-medium-editor');

        // Global MediumEditor
        ngModel.editor = new MediumEditor(iElement, scope.bindOptions);
 
        ngModel.$render = function() {
          iElement.html(ngModel.$viewValue || "");
          var placeholder = ngModel.editor.getExtensionByName('placeholder');
          if (placeholder) {
            placeholder.updatePlaceholder(iElement[0]);
          }
          
        };

        ngModel.$isEmpty = function(value) {
          if (/[<>]/.test(value)) {
            return toInnerText(value).length === 0;
          } else if (value) {
            return value.length === 0;
          } else {
            return true;
          }
        };

        ngModel.editor.subscribe('editableInput', function (event, editable) {
          ngModel.$setViewValue(editable.innerHTML.trim());
        });

        scope.$watch('bindOptions', function(bindOptions) {
          ngModel.editor.init(iElement, bindOptions);
          
        });
        
        scope.$on('$destroy', function() {
          ngModel.editor.destroy();
        });
     } 
    };

  });

angular.module("ui-notification",[]),angular.module("ui-notification").provider("Notification",function(){this.options={delay:5e3,startTop:10,startRight:10,verticalSpacing:10,horizontalSpacing:10,positionX:"right",positionY:"top",replaceMessage:!1,templateUrl:"angular-ui-notification.html",onClose:void 0,closeOnClick:!0,maxCount:0},this.setOptions=function(e){if(!angular.isObject(e))throw new Error("Options should be an object!");this.options=angular.extend({},this.options,e)},this.$get=["$timeout","$http","$compile","$templateCache","$rootScope","$injector","$sce","$q","$window",function(e,t,n,i,o,s,a,l,r){var c=this.options,p=c.startTop,d=c.startRight,u=c.verticalSpacing,m=c.horizontalSpacing,f=c.delay,g=[],h=!1,C=function(s,C){var y=l.defer();return"object"!=typeof s&&(s={message:s}),s.scope=s.scope?s.scope:o,s.template=s.templateUrl?s.templateUrl:c.templateUrl,s.delay=angular.isUndefined(s.delay)?f:s.delay,s.type=C||c.type||"",s.positionY=s.positionY?s.positionY:c.positionY,s.positionX=s.positionX?s.positionX:c.positionX,s.replaceMessage=s.replaceMessage?s.replaceMessage:c.replaceMessage,s.onClose=s.onClose?s.onClose:c.onClose,s.closeOnClick=null!==s.closeOnClick&&void 0!==s.closeOnClick?s.closeOnClick:c.closeOnClick,t.get(s.template,{cache:i}).success(function(t){function i(e){["-webkit-transition","-o-transition","transition"].forEach(function(t){f.css(t,e)})}var o=s.scope.$new();o.message=a.trustAsHtml(s.message),o.title=a.trustAsHtml(s.title),o.t=s.type.substr(0,1),o.delay=s.delay,o.onClose=s.onClose;var l=function(){for(var e=0,t=0,n=p,i=d,o=[],a=g.length-1;a>=0;a--){var l=g[a];if(s.replaceMessage&&a<g.length-1)l.addClass("killed");else{var r=parseInt(l[0].offsetHeight),f=parseInt(l[0].offsetWidth),h=o[l._positionY+l._positionX];C+r>window.innerHeight&&(h=p,t++,e=0);var C=n=h?0===e?h:h+u:p,y=i+t*(m+f);l.css(l._positionY,C+"px"),"center"==l._positionX?l.css("left",parseInt(window.innerWidth/2-f/2)+"px"):l.css(l._positionX,y+"px"),o[l._positionY+l._positionX]=C+r,c.maxCount>0&&g.length>c.maxCount&&0===a&&l.scope().kill(!0),e++}}},f=n(t)(o);f._positionY=s.positionY,f._positionX=s.positionX,f.addClass(s.type);var C=function(e){e=e.originalEvent||e,("click"===e.type||"opacity"===e.propertyName&&e.elapsedTime>=1)&&(o.onClose&&o.$apply(o.onClose(f)),f.remove(),g.splice(g.indexOf(f),1),o.$destroy(),l())};s.closeOnClick&&(f.addClass("clickable"),f.bind("click",C)),f.bind("webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd",C),angular.isNumber(s.delay)&&e(function(){f.addClass("killed")},s.delay),i("none"),angular.element(document.getElementsByTagName("body")).append(f);var v=-(parseInt(f[0].offsetHeight)+50);if(f.css(f._positionY,v+"px"),g.push(f),"center"==s.positionX){var k=parseInt(f[0].offsetWidth);f.css("left",parseInt(window.innerWidth/2-k/2)+"px")}e(function(){i("")}),o._templateElement=f,o.kill=function(t){t?(o.onClose&&o.$apply(o.onClose(o._templateElement)),g.splice(g.indexOf(o._templateElement),1),o._templateElement.remove(),o.$destroy(),e(l)):o._templateElement.addClass("killed")},e(l),h||(angular.element(r).bind("resize",function(){e(l)}),h=!0),y.resolve(o)}).error(function(e){throw new Error("Template ("+s.template+") could not be loaded. "+e)}),y.promise};return C.primary=function(e){return this(e,"primary")},C.error=function(e){return this(e,"error")},C.success=function(e){return this(e,"success")},C.info=function(e){return this(e,"info")},C.warning=function(e){return this(e,"warning")},C.clearAll=function(){angular.forEach(g,function(e){e.addClass("killed")})},C}]}),angular.module("ui-notification").run(["$templateCache",function(e){e.put("angular-ui-notification.html",'<div class="ui-notification"><h3 ng-show="title" ng-bind-html="title"></h3><div class="message" ng-bind-html="message"></div></div>')}]);