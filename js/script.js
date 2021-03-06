// Caroussel
/*p = 0;
container = document.getElementById("container");
container.style.width = 15 * 600 + "px";


for (let i = 1; i < 16; i++) {
      div = document.createElement("div");
      div.className = "images";
      div.style.backgroundImage = "url('img/image" + i + ".jfif')";
      container.appendChild(div);
}

setInterval(defiler, 1500);

function defiler() {
      p--;
      if (p > -15) {
            container.style.transform = "translate(" + p * 600 + "px)";
      } else {
            p = 0;
            container.style.transform = "translate(" + p * 600 + "px)";
      }
} */

p = 0;
container = document.getElementById("container");
container.style.width = 55 * 600 + "px";
gauche = document.getElementById("gauche");
droite = document.getElementById("droite");

for (let i = 1; i < 56; i++) {
      div = document.createElement("div");
      div.className = "images";
      div.style.backgroundImage = "url('img/image" + i + ".jfif')";
      container.appendChild(div);
}

affichageBouton();

gauche.onclick = function () {
      if (p > -52) {
            p--;
            container.style.transform = "translate(" + p * 510 + "px)";
            container.style.transition = "all 1s ease";
      }
      affichageBouton();
}

droite.onclick = function () {
      if (p < 0) {
            p++;
            container.style.transform = "translate(" + p * 510 + "px)";
            container.style.transition = "all 1s ease";
      }
      affichageBouton();
}

function affichageBouton() {
      if (p == -54) {
            gauche.style.visibility = "hidden";
      } else {
            gauche.style.visibility = "visible";
      }
      if (p == 0) {
            droite.style.visibility = "hidden";
      } else {
            droite.style.visibility = "visible";
      }
}


// define var of div
let body = document.getElementsByTagName("body")
let r = document.getElementById("disney");
let s = document.getElementById("ghibli");
let t = document.getElementById("minions");
let x = document.getElementById("divDisney");
let y = document.getElementById("divGhibli");
let z = document.getElementById("divMinions");


// API Disney
// Hide & show Disney
function displayDisney() {
      //window.getComputedStyle(body).backgroundColor = "linear-gradient(to right, #70e1f5, #8E9EAB, #ffd194) !important";
      //document.body.style.backgroundColor = 'green !important';
      r.style.boxShadow = "rgba(116, 6, 70, 0.3) 0px 19px 38px, rgba(196, 36, 103, 0.22) 0px 15px 12px";
      s.style.boxShadow = "none";
      t.style.boxShadow = "none";
      if (x.style.display === "block") {
            x.style.display = "none";
      } else {
            y.style.display = "none";
            z.style.display = "none";
            x.style.display = "block";
      }

}

// API GHIBLI
// Hide & show Ghibli
function displayGhibli() {
      s.style.boxShadow = "rgba(230, 50, 60, 0.3) 0px 19px 38px, rgba(246, 203, 58, 0.42) 0px 15px 12px";;
      r.style.boxShadow = "none";
      t.style.boxShadow = "none";
      if (y.style.display === "block") {
            y.style.display = "none";
      } else {
            x.style.display = "none";
            z.style.display = "none";
            y.style.display = "block";
      }
}

// Call and display API
const locallet = {}
const detailsContainer = document.getElementById("movieDetails");

window.onload = () => {
      fetchInfoWithFilter().then((ghibliApiObject) => {
            console.log(ghibliApiObject);
            locallet["cloudObj"] = ghibliApiObject;
            readStudioGhibliObject(ghibliApiObject);
      });
}

async function fetchInfoWithFilter() {
      let myRequest = new Request("https://ghibliapi.herokuapp.com/films?limit=250");
      const returnVal = await fetch(myRequest, {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
            credentials: 'omit',
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
      })
            .then(function (response) {
                  if (!response.ok) {
                        throw new Error("HTTP error, status = " + response.status);
                  }
                  return response.text();
            })
            .then(function (myBlob) {
                  let cloudObject = JSON.parse(myBlob);
                  return cloudObject;
            })
            .catch(function (error) {
                  let p = document.createElement('p');
                  p.appendChild(
                        document.createTextNode('Error: ' + error.message)
                  );
                  document.querySelectorAll(".descriptioncontainer")[0].innerHTML = "";
                  document.querySelectorAll(".descriptioncontainer")[0].appendChild(p);
            });
      return returnVal;
};

function readStudioGhibliObject(ghibliApiObject) {
      const ghibliFilms = Object.entries(ghibliApiObject)
      const objectSize = ghibliFilms.length;
      const itemsContainer = document.getElementById("movietit");
      itemsContainer.innerHTML = "";

      console.log(ghibliFilms);
      //console.log(objectSize);

      for (i = 0; i < objectSize; i++) {
            let optionEle = document.createElement("option");
            optionEle.value = ghibliFilms[i][1].title;
            optionEle.innerText = ghibliFilms[i][1].title;
            itemsContainer.appendChild(optionEle);
      }
      upDateDescription("first");

      itemsContainer.addEventListener("input", () => {
            upDateDescription("update");
      })
};


function upDateDescription(statusNow) {
      let myKey = document.createElement("p");
      myKey.className = "items";
      detailsContainer.innerHTML = "";

      if (statusNow === "first") {
            let objectEntries = Object.entries(locallet.cloudObj[0]);
            let objectKeys = Object.keys(locallet.cloudObj[0]);
            document.querySelectorAll("h1")[0].innerHTML = locallet.cloudObj[0].original_title;
            document.querySelectorAll("span")[0].innerHTML = '<img class="banner" src=' + locallet.cloudObj[0].image + '>';

            for (i = 0; i < objectEntries.length; i++) {
                  if ((i > 0 && i < 4) || (i > 5 && i < 12)) {
                        let copyKey = myKey.cloneNode(true);
                        copyKey.innerHTML = objectKeys[i].toUpperCase() + " : " + objectEntries[i][1];
                        detailsContainer.appendChild(copyKey);
                  }
            }
      } else {
            let thisFilmObject = searchForFilm(document.getElementById("movietit").value);

            //console.log(thisFilmObject);

            let objectEntries = Object.entries(thisFilmObject);
            let objectKeys = Object.keys(thisFilmObject);
            document.querySelectorAll("h1")[0].innerHTML = thisFilmObject.original_title;
            document.querySelectorAll("span")[0].innerHTML = '<img class="banner" src=' + thisFilmObject.image + '>';

            for (i = 0; i < objectEntries.length; i++) {
                  if ((i > 0 && i < 4) || (i > 5 && i < 12)) {
                        let copyKey = myKey.cloneNode(true);
                        copyKey.innerHTML = objectKeys[i].toUpperCase() + " : " + objectEntries[i][1];
                        detailsContainer.appendChild(copyKey);
                  }
            }
      }
}

function searchForFilm(searchQuery) {
      let obj = { "Not": "Found" };
      for (i = 0; i < locallet.cloudObj.length; i++) {
            if (searchQuery === locallet.cloudObj[i].title) {
                  obj = locallet.cloudObj[i];
            }
      }
      return obj;
};


// API Minion Translation
// Hide & show Minions
function displayMinions() {
      t.style.boxShadow = "rgba(240, 157, 175, 0.3) 0px 19px 38px, rgba(251, 255, 3, 0.404) 0px 15px 12px";
      r.style.boxShadow = "none";
      s.style.boxShadow = "none";
      if (z.style.display === "block") {
            z.style.display = "none";
      } else {
            x.style.display = "none";
            y.style.display = "none";
            z.style.display = "block";
      }
      document.body.style.background = "linear-gradient(to right, #70e1f5, #8E9EAB, #ffd194);"
}

//Reads the input or refers to the specific html tags
let btnTranslate = document.querySelector("#btnTranslate");
let textData = document.querySelector("#txtInput");
let outputData = document.querySelector("#txtOutput");

//URL to fetch the API
let serverURL = "https://api.funtranslations.com/translate/minion.json";

//Add the parameters to the URL
function getTranslatedURL(value) {
      return serverURL + "?text=" + value;
}

//Error handling function
function errorHandler(error) {
      console.log("error occured", error);
      alert("Server unavailable, try again later.");
}

//Processing - what happens when the button is clicked
function translateClicked() {
      console.log("clicked");
      let textValue = textData.value;
      outputData.innerText = "Translation in progress..."
      fetch(getTranslatedURL(textValue))
            .then(response => response.json())
            .then(json => outputData.innerText = json.contents.translated)
            .catch(errorHandler);
}


/* const ghibliAPI = document.getElementById("ghibli");
ghibliAPI.addEventListener('click', function () {
      fetch('https://whicheverapi.com/path/id')
            .then(function (result) {
                  console.log(result);
            })
            .catch(function (err) {
                  console.error(err);
            });
});



/*
const container = document.createElement('div');
container.setAttribute('class', 'container');


app.appendChild(container);

let request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {

      // Begin accessing JSON data here
      let data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
            data.forEach(movie => {
                  const card = document.createElement('div');
                  card.setAttribute('class', 'card');

                  const h1 = document.createElement('h1');
                  h1.textContent = movie.title;

                  const p = document.createElement('p');
                  movie.description = movie.description.substring(0, 300);
                  p.textContent = `${movie.description}...`;

                  container.appendChild(card);
                  card.appendChild(h1);
                  card.appendChild(p);
            });
      } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Gah, it's not working!`;
            app.appendChild(errorMessage);
      }
}

request.send();
*/