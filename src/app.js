'use strict';

const baseURL = ' https://lit-fortress-6467.herokuapp.com/object';
let covers = [];

document.addEventListener('DOMContentLoaded', function(){
  let tracks = document.querySelector('#tracks');
  let coverArt = document.querySelector('.albums');

  axios.get(baseURL)
    .then(function(response){
      for(let i = 0; i < response.data.results.length - 2; i++){
        covers.push(response.data.results[i].cover_art)
        coverArt.insertAdjacentHTML('beforeend', `<div id="albumCovers"><img src="images/${covers[i]}" alt=""></div>`)
      }
    });

  function getCoverArt(e){
    e.preventDefault();
    window.location.href = 'playlist.html';
  }

  tracks.addEventListener('click', getCoverArt);
});
