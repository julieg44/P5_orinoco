/// déclaration de la fonction => requête à l'API qui retournera l'ensemble des articles (data)
const ours = async function () {
    let response = await fetch('http://localhost:3000/api/teddies')
    let data = await response.json()
    return data
    }   

let teddyArticle = [];

ours().then(function (data){
    /// creation de chaque instance et stockage dans un tableau
    for (let i=0; i < data.length; i++){
        let teddyModele = new Article (data[i].colors, data[i].description, data[i].imageUrl, data[i].name, data[i].price, data[i]._id);
        teddyArticle.push(teddyModele);
    }
    
    //// mise en forme du DOM 

    let section = document.querySelector('#ensemble-article');
    //// mise en forme pour chaque article de manière identique
    for (let i = 0; i < teddyArticle.length; i++){
        let article = document.createElement('article');
        article.classList.add('article', 'product-color' + [i]);
        let divNom = document.createElement('div');
        let nomArticle = document.createElement('h2');
        let divImage = document.createElement('div');
        divImage.classList.add('image-product');
        let imageArticle = document.createElement('img');
        let divInfo = document.createElement('div');
        divInfo.classList.add('infos');
        let divDescription = document.createElement('div');
        divDescription.classList.add('description');
        let description = document.createElement('p');
        let divAlign = document.createElement('div');
        divAlign.classList.add('align');
        let divPrix = document.createElement('div');
        divPrix.classList.add('prix');
        let prix = document.createElement('p');
        let wantSome = document.createElement('div');
        wantSome.classList.add('want-some');
        let bouton = document.createElement('a');
        bouton.setAttribute('id','ajouter');
        bouton.setAttribute('href', "article.html?id=" + teddyArticle[i]._id + '&type=teddies')
        bouton.innerHTML = 'Je le veux ! &nbsp'
        let heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart');

        bouton.appendChild(heart);
        wantSome.appendChild(bouton);
        divPrix.appendChild(prix);
        prix.innerHTML = teddyArticle[i].price / 100 + '€';
        divAlign.appendChild(divPrix);
        divAlign.appendChild(wantSome);
        divDescription.appendChild(description);
        description.innerHTML = teddyArticle[i].description;
        divInfo.appendChild(divDescription);
        divInfo.appendChild(divAlign);
        divNom.appendChild(nomArticle);
        nomArticle.innerHTML = teddyArticle[i].name;
        divImage.appendChild(imageArticle);
        imageArticle.src = teddyArticle[i].image;
        article.appendChild(divNom);
        article.appendChild(divImage);
        article.appendChild(divInfo);
        section.appendChild(article);
    }
})

/// recupération du panier (pour l'affichage de la pastille)
let panierFinal = JSON.parse(localStorage.getItem('article'))


/////// pastille panier ///////
let pastillePanier = document.querySelector('div .card-nbr');
if (panierFinal === null) {
    pastillePanier.style.display = 'none';
} else {
    afficherPastille(panierFinal);
}