let parameters = JSON.parse(getQueryParameters().parameters);

let months = [null, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let search_value = document.querySelectorAll('.search-bar>b');

search_value[0].innerText = parameters.loc;

search_value[1].innerText = `${months[Number(parameters.checkin.split('-')[1])]} ${Number(parameters.checkin.split('-')[2])} - ${months[Number(parameters.checkout.split('-')[1])]} ${Number(parameters.checkout.split('-')[2])}`;

search_value[2].innerText = `${Number(parameters.adults) + Number(parameters.children)} guests`;

function getQueryParameters() {
    var queryString = window.location.search.substring(1); // Remove the leading '?'
    var params = {};
    var paramArray = queryString.split('&');
  
    for (var i = 0; i < paramArray.length; i++) {
        var keyValue = paramArray[i].split('=');
        var key = decodeURIComponent(keyValue[0].split('+').join(' '));
        var value = decodeURIComponent(keyValue[1].split('+').join(' '));
        params[key] = value;
    }
    return params;
}




function randerHotels(data){
    let container = document.querySelector('.hotel-list');

    let div1 = document.createElement('div');
    div1.className = 'card-division';
    container.innerHTML = '';
    container.append(div1);

    data.forEach((e) => {
        let card = document.createElement('a');
        card.href = `hotel-details.html?data=${JSON.stringify(e)}`;
        card.className = 'hotel-card';
        card.innerHTML = `
            <div class="hotel-img">
                <img src="${e.images[0]}" alt="">
            </div>
            <div class="hotel-data">
                <div class="hotel-data-1">
                    <div class="written">
                        <p>${e.name}</p>
                        <p>${e.name}</p>
                    </div>
                    <div class="like">
                        <img src="./Icons/black-heart.png" alt="">
                    </div>
                </div>
                <div class="hz-line"></div>
                <div class="hotel-data-2">
                    <p>${e.persons} guests · ${e.type} · ${e.beds} beds · ${e.bathrooms} bath</p>
                    <p>${data[0].previewAmenities.join(' · ')}</p>
                </div>
                <div class="hz-line"></div>
                <div class="hotel-data-3">
                    <div class="rating">
                        <p>${e.rating}</p>
                        <img src="./Icons/star.png" alt="">
                        <p>(${e.reviewsCount} reviews)</p>
                    </div>
                    <div class="price">
                        <p>$${e.price.total}</p>
                        <p>/night</p>
                    </div>
                </div>
            </div>
        `;

        let division = document.createElement('div');
        division.className = 'card-division';

        container.append(card, division);
    })
}

function getData(parameters){
    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${parameters.loc}&checkin=${parameters.checkin}&checkout=${parameters.checkout}&adults=${parameters.adults}&children=${parameters.children}&infants=${parameters.infants}&pets=${parameters.pets}&page=1&currency=USD`;
    const options = {
    	method: 'GET',
    	headers: {
    		'X-RapidAPI-Key': '26cc825c3amsh1a7112b650f6cd5p1cc9cejsn5d90a90cd67e',
    		'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    	}
    };


    fetch(url, options).then(responce => responce.json()).then(data => {
        randerHotels(data.results);
        document.querySelector('.main').classList.toggle('d-none');
        document.querySelector('.loader').classList.toggle('d-none');
    }).catch(error => {
        console.log(error);
    })
}

// function hitApi(parameters){
//     const url = 'data.json';

//     fetch(url).then(responce => responce.json()).then(data => {
//         let result = data.results;
//         let resultCopy = [...result];
//         randerHotels(result);
//         document.querySelector('.main').classList.toggle('d-none');
//         document.querySelector('.loader').classList.toggle('d-none');
//     }).catch(error => {
//         alert(error);
//     })
// }

// hitApi(parameters);

getData(parameters);