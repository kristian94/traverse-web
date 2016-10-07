$(document).ready(function () {


    var callbackManager = getCallbackManager();
    var viewManager = getViewManager(callbackManager);
    var cityscapeManager = getCityscapeManager($('#cityscape'));
    var animationManager = getAnimationManager();
    var intervalManager = getIntervalManager();
    var utilManager = getUtilManager();

    //CALLBACK FUNCTIONS

    //GLOBAL
    function mapSlideMenu() {
        animationManager.mapSlideMenu();
        utilManager.removeScrollbarAbsolute($('.middle-container-content'));
        animationManager.changeBackgroundOnHover($('.top-container-menu-toggle'), '#BDD5DE');
//        console.log(transX);
//        setTimeout(function () {
//            $('.top-container-menu').css('transition', 'ease-in 0.4s');
//            $('.top-container-menu').css('transform', 'translateX(' + transX + ')');
//        }, 500);



    }



    //LANDING
    var fadeInTitleAndArrows = function () {
        animationManager.fadeInTitle($('.title'));
        animationManager.fadeInElement($('.article-bottom-arrow-01'), 500, 0.4);
        animationManager.fadeInElement($('.article-bottom-arrow-02'), 500, 0.4);
        var arrowHandler = animationManager.getArrowHandler();
        intervalManager.pushToFuncs(arrowHandler);
    };

    //CALLBACKMANAGER SETUP
    var views = [
        'views/landing.html'
    ];
    callbackManager.views = views;
    (callbackManager.addCallback(mapSlideMenu))();
    callbackManager.addCallback(fadeInTitleAndArrows, 'fadeInTitleAndArrows');
    callbackManager.mapViewToCallback('views/landing.html', 'fadeInTitleAndArrows');



    //VIEWMANAGER SETUP

    viewManager.mainParentElement = $('.viewParent');
    viewManager.indexPage = 'views/landing.html';
    viewManager.loadIndexPage();


    //CITYSCAPE MANAGER SETUP
    cityscapeManager.makeCity();

    //INTERVAL MANAGER SETUP
    intervalManager.pushToFuncs(function () {
        cityscapeManager.updateCity();
    });
    intervalManager.startInterval();


    //MISC


//    setTimeout(function () {
//        (function animateStuff() {
//            var count = 0;
//            var originalLeft = $('.viewParent').css('left');
//            var left = -($('.viewParent').width());
//            $('.viewParent, .viewParentBackground').animate({
//                left: left + 'em'
//            }, {
//                duration: 2000,
//                complete: function (originalLeft) {
//                    $(this).css('left', 0);
////                    count++;
////                    if (count === 2) {
////                        console.log('yo');
////                        var nextLeft = $(window).width() + $('.viewParent').width();
////                        $('.viewParent, .viewParentBackground').css('left', originalLeft);
////                        $(this).animate({
////                            left: originalLeft + 'em'
////                        }, {
////                            duration: 2000
////                        });
////                    }
//
//                }
//            });
//        })();
//    }, 500);




});
