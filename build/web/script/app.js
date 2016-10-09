$(document).ready(function () {


    var callbackManager = getCallbackManager();
    var callbackManagerFocus02 = getCallbackManager();
    var viewManager = getViewManager(callbackManager);
    var viewManagerFocus02 = getViewManager(callbackManagerFocus02);
    var cityscapeManager = getCityscapeManager($('#cityscape'));
    var animationManager = getAnimationManager();
    var intervalManager = getIntervalManager();
    var utilManager = getUtilManager();
//    var app = this;
    
    //CALLBACK FUNCTIONS

    //GLOBAL
    var globalOnLoad = function(){
        animationManager.mapSlideMenu();
        utilManager.removeScrollbarAbsolute($('.middle-container-content'));
        animationManager.changeBackgroundOnHover($('.top-container-menu-toggle'), '#BDD5DE');
        animationManager.changeBackgroundOnHover($('.top-container-login-toggle'), '#BDD5DE');
    };

    

    var loadFocus2 = function () {
        var focus02 = '<div class="focus-02"></div>';
        $('body').append(focus02);
        $('.focus-02').hide();
        viewManagerFocus02.mainParentElement = $('.focus-02');
        (callbackManagerFocus02.addCallback(focus01OnClick, 'focus01OnClick'))();
    };
    
    

    var loginOnClick = function(){
        
        $('.top-container-login-toggle').on('click', function(){
            $('.top-container-login-toggle').unbind('click');
            animationManager.switchFocus('focus02');
            viewManagerFocus02.loadNextView('viewsFocus02/login.html');
        });
    };
    
    var focus01OnClick = function(){
        $('.focus-01').on('click', function(){
            $('.focus-01').unbind('click');
            animationManager.switchFocus('focus01');
            loginOnClick();
        });
    };

    //LANDING
    var fadeInTitleAndArrows = function () {
        animationManager.fadeInTitle($('.title'));
        animationManager.fadeInElement($('.article-bottom-arrow-01'), 500, 0.4);
        animationManager.fadeInElement($('.article-bottom-arrow-02'), 500, 0.4);
        var arrowHandler = animationManager.getArrowHandler();
        console.log('pushing arrowHandler');
        intervalManager.pushToFuncs(arrowHandler);
    };

    //CALLBACKMANAGER SETUP
    var views = [
        'views/landing.html'
    ];
    callbackManager.views = views;
    callbackManagerFocus02.addView('viewsFocus02/login.html');
    
    //ADDCALLBACK RETURNS A FUNCTION THAT MAKES THE CALLBACK GLOBAL - WHICH WE CAN
    //INVOKE INSTANTLY
    (callbackManager.addCallback(loadFocus2, 'loadFocus02'))();
    (callbackManager.addCallback(loginOnClick, 'loginOnClick'))();
    (callbackManager.addCallback(globalOnLoad, 'globalOnLoad'))();
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
