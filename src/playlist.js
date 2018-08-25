'use strict';

const baseURL = ' https://lit-fortress-6467.herokuapp.com/object';
let covers = [];

document.addEventListener('DOMContentLoaded', function(){
  let playlistTracks = document.querySelector('#playlistTracks');
  let playlistImg = document.querySelector('.pl')
  let playlistBin = document.querySelector('#playlistBin')
  let clear = document.querySelector('#clear');
  let submit = document.querySelector('#submit');

  axios.get(baseURL)
    .then(function(response){
      for(let i = 0; i < response.data.results.length; i++){
        playlistTracks.insertAdjacentHTML('beforeend', `<div class="playlist-img"><img id=${response.data.results[i].id} src=images/${response.data.results[i].cover_art} alt="music"></div`);
      }

      function getPlaylist(e) {
        for(let j = 0; j < response.data.results.length; j++){
          if(parseInt(e.target.id) === response.data.results[j].id){
            playlistBin.insertAdjacentHTML('beforeend', `<div class="playlist-title">${response.data.results[j].artist}: ${response.data.results[j].title}</div>`);
          }
        }
      }
      playlistTracks.addEventListener('click', getPlaylist);
    });

  function onClear(e) {
    e.preventDefault();
    playlistBin.innerHTML = '';
  }

  clear.addEventListener('click', onClear);


});
