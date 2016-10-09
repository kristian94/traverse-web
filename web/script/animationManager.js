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

//            console.log(div[0]);

            if (!this.isScrollable(div)) {
//                console.log('was not scrollable');
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
            if (element) {


                if (element.length !== undefined) {
                    element = element[0];
                }
                console.log(element.scrollHeight);
                
                console.log(element.clientHeight);
                return (element.scrollHeight > element.clientHeight);
            }else{
                console.error('isScrollable: element undefined or null');
            }
        },
        fadeInElement: function (element, duration, targetOpacity) {
            if (element && duration && targetOpacity) {
                this.setTransition(element, duration, function () {
                    if ($(element).css('opacity') === '1') {
                        console.error('opacity already set to 1');
                    }
//                console.log($(element).css('opacity'));
                    $(element).css('opacity', targetOpacity);
                });
            } else {
                console.error('fadeInElement error');
            }

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
        setTransition: function (element, duration, callback) {

            console.log(element[0]);



            var durationInS = duration / 1000;

            console.log('duration in s: ' + durationInS);

            var origTransition = $(element).css('transition');
            var newTransition = 'ease-in ' + durationInS + 's';

            console.log('orig trans: ' + origTransition);
            console.log('new trans: ' + newTransition);

            $(element).css('transition', newTransition);

            setTimeout(function () {
                callback();
            }, 10);


//            console.log('og her');

            setTimeout(function () {
                $(element).css('transition', origTransition);
            }, duration);
        },
        switchFocus: function (focused) {
            console.log('switchFocus(' + focused + ')');


            if (focused === 'focus02') {
                this.blurElement($('.focus-01'), 100);
//                $('.focus-02').show();
                this.fadeInElement($('.focus-02'), 100, 1);

            } else if (focused === 'focus01') {
                this.fadeInElement($('.focus-02'), 100, 0);
                $('.focus-02').hide();
                this.unblurElement($('.focus-01'), 100);
            } else {
                console.error('animationManager.switchFocus()');
                console.error('invalid target focus (' + focused + '); must be \'focus01\' or \'focus02\'');
            }

        },
        blurElement: function (element, duration) {
            this.setTransition(element, duration, function () {
                $(element).css('filter', 'grayscale(0.5) blur(3px) brightness(1.3)');
            });
        },
        unblurElement: function (element, duration) {
            this.setTransition(element, duration, function () {
                $(element).css('filter', '');
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
//                var degStart = 0;
//                var degEnd = 45;


                $(toggle).on('click', function () {
                    $(toggle.unbind('click'));
                    var transX;



                    if (direction == 'out') {
                        transX = Number(-$('.top-container-menu-and-overflow').width() + 16) + 'px';
                    } else {
                        transX = 0;
                    }



                    var transX = 'translateX(' + transX + ')';
                    var rotate = 'rotate(' + deg + 'deg)';

                    var menuOldTransition = $(menu).css('transition');
                    var toggleOldTransition = $(toggleVisual).css('transition');

                    $(menu).css('transition', 'ease-in 0.3s');
                    $(toggleVisual).css('transition', 'ease-in 0.3s');

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

