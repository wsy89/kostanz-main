$('.nav-mobile-toggle').on('click', function(){
    $('nav').toggleClass('nav-open');
});

$('.menu li').on('click', function(ev){
    var navItem = $(this),
        e       = ev || window.event;

    e.stopPropagation();
    if (navItem.find('ul').length) {
        navItem.toggleClass('active');
    } else {
        navItem.parents('.active').removeClass('active');
    }
});

// Mobile Menu Applets

$('.module-applet').on('click', function(){
    $(this).toggleClass('active');
});

$('.module-applet__body').each(function(){
    var moduleBody = $(this);
    var farRight = moduleBody.offset().left + moduleBody.outerWidth();
    if(farRight > $(window).width()){
        moduleBody.addClass('pos-right');
    }
});

// Menu dropdown positioning

$('.menu > li > ul').each(function() {
    var $window          = $(window);
    var dropDown         = $(this);
    var menu             = dropDown.offset();
    var farRight         = menu.left + dropDown.outerWidth(true);
    var windowWidth      = $window.width();
    var multiColumn      = dropDown.hasClass('multi-column');

    if (farRight > windowWidth && !multiColumn) {
        dropDown.addClass('make-right');
    } else if (farRight > windowWidth && multiColumn) {
        var difference = farRight - windowWidth;
        dropDown.css('margin-left', -(difference));
    }
});

//////////////// Navigation

var mr = (function (mr, $, window, document){


    ///
    ///    END DOCUMENTREADY
    ///
    ////////////////////////////////////

    "use strict";

    // The navigation object
    mr.navigation = {};

    // The overall nav element (one per page)
    mr.navigation.nav = {};

    // In case there is a bar type nav element
    mr.navigation.bar = {};

    mr.navigation.bar.init = function(){
        // Get data-fixed-at attribute
        var fixedAt = mr.navigation.bar.element.attr('data-fixed-at');
        // Save mr.navigation.bar.fixedAt as a number or null if not set
        mr.navigation.bar.fixedAt = (typeof fixedAt !== typeof undefined) ? parseInt(fixedAt.replace('px', ''), 10) : false;

        // Only run scroll listeners if bar does not already have nav--fixed class
        if(mr.navigation.bar.element.hasClass('nav--fixed')){
            // We know this is a fixed nav bar
            mr.navigation.bar.isFixed = true;
        }else if (fixedAt) {
            // If fixedAt has a value (not false) and nav bar has no ".nav--fixed" class
            // add navigation.bar.update to scroll event cycle
            mr.navigation.nav.element.css('min-height', mr.navigation.nav.outerHeight);
            mr.navigation.bar.isFixed = false;
            mr.scroll.listeners.push(mr.navigation.bar.update);
        }
    };

    mr.navigation.bar.update = function(){
        // If page is scrolled beyond the point where nav should be fixed
        if( (mr.scroll.y > mr.navigation.bar.fixedAt) && !mr.navigation.bar.isFixed)
        {
            mr.navigation.bar.isFixed = true;
            mr.navigation.bar.element.addClass('nav--fixed');
        }

        if( (mr.scroll.y < mr.navigation.bar.fixedAt) && mr.navigation.bar.isFixed)
        {
            mr.navigation.bar.isFixed = false;
            mr.navigation.bar.element.removeClass('nav--fixed');
        }
    };
    return mr;

}(mr, jQuery, window, document));

$(document).ready(function() {

    mr.navigation.nav.element = $('nav');
    mr.navigation.bar.element = $('nav .nav-bar');

    // Check for nav element and set outerHeight variable
    if(mr.navigation.nav.element.length){
        mr.navigation.nav.outerHeight = mr.navigation.nav.element.outerHeight();
    }else{
        mr.navigation.nav.outerHeight = 0;
    }
    // Check for a bar type nav
    if(mr.navigation.bar.element.length){
        mr.navigation.bar.init();
    }
});
