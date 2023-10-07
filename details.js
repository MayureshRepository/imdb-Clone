console.log("Details Page");

var movieIds = localStorage.getItem("id");

console.log(movieIds , " movieId")

fetch(`https://www.omdbapi.com/?apikey=f135a77d&i=${localStorage.getItem("id")}`)
.then((response)=>response.json())
.then((data)=>{
    console.log(data ," datafromdetails");
    document.getElementById('title').innerHTML =` ${data.Title}` ;

    //For movie Poster
    document.getElementById('moviePosterforDetails').setAttribute("src",`${data.Poster}`);

    //Released
    document.getElementById('released').innerHTML=`${data.Released}`;
    //Actors

    document.getElementById('actors').innerHTML=`${data.Actors}`
    //Plot of movie

    document.getElementById('plot').innerHTML=`${data.Plot}` ;

    //rating

    if(data.Ratings && data.Ratings.length>0){

     
  let ratingEle = document.getElementById('ratings');
        data.Ratings.forEach(element => {
            let createEle = document.createElement('div');
            console.log(element,"Element");
            createEle.innerHTML=`<strong>${element.Source} : ${element.Value}</strong>`

            ratingEle.appendChild(createEle);
        });
    }
   
})