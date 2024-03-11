let weatherTableData = document.querySelector('#weather-forecast')  // initializes weatherTableData variable that is tied to weather-forecast id
let urlMinneapolis = 'https://api.weather.gov/gridpoints/MPX/116,72/forecast'  // initializes urlMinneapolis variable.  Holds weather.gov api url with MPX field office coordinates
let urlMilwaukee = 'https://api.weather.gov/gridpoints/MKX/27,73/forecast'
let locationUrlMn = 'https://api.weather.gov/offices/MPX'  // initializes locationUrlMn variable.  Holds weather.gov MPX field office url
let locationUrlWi = 'https://api.weather.gov/offices/MKX'



fetch(locationUrlMn).then((res1) => {  // fetches response from locationUrlMN and returns in res1 variable
    return res1.json()  // converts response to json object
}).then((locationData) => {  // renames res1.json to locationData
    locationObjects = (locationData.name)  // new variable locationObjects that holds the names from locationData json object
    console.log(locationObjects)
    let location = locationData.name  // new variable location holds names from locationData json object
    let addLocation = document.querySelector('#location')  // new variable addLocation which is tied to location id
    addLocation.innerHTML = `Weekly Weather Forecast for ${location}`  // prints location variable into location id of html
})
fetch(urlMinneapolis).then((res) => {  // fetches response from urlMinneapolis and returns in res variable
    return res.json()  // converts response to json
}).then((weatherData) => {  // renames res.json to weatherData
    weatherObjects = (weatherData.properties.periods)  // new variable weatherObjects that holds the data in the listed location of weatherData.json
    console.log(weatherObjects)
    weatherObjects.forEach(function(Object){  // forEach loop that prints the information below from each weatherObject
        console.log(Object.name + ' ' + Object.temperature + Object.temperatureUnit + ' ' + Object.shortForecast + ' ' + Object.detailedForecast + Object.icon + Object.windSpeed + Object.windDirection)
        let date = Object.name  // initializes variables for listed data
        let temp = Object.temperature + Object.temperatureUnit
        let short = Object.shortForecast
        let icon = Object.icon
        let detailed = Object.detailedForecast
        let windSpeed = Object.windSpeed
        let windDirection = Object.windDirection
        let addTableData = document.createElement('tr')  // new variable addTableData.  Creates a new 'tr' element in the html.

        let dayData = document.createElement('td')  // new variable dayData.  Creates a new 'td' element in the html.
        dayData.innerHTML = date  // adds new table data point to html table.  Data point includes date variable.
        let tempData = document.createElement('td')  // new variable tempData.  Creates a new 'td' element in the html.
        tempData.innerHTML = temp  // adds new table data point to html table.  Data point includes temp variable.
        let shortData = document.createElement('td')
        shortData.innerHTML = short
        let iconData = document.createElement('img')  // adds the images from image link
        iconData.src = icon  // source: https://www.geeksforgeeks.org/how-to-display-images-from-an-array-in-javascript/
        let detailedData = document.createElement('td')
        detailedData.innerHTML = detailed
        let windSpeedData = document.createElement('td')
        windSpeedData.innerHTML = windSpeed
        let windDirectionData = document.createElement('td')
        windDirectionData.innerHTML = windDirection

        addTableData.append(dayData, tempData, shortData, iconData, detailedData, windSpeedData, windDirectionData)  // appends the listed variables (holding table data points) to the addTableData variable (table row)
        weatherTableData.appendChild(addTableData)  // appends above table data and table row to the weatherTableData variable that is linked to weather-forecast id in the html file.
    })

})