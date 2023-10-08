var arr = JSON.parse(localStorage.getItem("favorites"));


console.log(arr);


let html = "";

function showDetails(idnumber) {
    localStorage.setItem("id", idnumber);
    window.location = "details.html";
}

function fetchData(){

    const promises = [];

    for (let i = 0; i < arr.length; i++) {
   
   //  console.log(arr[i] , " arr[i]");
    promises.push(  fetch(`https://www.omdbapi.com/?apikey=f135a77d&i=${encodeURIComponent(arr[i])}`)
    .then((response)=>response.json())
    .then((data)=>{
       html+=`
    


    <div class="mainContainer">

    <div class="Card1" >
    <div><img src="${data.Poster}" onclick="showDetails('${arr[i]}')"></div>
    <h4 class="colorWhite">${data.Title}</h4>
   
       </div>
       <button class="remove-from-favorites" data-movie="${data.movieId}" 
       onclick="removeMovie('${arr[i]}')">Remove</button>
    </div>

       `
    })
    );
  
   }
}
function removeMovie(id) {
   
   var index=arr.indexOf(id);
    console.log(index);
    arr.splice(index,1);
    console.log(arr);
    localStorage.setItem("favorites",JSON.stringify(arr));
    alert("your movie is removed successfully");
    location.reload();
   
}



// function fetchData() {
//     // Map each item in arr to a promise returned by fetch
//     const promises = arr.map((item) => {
//       return fetch(`https://www.omdbapi.com/?apikey=f135a77d&i=${encodeURIComponent(item)}`)
//         .then((response) => response.json())
//         .then((data) => {
//           // Do something with the data, maybe update your HTML
//           console.log(data, "Data for", item);
//           html += `<p>${data.Title}</p>`; // Example: Update HTML with movie title
//         })
//         .catch((error) => {
//           console.error(`Error fetching data for ${item}:`, error);
//         });
//     });
// }  

//set timeout function for show all heros in fv-main id
setTimeout(() => {
    document.getElementById("fv-main").innerHTML=html;
}, 1000);
// const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
