const searchBox = document.getElementById('search-box');
const response = document.getElementById('response');
const btnxhr = document.getElementById('btnxhr');
const btnfetch = document.getElementById('btnfetch');
let searchedResp;

btnxhr.addEventListener('click', function (e) {
    e.preventDefault();
    response.innerHTML = '';
    searchedResp = document.getElementById('search').value;
    getNews();
});

btnfetch.addEventListener('click', function (e) {
    e.preventDefault();
    response.innerHTML = '';
    searchedResp = document.getElementById('search').value;
    let uri = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedResp}&api-key=ea7e90973d664f12acc9f89ba1145f42`;

    fetch(uri)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
            let artic = data.response.docs;
            
            for (i = 0; i < artic.length; i++) {
                const title = artic[i].headline.main;
        
                let li = document.createElement('li');
                li.innerText = artic[i].snippet;
                li.className = 'tab col s12';
        
                response.appendChild(li);
          }
      })
      .catch(function(error) {
        handleError();
      });
  });

function getNews() {
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedResp}&api-key=ea7e90973d664f12acc9f89ba1145f42`);
    articleRequest.onreadystatechange = function () {
        if (articleRequest.readyState == 4 && articleRequest.status == 200) {
            articleRequest.onload = addNews;
        } else {
            articleRequest.onerror = handleError;
        }
    }
    articleRequest.send();
}

function handleError() {
    console.log('Se ha presentado un error');
}

function addNews() {
    const data = JSON.parse(this.responseText);
    let artic = data.response.docs;
    for (i = 0; i < artic.length; i++) {
        const title = artic[i].headline.main;

        let li = document.createElement('li');
        li.innerText = artic[i].snippet;
        li.className = 'tab col s12';

        response.appendChild(li);
    }
}