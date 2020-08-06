let orderId = JSON.parse(localStorage.getItem('orderId'));
let contact = JSON.parse(localStorage.getItem('contact'));
let article = JSON.parse(localStorage.getItem('article'));
console.log(orderId);
console.log(contact);
console.log(article);


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
retour.innerHTML = '<a href="index.html"><i class="fas fa-home"></i></a>';
blocConfirm.appendChild(merci);
blocConfirm.appendChild(montant);
blocConfirm.appendChild(numCommande);
blocConfirm.appendChild(aBientot);
blocConfirm.appendChild(retour);
section.appendChild(blocConfirm);

calculMontant(article);

retour.onclick = (function(){
    ViderInfo();
})

function calculMontant(article){
    let montantTotal = 0;
    article.forEach(function(ligne){
        console.log(ligne);
        let resultat = ligne.price / 100 * ligne.qte;
        montantTotal = montantTotal + resultat;
        console.log(montantTotal);
    }) 
    montant.innerHTML = "Votre commande d'un montant de <span class='rose'>" + montantTotal + "€</span> sera prise en charge dans les meileurs délais"  ; 
}

function ViderInfo(){
    localStorage.clear();
}