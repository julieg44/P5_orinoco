/// custum alert///
function custumAlert (){
    this.render = function(dialog){
        let winW = window.innerWidth;
        let winH = window.innerHeight;
        let popup = document.getElementById ('popup');
        let popupContent = document.getElementById ('popup-content');
        popup.style.display = 'block';
        popup.style.height = winH + 'px';
        popupContent.style.left = (winW/2) - (400 * .5) + 'px';
        if (winW < 569){
            popupContent.style.left = (winW/2) - (260 * .5) + 'px';
        }
        popupContent.style.display = "block";
        document.getElementById('popup-head').innerHTML = ' <button id="fermer"> X </button> ';
        document.getElementById('popup-text').innerHTML = dialog;
        let buttonAlert = document.getElementById('fermer');
        buttonAlert.addEventListener ('click', function(){
            window.location.href = 'accueil.html'
        })
    }
    this.ok = function(){
        document.getElementById('popup').style.display = 'none';
        document.getElementById('popup-content').style.display = 'none';
    }
}