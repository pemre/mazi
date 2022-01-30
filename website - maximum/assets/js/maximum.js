$(document).ready(function(){

	/**
	 * Detected OS: Show bottom download button for mobile
	 * devices on "mobile app presentation page"
	 *
	 * @targetPage 05-approved-order.html
	 */
	var detectedOs = getMobileOperatingSystem();

	if (detectedOs == "Android") {
		$(".button-download-android").show();
	} else if (detectedOs == "iOS") {
		$(".button-download-apple").show();
	}
	/* Detected OS - End */

    /**
     * Full page JS: Full page scroll for mobile application page
     *
	 * @depends jquery.fullpage.min.js
     * @targetPage 05-approved-order.html
     */
	$('#fullpage').fullpage({
		navigation: true,
		navigationPosition: 'right',
		afterLoad: function(anchorLink, index) {
			images = $('.fullpage .fullpage-image');
			images.eq(0).removeClass('move-down').addClass('move-up');

			images = $('.fullpage .fullpage-image-mobile');
			images.eq(0).removeClass('move-down').addClass('move-up');
		},
		onLeave: function(index, newIndex, direction) {
			if (direction == 'down') {
				images = $('.fullpage .fullpage-image');
				images.eq(newIndex-1).removeClass('move-down').addClass('move-up');
				images.eq(index-1).removeClass('move-up').addClass('move-down');

				images = $('.fullpage .fullpage-image-mobile');
				images.eq(newIndex-1).removeClass('move-down').addClass('move-up');
				images.eq(index-1).removeClass('move-up').addClass('move-down');
			}
			else if (direction == 'up') {
				images = $('.fullpage .fullpage-image');
				images.eq(newIndex-1).removeClass('move-down').addClass('move-up');
				images.eq(index-1).removeClass('move-up').addClass('move-down');

				images = $('.fullpage .fullpage-image-mobile');
				images.eq(newIndex-1).removeClass('move-down').addClass('move-up');
				images.eq(index-1).removeClass('move-up').addClass('move-down');
			}

			// Change button colors
			buttons = $('.fullpage-button-mobile');
			if (newIndex % 2 == 0) {
				buttons.removeClass('fullpage-button fullpage-button-dark').addClass('fullpage-button-dark');
				$('.fullpage-button-image-dark').hide();
				$('.fullpage-button-image').show();
			}
			else {
				buttons.removeClass('fullpage-button fullpage-button-dark').addClass('fullpage-button');
				$('.fullpage-button-image').hide();
				$('.fullpage-button-image-dark').show();
			}
		}
	});

    /**
     * Responsive tabs support
     *
     * @depends responsive-tabs.js
     * @targetPage all
     */
	fakewaffle.responsiveTabs(['xs']);

    /**
     * Slick slider: Main page campaigns slider
     *
     * @depends slick.min.js
     * @targetPage index.html
     */
	$(".regular").slick({
		dots: true,
		infinite: true,
		slidesToShow: 1
	});
    /**
     * Slick slider: Main page mobile app slider
     *
     * @depends slick.min.js
     * @targetPage index.html
     */
	$(".center").slick({
		centerMode: true,
		infinite: true,
		centerPadding: '175px',
		slidesToShow: 1,
		focusOnSelect: true,
		arrows: true,
		prevArrow: $('.slick-prev-custom'),
		nextArrow: $('.slick-next-custom'),
		responsive: [
			{
				breakpoint: 768,
				settings: {
					centerMode: true,
					infinite: true,
					centerPadding: '70px',
					slidesToShow: 1,
					focusOnSelect: true,
					arrows: false
				}
			}
		]
	});

    /**
     * Facebook share handler
     *
     * @targetPage all
     */
	$(".facebook-share-button").on("click", function() {
		window.open("https://www.facebook.com/sharer/sharer.php?u="+escape(window.location.href)+"&t="+document.title, '',
			'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
		return false;
	});
    /**
     * Twitter share handler
     *
     * @targetPage all
     */
    // TODO: Fix document.title escape issue
	$(".twitter-share-button").on("click", function() {
		window.open("http://twitter.com/share?text="+document.title+"&url="+escape(window.location.href), '',
			'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		return false;
	});

	/* Side Menu: Click/hover effect */
	/*enquire.register("screen and (max-width: 767px)", {
		match : function() {

			$(".hasChild a:first").on("click", function() {
				// Toggle hover class
				$(this).toggleClass('sidenavSelectedHover');
				// Toggle sub menu
				$(this).next().slideToggle(100);
			});
		},
		unmatch : function() {

			$(".hasChild").hover(function() {
				//var menu = $(this);
				// Toggle hover class
				$(this).children('a:first').toggleClass('sidenavSelectedHover');
				// Toggle sub menu
				$(this).children('.sideNavSub').slideToggle(100);
			});
		}
	});*/

	$(".hasChild").hover(function() {
		$(this).children('a:first').toggleClass('sidenavSelectedHover');
		$(this).children('.sideNavSub').slideToggle(100);
	});

	/* Top menu */
	$(".topMenuBarL1ListItem").mouseover(function(){
		var itemIndex = $(this).index();

		$(this).children('span').addClass("arrow-up");					//to add arrow on selected item
		$(this).siblings().children('span').removeClass("arrow-up");	//to remove arrow on previous selected item

		//Show proper L2 Item
		$(".containerWidthL2 .L2Item").eq(itemIndex).siblings().addClass("hidden"); // ???
		$(".containerWidthL2 .L2Item").eq(itemIndex).removeClass("hidden"); // ???
	});

	//
	$(".L2Item:first").removeClass("hidden");

	$(".menuBarText").on("click", function() {
	  openNav()
	});
	$(".menuBarIcon").on("click", function() {
	  openNav()
	});
	$(".sidenav .closebtn").on("click", function() {
		closeNav();
		event.preventDefault();
	});
	$("#overlayDiv").on("click", function() {
		closeSideNav()
	});

	//Input mask binding
	if($().inputmask){		
		$(":input").inputmask();
		//Inputmask().mask(document.querySelectorAll("input"));		
	}

	/* Search box enter button & click handler */
	$(".inputTopNavBar").keypress(function(e){ 
		if(e.which == 13){ 
			window.location.href='/TR/arama/Sayfalar/results.aspx?k=' + $(".inputTopNavBar").val(); 
		} 
	});  

	$(".topMenuSearchIconL1").click(function() { 
		window.location.href='/TR/arama/Sayfalar/results.aspx?k=' + $(".inputTopNavBar").val(); 
	}); 


	/* Top Menu Bar Mobile Search - Start */
	$(".topMenuMobileSearchIconLink").on("click", function() {
		$(".topMenuBarContainer").hide();
		$(".topMenuBarSearchBox").fadeIn();
	});

	$(".btnClose").on("click", function() {
		$(".topMenuBarContainer").show();
		$(".topMenuBarSearchBox").hide();
	});

	$(".inputTopMenuBarSearch").keyup(function() {
		var input = $(this);

		if(input.val() == "") {
			$(".btnClose").show();
			$(".btnSend").hide();
		}
		else {
			$(".btnClose").hide();
			$(".btnSend").show();
		}

	});

	enquire.register("screen and (max-width: 767px)", {
		match : function() {},
		unmatch : function() {
			$(".topMenuBarContainer").show();
			$(".topMenuBarSearchBox").hide();
		}
	});
	/* Top Menu Bar Mobile Search - End */


	//Header
	/***********************************************************************/
	if($(".topMenuBarL1ListItem").length > 0){

		//Save selected L1 Menu Item
		var level1MenuItem = "", previousLevel1MenuItem = "";
		$( ".header_links li" ).click(function() {
			/*console.log("click top");
			console.log(level1MenuItem);*/
			if (level1MenuItem != "" && level1MenuItem != null && level1MenuItem.length > 0) {
				previousLevel1MenuItem = level1MenuItem;
				//console.log("not equal to null");
			}
			level1MenuItem = $(this);
			/*console.log(level1MenuItem);
			console.log(previousLevel1MenuItem);*/
		});

		//Item1 is selected by default
		if (level1MenuItem == "" || level1MenuItem == null)
		{
			$(".topMenuBarL1ListItem:first").addClass("selectedL1Item");
			$(".topMenuBarL1ListItem:first").attr('style', 'display: block');
			$(".topMenuBarL1ListItem:first").siblings().attr('style', 'display: none');

			previousLevel1MenuItem = $(".topMenuBarL1ListItem:first");
			/*console.log("atama: ");
			console.log($(".topMenuBarL1ListItem:first"));
			console.log(previousLevel1MenuItem);*/
		}


		//For XS
		enquire.register("screen and (max-width: 767px)", {
		    match : function() {
		    	/*console.log("match");
		    	console.log(previousLevel1MenuItem);*/

		    	$(".topMenuBarL1ListItem").addClass("phone-links-header");
				
				if (level1MenuItem == "" || level1MenuItem == null)
				{
					$(".topMenuBarL1ListItem:first").addClass("selectedL1Item");
					level1MenuItem = $(".topMenuBarL1ListItem:first");
				}
				else{
					level1MenuItem.addClass("selectedL1Item");
					level1MenuItem.attr('style', 'display: block');
					level1MenuItem. siblings().attr('style', 'display: none');
				}


				// TODO: BURAYI HALLET
				/*$(".header_links a").on("click", function() {
					// Hide L2 menu on click L1 items
					$(".topMenuBarL2").toggle();
					// Fix margin bottom problem on click L1 items
					$("#topMenuBarL1List").toggleClass("fixMargin");
				});*/
		    },  
		    unmatch : function() {
		    	//console.log("header unmatch");				
				$(".topMenuBarL1ListItem").show();
				

				if($().removeClass){
					$(".topMenuBarL1ListItem").removeClass("phone-links-header");					
					//console.log(level1MenuItem);
					if (level1MenuItem != null && level1MenuItem != "") {
						level1MenuItem.removeClass("selectedL1Item");
					}
				}
			}
		});
		
		$(".header_links a").on("click", function() {
			/*console.log("clicked");
			console.log(level1MenuItem);
			console.log(this);*/
			if (level1MenuItem != "" && level1MenuItem != null) 
				level1MenuItem.removeClass("selectedL1Item");	//remove previous item from selected
			level1MenuItem = $(this).parent(".phone-links-header");
			level1MenuItem.addClass("selectedL1Item");		//add new item to selected
			level1MenuItem.siblings(".phone-links-header").toggle();

			$(this).toggleClass("expand");
		});

		//Assign level1MenuItem on mouse over
		$(".topMenuBarL1ListItem").mouseover(function(){
			/*console.log("mouse over");
			console.log(level1MenuItem);*/
			if (level1MenuItem != "" && level1MenuItem != null && level1MenuItem.length > 0) {
				previousLevel1MenuItem = level1MenuItem;
				level1MenuItem.removeClass("selectedL1Item");	//remove previous item from selected
				//console.log("not equal to null");
			}
			if (previousLevel1MenuItem != "" && previousLevel1MenuItem != null && previousLevel1MenuItem.length > 0) {
				previousLevel1MenuItem.removeClass("selectedL1Item");	//remove previous item from selected
			}

			level1MenuItem = $(this);
			/*console.log(level1MenuItem);
			console.log(previousLevel1MenuItem);*/
			level1MenuItem.addClass("selectedL1Item");		//add new item to selected

		});
	}
	/***********************************************************************/


	/********* CAMPAIN DETAIL *********/
	var id;
/*	enquire.register("screen and (max-width: 767px)", {

		match : function() {
			calculateCampaignBoxHeight();
			calculateCSliderHeight();

			// run on resize browser screen
			$(window).resize(function() {
				clearTimeout(id);
				id = setTimeout(doneResizing, 500);
			});
		},
		unmatch : function() {
			$(".cslider").css({ "height": "" });
			$(".cslider h1").css({ "font-size": "", "margin-bottom": "", "margin-top": "" });
			$(".cslider button").css({ "width": "", "height": "", "font-size": "" });
		}
	});*/

	function doneResizing() {
		if ($(window).width() < 767) {
			calculateAll();
		}
		else {
			$(".cslider").css({ "height": "" });
			$(".cslider h1").css({ "font-size": "", "margin-bottom": "", "margin-top": "" });
			$(".cslider button").css({ "width": "", "height": "", "font-size": "" });
		}
	}

	if ($(window).width() < 767) {
		clearTimeout(id);
		id = setTimeout(calculateAll, 50);
	}

	$(window).resize(function() {
		clearTimeout(id);
		id = setTimeout(doneResizing, 50);
	});

	$(".btn_more_campaigns").on("click", function(e) {
		e.preventDefault();
		$(".moreItemsBox").slideDown('fast');
		$(".moreItemsBoxButtonContainer").slideUp('fast');
	});

	$(".moreItemsBox .closebtn").on("click", function(e) {
		e.preventDefault();
		$(".moreItemsBox").slideUp('fast');
		$(".moreItemsBoxButtonContainer").slideDown('fast');
	});

    /**
     * Show campaign details button
     *
     * @targetPage kampanya-detay.html
     */
	$(".btn_showdetails").click(function() {

		var $el, $sh, $ps, $up, $fi, totalHeight;
		totalHeight = 0;
		$el = $(this);
		$sh = $('.detail-box-shadow');
		$up = $('.detail-box');
		$fi = $('.btn_showdetails_filler');
		$ps = $up.children("p:not('.detail-box-shadow')");

		// measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
		$ps.each(function() {
			totalHeight += $(this).outerHeight();
		});

		$up
			.css({
				// Set height to prevent instant jumpdown when max height is removed
				"height": $up.height(),
				"max-height": 9999
			})
			.animate({
				"height": totalHeight
			}, {
                complete: function() {
                	$(this).css("height", "auto");
                }
			});

		// fade out read-more and shadow, hide .btn_showdetails_filler
		$fi.hide();
		$el.fadeOut();
		$sh.fadeOut();

		// prevent jump-down
		return false;
	});
	/********* CAMPAIN DETAIL - END *********/


	//Footer
	/***********************************************************************/
	enquire.register("screen and (max-width: 767px)", {
	    match : function() {
	    	//console.log("footer match");
			$(".footer_links ul.list-unstyled").hide();
			$(".footer_links ul.list-unstyled").addClass("phone-links");
	    },  
	    unmatch : function() {
	    	//console.log("footer unmatch");
			$(".footer_links ul.list-unstyled").removeClass("phone-links");
			$(".footer_links ul.list-unstyled").show();
		}
	});
	
	$(".footer_links h3").on("click", function() {
		$(this).next("ul.phone-links").toggle();
		$(this).toggleClass("expand");
	});

	// Close sticky cookie warning box
	if (Cookies.get('cookie_warning') != 'accepted') {
		$(".sticky_cookie_warning").attr('style','display:inline !important');

		$(".sticky_cookie_warning img").on("click", function() {
			$(".sticky_cookie_warning").attr('style','display:none !important');
			Cookies.set('cookie_warning', 'accepted', { expires: 365 });
		});
	}
	/***********************************************************************/
	
});

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	// Windows Phone must come first because its UA also contains "Android"
	if (/windows phone/i.test(userAgent)) {
		return "Windows Phone";
	}

	if (/android/i.test(userAgent)) {
		return "Android";
	}

	// iOS detection from: http://stackoverflow.com/a/9039885/177710
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		return "iOS";
	}

	return "unknown";
}

/* Hamburger Menu - Start */

//Open the sidenav menu
function openNav() {
    //var windowOuterWidth = window.outerWidth;
    $("#mySidenav").addClass("open");   
    document.getElementById('overlayDiv').style.visibility='visible';
}

//Close the sidenav menu
function closeNav() {
	$("#mySidenav").removeClass("open");
    //document.getElementById("mySidenav").style.width = "0";
    //document.body.style.backgroundColor = "white";
    document.getElementById('overlayDiv').style.visibility='hidden';
}

//Close the sidenav menu on click body
function closeSideNav(){
    $("#mySidenav").removeClass("open");
    //document.getElementById("mySidenav").style.width = "0";
    document.getElementById('overlayDiv').style.visibility='hidden';
}

// Window resizing ended, let's calculate .cslider values
/*function doneResizing(){
	// run on load for the first time
	calculateCampaignBoxHeight();
	calculateCSliderHeight();
}*/

// .cslider height calculation for 320-768px
function calculateCSliderHeight() {
	imgHeight = $(".cslider:first img").height();
	$(".cslider").css({ "height": imgHeight });
	$(".cslider h1").css({ "font-size": imgHeight/10, "margin-bottom": imgHeight/15, "margin-top": imgHeight/20 });
	$(".cslider button").css({ "width": imgHeight/1.8, "height": imgHeight/7, "font-size": imgHeight/13 });
}

// .campaign_box height calculation for 320-768px
function calculateCampaignBoxHeight() {
    imgHeight = $(".campaign_box:first img").height();
    //boxHeight = $(".campaign_info:first").height();
    $(".campaign_box").css({ "height": imgHeight + 120 });
}

//
function calculateAll() {
	calculateCSliderHeight();
	calculateCampaignBoxHeight();
}


/* Hamburger Menu - End */



/******************************
 *
 * ANCIENT CODES: No more used
 *
 ******************************/
/*
 Maximum Homepage
 */
/*
 var maximum = {
 init:function(){}
 };
 maximum.prox = {};
 maximum.kampanya = {
 name:"RESTApIURL",
 selectors:{
 catlist:"",
 list:""
 },
 options:{
 category:"",
 pageing:""
 },
 init:function(options){
 var self=this;
 $(this.selectors.catlist).on("click",function(){
 self.run({
 })
 });
 },
 run:function(){
 },
 complate:function(data){
 var tmpl="";
 $(this.selectors.list).html(tmpl);
 },
 error:function(){
 }
 };*/

/*Sticky bar for cookie warning*/
/*$(window).scroll(function(e){
 if(($(this).scrollTop() > 50)){
 $('.sticky_cookie').css({'visibility': 'hidden'});
 }
 });*/

/*Sticky bar for mobile application*/
/*
 $(window).scroll(function(e){
 var $isDisplayed = 0;
 var $el = $('.sticky_mxmcard');
 var isPositionFixed = ($el.css('position') == 'fixed');
 if ($(this).scrollTop() > 200 && !isPositionFixed){
 $('.sticky_mxmcard').css({'position': 'fixed', 'bottom': '0px'});
 }
 if ($(this).scrollTop() < 200 && isPositionFixed)
 {
 $('.sticky_mxmcard').css({'position': 'static', 'bottom': '0px'});
 }
 });*/