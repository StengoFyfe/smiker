app.factory('LoginWebService', function($rootScope, $http, $cookies, transformRequestAsFormPost, SaveBroadcaster, SessionContext ) {
	return { LoginWebService : function() {
		
		},
		login: function( loginObj, sendError ) {
			var user = null;
			var pwd = null;
			if( loginObj !== null ) { 
				user = loginObj.getUser();
				pwd = loginObj.getPwd();
			}
			
			// this call is async... Wait for a response
	       	  $http({method: 'POST', 
	     		  	url: 'http://'+location.host+'/WebServiceSpendTestService/rest/SpendTestServices/loginService/122',
	                transformRequest: transformRequestAsFormPost,
	     		  	headers:{
			   		   'Accept': 'application/json;odata=verbose; charset=utf-8',
			   		   'Access-Control-Allow-Credentials' : 'true',
			   		   'Access-Control-Allow-Origin' : 'http://SpendTestAngular.pta.de',
	     		  	},
	       	  		data: {
	       	  			USR: user,
	       	  			PWD: pwd
	       	  		}
	     } )
	  	  .success(function(data, status, headers, config) {
	  		  
	  	        // this callback will be called asynchronously
	  	        // when the response is available

	  		  	token = headers('X-XSRF-TOKEN');
	  		  	if( token != null )
	  		  		SessionContext.setSessionId( token );
	  		  	
	  		  	if( data.ret === "OK")
	  		  		SaveBroadcaster.broadcast( $rootScope, 'loginResult', true);
				else {
					if( sendError )
						SaveBroadcaster.broadcast( $rootScope, 'EventError', 'Anmeldung fehlgeschlagen!');
				}


	  	      })
	  	  .error(function(data, status, headers, config) {
	  		  //$scope.masterContext.pushError("Server ist nicht verfügbar");
	  	        // called asynchronously if an error occurs
	  	        // or server
	  		    if(status != 401) {
	  		  	//SaveBroadcaster.broadcast( $rootScope,'EventError', 'Server nicht verfügbar');
	  		  	SaveBroadcaster.broadcast( $rootScope,'loginResult', false);
	  	  		}
	  	  } )
	  	  .finally( function() {
	  		  	SaveBroadcaster.broadcast( $rootScope,'showWaitDlg', false);
	    	  
	      });
	       	  
	      SaveBroadcaster.broadcast( $rootScope,'showWaitDlg', true);
	       	  
	       	  

			}
		};
		
}); 
// SelectionContext
app.factory('StandortLoadService', function($rootScope, $http, SaveBroadcaster, SessionContext) {
	return { StandortLoadService : function() {
		},
//		_initialized: false,
		refresh: function() {
	       	  $http({method: 'POST', 
	     		  	url: 'http://'+location.host+'/WebServiceSpendTestService/rest/SpendTestServices/standorte/129', 
	     		  	headers:{
			   		   'Accept': 'application/json;odata=verbose; charset=utf-8',
			   		   'Content-Type': 'application/json; charset=utf-8',
			   		   'X-XSRF-TOKEN':  SessionContext.getSessionId()
//			           'Access-Control-Allow-Origin': 'Origin, X-Requested-With, Content-Type, Accept',
//			           'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//			           'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
	     		  	}
	     } )
	  	  .success(function(data, status, headers, config) {
	  		  
	  	        // this callback will be called asynchronously
	  	        // when the response is available
//	  		  	if( _initialized)
	  		  	SaveBroadcaster.broadcast( $rootScope,'standorteReloaded', data);
	  		  	
	  		    _initialized = true;
	  	      })
	  	  .error(function(data, status, headers, config) {
	  		  //$scope.masterContext.pushError("Server ist nicht verfügbar");
	  	        // called asynchronously if an error occurs
	  	        // or server
	//  		  	if( _initialized)
   //	  		  	SaveBroadcaster.broadcast( $rootScope, 'EventError', 'Server nicht verfügbar');
	  		  	
	  		    _initialized = true;
	  	  		});
			
		}
	};
	
  } );
app.factory('AbteilungLoadService', function($rootScope, $http, SaveBroadcaster, SessionContext) {
	return { AbteilungLoadService : function() {
		
		},
		refresh: function() {


	       	  $http({method: 'GET', 
	     		  	url: 'http://'+location.host+'/WebServiceSpendTestService/rest/SpendTestServices/abteilungen/129', 
	     		  	headers:{
			   		   'Accept': 'application/json;odata=verbose; charset=utf-8',
			   		   'Content-Type': 'application/json; charset=utf-8',
			   		   'X-XSRF-TOKEN':  SessionContext.getSessionId()
	     		  	}
	     } )
	  	  .success(function(data, status, headers, config) {
	  		  
	  	        // this callback will be called asynchronously
	  	        // when the response is available
	  		  	SaveBroadcaster.broadcast( $rootScope, 'abteilungenReloaded', data);
	  	      })
	  	  .error(function(data, status, headers, config) {
	  		  //$scope.masterContext.pushError("Server ist nicht verfügbar");
	  	        // called asynchronously if an error occurs
	  	        // or server
	 // 		  	SaveBroadcaster.broadcast( $rootScope,'EventError', 'Server nicht verfügbar');
	  	  		});
			
		}
	};
	
  } );
app.factory('MaterialgruppeLoadService', function($rootScope, $http, SaveBroadcaster, SessionContext) {
	return { MaterialgruppeLoadService : function() {
		
		},
		refresh: function() {
	       	  $http({method: 'GET', 
	     		  	url: 'http://'+location.host+'/WebServiceSpendTestService/rest/SpendTestServices/materialgruppen/129', 
	     		  	headers:{
			   		   'Accept': 'application/json;odata=verbose; charset=utf-8',
			   		   'Content-Type': 'application/json; charset=utf-8',
			   		   'X-XSRF-TOKEN':  SessionContext.getSessionId()
	     		  	}
	     } )
	  	  .success(function(data, status, headers, config) {
	  		  
	  	        // this callback will be called asynchronously
	  	        // when the response is available
	  		  	SaveBroadcaster.broadcast( $rootScope, 'materialgruppenReloaded', data);
	  	      })
	  	  .error(function(data, status, headers, config) {
//	  		  	SaveBroadcaster.broadcast( $rootScope,'EventError', 'Server nicht verfügbar');
	  	  		});
			
		}
	};
	
  } );
app.factory('SupplierLoadService', function($rootScope, $http, SaveBroadcaster, SessionContext) {
	return { SupplierLoadService : function() {
		
		},
		refresh: function() {
	       	  $http({method: 'GET', 
	     		  	url: 'http://'+location.host+'/WebServiceSpendTestService/rest/SpendTestServices/supplier/129', 
	     		  	headers:{
			   		   'Accept': 'application/json;odata=verbose; charset=utf-8',
			   		   'Content-Type': 'application/json; charset=utf-8',
			   		   'X-XSRF-TOKEN':  SessionContext.getSessionId()
	     		  	}
	     } )
	  	  .success(function(data, status, headers, config) {
	  		  
	  	        // this callback will be called asynchronously
	  	        // when the response is available

	  		  	SaveBroadcaster.broadcast( $rootScope,'supplierReloaded', data);
	  	      })
	  	  .error(function(data, status, headers, config) {
	  		  //$scope.masterContext.pushError("Server ist nicht verfügbar");
	  	        // called asynchronously if an error occurs
	  	        // or server

//	  		  	SaveBroadcaster.broadcast( $rootScope,'EventError', 'Server nicht verfügbar');
	  	  		});
			
		}
	};
	
  } );

app.factory('SupplierStorageService', function($rootScope, $http, transformRequestAsFormPost, SaveBroadcaster, SessionContext ) {
	return { SupplierStorageService : function() {
		
		},
		store: function( supplier ) {
			var firma = supplier.getFirma();
			var kred_id = supplier.getKredId();
			
			// this call is async... Wait for a response
	       	  $http({method: 'POST', 
	     		  	url: 'http://'+location.host+'/WebServiceSpendTestService/rest/SpendTestServices/supplierStore/129',
	                transformRequest: transformRequestAsFormPost,
	     		  	headers:{
			   		   'Accept': 'application/json;odata=verbose; charset=utf-8',
			   		   'X-XSRF-TOKEN':  SessionContext.getSessionId()
	     		  	},
	       	  		data: {
	       	  			ID: 0,
	       	  			FIRMA: firma,
	       	  			KRED_ID: kred_id
	       	  		}
	     } )
	  	  .success(function(data, status, headers, config) {
	  		  
	  	        // this callback will be called asynchronously
	  	        // when the response is available
	 	        SaveBroadcaster.broadcast( $rootScope, 'supplierStored', true);


	  	      })
	  	  .error(function(data, status, headers, config) {
	  		  //$scope.masterContext.pushError("Server ist nicht verfügbar");
	  	        // called asynchronously if an error occurs
	  	        // or server
//	  		  	SaveBroadcaster.broadcast( $rootScope,'EventError', 'Server nicht verfügbar');
	  		  	SaveBroadcaster.broadcast( $rootScope,'supplierStored', false);
	  	  		})
	      .finally( function() {
	  		  	SaveBroadcaster.broadcast( $rootScope,'showWaitDlg', false);
	    	  
	      });
	       	  
	      SaveBroadcaster.broadcast( $rootScope,'showWaitDlg', true);
	       	  
	       	  

			}
		};
		
});



app.factory('UmsatzLoadService', function($rootScope, $http, SaveBroadcaster, SessionContext ) {
	  
	return { UmsatzLoadService : function() {
		
		},
		refresh: function( abteilungIdx, MatgruppeIdx, SupplierIdx) {
	  	var Appendix = '/';
	  	Appendix += abteilungIdx;
	  	Appendix += '/';
	  	Appendix += MatgruppeIdx;
	  	Appendix += '/';
	  	Appendix += SupplierIdx;
			
	       	  $http({method: 'GET', 
	     		  	url: 'http://'+location.host+'/WebServiceSpendTestService/rest/SpendTestServices/umsatz' + Appendix, 
	     		  	headers:{
			   		   'Accept': 'application/json;odata=verbose; charset=utf-8',
			   		   'Content-Type': 'application/json; charset=utf-8',
			   		   'X-XSRF-TOKEN':  SessionContext.getSessionId()
	     		  	}
	     } )
	  	  .success(function(data, status, headers, config) {
	  		  
	  	        // this callback will be called asynchronously
	  	        // when the response is available
	  		  	SaveBroadcaster.broadcast( $rootScope,'umsatzReloaded', data);
	  	      })
	  	  .error(function(data, status, headers, config) {
	  		  //$scope.masterContext.pushError("Server ist nicht verf�gbar");
	  	        // called asynchronously if an error occurs
	  	        // or server
//	  		  	SaveBroadcaster.broadcast( $rootScope,'EventError', 'Server nicht verf�gbar');
	  	  		})	      
	  	  		.finally( function() {
		  		  	SaveBroadcaster.broadcast( $rootScope,'showWaitDlg', false);
			    	  
	  	      });
	       	  
		      SaveBroadcaster.broadcast( $rootScope,'showWaitDlg', true);	       	  
		}
	};
	
  } );
