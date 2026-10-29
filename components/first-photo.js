angular.module('myApp').component('firstPhoto', {
    bindings: {
        userName: '@' // Recieves plain text attribute bindings
    },
    template: `
       <header class="w3-container w3-padding-32 w3-center w3-black" id="home">
                <h1 class="w3-jumbo"><span class="w3-hide-small">
                        I'm </span> ATHUL K VENU
                </h1>
                <p>
                    CINEMATOGRAPHER |
                    VIDEO EDITOR |
                    PHOTOGRAPHER |
                    MOTION-GRAPHICS ARTIST  |
                    SOCIAL  MEDIA HANDLER |
                    GRAPHICS DESIGNING
                </p>
                <img src="./images/profile_seat.jpg" alt="boy" class="w3-image" width="992" height="1108">
            </header>
    `
});
