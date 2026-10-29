angular.module('myApp')

        .component('myName', {
            bindings: {
                userName: '@' // Recieves plain text attribute bindings
            },
            template: `
       <h2  id="about" class="w3-text-light-grey ay-padding-top-64">My Name</h2>
                
                <p>
                    Skilled Videographer with years of experience.
                    Sets up and operates sight equipment, edits final videos and adds effects.
                    Well-organized with disciplined approach and good time management skills. 
                    Enthusiastic about developing and realizing cohesive vision with each project. 

                </p>
    `
        });
