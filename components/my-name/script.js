angular.module('myApp').component('myName', {
    bindings: {
        userName: '@' // Recieves plain text attribute bindings
    },
    templateUrl: getTemplateAy(import.meta.url)
}
);
