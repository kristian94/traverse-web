function getAnimationManager() {
    return Object.seal({
        titleSettings: {
            targetOpacity: 1,
            animationDuration: 2000
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
        }
    });
}

