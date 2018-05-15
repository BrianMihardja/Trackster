let Trackster = {};
const API_key = '231efc6df67505c4ed19a8d69c779496';
let urlAPI = ''
let xhr = new XMLHttpRequest();
let jsonData = [];
let searchContainer = [];
      searchContainer = document.querySelector('.search-results');

  let newRecord =  '<div class="row row-results container-fluid">'
      + '<div class="col-xs-1 play-icon fa fa-play-circle-o fa-2x"></div>'
      + '<div class="col-xs-4 song">1</div>'
      + '<div class="col-xs-2 artist">2</div>'
      + '<div class="col-xs-2 album">3</div>'
      + '<div class="col-xs-2 popularity">4</div>'
      + '<div class="col-xs-1 length">5</div>'
      + '</div>';

let attrSong = document.querySelector('.song');
let renderSong = '';
let attrArtist = document.querySelector('.artist');
let renderArtist = '';
let attrAlbum = document.querySelector('.album');
let renderAlbum = '';
let attrPopu = document.querySelector('.popularity');
let renderPopu = '';
let attrLength = document.querySelector('.length');
let renderLength = '';

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/

Trackster.renderTracks = () =>
  {
    $(".search-results").empty();
    console.log('renderTracks running!');
    for (i = 0; i < jsonData.results.trackmatches.track.length; i++)
      {
        searchContainer.innerHTML +=
        `<div class="row row-results container-fluid">
        <div class="col-xs-offset-1 col-xs-1 play-icon fa fa-play-circle-o fa-2x"></div>
        <div class="col-xs-4 song">${jsonData.results.trackmatches.track[i].name}</div>
        <div class="col-xs-2 artist">${jsonData.results.trackmatches.track[i].artist}</div>
        <div class="col-xs-2 artwork"><img src="${jsonData.results.trackmatches.track[i].image[1]["#text"]}"></div>
        <div class="col-xs-2 listeners">${jsonData.results.trackmatches.track[i].listeners}</div>
        </div>`
      }

  }



/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = () =>
  {
    searchButton = document.getElementsByTagName('button')
    searchText = document.getElementsByTagName('input')
      console.log(`I clicked ${searchButton[0]}`);
      console.log(`Search value: ${searchText[0].value}`);

    searchText.value = searchText.replace = (" ","_")
    let urlAPI = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchText[0].value}&api_key=231efc6df67505c4ed19a8d69c779496&format=json`

    xhr.onreadystatechange = function()
    {
      if(xhr.readyState === 4)
      {
        console.log(xhr.responseText);
        jsonData = JSON.parse(xhr.responseText);
        Trackster.renderTracks();
      }
    };
    xhr.open('GET', urlAPI);
    xhr.send();
  };


Trackster.click = function()
  {

  }

// Trackster.click();
