// defines the upmost banner including the home an the settings button
app.directive('headerhome', function(){
  return {
    restrict: 'E',
    scope: {
      value: '='
    },
    template: 
    '<form ng-controller="SelectionCtrl" class="top_header_back">'+
    '<table style="width: 100%"  >'+
  	'<tr> '+
  		'<td align="left" style="width: 10%" class="top_header" ng_controller="ToggleButtonGeneric" > '+		  	
  			'<input class="icon32" ng-show="masterContext.isLoggedIn()" ng-mouseover="over(true)" ng-mouseout="over(false)" type="image" ng-src="{{imgBtnUrl(\'images/home\', \'png\')}}" ng-click="masterContext.onSweep(0);masterContext.setCurrShownScreen(1000);"/>'+ 
  		'</td>  '+
  		'<td class="top_header">'+
		  	 '<span>{{value}}</span> '+
		'</td>'+
  		'<td align="right" style="width: 10%" class="top_header" ng_controller="ToggleButtonGeneric" > '+		  	
			'<input class="icon32" ng-show="masterContext.isLoggedIn()" ng-mouseover="over(true)" ng-mouseout="over(false)" type="image" ng-src="{{imgBtnUrl(\'images/settings\', \'png\')}}" ng-click="masterContext.onSweep(0);masterContext.setCurrShownScreen(1010);"/>'+ 
		'</td>  '+		
	'</tr> '+
  '</table>'+
  '</form> '

  };
});

// i don't know, if this really works
app.directive('modalDialog', function() {
	  return {
	    restrict: 'E',
	    scope: {
	      show: '='
	    },
	    replace: true, // Replace with the template below
	    transclude: true, // we want to insert custom content inside the directive
	    link: function(scope, element, attrs) {
	      scope.dialogStyle = {};
	      if (attrs.width)
	        scope.dialogStyle.width = attrs.width;
	      if (attrs.height)
	        scope.dialogStyle.height = attrs.height;
	      scope.hideModal = function() {
	        scope.show = false;
	      };
	    },
	    template: "<div class='ng-modal' ng-show='show'>"+
	    "<div class='ng-modal-overlay' ng-click='hideModal()'></div> "+
	    "<div class='ng-modal-dialog' ng-style='dialogStyle'> "+
	     " <div class='ng-modal-close' ng-click='hideModal()'>X</div> " +
	     " <div class='ng-modal-dialog-content' ng-transclude></div> " +
	     " </div> "+
	     "</div>' "
	  };
	});



