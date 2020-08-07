//// récupération des articles ajoutés préalablement au panier et stockés dans le localStorage
let panierFinal = JSON.parse(localStorage.getItem('article'))

let alert = new custumAlert();
let fondPanier = document.getElementById('card-back');

/////affichage du contenu du panier :

//// alerte utilisateur si le panier est vide => redirection vers accueil via la function Alert
if (panierFinal === null){
    alert.render('Votre panier<br>est vide !');
    fondPanier.style.display ='none'  
}   

/////// function pour afficher dynamiquement le contenu du panier (qte/nom/couleur/prix)
function afficherPanier(panierFinal){
    ////// mise en forme pour chaque ligne article /////
    panierFinal.forEach(function(produit){
        let ligneArticlePanier = document.createElement('div'); 
        ligneArticlePanier.classList.add ('article-panier'); 
        let panierNbr = document.createElement('div');
        panierNbr.classList.add ('nbr');
        let panierName = document.createElement('div');
        panierName.classList.add ('name');
        let couleurName = document.createElement('span');
        couleurName.classList.add('plus-petit');
        let panierPrice = document.createElement('div');
        panierPrice.classList.add ('price');
        let remove = document.createElement('div');
        remove.classList.add('remove');
        remove.innerHTML = ' X ';
        fondPanier.appendChild(ligneArticlePanier);
        ligneArticlePanier.appendChild(panierNbr);
        ligneArticlePanier.appendChild(panierName);
        ligneArticlePanier.appendChild(panierPrice);
        ligneArticlePanier.appendChild(remove);
        couleurName.innerHTML = '&nbsp &nbsp &nbsp' + produit.color;
        panierPrice.innerHTML = produit.qte * produit.price / 100 + '€';
        panierNbr.innerHTML = produit.qte;
        panierName.innerHTML = produit.article;  
        panierName.appendChild(couleurName);

        /////// fonction pour gérer la décrémentation d'un article du panier et de l'affichage et sa mise a jour dans le localStorage  /////
        remove.onclick = function(){
            produit.qte --  
            localStorage.setItem('article', JSON.stringify(panierFinal));
            panierPrice.innerHTML = produit.qte * produit.price / 100 + '€';
            panierNbr.innerHTML = produit.qte;

            ////mise à jour total final
            let prixTotal = 0 
            panierFinal.forEach(function(lignePanier){
                let resultat = lignePanier.price / 100 * lignePanier.qte;
                prixTotal = prixTotal + resultat;
            })
            let totalPanierBloc = document.getElementsByClassName('total-panier-bloc');
            afficherPastille(panierFinal);
            totalPanierBloc[0].innerHTML = prixTotal + '€';

            //////Suppression de la ligne article du panier et de l'affichage si la qte de l'article atteint 0,
            if (produit.qte === 0){
                panierFinal = panierFinal.filter(function(item){
                    return item !== produit;
                })
            fondPanier.removeChild(ligneArticlePanier);
            localStorage.setItem('article', JSON.stringify(panierFinal)); 
            afficherPastille(panierFinal);
            }
            //////Gestion du panier et de l'affichage si les articles sont tous supprimés manuellement,
            if (panierFinal.length === 0){
                localStorage.clear();
                let ligneTotalPanier = document.querySelector('.total-panier');
                fondPanier.removeChild(ligneTotalPanier);
                fondPanier.style.display ='none';  
                let ligneViderPanier = document.querySelector('.vider-panier');
                fondPanier.removeChild(ligneViderPanier);
                afficherPastille(panierFinal);
                alert.render('Votre panier<br>est vide !')
            }
        }
    })
}
///// Affichage et calcul du prix total du panier
function afficherPrixTotal(panier){
    let prixTotal = 0 
    panier.forEach(function(lignePanier){
            let resultat = lignePanier.price / 100 * lignePanier.qte;
            prixTotal = prixTotal + resultat;
    }) 
    let ligneTotalPanier = document.createElement('div');
    ligneTotalPanier.classList.add('total-panier');
    let totalPanierTitre =  document.createElement('div');
    totalPanierTitre.classList.add('total-panier-titre');
    totalPanierTitre.innerHTML = 'Total de la commande';
    let totalPanierBloc = document.createElement('div');
    totalPanierBloc.classList.add('total-panier-bloc');
    fondPanier.appendChild(ligneTotalPanier);
    ligneTotalPanier.appendChild(totalPanierTitre);
    ligneTotalPanier.appendChild(totalPanierBloc);
    totalPanierBloc.innerHTML = prixTotal + '€';
        if(panierFinal.lenght === 0){
            fondPanier.removeChild(ligneTotalPanier);
        }
    }


///// Affichage du bouton et suppression au click de l'ensemble des articles du panier/ mise à jour du localStorage et redirection vers accueil
function ViderPanier(panier){
    let ligneViderPanier = document.createElement('div');
    ligneViderPanier.classList.add('vider-panier');
    let viderPanierTitre =  document.createElement('div');
    viderPanierTitre.classList.add('vider-panier-titre');
    viderPanierTitre.innerHTML = 'Vider le panier';
    let viderPanierBloc = document.createElement('div');
    viderPanierBloc.classList.add('vider-panier-bloc');
    viderPanierBloc.innerHTML = '<i class="fas fa-trash-alt"></i>'
    fondPanier.appendChild(ligneViderPanier);
    ligneViderPanier.appendChild(viderPanierTitre);
    ligneViderPanier.appendChild(viderPanierBloc);
    viderPanierBloc.onclick = function(){
        let ligneTotalPanier = document.querySelector('.total-panier');
        fondPanier.removeChild(ligneTotalPanier);
        fondPanier.removeChild(ligneViderPanier);
            panierFinal.forEach(function(lignePanier){
                let ligneArticlePanier = document.querySelector('.article-panier');
                fondPanier.removeChild(ligneArticlePanier);
            })
        localStorage.clear(); 
        alert.render('Votre panier<br>est vide !');
        let pastillePanier = document.querySelector('div .card-nbr');
        pastillePanier.style.display = 'none'; 
        fondPanier.style.display ='none'  
    }
}

////// formulaire de contact ///////


function envoyerCommande(){
    ///// recupératioin des inputs du DOM
    let formulaireNom = document.getElementById('contact-nom');
    let formulairePrenom = document.getElementById('contact-prenom');
    let formulaireAdresse = document.getElementById('contact-adresse');
    let formulaireVille = document.getElementById('contact-ville');
    let formulaireMail = document.getElementById('contact-mail');
    let formulaire = document.getElementById('formulaire');
    ///// ecoute de la soumission du formulaire et de la validité des champs requis
    formulaire.addEventListener('submit',function(){
    event.preventDefault();    
    let isValid = formulaire.checkValidity();
        //// si les champs sont correctement remplis
        if(isValid){
            //// recuperation des Id des produits
            let products = [];
            for (let i = 0; i < panierFinal.length; i++){
                products.push(panierFinal[i].id);
            }
            //// recuperation des valeurs de contact saisies
            let contact = new Contact (formulaireNom.value, formulairePrenom.value, formulaireAdresse.value, formulaireVille.value, formulaireMail.value);
            /// création de la variable a envoyer à l'API
            let order = {contact, products};

            //// requète POST à l'API de products et contact
            let paramFetch = {
                method:'POST',
                body: JSON.stringify(order),
                headers: { 'Content-type': "application/json"}
            };

            fetch('http://localhost:3000/api/teddies/order', paramFetch)
                ///// reponse de l'API et stockage de celle-ci dans le localStorage
                .then(function(response){
                    return (response.json())
                })
                .then(function(response){
                    let commandeId = JSON.stringify(response.orderId);
                    let commandeContact = JSON.stringify(response.contact);
                    localStorage.setItem('orderId', commandeId);
                    localStorage.setItem('contact', commandeContact);
                })
                //// redirection vers la page confirmation de commande
                .then(function(){
                    window.location.href = 'confirmation.html'
                })
        } 
    })
}
afficherPastille(panierFinal);
afficherPanier(panierFinal);
afficherPrixTotal(panierFinal);
ViderPanier(panierFinal);
envoyerCommande(panierFinal);

     





    


