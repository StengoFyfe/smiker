//Globals

   // Master Context
   // Central Singleton for controlling the UI 
 app.factory('MasterContext', function($rootScope, $location, $translate, SaveBroadcaster) {
	  var errorArr = new Array();
	  var reloadTrigger = 0;
	  var currShownScreen = 1020;
	  var loggedIn = false;

	  var sweepAnimation = 'view-animate-b';
	  var showWait = false;
	  var screenStack = new Stack(100, 5);
	  var imgProv = null;
	  
	 	


	  
	  var FinalIndexHeaderArray = new Array();
	  
	  // Übersetzungen
	  $translate('SUBHEADER_STANDORT_ABT').then(function (text) { FinalIndexHeaderArray[0] = text; } );
	  $translate('SUBHEADER_MATGRUPPE').then(function (text) { FinalIndexHeaderArray[1] = text; } );
	  $translate('SUBHEADER_SUPPLIER').then(function (text) { FinalIndexHeaderArray[2] = text; } );
	  $translate('SUBHEADER_UMSATZ').then(function (text) { FinalIndexHeaderArray[50] = text; } );
	  $translate('SUBHEADER_ADD_SUPP').then(function (text) { FinalIndexHeaderArray[500] = text; } );
	  $translate('SUBHEADER_HOME').then(function (text) { FinalIndexHeaderArray[1000] = text; } );
	  $translate('SUBHEADER_EINSTELLUNGEN').then(function (text) { FinalIndexHeaderArray[1010] = text; } );
	  $translate('SUBHEADER_AUTH').then(function (text) { FinalIndexHeaderArray[1020] = text; } );


	  return {
		  MasterContext : function() {
			  this.showWait = showWait;
	  
			  
		  },
		  isLoggedIn : function() {
			  return loggedIn;  
		  },
		  setLoggedIn : function( logged ) {
			  loggedIn = logged;
		  },
		  pushError : function ( errorMsg ) {
			  errorArr[errorArr.length] = errorMsg;
		  },
		  getErrors : function () {
			  return errorArr;  
		  },
		  getLastError : function () {
			  var ret = new Array();
			  if( errorArr != null && errorArr.length > 0 )
				  ret[0] = errorArr[errorArr.length-1];
			  return ret;
		  },
	  	  clearErrors : function () {
	  		  errorArr = null;
	  		  errorArr = new Array();
	  	  },
		  getReloadTrigger : function() {
			  return reloadTrigger;
		  },
		  triggerReload : function() {
			  reloadTrigger = 1;
			  this.clearErrors();
			  SaveBroadcaster.broadcast( $rootScope, "triggerReload", reloadTrigger);
			  reloadTrigger = 0;
		  },
		  triggerUmsatzReload : function() {
			reloadTrigger = 1;
			this.clearErrors();
			SaveBroadcaster.broadcast( $rootScope, "umsatzReload", reloadTrigger);
			reloadTrigger = 0;
		  },
		  getCurrShownScreen : function() {
			  return currShownScreen;
		  },
		  getCurrShownScreenName : function() {
			  return FinalIndexHeaderArray[currShownScreen];
		  },
		  getCurrBrowseImage : function() {
			  if( currShownScreen < 50) {
				  return 'images/browse_'+currShownScreen+'.png';
			  } 
			  else {
				  return '';
			  }
		  },
		  getImgProv : function() {
			  if( imgProv == null )
				  imgProv = new imgProvider( isSmallMode );
			  
			  return imgProv; 
			},
			IsSmallmode : function() {
				return isSmallMode;
			},
			IsLandscape : function() {
				return isLandscape;
			},
		  onSwipe : function( direction ) {
			if( direction == 1 && currShownScreen < 2) {
				this.onSweep(1);
				this.setCurrShownScreen( this.getCurrShownScreen() + 1);
			}
			if( direction == -1 && currShownScreen <=2 && currShownScreen > 0 ) {
				this.onSweep(-1);
				this.setCurrShownScreen( this.getCurrShownScreen() - 1);
			}
		  },
		  
		  setCurrShownScreen : function( idx ) {
			  lastShownScreen = currShownScreen;
			  currShownScreen = idx;
			  screenStack.push( idx );
			  this.clearErrors();
			  switch( currShownScreen ) {
			  case 0:
				  $location.path('/standortabteilung');
				  break;
			  case 1:
				  $location.path('/matgruppe');
				  break;
			  case 2:
				  $location.path('/supplier');
				  break;
			  case 50:
				  $location.path('/umsatz');
				  break;
			  case 500:
				  $location.path('/editSupplier');
				  break;
			  case 1010:
				  $location.path('/settings');
				  break;
			  case 1020:
				  $location.path('/login');
				  break;
			  case 1000:
			  default:
				  $location.path('/home');
			  }
		  },
		  setLastShownScreen : function( ) {
			  // remove the current Screen
			  screenStack.pop();
			  
			  // return the screen before the current
			  this.setCurrShownScreen(screenStack.pop() );  
		  },
		  screenStackPop : function () {
			 screenStack.pop();  
		  },
		  onSweep : function( dir ) {
			// detect the correct animation Direction
			switch( dir ) {
			case 1:
				sweepAnimation = 'view-animate-l';
				break;
			case 0:
				sweepAnimation = 'view-animate-b';
				break;

			default:
				sweepAnimation = 'view-animate-r';
			}
		  },
		  getSweepAnimation : function() {
			  return sweepAnimation;
		  },
		  goToView : function (hash) { 
			  $location.path(hash);
		  },
		  getShowWait : function () {
			  return showWait;
		  },
		  setShowWait : function( show ) {
			  showWait = show;  
		  }

	  };
	
	} );

 // sends the message with a guid to ensure that a listener is able to handle it only once
 app.factory('SaveBroadcaster', function() {
	return {
		transientSet : new TransientShortSet('$'),	
		SaveBroadcaster: function() {
			
		},
		broadcast: function($rootScope, ev, arg) {
 	        var g = (new guid())();
 	        
  		    $rootScope.$broadcast(ev, [g, arg]);
  		    this.transientSet.remove( g, '$' );
		},
		check: function( arg, context ) {
			var g = arg[0];
			var found = this.transientSet.find(g + '$' + context);
			if( found === -1 )
				this.transientSet.add(g  + '$' + context);
			
			return found === -1;
		},
		arg: function( ar ) {
			return ar[1];
		}
	} ;
 });
 
	// SelectionContext
app.factory('SelectionContext', function() {
	  var selStandort = null;
	  var selAbteilung = null;
	  var selMaterialgruppe = null;
	  var selSupplier = null;
	  var selElements = new Array();
	  var images = new Array();
	  images["standort"] = 'images/factory.png';
	  images["abteilung"] = 'images/department.jpg';
	  images["matgruppe"] = 'images/materialgruppe.jpg';
      images["supplier"] = 'images/supplier.jpg';
	  
	  
    return {
    	SelectionContext: function() {

    	},
    	clearSelection: function() {
  		  selStandort = null;
		  selAbteilung = null;
		  selMaterialgruppe = null;
		  selSupplier = null;
		  selElements = new Array();
    	},

        getSelStandort: function() {
            return selStandort;
          },
          setSelStandort: function(standort) {

        	if( standort != null ) {
        		var StandortEx = function( standort, imgurl, idx ) {
        				this.standort = standort;
        				this.imgurl = imgurl;
        				this.txt = standort.NAME;
        				this.idx = idx;        				
        			};
        		StandortEx.prototype.getImage = function() { return this.imgurl; };
        		StandortEx.prototype.getTxt = function() { return this.txt; };
        		StandortEx.prototype.getIdx = function() { return this.idx; };
        		StandortEx.prototype.getId = function() { return this.id; };
        			
	            selStandort = standort;
	            selElements[0] = new StandortEx( standort, images["standort"], 0);
        	}
        	else {
        		selStandort = null;
        		selElements[0] = null;
        		selAbteilung = null;
        		selElements[1] = null;
        	}
        	this.setSelAbteilung(null);
            
            },
          getSelAbteilung: function() {
              return selAbteilung;
            },
          setSelAbteilung: function(abteilung) {
        	  if( abteilung != null ) {
            		var AbteilungEx = function( abteilung, imgurl, idx ) {
            				this.abteilung = abteilung;
            				this.imgurl = imgurl;
            				this.txt = abteilung.NAME;
            				this.idx = idx;
            			};
            		AbteilungEx.prototype.getImage = function() { return this.imgurl; };
            		AbteilungEx.prototype.getTxt = function() { return this.txt; };
            		AbteilungEx.prototype.getIdx = function() { return this.idx; };
            			
	              selAbteilung = abteilung;
	              selElements[1] = new AbteilungEx( abteilung, images["abteilung"], 0);
        	  }
        	  else {
        		  selAbteilung = null;
        		  selElements[1] = null;
        	  }
            },
            
            
            getSelMaterialgruppe: function() {
                return selMaterialgruppe;
              },
            setSelMaterialgruppe: function(materialgruppe) {
          	  if( materialgruppe != null ) {
              		var MaterialgruppeEx = function( materialgruppe, imgurl, idx ) {
              				this.materialgruppe = materialgruppe;
              				this.imgurl = imgurl;
              				this.txt = materialgruppe.NAME;
            				this.idx = idx;        				
              			};
              		MaterialgruppeEx.prototype.getImage = function() { return this.imgurl; };
              		MaterialgruppeEx.prototype.getTxt = function() { return this.txt; };
            		MaterialgruppeEx.prototype.getIdx = function() { return this.idx; };

              			
  	              selMaterialgruppe = materialgruppe;
  	              selElements[2] = new MaterialgruppeEx( materialgruppe, images["matgruppe"], 1);
          	  }
          	  else {
          		  selMaterialgruppe = null;
          		  selElements[2] = null;
          	  }
          },
              
              getSelSupplier: function() {
                  return selSupplier;
                },
              setSelSupplier: function(supplier) {
            	  if( supplier != null ) {
                		var SupplierEx = function( supplier, imgurl, idx ) {
                				this.supplier = supplier;
                				this.imgurl = imgurl;
                				this.txt = supplier.FIRMA;
                				this.idx = idx;        				
                			};
                		SupplierEx.prototype.getImage = function() { return this.imgurl; };
                		SupplierEx.prototype.getTxt = function() { return this.txt; };
                		SupplierEx.prototype.getIdx = function() { return this.idx; };

                			
    	              selSupplier = supplier;
    	              selElements[3] = new SupplierEx( supplier, images["supplier"], 2);
            	  }
            	  else {
            		  selSupplier = null;
            		  selElements[3] = null;
            	  }
                },
              
            
            
          selElements: function() {
            	return selElements;
            },
            selectedItemCount: function() {
            	var counter = 0;
            	
            	if( selStandort != null )
            		counter++;
            	if( selAbteilung != null )
            		counter++;
            	if( selMaterialgruppe != null )
            		counter++;
            	if( selSupplier != null )
            		counter++;
            	return counter;
            },
        
    };
  } );


app.factory( 'LoginContext', function () {
	this.user = null;
	this.pwd = null;
	
	return {
		getLoginObj : function() {
				return new loginObj(this.user, this.pwd);
			},
		setLoginObj : function( user, pwd ) {
			},
		clearLoginObj : function( ) {
			this.user = null;
			this.pwd = null;
		}
		};
	}
);

app.factory( 'SessionContext', function ()  {
	return {
		sessionId : 0,
		getSessionId : function () { return this.sessionId; },
		setSessionId : function ( sessid ) { this.sessionId = sessid; }
	};
} );

app.factory( 'SupplierEditContext', function () {
	this.firma = null;
	this.kred_id = null;
	
	return {
		getSupplier : function() {
				return new supplierObj(this.firma, this.kred_id);
			},
		setSupplier : function( firma, kred_id ) {
			},
		clearSupplier : function( ) {
			this.firma = null;
			this.kred_id = null;
		}
		};
	}
);

app.factory('authHttpResponseInterceptor', ['$q','$location', '$rootScope', 'SaveBroadcaster', function($q,$location,$rootScope, SaveBroadcaster){
    return {
        response: function(response){
            if (response.status === 401) {
            	console.log("Response 401");
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                console.log("Response Error 401",rejection);
                SaveBroadcaster.broadcast($rootScope, "ForceLogin", true);
                //$location.path('/login' );
            }
            if( rejection.status != 401 ) {
            	console.log("Response Error "+rejection.status, rejection);
            	SaveBroadcaster.broadcast($rootScope, "EventError", "Server nicht verfügbar");
            	
            }
            return $q.reject(rejection);
        }
    };
}]);


// I provide a request-transformation method that is used to prepare the outgoing
// request as a FORM post instead of a JSON packet.
app.factory(
    "transformRequestAsFormPost",
    function() {

        // I prepare the request data for the form post.
        function transformRequest( data, getHeaders ) {

            var headers = getHeaders();

            headers[ "Content-Type" ] = "application/x-www-form-urlencoded; charset=utf-8";

            return( serializeData( data ) );

        }


        // Return the factory value.
        return( transformRequest );


        // ---
        // PRVIATE METHODS.
        // ---


        // I serialize the given Object into a key-value pair string. This
        // method expects an object and will default to the toString() method.
        // --
        // NOTE: This is an atered version of the jQuery.param() method which
        // will serialize a data collection for Form posting.
        // --
        // https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
        function serializeData( data ) {

            // If this is not an object, defer to native stringification.
            if ( ! angular.isObject( data ) ) {

                return( ( data == null ) ? "" : data.toString() );

            }

            var buffer = [];

            // Serialize each key in the object.
            for ( var name in data ) {

                if ( ! data.hasOwnProperty( name ) ) {

                    continue;

                }

                var value = data[ name ];

                buffer.push(
                    encodeURIComponent( name ) +
                    "=" +
                    encodeURIComponent( ( value == null ) ? "" : value )
                );

            }

            // Serialize the buffer and clean it up for transportation.
            var source = buffer
                .join( "&" )
                .replace( /%20/g, "+" )
            ;

            return( source );

        }

    }
);

