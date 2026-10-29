angular.module('myApp')

        .component('navigation', {
            bindings: {
                userName: '@' // Recieves plain text attribute bindings
            },
            template: `
      
    <!-- Icon Bar (Sidebar - hidden on small screens) -->
        <nav class="nav-sidebar w3-sidebar w3-bar-block w3-small w3-hide-small w3-center">
            <!-- Avatar image in top left corner -->
            <img src="./images/user_avatar.jpg" style="width:100%" alt="">

            <a href="#" class="w3-bar-item w3-button w3-padding-large w3-black">
                <!--<div class="colored-icon" style=" background-color: #ff4500; "></div>-->
                <img src="./images/solid/home.svg" class="icon-white"  alt="home.svg"/>
                <p>HOME</p>
            </a>

            <a href="#about" class="w3-bar-item w3-button w3-padding-large w3-hover-black">
                <img src="./images/solid/user-tie.svg" class="icon-white"  alt="user.svg"/>
                <p>ABOUT</p>
            </a>

            <a href="#projects" class="w3-bar-item w3-button w3-padding-large w3-hover-black">
                <img src="./images/solid/eye.svg" class="icon-white"  alt="eye.svg"/>
                <p>PROJECTS</p>
            </a>
            <a href="#contact" class="w3-bar-item w3-button w3-padding-large w3-hover-black">
                <img src="./images/solid/envelope.svg" class="icon-white"  alt="envelope.svg"/>
                <p>CONTACT</p>
            </a>
        </nav>

        <!-- Navbar on small screens (Hidden on medium and large screens) -->
        <div class="w3-top w3-hide-large w3-hide-medium" id="myNavbar">
            <div class="w3-bar w3-black w3-opacity w3-hover-opacity-off w3-center w3-small">
                <a href="#" class="w3-bar-item w3-button" style="width:25% !important">HOME</a>
                <a href="#about" class="w3-bar-item w3-button" style="width:25% !important">ABOUT</a>
                <a href="#projects" class="w3-bar-item w3-button" style="width:25% !important">PROJECTS</a>
                <a href="#contact" class="w3-bar-item w3-button" style="width:25% !important">CONTACT</a>
            </div>
        </div>
    
    `
        });
