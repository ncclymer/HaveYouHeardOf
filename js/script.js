// TICKETMASTER EVENTS //
var searchInput = document.getElementById("search")
var searchButton = document.getElementById("fetch-button")
var youTubeApiKey = "AIzaSyA_aUBZ0ohp4ghjhhCm5VzI4Y2lVpAdAq0"

var musixMatchAPIKey = "bd6f120abfaa3580f25b07958b74ed5c"

var pastSearches = []
var pastEvents = []

var videoLink1 = document.getElementById('vid1')
var videoLink2 = document.getElementById('vid2')
var videoLink3 = document.getElementById('vid3')
var videoLink4 = document.getElementById('vid4')
var videoLink5 = document.getElementById('vid5')

//// Artist Top tracks Code
function getArtist(search){
const settings = {
	"async": true,
	"crossDomain": true,
	"url": `https://shazam.p.rapidapi.com/search?term=${search}&locale=en-US&offset=0&limit=5`,
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "29def31d69msh1d699050c78c186p1bcc27jsn0c44e1e0914e",
		"x-rapidapi-host": "shazam.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log("hello",response);
  saveDataFields(response) 

  var artistcardBody = $("<div>").addClass("eventBody")
  var artistcardText = $("<h4>").text(response.artists.hits[0].artist.name).addClass("Artist-Title")
  var topTracks = $("<h5>").text("Top 5 Tracks").addClass("event-Date")
  var artistcardTrack = $("<p>").text("1: "+response.tracks.hits[0].track.title).addClass("Artist-track")
  var artistcardMusic = $("<a></a>").attr("href",response.tracks.hits[0].track.hub.actions[1].uri ).text("hear it now",).addClass("hearItNow")

  var artistcard2Track = $("<p>").text("2: "+response.tracks.hits[1].track.title).addClass("Artist-track")
  var artistcard2Music = $("<a></a>").attr("href",response.tracks.hits[1].track.hub.actions[1].uri ).text("hear it now",).addClass("hearItNow")

  var artistcard3Track = $("<p>").text("3: "+response.tracks.hits[2].track.title).addClass("Artist-track")
  var artistcard3Music = $("<a></a>").attr("href",response.tracks.hits[2].track.hub.actions[1].uri ).text("hear it now",).addClass("hearItNow")

  var artistcard4Track = $("<p>").text("4: "+response.tracks.hits[3].track.title).addClass("Artist-track")
  var artistcard4Music = $("<a></a>").attr("href",response.tracks.hits[3].track.hub.actions[1].uri ).text("hear it now",).addClass("hearItNow")

  var artistcard5Track = $("<p>").text("5: "+response.tracks.hits[4].track.title).addClass("Artist-track")
  var artistcard5Music = $("<a></a>").attr("href",response.tracks.hits[4].track.hub.actions[1].uri ).text("hear it now",).addClass("hearItNow")
  
  
  artistcardText.append(topTracks, artistcardTrack,artistcardMusic, artistcard2Track,artistcard2Music, artistcard3Track,artistcard3Music, artistcard4Track,artistcard4Music ,artistcard5Track,artistcard5Music)
  artistcardBody.append(artistcardText)

  
  $(".artist").append(artistcardBody)

  $('.hearItNow').prepend('<img id="play" class="playBtn" src="./assets/play-button_25b6-fe0f.png" />')

});
}





function getEvents(search) {
  var query = "https://app.ticketmaster.com/discovery/v2/events.json?size=5&keyword=" + search + "&countryCode=US&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0"


  $.ajax({
    type: "GET",
    url: query,
    async: true,
    dataType: "json",
    success: function ({ _embedded }) {
      // getEvents.json = json;
      console.log("events here" , _embedded);
      //append here//
    
      var { events } = _embedded
      saveEventsFields(events)
     // console.log("these are the events", events[0])
      for (i = 0; i < events.length; i++) {
        events[i];
       // console.log(events[i].name)

        var cardBody = $("<div>").addClass("eventBody")
        var cardText = $("<h5>").text(events[i].name).addClass("event-Name")
        var eventDate = $("<p>").text(moment(events[i].dates.start.localDate).format("MMM D, YYYY")).addClass("event-Date")
        var eventPlace = $("<p>").text(events[i]._embedded.venues[0].city.name).addClass("event-Place")
        // var eventLink = events[i].url
        var eventBtn = $("<a></a>").attr("href", events[i].url).text("Get Tickets",).addClass("eventTicket")
        //.click(function () {  $(`[href="${eventLink}"]`).click()  } ).text("Get Tickets",).addClass("event-Date")

        cardText.append(eventDate, eventPlace, eventBtn)
        cardBody.append(cardText)

        $(".events").append(cardBody)
      }
    },

    error: function (xhr, status, err) {
      console.log(err);

    }
  })
  // .then(function (events) {
}

// YouTube API call and video targets
function loadClient() {
  gapi.client.setApiKey(youTubeApiKey);
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(function () { console.log("GAPI client loaded for API"); },
      function (err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.youtube.search.list({
    "part": [
      "snippet"
    ],
    "q": searchInput.value
  })
    .then(function (response) {
      // Handle the results here (response.result has the parsed body).

      console.log("Response", response);
      videoLink1.setAttribute('src', `https://www.youtube.com/embed/${response.result.items[0].id.videoId}`);
      videoLink2.setAttribute('src', `https://www.youtube.com/embed/${response.result.items[1].id.videoId}`);
      videoLink3.setAttribute('src', `https://www.youtube.com/embed/${response.result.items[2].id.videoId}`);
      videoLink4.setAttribute('src', `https://www.youtube.com/embed/${response.result.items[3].id.videoId}`);
      videoLink5.setAttribute('src', `https://www.youtube.com/embed/${response.result.items[4].id.videoId}`);
    },
      function (err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function () {
  gapi.client.init({
    'apiKey': youTubeApiKey,
  })
    .then(loadClient);
});

function getLyrics(searchInput) {

  $.ajax({
    type: "GET",
    url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_artist="+searchInput+"&apikey="+musixMatchAPIKey,
    headers: {"Access-Control-Allow-Origin":"*"},
    dataType: 'jsonp',
    success: function (lyricData) {
      console.log("lyrics",lyricData);
    },
  });
};

function clearData(){
  $( ".artist" ).empty();
  $( ".events" ).empty();

}

function saveDataFields(response){
  console.log ("here", response)
  var saveArtist = response.artists.hits[0].artist.name
  var saveTracks = []
  for (i = 0; i < response.tracks.hits.length; i++) {
    var hitTitles = response.tracks.hits[i].track.title
    saveTracks.push(hitTitles)
    
  }

  var dataToStore = { "artist":saveArtist, 
  "Top Tracks": saveTracks,
}

pastSearches.push(dataToStore)

localStorage.setItem("Past Searches",JSON.stringify(pastSearches) );
}


function saveEventsFields(events){
  
  console.log("savehere", events)
  var saveEvents = []
  for (i = 0; i < events.length; i++) {
    var eventTitle= ( events[i].name ) ;
    saveEvents.push(eventTitle)
  }
  var savedDates = []
  for (i = 0; i < events.length; i++) {
    var eventDate = (events[i].dates.start.localDate ) 
    savedDates.push(eventDate)
  }
  var eventData = {"Events": saveEvents,
  "Event Dates":savedDates
  }

  pastEvents.push(eventData)
  
  localStorage.setItem("Past Search Events", JSON.stringify(pastEvents))

}




searchButton.addEventListener("click", function (event) {
  event.preventDefault()
  var newSearch = searchInput.value
  console.log(newSearch)
  getEvents(newSearch)

  getLyrics(newSearch)

  getArtist(newSearch)

  clearData();

  execute();



})







