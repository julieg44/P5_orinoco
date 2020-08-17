////// fonction affichage pastille panier

function afficherPastille(panier) {
    let nbrArticleTotal = 0
    panier.forEach(function (lignePanier) {
        let resultat = parseInt(lignePanier.qte);
        nbrArticleTotal = nbrArticleTotal + resultat;
    })
    let pastillePanier = document.querySelector('div .card-nbr');
    // if(nbrArticleTotal === 0){
        if(panier === null){
    
        pastillePanier.style.display = 'none';
            }
    pastillePanier.innerHTML = nbrArticleTotal;
    pastillePanier.style.display = 'block';
}