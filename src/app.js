'use strict';

const baseURL = ' https://lit-fortress-6467.herokuapp.com/object';
let covers = [];

document.addEventListener('DOMContentLoaded', function(){
  let tracks = document.querySelector('#tracks');
  let coverArt = document.querySelector('.albums');

  axios.get(baseURL)
    .then(function(response){
      for(let i = 0; i < response.data.results.length; i++){
        covers.push(response.data.results[i].cover_art)
      }

      let j = 0;
      let random; // variable used to contain controlled random number
      while (j < covers.length - 2){ // while all of array elements haven't been cycled through
        random = Math.floor(Math.random() * covers.length) // generate random number between 0 and array length-2
        if (covers[random] != "selected"){ // if cover art hasn't been marked as "selected"
          coverArt.insertAdjacentHTML('beforeend', `<div id="albumCovers"><img class="covers" src=images/${covers[random]} alt=""></div>`)// insert cover art to page
          covers[random] = "selected"; // mark cover art as selected
          j++
        }
      }
    });

  function getCoverArt(e){
    e.preventDefault();
    window.location.href = 'playlist.html';
  }

  tracks.addEventListener('click', getCoverArt);
});
