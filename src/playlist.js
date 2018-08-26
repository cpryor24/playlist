'use strict';

const baseURL = ' https://lit-fortress-6467.herokuapp.com/object';
const postURL = 'https://lit-fortress-6467.herokuapp.com/post';

document.addEventListener('DOMContentLoaded', function(){
  let playlistTracks = document.querySelector('#playlistTracks');
  let playlistImg = document.querySelector('.pl')
  let playlistBin = document.querySelector('#playlistBin')
  let clear = document.querySelector('#clear');
  let submit = document.querySelector('#submit');
  let success = document.querySelector('.success');

  axios.get(baseURL)
    .then(function(response){
      for(let i = 0; i < response.data.results.length; i++){
        playlistTracks.insertAdjacentHTML('beforeend', `<div class="playlist-img" id=${response.data.results[i].id}><img src=images/${response.data.results[i].cover_art} alt='${response.data.results[i].artist} ${response.data.results[i].title}'></div`);
      }

      function getPlaylist(e) {
        for(let j = 0; j < response.data.results.length; j++){
          if(parseInt(e.target.parentElement.id) === response.data.results[j].id){
            playlistBin.insertAdjacentHTML('beforeend', `<div class="playlist-title">${response.data.results[j].artist}: ${response.data.results[j].title}</div> `);
          }
        }
      }
      playlistTracks.addEventListener('click', getPlaylist);
    });

  function onClear(e) {
    e.preventDefault();
    playlistBin.innerHTML = '';
  }

  function onSubmit(e) {
    e.preventDefault();
    axios.post(postURL, {
      playList: playlistBin.textContent
    })
    .then(function(result){
      if(playlistBin.textContent !== ''){
        success.textContent = result.data;
        success.classList.add('visible');
        success.classList.add('hidden');
        onClear(e);
        setTimeout(function(){
          success.classList.remove('hidden');
          success.classList.remove('visible');
          success.textContent = '';
        }, 2000);
      }
    })
  }

  clear.addEventListener('click', onClear);
  submit.addEventListener('click', onSubmit);
});
