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
        mapSlideMenu: function () {
            var self = this;
            var func = function (direction) {
                var left;
                var nextDirection;

                if (direction === 'out') {
                    nextDirection = 'in';
                    left = self.menuSlideSettings.onLeft;
                } else if (direction === 'in') {
                    left = self.menuSlideSettings.offLeft;
                    nextDirection = 'out';
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

                $(toggle).on('click', function () {
                    $(toggle.unbind('click'));
                    $(menu).animate({
                        left: left + self.menuSlideSettings.unit
                    }, {
                        duration: self.menuSlideSettings.animationDuration,
                        step: function (x) {
                            var deg = x * 180 / 100;
                            var nextOpacity = x * self.menuSlideSettings.topBarTextOpacity / 100;

                            $(topBarText).css('opacity', nextOpacity);
                            $(toggleVisual).css('transform', 'rotate(' + deg + 'deg)');


                        },
                        complete: function () {
                            func(nextDirection);
                        }

                    });
                });
            };
            func('out');
        }
    });
}

