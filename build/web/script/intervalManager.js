function getIntervalManager(){
    return Object.seal({
        funcs:[],
        ticks: 4,
        tickRate: 1000 / this.ticks,
        intervalId: null,
        startInterval:function(){
            var self = this;
            intervalId = setInterval(function(){
                self.funcs.forEach(function(func){
                    func();
                });
            }, self.tickRate);
        },
        pushToFuncs:function(func){
            var self = this;
            if(func != undefined && func != null){
                self.funcs.push(func);
            }
        }
    });
}


