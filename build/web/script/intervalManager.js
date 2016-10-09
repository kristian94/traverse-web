function getIntervalManager(){
    return Object.seal({
        funcs:[],
        ticks: 1,
        intervalId: null,
        startInterval:function(){
            var self = this;
            var tickRate = 1000 / this.ticks;
            intervalId = setInterval(function(){
                self.funcs.forEach(function(func){
//                    console.log(func.toString());
                    func();
                });
            }, tickRate);
        },
        pushToFuncs:function(func){
            var self = this;
//            console.log(func);
            if(func){
                self.funcs.push(func);
            }else{
                console.error('intervalManager.pushToFuncs()');
                console.error('func was undefined or null');
            }
        }
    });
}


