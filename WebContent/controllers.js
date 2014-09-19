// Selection Control... provides SelectionContext AND MasterContext
app.controller('SelectionCtrl', function($scope, SelectionContext, MasterContext){
        $scope.selectionContext = SelectionContext;
        $scope.masterContext = MasterContext;
      });

// ToggleButton Control... older Version of ToggleButtonGeneric, using the Images "BTN_PRESSED"
app.controller('ToggleButton', function($scope, SelectionContext, MasterContext) {
	$scope.selectionContext = SelectionContext;
	$scope.masterContext = MasterContext;
	$scope.imageButtonUrl = $scope.masterContext.getImgProv().getImage('BTN_UNPRESSED');
	$scope.menuClass = 'MenuItemOff';
	$scope.btnPressed = false;
	$scope.mouseOver = false;
	
	$scope.over = function( isOver ) {
		if( !$scope.btnPressed ) {
			if( isOver ) {
				$scope.imageButtonUrl = $scope.masterContext.getImgProv().getImage('BTN_PRESSED');
			    $scope.menuClass = 'MenuItemOn';
			}
			else {
				$scope.imageButtonUrl = $scope.masterContext.getImgProv().getImage('BTN_UNPRESSED');
			    $scope.menuClass = 'MenuItemOff';
			}
		}
	};

});

// ToggleButtonGeneric Controller ... Map the mouseOver Events to the function "over" and provide the image-base-info with "imgBtnurl"
app.controller('ToggleButtonGeneric', function($scope, SelectionContext, MasterContext) {
	$scope.selectionContext = SelectionContext;
	$scope.masterContext = MasterContext;
	$scope.menuClass = 'MenuItemOff';
	$scope.btnPressed = false;
	$scope.mouseOver = false;
	
	$scope.over = function( isOver ) {
		if( isOver )
			$scope.mouseOver = true;
		else
			$scope.mouseOver = false;
		
	};
	$scope.imgBtnUrl = function( baseurl, extension ) {
		if($scope.mouseOver) {
			return baseurl+'_sel'+'.'+extension;
		}
		else {
			return baseurl+'.'+extension;
			
		}
	};

});
      
// Controller Class holding the MasterContext Singleton 
// Addintionally there are some Events, that are handled here as well
app.controller('MasterController', function($scope, MasterContext, SaveBroadcaster ){
	    $scope.masterContext = MasterContext;
	    $scope.reloadTrigger = MasterContext.getReloadTrigger;
	    $scope.errorArr = MasterContext.getErrors();
	    $scope.saveBroadcaster = SaveBroadcaster;
	    
    
		// ------------------------------------------------
	    // react on NewError
		// ------------------------------------------------
		  $scope.$watch('errorArr', function() {
			  $scope.errorArr = null;
			  $scope.errorArr = $scope.masterContext.getErrors();
		  }
		  );		  
		  
	  $scope.$on('EventError', function(ev, arr) {
		    if(!$scope.saveBroadcaster.check( arr, 'MasterController' ))
		    	return;
		  	$scope.masterContext.pushError( $scope.saveBroadcaster.arg(arr) );
	  	}, true
	  );
	  $scope.$on('showWaitDlg', function(ev, arr) {
		  if( !$scope.saveBroadcaster.check(arr, 'MasterController') )
			  return; 
		  if( ok = $scope.saveBroadcaster.arg(arr) )
			  $scope.showWaitDlg();
		  else
			  $scope.hideWaitDlg();
	  });
	  $scope.$on('supplierStored', function(ev, arr ) {
		  if( !$scope.saveBroadcaster.check( arr, 'MasterController' ) )
			  return;
		  
		  var ok = $scope.saveBroadcaster.arg( arr);
		  
			  if( ok ) {
				  $scope.navBack();
				  SaveBroadcaster.broadcast( $rootScope, "supplierReload", null);
			  }
	  });
	  $scope.$on('ForceLogin', function(ev, arr) {
		  if( !$scope.saveBroadcaster.check( arr, 'MasterController' ) )
			  return;
		  
		  var ok = $scope.saveBroadcaster.arg(arr);
	      if( ok ) {
	    	  $scope.masterContext.setLoggedIn(false);
	    	  $scope.masterContext.setCurrShownScreen(1020);
	      }
	    	  
	  });
	  $scope.$on('loginResult', function(ev, arr ) {
		 if( !$scope.saveBroadcaster.check( arr, 'MasterController' ) )
			 return;
		 
		 $scope.masterContext.setLoggedIn( true );
		 $scope.masterContext.setCurrShownScreen(1000);
	  });
		$scope.showWaitDlg = function() {
			ray.ajax();
			//$scope.masterContext.setShowWait(true);

		  };
		$scope.hideWaitDlg = function() {
			//$scope.masterContext.setShowWait(false);
			ray.endit();
		  };

	  $scope.navBack = function() {
		  $scope.masterContext.setLastShownScreen( );
	  };
	  $scope.showScreen = function( screen ) {
		  $scope.masterContext.setCurrShownScreen( screen );
	  };
  } );

app.controller('LoginCtrl', function($scope, MasterContext, LoginContext, LoginWebService ) {
	$scope.masterContext = MasterContext;
	$scope.loginContext = LoginContext;
	$scope.loginWebService = LoginWebService;
	
	$scope.loginWebService.login( null, false ); // Try login with via cookie;
	
	$scope.$on('loginResult', function(ev, arr) {
		  if( !$scope.saveBroadcaster.check( arr, 'LoginCtrl' ) )
			  return;
		  
		  var ok = $scope.saveBroadcaster.arg(arr);
	      if( ok ) {
	    	  $scope.loginContext.clearLoginObj();
	      }
	    	  
	  });

	
});
  
app.controller('AbteilungCtrl', function($scope, MasterContext, AbteilungLoadService, SelectionContext){
    	  $scope.masterContext = MasterContext;
    	  $scope.selectionContext = SelectionContext;
    	  $scope.abteilungLoadService = AbteilungLoadService;
    	  $scope.abteilungLoadService.refresh();
    	  
		  // ------------------------------------------------
		  // react on Load Request
		  // ------------------------------------------------
    	  $scope.$on("abteilungenReloaded", function(ev, arr ) {
    		  		$scope.abteilungen = $scope.saveBroadcaster.arg(arr);
    	  		}
    	   );

		  // ------------------------------------------------
		  // retrieve Tree Item List
		  // ------------------------------------------------
    	  $scope.getTreeItemList = function(abteilung) {
    		  if( abteilung == null)
    			  return null;
    		  
    		  var dummyCollection = new Array();
    		  var i = 0;
    		  for( i=0; i<abteilung.TREEPOS - 1; i++ ) {
				dummyCollection[i] = 'images/arrow-right.jpg';
			  }
    		  return dummyCollection;
    	  };
    	  
		  // ------------------------------------------------
		  // Filter Function 
		  // ------------------------------------------------
    	  $scope.isAbteilungInStandort = function(abteilung) {
    		 
    		  
    	        if (abteilung.FK_STANDORT == ($scope.selectionContext.getSelStandort() != null ? $scope.selectionContext.getSelStandort().ID : -1))
    	        {
    	          return true;
    	        }

    	        return false;
    	      };
    	      
		  // ------------------------------------------------
		  // react on 
		  // ------------------------------------------------
		  $scope.$on("triggerReload", function(ev, arr ) {
    			  if( (reloadTrigger = $scope.saveBroadcaster.arg(arr)) == 1 ) {
    				  $scope.abteilungLoadService.refresh();
    			  }
    		  } );    	      
    	});
    	
app.controller('StandortCtrl', function($scope, MasterContext, StandortLoadService, SelectionContext) {
  	
	  $scope.masterContext = MasterContext;
	  $scope.selectionContext = SelectionContext;
	  $scope.standortLoadService = StandortLoadService;
	  $scope.standortLoadService.refresh();
	  
	// ------------------------------------------------
	// react on Load Request
	// ------------------------------------------------
	  $scope.$on("standorteReloaded", function(ev, arr ) {
		  
		  		$scope.standorte = $scope.saveBroadcaster.arg(arr);
	  		}
	   );
	  
	// ------------------------------------------------
	// react on 
	// ------------------------------------------------
	  $scope.$on("triggerReload", function(ev, arr ) {
		  if( (reloadTrigger = $scope.saveBroadcaster.arg(arr))== 1 ) {
			  $scope.standortLoadService.refresh();
		  }
	  } );
	  
    	});
app.controller('MaterialgruppeCtrl', function($scope, MasterContext, MaterialgruppeLoadService, SelectionContext) {
  	
	  $scope.masterContext = MasterContext;
	  $scope.selectionContext = SelectionContext;
	  $scope.materialgruppeLoadService = MaterialgruppeLoadService;
	  $scope.materialgruppeLoadService.refresh();
	  
	// ------------------------------------------------
	// react on Load Request
	// ------------------------------------------------
	  $scope.$on("materialgruppenReloaded", function(ev, arr ) {
		  		$scope.materialgruppen = $scope.saveBroadcaster.arg(arr);
	  		}
	   );
	  
	// ------------------------------------------------
	// react on 
	// ------------------------------------------------
	  $scope.$on("triggerReload", function(ev, arr ) {
		  if( (reloadTrigger = $scope.saveBroadcaster.arg(arr) )== 1 ) {
			  $scope.materialgruppeLoadService.refresh();
		  }
	  } );
	  
    	});
  app.controller('SupplierCtrl', function($scope, MasterContext, SupplierLoadService, SelectionContext) {
  	
	  $scope.masterContext = MasterContext;
	  $scope.selectionContext = SelectionContext;
	  $scope.supplierLoadService = SupplierLoadService;
	  $scope.supplierLoadService.refresh();
	  
	// ------------------------------------------------
	// react on Load Request
	// ------------------------------------------------
	  $scope.$on("supplierReloaded", function(ev, arr ) {
		  		$scope.suppliers = $scope.saveBroadcaster.arg(arr);
	  		}
	   );
	  
	// ------------------------------------------------
	// react on 
	// ------------------------------------------------
	  $scope.$on("triggerReload", function(ev, arr ) {
		  if( (reloadTrigger = $scope.saveBroadcaster.arg(arr) ) == 1 ) {
			  $scope.supplierLoadService.refresh();
		  }
	  } );
	  
	  $scope.$on("supplierReload", function(ev, arr ) {
		  if( (reloadTrigger = $scope.saveBroadcaster.arg(arr) ) == 1 ) {
			  $scope.supplierLoadService.refresh();
		  }
	  } );
	  
   });
app.controller('SupplierEditCtrl', function($scope, MasterContext, SupplierEditContext, SupplierStorageService ) {
	$scope.masterContext = MasterContext;
	$scope.supplierEditContext = SupplierEditContext;
	$scope.supplierStorageService = SupplierStorageService;
	
});

app.controller('UmsatzCtrl', function($scope, MasterContext, UmsatzLoadService, SelectionContext, Pagination) {
  	
	  $scope.masterContext = MasterContext;
	  $scope.selectionContext = SelectionContext;
	  $scope.umsatzLoadService = UmsatzLoadService;
	  
	  var pagercount = 0;
	  if( !$scope.masterContext.IsLandscape() )
		  pagercount = 10;
	  else if (!$scope.masterContext.IsSmallmode() )
		  pagercount = 8;
	  else
		  pagercount = 6;
	  
	  $scope.pagination = Pagination.getNew(pagercount);
	  abteilung = $scope.selectionContext.getSelAbteilung();
	  matgruppe = $scope.selectionContext.getSelMaterialgruppe();
	  supplier = $scope.selectionContext.getSelSupplier();
	  $scope.umsatzLoadService.refresh(abteilung == null ? 0 : abteilung.ID, 
			  							matgruppe == null ? 0 : matgruppe.ID,
			  							supplier == null ? 0 : supplier.ID);
	  
	// ------------------------------------------------
	// react on Load Request
	// ------------------------------------------------
	  $scope.$on("umsatzReloaded", function(ev, arr ) {
		  		var data = $scope.saveBroadcaster.arg(arr);
	  			$scope.pagination.numPages = Math.ceil(data.length/$scope.pagination.perPage); 
		  		$scope.umsatz = data;
	  		}
	   );
	  
	// ------------------------------------------------
	// react on 
	// ------------------------------------------------
	  $scope.$on("umsatzReload", function(ev, arr ) {
		  if( ( reloadTrigger=$scope.saveBroadcaster.arg(arr)) == 1 ) {
			  $scope.UmsatzLoadService.refresh();
		  }
	  } );
	  
  	});
	
