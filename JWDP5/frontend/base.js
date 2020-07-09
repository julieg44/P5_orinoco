// var request = new XMLHttpRequest();
// request.onreadystatechange = function() {
//     if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//         var response = JSON.parse(this.responseText);
//         console.log(response);
//     }
// };
// request.open("GET", "http://localhost:3000/api/teddies");
// request.send();

fetch('https://jsonplaceholder.typicode.com/users')
    .then(function(response){
        return(response.json())
    }).then(function(data){
        console.log(data)
    })

fetch('http://localhost:3000/api/teddies')
.then(function(response){
    return(response.json())
}).then(function(data){
    console.log(data)
})    