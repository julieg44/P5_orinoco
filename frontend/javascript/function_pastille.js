////// fonction affichage pastille panier

function afficherPastille(panier) {
    let nbrArticleTotal = 0
    let pastillePanier = document.querySelector('div .card-nbr');
    if(panier === null){
    pastillePanier.style.display = 'none';
    } else {
        panier.forEach(function (lignePanier) {
            let resultat = parseInt(lignePanier.qte);
            nbrArticleTotal = nbrArticleTotal + resultat;
            pastillePanier.innerHTML = nbrArticleTotal;
            pastillePanier.style.display = 'block';
        })
    }
}