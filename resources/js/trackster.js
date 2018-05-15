let Trackster = {};
let pressEnter = {};
let sortSongName = {};
let frame = {};
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
let searchButton = document.getElementsByTagName('button')
let searchText = document.getElementsByTagName('input')

  let barToLoad = document.querySelector('.loading-bar');
  let barWidth = 0;

// variables for sorting
let songNamesArray = []
let directionIndex =
  {
    name: 1,
    artist: 1,
    listeners: 1
  };


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
        <div class="col-xs-2 listeners">${numeral(jsonData.results.trackmatches.track[i].listeners).format('0,0')}</div>
        </div>`
      }

  }



/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = () =>
  {
      console.log(`I clicked ${searchButton[0]}`);
      console.log(`Search value: ${searchText[0].value}`);
  if(searchText[0].value !== '')
  {
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
    }
  };

pressEnter = () =>
{
  console.log(event.keyCode);
  if(event.keyCode === 13)
  {
    barLoading();
  }
}


barLoading = () =>
{
  if(searchText[0].value !== '')
  {
    let barInt = setInterval(function(){ myTimer() }, 1);
    let barWidth = 0;
    function myTimer()
    {if(barWidth === 175)
          {
              clearInterval(barInt);
          } else {
                    barWidth++
                    barToLoad.style.width = `${barWidth}px`;
                      Trackster.searchTracksByTitle();
                  }
      }
    }
};

sortSongName = () =>
{
  directionIndex.name *= -1;
  jsonData.results.trackmatches.track.sort(function(a, b)
  {
      let nameA = a.name.toUpperCase(); // ignore upper and lowercase
      let nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB)
      {
        return -1*directionIndex.name;
      }
      if (nameA > nameB)
      {
        return 1*directionIndex.name;
      }

    // names must be equal
        return 0;
  });
  console.log(jsonData.results.trackmatches.track);
  Trackster.renderTracks();
}

sortSongArtist = () =>
{
  directionIndex.artist *= -1
  jsonData.results.trackmatches.track.sort(function(a, b)
  {
      let nameA = a.artist.toUpperCase(); // ignore upper and lowercase
      let nameB = b.artist.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB)
      {
        return -1*directionIndex.artist;
      }
      if (nameA > nameB)
      {
        return 1*directionIndex.artist;
      }

    // names must be equal
        return 0;
  });
  console.log(jsonData.results.trackmatches.track);
  Trackster.renderTracks();
}

sortSongListeners = () =>
{
  directionIndex.listeners *= -1
  jsonData.results.trackmatches.track.sort(function (a, b) {
  return (a.listeners - b.listeners)*directionIndex.listeners;
  });
  console.log(jsonData.results.trackmatches.track);
  Trackster.renderTracks();
}



// Trackster.click();
