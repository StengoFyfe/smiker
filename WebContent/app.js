'use strict';

// Angular Stuff (only 1.0.0.Master)
var app = angular.module('SpendTestApp', ['ngCookies', 'ngAnimate', 'ngRoute', 'ngSanitize', 'ngTouch', 'pascalprecht.translate', 'simplePagination', 'ui.bootstrap']);

// /////////////////////////////////////////////////////////////////////////////////////////////////
// custom POJOS
function supplierObj( firma, kred_id ) {
	this.firma = firma;
	this.kred_id = kred_id;
	
	return {
		firma : this.firma,
		kred_id: this.kred_id,
		getFirma : function( ) { return this.firma; },
		getKredId : function() { return this.kred_id; }
	};
		
};

function loginObj( user, pwd ) {
	this.user = user;
	this.pwd = pwd;
	
	return {
		user : this.user,
		pwd : this.pwd,
		getUser : function() { return this.user; },
		getPwd  : function() { return this.pwd; } 
	};
	
};

// ///////////////////////////////////////////////////////////////////////////////////////////////////
// custom Objects


// Generic Stack-Object
// This object is created with 2 values: MaxSize and BlockReallocSize
// If MaxSize is reached, then the whole Stack will be truncated and moved down
// by the amount of BlockReallocSize-Entries
// --
// This implementation cannot be used for reliable and 100% proof implemenations
// ... its it designed for the usage within a breadcrumb-navigation... 
function Stack( MaxSize, BlockReallocSize ) {

	this.theArray = new Array(MaxSize);

	
	return {
		theStack : this.theArray,
		maxSize : MaxSize,
		blockReallocSize : BlockReallocSize,
		currIndex : -1,		
		push : function( val ) 
			{ 
				if( this.currIndex >= this.maxSize) {
					// move the Stack down with reallocSize
					for( var i=this.blockReallocSize; i++; i<maxSize ) {
						this.theStack[ i-this.blockReallocSize ] = this.theStack[i];
						this.currIndex = this.currIndex - this.blockReallocSize;
					}
				}
				this.theStack[++this.currIndex] = val;
				return;
			},
		pop  : function() 
			{ 
				if( this.currIndex >= 0 )
					return this.theStack[this.currIndex--];
			}
		
	};
	
	
};

// this object generates a random guid
function guid () {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	               .toString(16)
	               .substring(1);
	  }
	  return function() {
	    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	           s4() + '-' + s4() + s4() + s4();
	  };
	};
	


// Transient Set Implementation ... designed to have only few data (<100)	
// The purpose for this class is having an easy to use storage with only few
// items... that means less than 50 ... perhaps
function TransientShortSet() {

		this.theArray = new Array(10);
		for( var i=0; i<10; i++)
			this.theArray[i] = null;

		
		return {
			theSet : this.theArray,
			add : function( val ) { 
					var firstFree = -1;
					for( var i=0; i < this.theSet.length; i++) {
						if( this.theSet[i] == null && firstFree < 0 )
							firstFree = i;
						if( this.theSet[i] === val )
							return; // value already there... go outta here
					}
					if( firstFree == -1 )
						this.theSet[ this.theSet.length] = val;
					else
						this.theSet[firstFree] = val;

					return;
				},
			find  : function( val ) {
					for( var i=0; i < this.theSet.length; i++ ) {
						if( val === this.theSet[i] )
							return i;
					}
					return -1;
				},
			 remove : function( val, separator ) {
				 for( var i=0; i < this.theSet.length; i++ ) {
					 if( val === this.theSet[i] || val === this.theSet[i].substring(0,this.theSet[i].indexOf(separator) ) ) {
						 this.theSet[i] = null;
						 return true;
					 }
				 }
				 return false;
			 }
			
		};
		
		
	};
	
// image Provider Class.. deprecated
// used for managing images in different formats...
// This is better done using a style-sheet	
function imgProvider( isSmallMode ) {
		
		
		return {
			isSmallMode : this.isSmallMode,
			imgMap : Images_Norm,
			imgMap2: isSmallMode ? Images_Smll : null,
			getImage : function( imgAlias ) {
				if( this.imgMap2 != null && this.imgMap2[imgAlias] != null ) 
					return this.imgMap2[imgAlias]; 
				else 
					return this.imgMap[imgAlias];}
		};
		
	};


  // non modal wait dlg implemenation
	var ray={
			ajax:function(st)
				{
					this.show('load');
				},
			endit:function(st)
			{
				this.hide('load');
			},
			show:function(el)
			{
				this.getID(el).style.display='';
			},
			hide:function(el)
			{
				this.getID(el).style.display='none';
			},
			getID:function(el)
				{
					return document.getElementById(el);
				}
			};
	
	
	function readCookie(name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return null;
	}
