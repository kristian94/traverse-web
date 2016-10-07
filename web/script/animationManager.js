function getAnimationManager() {
    return Object.seal({
        titleSettings: {
            targetOpacity: 1,
            animationDuration: 500
        },
        menuSlideSettings: {
            onLeft: 0,
            offLeft: 100,
            unit: '%',
            animationDuration: 500,
            topBarTextOpacity: null
        },
        fadeInTitle: function (title, callback) {
            var self = this;
            $(title).animate({
                opacity: self.titleSettings.targetOpacity
            }, {
                duration: self.titleSettings.animationDuration
            }
            );
        },
        getArrowHandler: function () {
            var div = $('.middle-container-content');
            var arrow01 = $('.article-bottom-arrow-01');
            var arrow02 = $('.article-bottom-arrow-02');
            var self = this;

            if (!this.isScrollable(div)) {
                $(arrow01).hide();
                $(arrow02).hide();
                return null;
            } else {
                return function () {
                    if (self.scrollableIsAtBottom(div)) {
                        self.fadeInElement($(arrow01), 375, 0);
                        self.fadeInElement($(arrow02), 375, 0);
                    }
                };
            }


            //return function that checks if we are at the bottom and hides arrow if true
        },
        scrollableIsAtBottom: function (element) {
            if (element.length !== undefined) {
                element = element[0];
            }
            if (element.scrollHeight <= element.scrollTop + element.clientHeight + 1) {
                return true;
            }
            return false;
        },
        isScrollable: function (element) {
            if (element.length !== undefined) {
                element = element[0];
            }
            return (element.scrollHeight > element.clientHeight);
        },
        fadeInElement: function (element, duration, targetOpacity) {
            $(element).animate({
                opacity: targetOpacity
            }, {
                duration: duration
            });
        },
        changeBackgroundOnHover: function (element, newBg) {
            var origBg = $(element).css('background');
//            $(element).css('transition', '');
            $(element).hover(function () {
                $(this).css('background', newBg);
            }, function () {
                $(this).css('background', origBg);
            });

        },
        mapSlideMenu: function () {
            var self = this;
            var func = function (direction) {
                var nextDirection;
                var deg;
                
                if (direction === 'out') {
                    nextDirection = 'in';
                    deg = -180;
                } else if (direction === 'in') {
                    nextDirection = 'out';
                    deg = 0;
                } else {
                    console.log('error in animationManager: no direction supplied for mapSlideMenu()');
                    return null;
                }
                var toggle = $('#top-container-menu-toggle');
                
                var toggleVisual = $('.top-container-menu-toggle');
                var menu = $('.top-container-menu');
                var topBarText = $('.top-container-text');
                if (self.menuSlideSettings.topBarTextOpacity == null) {
                    self.menuSlideSettings.topBarTextOpacity = $('.top-container-text').css('opacity');
                }
                var degStart = 0;
                var degEnd = 180;


                $(toggle).on('click', function () {
                    $(toggle.unbind('click'));
                    var transX;
                    
                    
                    
                    if(direction == 'out'){
                        transX = Number(-$('.top-container-menu-and-overflow').width() + 16) + 'px';
                    }else{
                        transX = 0;
                    }
                    
                    
                    
                    var transX = 'translateX(' + transX + ')';
                    var rotate = 'rotate('+deg+'deg)';

                    var menuOldTransition = $(menu).css('transition');
                    var toggleOldTransition = $(toggleVisual).css('transition');

                    $(menu).css('transition', 'ease-in 0.5s');
                    $(toggleVisual).css('transition', 'ease-in 0.5s');

                    $(menu).css('transform', transX);
                    $(toggleVisual).css('transform', rotate);
                    setTimeout(function () {
                        $(menu).css('transition', menuOldTransition);
                        $(toggleVisual).css('transition', toggleOldTransition);
                        func(nextDirection);
                    }, 500);
                    
                    
                    
                });
            };
            func('out');
        }
    });
}

