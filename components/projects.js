angular.module('myApp')

        /**
         * 1. Root Application Dashboard Component
         * Handles the async JSON loading and groups the data array by company
         */
        .component('zoyaVideoHub', {

            template: `
        <div class="dashboard-wrapper">
          <header class="dashboard-header" >
             <h2 id="projects" class="ay-padding-top-64">My Projects</h2>
          </header>

          <!-- Parent Custom Tabs Component -->
          <my-tabs>
            <!-- Outer Loop: Generates a tab for every unique company key -->
            <my-pane ng-repeat="tab in $ctrl.groupedTabs" title="{{tab.title}}">
              
              <!-- Inner Video Grid View Component -->
              <video-grid list="tab.videoList"></video-grid>

            </my-pane>
          </my-tabs>
        </div>
    `,
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
            template: `
        <div class="video-grid-container">
          <div class="video-card" ng-repeat="video in $ctrl.list">
            <a ng-href="{{video.url}}" target="_blank" class="card-link">
              
              <div class="thumbnail-container">
                <!-- YouTube Static Image Engine -->
               
       <img ng-src="/thumbnails/{{video.sm}}/{{video.thumbnail}}.jpg" 
                     alt="Video dynamic placeholder" 
                     ng-if2="video.sm === 'youtube'">
                     
                <!-- Instagram Layout Symbol Placeholder Frame -->
                <div class="insta-placeholder" ng-if="video.sm === 'instagram'">
                   <span class="icon">🎬</span>
                   <p>Instagram Reel</p>
                </div>
                
                <span class="platform-badge" ng-class="video.sm">{{video.sm}}</span>
              </div>

              
            </a>
          </div>
        </div>
    `
        });
