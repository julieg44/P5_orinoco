
let panierFinal = JSON.parse(localStorage.getItem('article'))
    console.log(panierFinal);

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
            // document.getElementById('popup').style.display = 'none';
            // document.getElementById('popup-content').style.display = 'none';
            window.location.href = 'index.html'
        })
    }
    this.ok = function(){
        document.getElementById('popup').style.display = 'none';
        document.getElementById('popup-content').style.display = 'none';
    }
}
var alert = new custumAlert();

let fondPanier = document.getElementById('card-back');

if (panierFinal === null){
    alert.render('Votre panier est vide !');
    fondPanier.style.display ='none'  
}   




function afficherPanier(panierFinal){
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


        


            remove.onclick = function(){
                produit.qte --  
                localStorage.setItem('article', JSON.stringify(panierFinal));
                // panierFinal = JSON.parse(localStorage.getItem('article'));
                console.log(panierFinal); 
                panierPrice.innerHTML = produit.qte * produit.price / 100 + '€';
                panierNbr.innerHTML = produit.qte;
                    ////mise à jour total final
                    let prixTotal = 0 
                    panierFinal.forEach(function(lignePanier){
                        let resultat = lignePanier.price / 100 * lignePanier.qte;
                        prixTotal = prixTotal + resultat;
                    })
                    let totalPanierBloc = document.getElementsByClassName('total-panier-bloc');
                    console.log(totalPanierBloc);
                    AfficherPastille(panierFinal);
                    totalPanierBloc[0].innerHTML = prixTotal + '€';
                    /////////////////////////
                
                if (produit.qte === 0){
                    panierFinal = panierFinal.filter(function(item){
                        return item !== produit;
                    })
                fondPanier.removeChild(ligneArticlePanier);
                localStorage.setItem('article', JSON.stringify(panierFinal)); 
                // panierFinal = JSON.parse(localStorage.getItem('article'));
                console.log(panierFinal.length);
                AfficherPastille(panierFinal);
                }
                if (panierFinal.length === 0){
                    localStorage.clear();
                    // panierFinal = JSON.parse(localStorage.getItem('article'));
                    let ligneTotalPanier = document.querySelector('.total-panier');
                    console.log(ligneTotalPanier);
                    fondPanier.removeChild(ligneTotalPanier);
                    let ligneViderPanier = document.querySelector('.vider-panier');
                    fondPanier.removeChild(ligneViderPanier);
                    AfficherPastille(panierFinal);
                    alert.render('Votre panier est vide !')
                }
            }
         //////////////////
    })
}
// modifierPrixTotal(panierFinal);
afficherPanier(panierFinal);
AfficherPrixTotal(panierFinal);
ViderPanier(panierFinal);
envoyerCommande(panierFinal);

         // /////// pastille ///////
         let pastillePanier = document.querySelector('div .card-nbr');
         if (panierFinal === null){
             pastillePanier.style.display = 'none';
         } else {
             AfficherPastille(panierFinal);
             pastillePanier.style.display = 'block';
         }



function AfficherPrixTotal(panier){
    let prixTotal = 0 
    panier.forEach(function(lignePanier){
            let resultat = lignePanier.price / 100 * lignePanier.qte;
            console.log(resultat);
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
    console.log(totalPanierBloc);
    totalPanierBloc.innerHTML = prixTotal + '€';
        if(panierFinal.lenght === 0){
            fondPanier.removeChild(ligneTotalPanier);
        }
    }

function modifierPrixTotal(panier){
    let prixTotal = 0 
    panier.forEach(function(lignePanier){
            let resultat = lignePanier.price / 100 * lignePanier.qte;
            prixTotal = prixTotal + resultat;
    })
    let remove = document.getElementsByClassName('remove');
    remove.onclick = function(){
    let totalPanierBloc = document.getElementsByClassName('total-panier-bloc');
    console.log(totalPanierBloc);
    totalPanierBloc.innerHTML = prixTotal + '€';
    }
}

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
        alert.render('Votre panier est vide !');
        pastillePanier.style.display = 'none'; 
        fondPanier.style.display ='none'  
        }
}

function AfficherPastille(panier){
    let nbrArticleTotal = 0 
    panier.forEach(function(lignePanier){
            let resultat = parseInt(lignePanier.qte);
            nbrArticleTotal = nbrArticleTotal + resultat;
    }) 
    let pastillePanier = document.querySelector('div .card-nbr');
    if(nbrArticleTotal === 0){
        pastillePanier.style.display = 'none';
            }
    pastillePanier.innerHTML = nbrArticleTotal; 
    }




function envoyerCommande(){



let formulaireNom = document.getElementById('contact-nom');
let formulairePrenom = document.getElementById('contact-prenom');
let formulaireAdresse = document.getElementById('contact-adresse');
let formulaireVille = document.getElementById('contact-ville');
let formulaireMail = document.getElementById('contact-mail');

let envoi = document.getElementById('envoyer');



/////// tableau ID produit

envoi.onclick = (function(){
    console.log(envoi.onclick)
    event.preventDefault();
    let products = [];
    class Contact {
        constructor (firstName, lastName, address, city, email){
            this.firstName = firstName;
            this.lastName = lastName;
            this.address = address;
            this.city = city;
            this.email = email;
        }
    }
    for (let i = 0; i < panierFinal.length; i++){
        products.push(panierFinal[i].id);
        console.log(panierFinal[i].id);
    }
    let contact = new Contact (formulaireNom.value, formulairePrenom.value, formulaireAdresse.value, formulaireVille.value, formulaireMail.value);
    let order = {contact, products};

    // let insertPost = async function (data){
    //     let response = await fetch('http://localhost:3000/api/teddies/order',{
    //         method: 'POST',
    //         header: {
    //             'Content-Type' : 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //     console.log(JSON.stringify(data))

    //     let responseData = await response.json()
    //     console.log(responseData);
    // }
    // insertPost(order)


    let paramFetch = {
        method:'POST',
        body: JSON.stringify(order),
        headers: { 'Content-type': "application/json"}
    };


    // fetch('http://localhost:3000/api/teddies/order', paramFetch)
    //     .then(function(response){
    //         return (response.json())
    //         .then(function(response){
    //             localStorage.setItem('commande', response);
    //         })
    //     })

        fetch('http://localhost:3000/api/teddies/order', paramFetch)
            .then(function(response){
                return (response.json())
            })
            .then(function(response){
                console.log(response)
                let commandeId = JSON.stringify(response.orderId);
                let commandeContact = JSON.stringify(response.contact);
                console.log(commandeId)
                console.log(commandeContact)
                localStorage.setItem('orderId', commandeId);
                localStorage.setItem('contact', commandeContact);
            })
            // .then(function(){
            //     window.location.href = 'confirmation.html'
            // })
        
})
}




    


