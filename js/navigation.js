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