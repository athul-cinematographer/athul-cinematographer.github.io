angular.module("myApp").component('contact',
        {
            bindings: {
                username: '@'
            },

            templateUrl: getTemplateAy(import.meta.url)

        }

);



