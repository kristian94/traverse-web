
//callbackManager linker views til callbacks der udløses
//når et view loades

function getCallbackManager() {
    return Object.seal({
        initArray: [],
        views: [],
        relations: [],
        callbacks: [],
        getFunctionName: function (func) {
            var str = func.toString();
            var i = str.indexOf(')') - 1;
            str = str.substring(9, i);
            return str;
        },
        addCallback: function (func, name) {
            var obj = {};
            if(name){
                obj.name = name;
            }else{
                obj.name = this.getFunctionName(func);
            }
            obj.func = func;
            this.callbacks.push(obj);
            var self = this;
            return function () {
                self.makeCallbackGlobal(obj.name);
            };
        },
        makeCallbackGlobal: function (callbackName) {
//            console.log('makin in global:' + callbackName);
            var callbackIndex = this.getCallbackIndexByName(callbackName);
            this.initArray.pushIfUnique(callbackIndex);
            var self = this;
            this.views.forEach(function (view) {
                self.mapViewToCallback(view, callbackName);
            });
        },
        addView: function (view) {
            this.views.push(view);
            var i = this.getViewIndex(view);
            if(this.initArray !== null && this.initArray !== undefined){
                this.relations[i] = this.initArray;
            }else{
                this.relations[i] = [];
            }
            
        },
        mapViewToCallback: function (view, callbackName) {
            var viewIndex = this.getViewIndex(view);
            var callbackIndex = this.getCallbackIndexByName(callbackName);
            var relation = this.relations[viewIndex];
            if(relation !== null && relation !== undefined){
                this.relations[viewIndex].pushIfUnique(callbackIndex);
            }else{
                this.relations[viewIndex] = [callbackIndex];
            }
            

        },
        getViewIndex: function (view) {
            var i;
            this.views.forEach(function (element, index) {
                if (view === element) {
                    i = index;
                }
            });
            if (i !== undefined && i !== null) {
                return i;
            } else {
                console.log('view not found: ' + view);
                return null;
            }
        },
        getCallbackIndexByName: function (callbackName) {
            var i;
            this.callbacks.forEach(function (element, index) {
                if (element.name === callbackName) {
                    i = index;
                }
            });
            if (i !== undefined && i !== null) {
                return i;
            } else {
                console.log('callback not found: ' + callbackName);
                return null;
            }
        },
        triggerCallbacksByView: function (view) {
            var viewIndex = this.getViewIndex(view);
            if (viewIndex !== null) {
                var relation = this.relations[viewIndex];
                var self = this;
                if (relation !== null && relation !== undefined) {
                    relation.forEach(function (index) {
                        (self.callbacks[index].func)();
                    });
                }

            }

        },
        printViewRelations: function (view) {
            var viewIndex = this.getViewIndex(view);
            var relation = this.relations[viewIndex];
            var self = this;
            relation.forEach(function (element) {
                console.log(self.callbacks[element].name);
            });
        },
        printEverything: function(){
            console.log('==============');
            console.log('initArray:');
            console.log(this.initArray);
            console.log('views:');
            console.log(this.views);
            console.log('relations:');
            console.log(this.relations);
            console.log('callbacks:');
            console.log(this.callbacks);
            console.log('==============');
        }
    });
}