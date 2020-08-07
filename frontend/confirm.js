/// recupération de la réponse API stockée dans le localStorage

let orderId = JSON.parse(localStorage.getItem('orderId'));
let contact = JSON.parse(localStorage.getItem('contact'));
let article = JSON.parse(localStorage.getItem('article'));

//// mise en forme du message de remerciement
let section = document.getElementById('confirm')
let blocConfirm = document.createElement('div')
blocConfirm.classList.add('confirm');
let merci = document.createElement('div');
merci.classList.add('merci');
merci.innerHTML = 'Merci pour votre commande ' + contact.lastName; 
let montant = document.createElement('div');
montant.classList.add('montant');
let numCommande = document.createElement('div');
numCommande.classList.add('numero');
numCommande.innerHTML = "elle porte le numéro <br><span class='rose order'>" + orderId + "</span>";
let aBientot = document.createElement('div');
aBientot.classList.add('bientot');
aBientot.innerHTML = "A très bientôt !!";
let retour = document.createElement('button');
retour.classList.add('retour');
retour.innerHTML = '<i class="fas fa-home"></i>';
blocConfirm.appendChild(merci);
blocConfirm.appendChild(montant);
blocConfirm.appendChild(numCommande);
blocConfirm.appendChild(aBientot);
blocConfirm.appendChild(retour);
section.appendChild(blocConfirm);

//// calcul du montant total du panier
function calculMontant(article){
    let montantTotal = 0;
    article.forEach(function(ligne){
        let resultat = ligne.price / 100 * ligne.qte;
        montantTotal = montantTotal + resultat;
    }) 
    montant.innerHTML = "Votre commande d'un montant de <span class='rose'>" + montantTotal + "€</span> sera prise en charge dans les meileurs délais"  ; 
}

//// bouton de reinitialisation du localStorage et redirection vers page d'accueil
function retourPanierVierge(){
    localStorage.clear();
    window.location.href ="index.html"
}

calculMontant(article);
retour.onclick = (function(){
    retourPanierVierge();
})