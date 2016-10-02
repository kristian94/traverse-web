function getIntervalManager(){
    return Object.seal({
        funcs:[],
        tickRate: 500,
        intervalId: null,
        startInterval:function(){
            var self = this;
            intervalId = setInterval(function(){
                self.funcs.forEach(function(func){
                    func();
                });
            }, self.tickRate);
        }
    });
}


