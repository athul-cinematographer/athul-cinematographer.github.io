angular.module('myApp')

        /**
         * 1. Root Application Dashboard Component
         * Handles the async JSON loading and groups the data array by company
         */
        .component('zoyaVideoHub', {
            templateUrl: getRelativeTemplate('dashboard-wrapper', import.meta.url)
            ,
            controller: ['$http', function ZoyaVideoHubController($http) {
                    var ctrl = this;
                    ctrl.groupedTabs = [];
                    ctrl.$onInit = function () {
//                        $http.get('/json/ALL.json').then(onSuccessOld, onError);
                        $http.get('/json/projects.json').then(onSuccess, onError);
                    };


                    function onSuccess(response) {
                        ctrl.groupedTabs = response.data;
//                        console.log(JSON.stringify(ctrl.groupedTabs));
                    }

                    function onSuccessOld(response) {
                        var rawData = response.data;
                        ctrl.brandName = rawData.name;
                        var tempGroups = {};
                        // Group entries strictly by company field identifier values
                        angular.forEach(rawData.videos, function (video) {
                            var companyKey = video.company || rawData.name || 'General';
                            if (!tempGroups[companyKey]) {
                                tempGroups[companyKey] = {
                                    title: companyKey,
                                    videoList: []
                                };
                            }
                            tempGroups[companyKey].videoList.push(video);
                        });
                        // Flatten out mapping payload array list
                        angular.forEach(tempGroups, function (group) {
                            ctrl.groupedTabs.push(group);
                        });
                        console.log(JSON.stringify(ctrl.groupedTabs));
                    }




                    function onError(error) {
                        console.error('Failed to load video dashboard database files.', error);
                    }


                }]
        })

        /**
         * 2. Parent Tab Container Component
         */
        .component('myTabs', {
            transclude: true,
            template: `
        <div class="tabbed-pane">
          <ul class="tab-nav">
            <li ng-repeat="pane in $ctrl.panes" ng-class="{active: pane.selected}">
              <a href="" ng-click="$ctrl.select(pane)">{{pane.title}}</a>
            </li>
          </ul>
          <div class="tab-content" ng-transclude></div>
        </div>
    `,
            controller: function MyTabsController() {
                var ctrl = this;
                ctrl.panes = [];
                ctrl.select = function (pane) {
                    angular.forEach(ctrl.panes, function (p) {
                        p.selected = false;
                    });
                    pane.selected = true;
                };
                ctrl.addPane = function (pane) {
                    if (ctrl.panes.length === 0)
                        ctrl.select(pane);
                    ctrl.panes.push(pane);
                };
            }
        })

        /**
         * 3. Individual Tab Pane Component
         */
        .component('myPane', {
            transclude: true,
            require: {tabsCtrl: '^myTabs'},
            bindings: {title: '@'},
            template: `<div class="tab-pane-content" ng-show="$ctrl.selected" ng-transclude></div>`,
            controller: function MyPaneController() {
                var ctrl = this;
                ctrl.$onInit = function () {
                    ctrl.tabsCtrl.addPane(ctrl);
                };
            }
        })

        /**
         * 4. Video Grid Component
         * Isolates and renders the card layouts cleanly
         */
        .component('videoGrid', {
            bindings: {
                list: '<' // One-way bound data input source channel string
            },
            templateUrl: getRelativeTemplate('video-grid-container', import.meta.url)

        });
