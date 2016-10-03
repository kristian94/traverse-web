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
            animationDuration: 750,
            topBarTextOpacity: null
        },
        fadeInTitle: function (title, callback) {
            var self = this;
//            $(elements).fadeTo(this.animationDuration, this.targetOpacity, function(){});
            $(title).animate({
                opacity: self.titleSettings.targetOpacity
//                'letter-spacing': '0.5em'
            }, {
                duration: self.titleSettings.animationDuration
            }
            );
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
                if(self.menuSlideSettings.topBarTextOpacity == null){
                    self.menuSlideSettings.topBarTextOpacity = $('.top-container-text').css('opacity');
                }

                $(toggle).on('click', function () {
                    $(toggle.unbind('click'));
                    $(menu).animate({
                        left: left + self.menuSlideSettings.unit
                    }, {
                        duration: self.menuSlideSettings.animationDuration,
                        step:function(x){
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

//            var left;
//            var nextDirection;
//            var self = this;
//            if(direction === 'out'){
//                nextDirection = 'in';
//                left = self.menuSlideSettings.onLeft;
//            }else if(direction === 'in'){
//                left = self.menuSlideSettings.offLeft;
//                nextDirection = 'out';
//            }else{
//                console.log('error in animationManager: no direction supplied for mapSlideMenu()');
//                return null;
//            }
//            var toggle = $('#top-container-menu-toggle');
//            var menu = $('.top-container-menu');
//            
//
//            $(toggle).on('click', function(){
//                $(toggle.unbind('click'));
//                $(menu).animate({
//                    left: left+self.menuSlideSettings.unit
//                },{
//                    duration: self.menuSlideSettings.animationDuration,
//                    complete:function(){
//                        self.mapSlideMenu(nextDirection);
//                    }
//                });
//            });
        }
    });
}

