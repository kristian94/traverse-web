$(document).ready(function () {
    var viewManager = getViewManager();
    var cityscapeManager = getCityscapeManager($('#cityscape'));
    var animationManager = getAnimationManager();
    var intervalManager = getIntervalManager();
    var utilManager = getUtilManager();


    viewManager.beforeRenderFuncs.push(function () {
        utilManager.removeScrollbarAbsolute($('.middle-container-content'));
    });

    viewManager.mainParentElement = $('.viewParent');
    viewManager.indexPage = 'views/landing.html';
    viewManager.loadIndexPage();


    animationManager.fadeInTitle($('.title'));
    var city = cityscapeManager.makeCity();

    setInterval(function () {

    }, 250);

    intervalManager.funcs.push(function () {
        city = cityscapeManager.updateCity();

    });


    intervalManager.startInterval();







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
