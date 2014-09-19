var regexIso8601 = /^(\d{4})(?:-?W(\d+)(?:-?(\d+)D?)?|(?:-(\d+))?-(\d+))(?:[T ](\d+):(\d+)(?::(\d+)(?:\.(\d+))?)?)?(?:Z(-?\d*))?$/;
var isSmallMode = false;
var isLandscape = false;

// This function gets an object or an object array
// searches for data in the pattern of regexIso8601 and
// converts this fields from text into a JavaScript DateObject
function convertDateStringsToDates(input) {
    // Ignore things that aren't objects.
    if (typeof input !== "object") return input;

    for (var key in input) {
        if (!input.hasOwnProperty(key)) continue;

        var value = input[key];
        var match;
        // Check for string properties which look like dates.
        if (typeof value === "string" && (match = value.match(regexIso8601))) {
            var milliseconds = Date.parse(match[0]);
            if (!isNaN(milliseconds)) {
                input[key] = new Date(milliseconds);
            }
        } else if (typeof value === "object") {
            // Recurse into object
            convertDateStringsToDates(value);
        }
    }
}


// Config our App-Routing
app.config(function($routeProvider) {
  $routeProvider
  .when('/standortabteilung', { templateUrl: 'pages/Standort_Abteilung.html' })
    .when('/matgruppe', { templateUrl: 'pages/Matgruppe.html' })
    .when('/supplier', { templateUrl: 'pages/Supplier.html' })
    .when('/umsatz', { templateUrl: 'pages/Umsaetze.html' })
    .when('/home', { templateUrl: 'pages/home.html' })
    .when('/editSupplier', { templateUrl: 'pages/editSupplier.html'})
    .when('/settings', { templateUrl: 'pages/settings.html' })  
    .when('/login', { templateUrl: 'pages/login.html'})
    .when('/', { templateUrl: 'pages/login.html'})
    .otherwise({ redirectTo: '/' });
});


// http provider
// - Calls the function "convertDateStringsToDates" to convert JSon-Results from plain text
//   Object-arrays to arrays containing real date objects
// - Configures the interceptor "authHttpResponseInterceptor" for a unique behaviour, when the
//    404 response occurs
app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.defaults.transformResponse.push(function(responseData){
       convertDateStringsToDates(responseData);
       return responseData;
   });
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
    // csrf 
    $httpProvider.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
    $httpProvider.defaults.xsrfCookieName = 'XSRF-TOKEN';
    //disable IE ajax request caching
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
}]);


app.run(['$route', function($route)  {
	  $route.reload();
	}]);

function switchCSS() {
	var cssPath = "style.css";
	
	var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	if( (width < 650 && height < 450) || (width < 450 && height < 650) ) {
		cssPath = "mobileMed.css";
		isSmallMode = true;
	}
	if( width < 1000 && height < 1000  && width > height ) // smartphone or tablet in landscape
	{
		isLandscape = true;
	}
		

/*
	var fileref = document.createElement("link");

	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", cssPath);

	document.getElementsByTagName("head")[0].appendChild(fileref);
	*/

	/*
	// ////////////////////////////////////////
	// Modify the Viewport if needed
	// Store the meta element
	var viewport_meta = document.getElementById('viewport-meta');

	// Define our viewport meta values
	var viewports = {
			default: viewport_meta.getAttribute('content'),
			landscape: 'width=990'
		};

	// Change the viewport value based on screen.width
	var viewport_set = function() {
			if ( screen.width > 768 )
				viewport_meta.setAttribute( 'content', viewports.landscape );
			else
				viewport_meta.setAttribute( 'content', viewports.default );
		}

	// Set the correct viewport value on page load
	viewport_set();

	// Set the correct viewport after device orientation change or resize
	window.onresize = function() { 
		viewport_set();
	};
	
		*/ 
	
	
	
	
	
}


// central onLoad functionality... 
// ... I think ng-init can be used better...
window.onload = function () {
	// switch the CSS depending on the device
	switchCSS();
	
};
