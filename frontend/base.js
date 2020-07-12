const ours = async function () {
    let response = await fetch('http://localhost:3000/api/teddies')
    let data = await response.json()
    return data
    }   

let tablo =[]
let image = document.getElementsByClassName('image-product');


ours().then(function (data){
    console.log(data)
    tablo = data
    console.log(tablo);
    console.log(tablo[0].imageUrl);
    
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

    let teddyOne = new teddy (tablo[0].colors, tablo[0].description, tablo[0].imageUrl, tablo[0].name, tablo[0].price, tablo[0]._id);
    let teddyTwo = new teddy (tablo[1].colors, tablo[1].description, tablo[1].imageUrl, tablo[1].name, tablo[1].price, tablo[1]._id);
    let teddyThree = new teddy (tablo[2].colors, tablo[2].description, tablo[2].imageUrl, tablo[2].name, tablo[2].price, tablo[2]._id);
    let teddyFour = new teddy (tablo[3].colors, tablo[3].description, tablo[3].imageUrl, tablo[3].name, tablo[3].price, tablo[3]._id);
    let teddyFive = new teddy (tablo[4].colors, tablo[4].description, tablo[4].imageUrl, tablo[4].name, tablo[4].price, tablo[4]._id);

    let teddys = [teddyOne,teddyTwo,teddyThree,teddyFour,teddyFive];
    const color = [teddyOne.color, teddyTwo.color, teddyThree.color, teddyFour.color, teddyFive.color];

    console.log(color);
    console.log(teddyOne);

    let name = document.querySelectorAll('article h2');
    let price = document.querySelectorAll('article .prix');
    let description = document.querySelectorAll('article .description');
    let image = document.querySelectorAll('.image-product img');
    console.log(image);


    for (let i = 0; i < teddys.length; i++){
        for (let i = 0; i < name.length; i++){
            name[i].innerHTML = teddys[i].name;
            image[i].src = teddys[i].image;
            description[i].innerHTML = teddys[i].description;
            price[i].innerHTML = teddys[i].price/100 + '€';
        }
    }

    let nameOursOne = document.querySelectorAll('article #first-bloc h2');
    let nameOursOneMobile = document.querySelectorAll('article #first-bloc__mobile h2');
    console.log(nameOursOneMobile);



//   Creation des couleurs dans le selecteur   ///////////
    let select = document.getElementById ('colors1');

    for (let i = 0; i < teddyOne.color.length; i++){
        let option = document.createElement ('option');
        option.value = teddyOne._id;
        option.innerHTML = teddyOne.color[i];
        select.appendChild(option);
}
//////////////////////////////////////////////////////////

//   Selection de la couleur    ///////////////////////////////
    let idTeddySelect = null;
    console.log(idTeddySelect);



    document.addEventListener('click', function(){
        document.querySelector('select[name="produit"]').onchange=changeEvenHandler;
    },false);


    function changeEvenHandler(event){
        teddyOne.color.forEach(function (color){ 
            if (event.target.value == teddyOne._id){
            idTeddySelect = teddyOne._id;
            console.log(idTeddySelect)
            }
        }); 
    }
//////////////////////////////////////////////////////////

// Ajout au panier ///////////////////////////////////////
let cart =[];
let ajoutPanierBtn = document.getElementById('ajouter');
console.log(teddyOne);
ajoutPanierBtn.addEventListener ('click', function(e){
    cart.push({'article' : teddyOne.name});
    console.log(cart);
    // teddys.forEach(function(ted){
    //     console.log(ted)
    //     if (idTeddySelect == ted._id){ 
    //         let NouveauArticle = true;
    //         // panierTablo.forEach(function(lignePanier){ 
    //         //     // si l'article a deja ete selectionné une fois
    //         //     // if (ted == lignePanier.article){
    //         //     //     ted.qt++;
    //         //     //     lignePanier.total = lignePanier.article.price * lignePanier.article.qt;
    //         //     //     NouveauArticle = false;
    //         //     //     augmenterArticleDansListe(panierTablo, ted);
    //         //     // }   
    //         // })
    //     // si l'article n'a pas deja ete selectionné une fois
    //         if(NouveauArticle===true){ 
    //             cart.push({'article' : ted });
    //             // panierTablo.total = ted.price * ted.qt;
    //             // ajouterArticleDansListe(panierTablo, ted);
    //             // section.appendChild(panierArticle);
    //             // section.appendChild(ligneTotal);
    //         }   
    //         console.log(cart);
    //     }
    // })
})


    
}).then(function (){
    console.log ('terminé')
})





