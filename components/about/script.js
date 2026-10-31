
angular.module("myApp").component('about',
        {
            bindings: {
                username: '@'
            },

            templateUrl: getTemplateAy(import.meta.url)

        }

);
