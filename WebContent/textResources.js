
app.config(function ($translateProvider) {
	  $translateProvider.translations('de-de', {
	    APP_HEADLINE:  'SpendTest WebApp in AngularJS',
	    BTN_LOGIN:      'Anmelden',
	    BTN_CANCEL:     'Abbrechen',
	    BTN_BACK: 		'Zurück',
	    BTN_NEW_SUPPL:  'Neuer Lieferant',
	    LBL_USER: 		'Benutzer',
	    LBL_PWD: 		'Passwort',
	    LBL_KRED_NO:	'Kreditoren-Nr.',
	    LBL_FIRMA:		'Firma',	    
	    SUBHEADER_STANDORT_ABT : 'Standorte & Abteilungen',
	    SUBHEADER_MATGRUPPE : 'Materialgruppen',
	    SUBHEADER_SUPPLIER : 'Lieferanten',
	    SUBHEADER_UMSATZ : 'Umsatz',
	    SUBHEADER_ADD_SUPP : 'Lieferant hinzufügen',
	    SUBHEADER_HOME : 'Home',
	    SUBHEADER_EINSTELLUNGEN : 'Einstellungen',
	    SUBHEADER_AUTH : 'Authentifizierung',
	    BTN_NEW_SELECTION : 'Neue Auswahl',
	    BTN_CONTINUE : 'Fortfahren',
	    BTN_SAVE : 'Speichern',
	    TXT_NO_SELECTION: 'Keine Auswahl',
	    TXT_CURR_SELECTION:'Aktuelle Auswahl',
	    TBL_HEADER_STANDORTE: 'Standorte',
	    TBL_HEADER_ABTEILUNGEN: "Abteilungen",
	    TBL_HEADER_PRODUCTGROUPS: "Materialgruppen",
	    TBL_HEADER_SUPPLIER: "Lieferanten",
	    TBL_HEADER_UMSATZ: "Umsatz",
	    ERR_REQUIRED: "erforderlich!",
	    ERR_TOO_LONG: "zu lang!"


	    
	  });
	  
	  $translateProvider.translations('en-us', {
		    APP_HEADLINE:  'SpendTest WebApp in AngularJS',
		    BTN_LOGIN:      'Login',
		    BTN_CANCEL:     'Cancel',
		    BTN_BACK: 		'Back',
		    BTN_NEW_SUPPL:  'New Supplier',		    
		    LBL_USER: 		'User',
		    LBL_PWD: 		'Password',
		    LBL_KRED_NO:	'Kreditor-No.',
		    LBL_FIRMA:		'Company',
		    SUBHEADER_STANDORT_ABT : 'Sites & Departments',
		    SUBHEADER_MATGRUPPE : 'Product groups',
		    SUBHEADER_SUPPLIER : 'Supplier',
		    SUBHEADER_UMSATZ : 'Volume',
		    SUBHEADER_ADD_SUPP : 'Add supplier',
		    SUBHEADER_HOME : 'Home',
		    SUBHEADER_EINSTELLUNGEN : 'Perferences',
		    SUBHEADER_AUTH : 'Authentification',
		    BTN_NEW_SELECTION : 'New selection',
		    BTN_CONTINUE : 'Continue',
		    BTN_SAVE : 'Save',
		    TXT_NO_SELECTION: 'Nothing seleted',
		    TXT_CURR_SELECTION:'Current selection',
		    TBL_HEADER_STANDORTE: 'Sites',
		    TBL_HEADER_ABTEILUNGEN: "Departments",
		    TBL_HEADER_PRODUCTGROUPS: "Product groups",
		    TBL_HEADER_SUPPLIER: "Supplier",
		    TBL_HEADER_UMSATZ: "Volume",
		    ERR_REQUIRED: "required!",
		    ERR_TOO_LONG: "too long!"
		    
		  });	  

	  // Nicht vergessen: die Standardsprache
	 $translateProvider.preferredLanguage(translation_language);
	 //$translateProvider.determinePreferredLanguage();
	});
