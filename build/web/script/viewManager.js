function getViewManager() {

    return Object.seal({
        mainParentElement: null,
        previousView: null,
        currentView: null,
        indexPage: null,
        beforeRenderFuncs: [],
        viewMappings: {
            standard: [
                {
                    element: '#about',
                    view: 'views/about.html'
                },
                {
                    element: '#title',
                    view: 'views/landing.html'
                }
            ]
        },
//        mapStandard: function() {
//            var self = this;
//            if(this.viewMappings){
//                this.mapViews(this.viewMappings.standard);
//            }
//        },
        loadIndexPage: function () {
            if (this.indexPage) {
                this.loadViewAbstract(this.indexPage);
            }

        },
        loadNextView: function (nextViewIn) {

            if (nextViewIn) {
                this.loadViewAbstract(nextViewIn);
                if (this.currentView) {
                    this.previousView = this.currentView;
                }
                this.currentView = nextViewIn;
            }
        },
        loadPreviousView: function () {
            if (this.previousView) {
                this.loadViewAbstract(this.previousView);
            } else {
                this.loadViewAbstract(this.frontPage);
            }
        },
        loadViewAbstract: function (nextViewIn) {
            console.log('loading view: ' + nextViewIn);
            var self = this;
            $(this.mainParentElement).hide();

            $.ajax(nextViewIn, {
                success: function (data) {

                    $(self.mainParentElement).empty();
                    $(self.mainParentElement).append(data);
                    $(self.mainParentElement).show();
                    self.mapViews(self.viewMappings.standard);
//                    if (self.beforeRenderFuncs.length === 0) {
//                        self.beforeRenderFuncs.push(self.mapStandard);
//                    }
//                    setTimeout(function () {
//                        
//                    }, 50);
                    self.beforeRender();

                },
                error: function (error) {
                    console.log(error.statusText);
                    $(self.mainParentElement).show();
                }
            });
        },
        mapViews: function (mappings) {
            var self = this;
            mappings.forEach(function (entry) {
                self.mapSingleElement(entry.element, entry.view);
            });
        },
        mapSingleElement: function (element, view) {
            var self = this;
            $(element).unbind('click');
            $(element).on('click', function () {
                self.loadNextView(view);
            });
        },
        beforeRender: function () {
            this.beforeRenderFuncs.forEach(function (func) {

                func();
            });
        }
    });
}
