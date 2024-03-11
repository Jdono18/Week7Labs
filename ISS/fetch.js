let url = 'https://api.wheretheiss.at/v1/satellites/25544'  // initializes url variable that holds the ISS location API url

let issLat = document.querySelector('#iss-lat')  // initializes issLat variable that is tied to iss-lat id
let issLong = document.querySelector('#iss-long')  // initializes issLong variable that is tied to iss-long id

let update = 10000  // initializes update variable that is set to a value of 10 seconds (10,000ms)
let maxFailedAttempts = 3  // initializes maxFailedAttempts variable equal to 3.

let issMarker  // // initializes new variable issMarker
let issIcon = L.icon({  // new issIcon variable that stores iconUrl, iconSize, iconAnchor parameters.
    iconUrl: 'satellite.png',
    iconSize: [50,50],
    iconAnchor: [25, 25]
})

let map = L.map('iss-map').setView([0,0], 1)  // new variable map that sets initial zoom upon load
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {  // adds tile layer to map from url listed
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'  // adds copyright info to map
}).addTo(map);  // adds above to the map variable

let timeIssLocationFetched = document.querySelector('#time')  // timeIssLocationFetched variable that is tied to time id

iss(maxFailedAttempts) // call function one time to start  Once the fetch request has been made, the iss function will call itself again after a delay of update ms
//  setInterval(iss, update) // 10 seconds don't query free servers more often than necessary
function iss(attempts) {  // calls iss function adding attempts parameter

    if (attempts <= 0) {
        alert('Attempted to contact ISS server failed after 3 attempts.')
        return
    }

    fetch(url).then((res) => {
        return res.json()  // process response into JSON (converts raw response into javascript objects)
    }).then((issData) => {  // all of this data moves into the issData parameter
        console.log(issData)  // TODO - display data on web page
        let lat = issData.latitude  // initializes lat variable that parses latitude data from json
        let long = issData.longitude // initializes long variable that parses longitude data from json
        issLat.innerHTML = lat
        issLong.innerHTML = long

        // create marker if it doesn't exist
        // move marker if it does exist
        if (!issMarker) {
            //create marker
            issMarker = L.marker([lat, long], {icon:issIcon}).addTo(map)
        } else {
            issMarker.setLatLng([lat, long])
        }

        let date = Date()  // initializes date variable that calls the built in Date Constructor function
        timeIssLocationFetched.innerHTML = (`On ${date} the ISS is over the following coordinates:`)

    }).catch((err) => {  // error handling
        attempts = attempts - 1 // subtract 1 from number of attempts
        console.log('Error', err)
    }).finally( () => { // finally runs whether the fetch() worked or failed.  Call the iss function after a delay of update ms to update the position
            setTimeout(iss, update, attempts)
        })
}
// .then chain blocks keep pushing data forward
// promises
// catches print errors