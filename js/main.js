const map = document.getElementById('map');
const bomberman = document.getElementById("bomberman");
const bomb = document.getElementById("bomb");
 
// Creation Map
var grille = [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1, 1, 3],
    [3, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 3],
    [3, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 3],
    [3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 3],
    [3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
];

function afficherMap() {

    var x, y = 0;
    var wall;
    var floor;
    var cadre; 

    for (x = 0; x < 14; x++) {

        for (y = 0; y < 10; y++) {

            if (grille[y][x] === 3) {   // Cadre

                cadre = document.createElement("div");
                cadre.setAttribute("class", "cadre");
                map.appendChild(cadre);
                cadre.style.top = y * 50 + "px";
                cadre.style.left = x * 50 + "px";
                cadre.style.backgroundImage = "url('img/wall.png')";

            } if (grille[y][x] === 2) {                   // Mur
                wall = document.createElement("div");
                wall.setAttribute("class", "wall");
                map.appendChild(wall);
                wall.style.top = y * 50 + "px";
                wall.style.left = x * 50 + "px";
                wall.style.backgroundImage = "url('img/wall.png')";
        
                
            } else if (grille[y][x] === 1) {            // Sol 

                floor = document.createElement("div"); 
                floor.setAttribute("class", "floor");
                map.appendChild(floor);
                floor.style.top = y * 50 + "px";
                floor.style.left = x * 50 + "px";
            }
        }
    }
}

afficherMap();

// Position et deplacement Bomberman

var controlActive = true
document.addEventListener("keydown", function (e) {

    var bombermanPos = 0;
    var bombermanLeft = bomberman.offsetLeft;
    var bombermanTop = bomberman.offsetTop;
    var posBlockLeft = bomberman.offsetLeft / 50;
    var posBlockTop = bomberman.offsetTop / 50;


    if (controlActive) {
        switch (e.keyCode) {
            // Haut
            case 38:

                if (grille[posBlockTop - 1][posBlockLeft] == 1) {
                    bomberman.style.top = (posBlockTop - 1) * 50 + "px";
                    bomberman.style.backgroundImage = "url('img/up.png')";
                    bomberman.style.backgroundSize = "50px";
                }
                bombermandie()
                break;
            //Droite
            case 39:
                if (grille[posBlockTop][posBlockLeft + 1] == 1) {
                    bomberman.style.left = (posBlockLeft + 1) * 50 + "px";
                    bomberman.style.backgroundImage = "url('img/right.png')";
                    bomberman.style.backgroundSize = "50px";
                }
                bombermandie()
                break;
            //Bas
            case 40:

                if (grille[posBlockTop + 1][posBlockLeft] == 1) {
                    bomberman.style.top = (posBlockTop + 1) * 50 + "px";
                    bomberman.style.backgroundImage = "url('img/down.png')";
                    bomberman.style.backgroundSize = "50px";
                }
                bombermandie()
                break;
            //Gauche
            case 37:
                if (grille[posBlockTop][posBlockLeft - 1] == 1) {
                    bomberman.style.left = (posBlockLeft - 1) * 50 + "px";
                    bomberman.style.backgroundImage = "url('img/left.png')";
                    bomberman.style.backgroundSize = "50px";
                }
                bombermandie()
                break;

            // La bombe
            case 32:
                if (bombermanPos === 0) {
                    bomb.style.left = bombermanLeft + "px";
                    bomb.style.top = bombermanTop + "px";
                    bomb.style.backgroundImage = "url('img/bomb.svg')";
                    bomb.style.backgroundSize = "50px";
                    bomb.style.display = "block";

                    setTimeout(boom, 1500);
                    setTimeout(boombomb, 2500);
                }
                break;

        }
    }

});


// déplacement Ennemie
const ennemie = document.getElementById("ennemie");

function random() {
    var min = 1;
    var max = 4;
    var dir = Math.floor(Math.random() * Math.floor(max));
    var posBlockLeft = ennemie.offsetLeft / 50;
    var posBlockTop = ennemie.offsetTop / 50;

    if (dir == 0) {     // ---------- Droite ---------
        if (grille[posBlockTop][posBlockLeft + 1] == 1) {
            ennemie.style.left = ennemie.offsetLeft + 50 + "px";
            ennemie.style.backgroundImage = "url('img/ennemie.svg')";
            ennemie.style.backgroundSize = "50px";

        } 
    } else if (dir == 1) {        // --------- Gauche ----------
        if (grille[posBlockTop][posBlockLeft - 1] == 1) {
            ennemie.style.left = ennemie.offsetLeft - 50 + "px";
            ennemie.style.backgroundImage = "url('img/ennemie.svg')";
            ennemie.style.backgroundSize = "50px";


        } 

    } else if (dir == 3) {   // --------- Bas -------------- 
        if (grille[posBlockTop + 1][posBlockLeft] == 1) {
            ennemie.style.top = ennemie.offsetTop + 50 + "px";
            ennemie.style.backgroundImage = "url('img/ennemie.svg')";
            ennemie.style.backgroundSize = "50px";
        }

    } else if (dir == 2) {   // --------- Haut ----------
        if (grille[posBlockTop - 1][posBlockLeft] == 1) { //console.log(grille[posBlockTop]);
        
            ennemie.style.top = ennemie.offsetTop - 50 + "px";
            ennemie.style.backgroundImage = "url('img/ennemie.svg')";
            ennemie.style.backgroundSize = "50px";
        } 
    }
} // FIN IF

setInterval(random, 1500);
 

// ---------------------   Explosition  ------------------------ 



function boombomb() {

    bomb.style.display = "none";
    var element = document.getElementsByClassName('explosion');

    for (var i = element.length - 1; i >= 0; i--) {
        element[i].parentElement.removeChild(element[i]);
    }

}



function boom(){
    var posBombLeft = bomb.offsetLeft / 50;
    var posBombTop = bomb.offsetTop / 50;
    var explosion;

    if (grille[posBombTop + 1][posBombLeft] != 3 ) {

        explosion = document.createElement("div");
        explosion.setAttribute("class", "explosion");
        map.appendChild(explosion);
        explosion.style.top = (posBombTop + 1) * 50 + "px";
        explosion.style.left = posBombLeft * 50 + "px";
        bomb.style.backgroundImage = "url('img/boom.png')";
        explosion.style.backgroundImage = "url('img/boom.png')";
        explosion.style.backgroundSize = "50px";

        killEnnemie(explosion);
        breakwall(explosion);

    } if (grille[posBombTop - 1][posBombLeft] != 3 )  {

        explosion = document.createElement("div");
        explosion.setAttribute("class", "explosion");
        map.appendChild(explosion);
        explosion.style.top = (posBombTop - 1) * 50 + "px";
        explosion.style.left = posBombLeft * 50 + "px";
        bomb.style.backgroundImage = "url('img/boom.png')";
        explosion.style.backgroundImage = "url('img/boom.png')";
        explosion.style.backgroundSize = "50px";

        killEnnemie(explosion);
        breakwall(explosion);

    } if (grille[posBombTop][posBombLeft + 1] != 3  )  {

        explosion = document.createElement("div");
        explosion.setAttribute("class", "explosion");
        map.appendChild(explosion);
        explosion.style.top = posBombTop * 50 + "px";
        explosion.style.left = (posBombLeft + 1) * 50 + "px";
        bomb.style.backgroundImage = "url('img/boom.png')";
        explosion.style.backgroundImage = "url('img/boom.png')";
        explosion.style.backgroundSize = "50px";

        killEnnemie(explosion);
        breakwall(explosion);

    } if (grille[posBombTop][posBombLeft - 1] != 3  )  {

        explosion = document.createElement("div");
        explosion.setAttribute("class", "explosion");
        map.appendChild(explosion);
        explosion.style.top = posBombTop * 50 + "px";
        explosion.style.left = (posBombLeft - 1) * 50 + "px";
        bomb.style.backgroundImage = "url('img/boom.png')";
        explosion.style.backgroundImage = "url('img/boom.png')";
        explosion.style.backgroundSize = "50px";

        killEnnemie(explosion);
        breakwall(explosion);
    }
}

// -------- Kill Ennemie

function killEnnemie(explosion) {
    var posEnnemieLeft =  ennemie.offsetLeft;
    var posEnnemieTop = ennemie.offsetTop;
    var posBombLeft = bomb.offsetLeft;
    var posBombTop = bomb.offsetTop;
    var explosionLeft = explosion.offsetLeft;
    
    var element = document.getElementsByClassName('explosion');
    for (var i = element.length - 1; i >= 0; i--) {

        if ((posBombLeft === posEnnemieLeft) && (posBombTop === posEnnemieTop)) {

            ennemie.style.display = "none";
            playerwin.style.display = "block";
            

        } else if ((explosion.offsetTop === posEnnemieTop) && (explosion.offsetLeft === posEnnemieLeft)) {

            ennemie.style.display = "none";
            playerwin.style.display = "block";
        }
    }
}

// Break wall

function breakwall(explosion) {

    var element = document.getElementsByClassName('wall');
    var wallDeleteLeft = 0;
    var wallDeleteTop = 0;

    for (var i = element.length - 1; i >= 0; i--) {

        wallDeleteLeft = element[i].offsetLeft / 50;
        wallDeleteTop = element[i].offsetTop / 50;

        if ((explosion.offsetTop / 50 == wallDeleteTop) && (explosion.offsetLeft / 50 == wallDeleteLeft)) {

            element[i].style.display= "none";

            if (grille[wallDeleteTop][wallDeleteLeft] == 2) {
                grille[wallDeleteTop][wallDeleteLeft] = 1;

            }

        }
    }
}

function bombermandie () {

    var posBombermanLeft = bomberman.offsetLeft / 50;
    var posBombermanTop = bomberman.offsetTop / 50;
    var posEnnemieLeft = ennemie.offsetLeft / 50;
    var posEnnemieTop = ennemie.offsetTop / 50;

    if (posBombermanTop == posEnnemieTop && posBombermanLeft == posEnnemieLeft) {

        bomberman.style.display = "none";
        playerlose.style.display = "block";

        // return true
    }

    // return false
}