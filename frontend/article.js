let params = new URLSearchParams(document.location.search.substring(1));
let id = params.get("id");


///// Requete à  l'API pour recuperer l'element correspondant à l'ID
const oursSelect = async function () {
    let response = await fetch("http://localhost:3000/api/teddies/" + id);
    let oursDetail = await response.json()
    return oursDetail;
}

oursSelect().then(function (oursDetail) {
    ///mise en forme de l'article

    let section = document.querySelector('section');
    let article = document.createElement('article');
    article.setAttribute('id', 'bloc-product');

    let divMobile = document.createElement('div');
    divMobile.setAttribute('id', 'first-bloc-mobile');
    let titreMobile = document.createElement('h2');
    divMobile.appendChild(titreMobile);

    let divImage = document.createElement('div');
    divImage.classList.add('image-product');
    imageContenu = document.createElement('img');
    divImage.appendChild(imageContenu);

    let divSelecteurs = document.createElement('div');
    divSelecteurs.setAttribute('id', 'selecteurs');
    let divSelecteurCouleur = document.createElement('div');
    divSelecteurCouleur.setAttribute('id', 'selecteur-couleur');
    let formCouleur = document.createElement('form');
    let labelCouleur = document.createElement('label');
    labelCouleur.innerHTML = 'Choix de la couleur';
    let selectCouleur = document.createElement('select');
    selectCouleur.setAttribute('id', 'colors1');
    selectCouleur.setAttribute('type', 'produit');
    selectCouleur.setAttribute('name', 'produit');
    labelCouleur.appendChild(selectCouleur);
    formCouleur.appendChild(labelCouleur);
    divSelecteurCouleur.appendChild(formCouleur);
    let divSelecteurNbr = document.createElement('div');
    divSelecteurNbr.setAttribute('id', 'selecteur-nombre');
    let formNbr = document.createElement('form');
    let labelNbr = document.createElement('label');
    labelNbr.innerHTML = 'Nombre';
    let selectNombre = document.createElement('select');
    selectNombre.setAttribute('id', 'nbr1');
    selectNombre.setAttribute('type', 'nombre');
    selectNombre.setAttribute('name', 'nombre');
    labelNbr.appendChild(selectNombre);
    formNbr.appendChild(labelNbr);
    divSelecteurNbr.appendChild(formNbr);
    divSelecteurs.appendChild(divSelecteurCouleur);
    divSelecteurs.appendChild(divSelecteurNbr);

    let divInfos = document.createElement('div');
    divInfos.classList.add('infos');
    let divFirstBloc = document.createElement('div');
    divFirstBloc.setAttribute('id', 'first-bloc');
    let titre = document.createElement('h2');
    divFirstBloc.appendChild(titre);
    let divSecondBloc = document.createElement('div');
    divSecondBloc.setAttribute('id', 'second-bloc');
    let divDescription = document.createElement('div');
    divDescription.classList.add('description');
    let text = document.createElement('p');
    divDescription.appendChild(text);
    let align = document.createElement('div');
    align.classList.add('align');
    let divPrix = document.createElement('div');
    divPrix.classList.add('prix');
    let prix = document.createElement('p');
    divPrix.appendChild(prix);
    let wantSome = document.createElement('div');
    wantSome.classList.add('want-some');
    let input = document.createElement('input');
    input.setAttribute('id', 'ajouter');
    input.setAttribute('type', 'button');
    input.setAttribute('value', 'Je le veux !');
    let coeurIcon = document.createElement('i');
    coeurIcon.classList.add('fas', 'fas-heart');
    wantSome.appendChild(input);
    wantSome.appendChild(coeurIcon);
    align.appendChild(divPrix);
    align.appendChild(wantSome);
    divSecondBloc.appendChild(divDescription);
    divSecondBloc.appendChild(align);
    divInfos.appendChild(divFirstBloc);
    divInfos.appendChild(divSecondBloc);

    article.appendChild(divMobile);
    article.appendChild(divImage);
    article.appendChild(divSelecteurs);
    article.appendChild(divInfos);
    section.appendChild(article);


    //  Replissage du contenu de la fiche article

    let imageOurs = document.querySelector('.image-product img');
    imageOurs.src = oursDetail.imageUrl;
    let name = document.querySelectorAll('#first-bloc h2');
    let nameMobile = document.querySelector('#first-bloc-mobile h2');
    name[0].innerHTML = oursDetail.name;
    nameMobile.innerHTML = oursDetail.name;
    let description = document.querySelector('.description p');
    description.innerHTML = oursDetail.description;
    let price = document.querySelector('.prix p');
    price.innerHTML = oursDetail.price / 100 + '€';


    //   Creation des couleurs dans le selecteur   ///////////

    let selectColor = document.getElementById('colors1');
    let selectNbr = document.getElementById('nbr1');

    for (let i = 0; i < oursDetail.colors.length; i++) {
        let optionColor = document.createElement('option');
        optionColor.value = oursDetail.colors[i];
        optionColor.innerHTML = oursDetail.colors[i];
        selectColor.appendChild(optionColor);
    }

    for (let i = 1; i < 10; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        selectNbr.appendChild(option);
    }

    //   Selection de la couleur et nombre    ////////////////

    let optionColor = document.querySelector('option');
    let colorTeddySelect = optionColor.value;
    let nbrTeddySelect = 1;

    document.querySelector('select[name="produit"]').onchange = changeCouleur;
    function changeCouleur(event) {
        colorTeddySelect = event.target.value;
    }

    document.querySelector('select[name="nombre"]').onchange = changeNombre;
    function changeNombre(event) {
        nbrTeddySelect = event.target.value;
    }

    // Ajout au panier et gestion de la pastille en conséquence ////////////

    let panierFinal = JSON.parse(localStorage.getItem('article'));

    /////// pastille ///////
    let pastillePanier = document.querySelector('div .card-nbr');
    if (panierFinal === null) {
        pastillePanier.style.display = 'none';
    } else {
        afficherPastille(panierFinal);
    }


    ////////// panier ////////////
    let ajoutPanierBtn = document.getElementById('ajouter');
    ajoutPanierBtn.addEventListener('click', function (e) {
        for (let i = 0; i < oursDetail.colors.length; i++) {
            if (oursDetail.colors[i] == colorTeddySelect) {
                let NouveauArticle = true;
                console.log(panierFinal);

                if (panierFinal === null) {
                    panierFinal = [];
                }
                panierFinal.forEach(function (lignePanier) {
                    // si l'article a deja ete selectionné une fois
                    if (colorTeddySelect == lignePanier.color) {
                        NouveauArticle = false;
                        lignePanier.qte = nbrTeddySelect;
                        afficherPastille(panierFinal);
                        localStorage.setItem('article', JSON.stringify(panierFinal));
                    }
                })
                // si l'article n'a pas deja ete selectionné une fois
                if (NouveauArticle === true) {
                    panierFinal.push({
                        'article': oursDetail.name,
                        'price': oursDetail.price,
                        'color': colorTeddySelect,
                        'id': oursDetail._id,
                        'qte': nbrTeddySelect
                    });
                    localStorage.setItem('article', JSON.stringify(panierFinal));
                    afficherPastille(panierFinal);
                }
            }
        }
    })
})

