function getViewManager(callbackManagerIn) {

    return Object.seal({
        animationManager: null,
        mainParentElement: null,
        previousView: null,
        currentView: null,
        indexPage: null,
        callbackManager: callbackManagerIn,
//        beforeRenderFuncs: [],
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
//        views: [
//            
//        ],
        //CALLBACKS CURRENTLY NOT USED, THEY JUST GET BOUNCED TO loadViewAbstract()
        loadIndexPage: function (callback) {
            if (this.indexPage) {
                this.loadViewAbstract(this.indexPage, callback);
            }

        },
        loadNextView: function (nextViewIn, callback) {

            if (nextViewIn) {
                this.loadViewAbstract(nextViewIn, callback);
                if (this.currentView) {
                    this.previousView = this.currentView;
                }
                this.currentView = nextViewIn;
            }
        },
        loadPreviousView: function (callback) {
            if (this.previousView) {
                this.loadViewAbstract(this.previousView, callback);
            } else {
                this.loadViewAbstract(this.frontPage, callback);
            }
        },
        loadViewAbstract: function (nextViewIn, callback) {
            var self = this;
            $(this.mainParentElement).hide();

            $.ajax(nextViewIn, {
                success: function (data) {

                    $(self.mainParentElement).empty();
                    $(self.mainParentElement).append(data);
                    self.mapViews(self.viewMappings.standard);
                    $(self.mainParentElement).show();
                    self.callbackManager.triggerCallbacksByView(nextViewIn);

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
        fadeOutAndDeloadParent: function () {
            if (this.animationManager) {
                var self = this;
                self.animationManager.fadeOutElement(self.mainParentElement, 250);
                
                
                
                
                
                
            } else {
                console.error('viewManager.fadeOutAndDeloadParent');
                console.error('animationManager reference not initialized');
            }


        }
//        beforeRender: function () {
//            this.beforeRenderFuncs.forEach(function (func) {
//
//                func();
//            });
//        }

    });
}
