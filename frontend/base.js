const ours = async function () {
    let response = await fetch('http://localhost:3000/api/teddies')
    let data = await response.json()
    return data
    }   
class teddy {
    constructor (color, description, image, name, price, _id){
        this.color = color;
        this.description = description;
        this.image = image;
        this.name = name;
        this.price = price;
        this._id = _id;
    }
}
let tablo =[];
let card = [];
let teddyArticle = [];
ours().then(function (data){
    console.log(data)
    tablo = data
    
    for (let i=0; i < data.length; i++){
        let teddyOne = new teddy (data[i].colors, data[i].description, data[i].imageUrl, data[i].name, data[i].price, data[i]._id);
        teddyArticle.push(teddyOne);
    }
    console.log(teddyArticle);

    // let teddyOne = new teddy (tablo[0].colors, tablo[0].description, tablo[0].imageUrl, tablo[0].name, tablo[0].price, tablo[0]._id);
    // let teddyTwo = new teddy (tablo[1].colors, tablo[1].description, tablo[1].imageUrl, tablo[1].name, tablo[1].price, tablo[1]._id);
    // let teddyThree = new teddy (tablo[2].colors, tablo[2].description, tablo[2].imageUrl, tablo[2].name, tablo[2].price, tablo[2]._id);
    // let teddyFour = new teddy (tablo[3].colors, tablo[3].description, tablo[3].imageUrl, tablo[3].name, tablo[3].price, tablo[3]._id);
    // let teddyFive = new teddy (tablo[4].colors, tablo[4].description, tablo[4].imageUrl, tablo[4].name, tablo[4].price, tablo[4]._id);

    // let teddys = [teddyOne,teddyTwo,teddyThree,teddyFour,teddyFive];
    // const colorOne = [teddyOne.color];
    // console.log(colorOne);

    let name = document.querySelectorAll('article h2');
    let price = document.querySelectorAll('article .prix');
    let description = document.querySelectorAll('article .description');
    let image = document.querySelectorAll('.image-product img');

    for (let i = 0; i < teddyArticle.length; i++){
        for (let i = 0; i < name.length; i++){
            name[i].innerHTML = teddyArticle[i].name;
            image[i].src = teddyArticle[i].image;
            description[i].innerHTML = teddyArticle[i].description;
            price[i].innerHTML = teddyArticle[i].price/100 + '€';
        }
    }

    // let nameOursOne = document.querySelectorAll('article #first-bloc h2');
    // let nameOursOneMobile = document.querySelectorAll('article #first-bloc__mobile h2');
    // console.log(nameOursOneMobile);



//   Creation des couleurs dans le selecteur   ///////////
    let selectColor = document.getElementById ('colors1');
    let selectNbr = document.getElementById ('nbr1');

    try{
        for (let i = 0; i < teddyOne.color.length; i++){
            let option = document.createElement ('option');
            option.value = teddyOne.color[i];
            option.innerHTML = teddyOne.color[i];
            selectColor.appendChild(option);
        }

        for (let i = 0; i < 10; i++){
            let option = document.createElement ('option');
            option.value = i;
            option.innerHTML = i;
            selectNbr.appendChild(option);
        }
    }catch(e){
        console.log('ca bloque');
    }

//////////////////////////////////////////////////////////

//   Selection de la couleur et nombre    ////////////////

    let colorTeddySelect = null;

    // document.addEventListener('change', function(){
        document.querySelector('select[name="produit"]').onchange=changeCouleur;
    // },false);

    // function changeEvenHandler(event){
    //     teddyOne.color.forEach(function (color){ 
    //         console.log(color);
    //         console.log(teddyOne.color);
    //         if (event.target.value == teddyOne.color){
    //                 for (let i = 0; i < color.length; i++){
    //                     colorTeddySelect = color;
    //                     console.log(color);
    //                     console.log(colorTeddySelect)
    //                 }
    //         }
    //     }); 
    // }

    function changeCouleur(event){
        colorTeddySelect = event.target.value;
        console.log(colorTeddySelect);
    }
//////////////////////////////////////////////////////////

// Ajout au panier ///////////////////////////////////////

    /// custum alert///
    function custumAlert (){
        this.render = function(dialog){
            let winW = window.innerWidth;
            let winH = window.innerHeight;
            let popup = document.getElementById ('popup');
            let popupContent = document.getElementById ('popup-content');
            popup.style.display = 'block';
            popup.style.height = winH + 'px';
            // popupContent.style.left = (winW/2) - (400 * .5) + 'px';
            // popupContent.style.top = "100px";
            popupContent.style.display = "block";
            // document.getElementById('popup-head').innerHTML = ' <button onclick = "alert.ok()" > X </button> ';
            document.getElementById('popup-head').innerHTML = ' <button id="close"> X </button> ';
            document.getElementById('popup-text').innerHTML = dialog;
            // document.getElementById('popup-foot').innerHTML = ' <button onclick = "alert.ok()" > OK </button> ';
            // let footerAlert = document.getElementById('popup-head');
            // let buttonAlert = document.get('input');
            let buttonAlert = document.getElementById('close');
            console.log(buttonAlert);
            buttonAlert.addEventListener ('click', function(){
                document.getElementById('popup').style.display = 'none';
                document.getElementById('popup-content').style.display = 'none';
            })
            // buttonAlert.type = 'button',
            // buttonAlert.innerHTML = 'OK'
            // buttonAlert.onclick = alert.ok();
            // footerAlert.appendChild(buttonAlert);
        }
        this.ok = function(){
            document.getElementById('popup').style.display = 'none';
            document.getElementById('popup-content').style.display = 'none';
        }
    }
    var alert = new custumAlert();
    console.log(alert.ok);
    ///////////////////////////////

    let ajoutPanierBtn = document.getElementById('ajouter');
    let pastillePanier = document.getElementById('card-nbr');
    pastillePanier.style.display = 'none';
    try{
        ajoutPanierBtn.addEventListener ('click', function(e){
            if (colorTeddySelect == null){
                // window.alert('choisir un colori !');
                alert.render('choisir un colori !');
            }
    
    
            for (let i = 0; i < teddyOne.color.length; i++){
                if (teddyOne.color[i] == colorTeddySelect){
                    let NouveauArticle = true;
                        card.forEach(function(lignePanier){
                            console.log(lignePanier.color);
                            // si l'article a deja ete selectionné une fois
                            if (colorTeddySelect == lignePanier.color){
                                NouveauArticle = false;
                                lignePanier.qte ++;
                                pastillePanier.style.display = 'block';
                                pastillePanier.innerHTML = lignePanier.qte;
                            } 
                        })    
                    // si l'article n'a pas deja ete selectionné une fois
                    if(NouveauArticle===true){ 
                        card.push({'article' : teddyOne.name, 'id': teddyOne._id, 'color': colorTeddySelect, 'qte':1, 'price': teddyOne.price});
                        pastillePanier.style.display = 'block';
                        pastillePanier.innerHTML = card.qte;
                    }   
                }
            }
            console.log(card);
            localStorage.setItem('article',JSON.stringify(card));     
    
        })
    } catch(e){
        console.log('ca bloque encore');
    }


    let panierFinal = JSON.parse(localStorage.getItem('article'))
    console.log(panierFinal);

    ///// création des lignes de panier


    // let fondPanier = document.getElementById('card-back');
    // let ligneArticlePanier = document.createElement('div');        
    // let panierNbr = document.createElement('div');
    // panierNbr.classList.add ('nbr');
    // let panierName = document.createElement('div');
    // panierName.classList.add ('name');
    // let couleurName = document.createElement('span');
    // couleurName.classList.add('plus-petit');
    // let panierPrice = document.createElement('div');
    // panierPrice.classList.add ('price');



    // panierFinal.forEach(function(articleFinal){
    //     console.log(articleFinal.color);
    //     console.log(panierFinal);
    //     fondPanier.appendChild(ligneArticlePanier);
    //     ligneArticlePanier.appendChild(panierNbr);
    //     ligneArticlePanier.appendChild(panierName);
    //     ligneArticlePanier.appendChild(panierPrice);
    //     for (let i = 0; i < panierFinal.length; i++){
    //         ligneArticlePanier.classList.add ('article-panier', 'product-color' + panierFinal[i].color);
    //         couleurName.innerHTML = '&nbsp &nbsp &nbsp' + panierFinal[i].color;
    //         panierPrice.innerHTML = panierFinal[i].qte * panierFinal[i].price / 100 + '€';
    //         panierNbr.innerHTML = panierFinal[i].qte;
    //         panierName.innerHTML = panierFinal[i].article;  
    //         panierName.appendChild(couleurName);
    //     }
    // })
    // panierFinal.forEach(function(){
    //     fondPanier.appendChild(ligneArticlePanier);
    //     ligneArticlePanier.appendChild(panierNbr);
    //     ligneArticlePanier.appendChild(panierName);
    //     ligneArticlePanier.appendChild(panierPrice);
    //     for (article of panierFinal){
    //         console.log(article.color);

    //         for (let i = 0; i < panierFinal.length; i++){
    //             ligneArticlePanier.classList.add ('article-panier', 'product-color' + panierFinal[i].color);
    //             couleurName.innerHTML = '&nbsp &nbsp &nbsp' + article.color;
    //             panierPrice.innerHTML = article.qte * article.price / 100 + '€';
    //             panierNbr.innerHTML = article.qte;
    //             panierName.innerHTML = article.article;  
    //             panierName.appendChild(couleurName);
    //         }
    //     }
    // })
    function affichage(){
        for (let i = 0; i < teddyOne.color.length; i++){
            if (teddyOne.color[i] == colorTeddySelect){
                console.log(teddyOne.color[i])
                let NouveauArticle = true;
                    panierFinal.forEach(function(lignePanier){
                        console.log(lignePanier.color);
                        // si l'article a deja ete selectionné une fois
                        if (colorTeddySelect == lignePanier.color){
                            NouveauArticle = false;
                            // afficherPanier(panierFinal, lignePanier);
                        } 
                    })    
                // si l'article n'a pas deja ete selectionné une fois
                if(NouveauArticle===true){ 
                    afficherPanier(panierFinal);
                }   
            }
            afficherPanier();
            console.log('putain');
        }   
    }


    function afficherPanier(panierFinal, articleChoisi){
        console.log(panierFinal);
        console.log(articleChoisi);
        let fondPanier = document.getElementById('card-back');
        let ligneArticlePanier = document.createElement('div'); 
        let panierNbr = document.createElement('div');
        panierNbr.classList.add ('nbr');
        let panierName = document.createElement('div');
        panierName.classList.add ('name');
        let couleurName = document.createElement('span');
        couleurName.classList.add('plus-petit');
        let panierPrice = document.createElement('div');
        panierPrice.classList.add ('price');

        let julie = JSON.parse(localStorage.getItem('article'))
        console.log(julie);

        julie.forEach(function(produit){
            for (let i = 0; i < julie.length; i++){
                if (julie[i].color == produit.color){
                    ligneArticlePanier.classList.add ('article-panier', 'product-color' + produit.color); 
                    fondPanier.appendChild(ligneArticlePanier);
                    ligneArticlePanier.appendChild(panierNbr);
                    ligneArticlePanier.appendChild(panierName);
                    ligneArticlePanier.appendChild(panierPrice);
                    couleurName.innerHTML = '&nbsp &nbsp &nbsp' + julie[i].color;
                    panierPrice.innerHTML = julie[i].qte * julie[i].price / 100 + '€';
                    panierNbr.innerHTML = julie[i].qte;
                    panierName.innerHTML = julie[i].article;  
                    panierName.appendChild(couleurName);
                    console.log('merde');
                }
            }    
        })
    }
    affichage(panierFinal);




            





    ////////////////////////////////////////////////////////
    
}).then(function (){
    console.log ('terminé')
})





