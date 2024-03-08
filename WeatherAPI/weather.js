let weatherTableData = document.querySelector('#weather-forecast')
let urlMinneapolis = 'https://api.weather.gov/gridpoints/MPX/116,72/forecast'
let urlMilwaukee = 'https://api.weather.gov/gridpoints/MKX/27,73/forecast'
let locationUrlMn = 'https://api.weather.gov/offices/MPX'
let locationUrlWi = 'https://api.weather.gov/offices/MKX'



fetch(locationUrlWi).then((res1) => {
    return res1.json()
}).then((locationData) => {
    locationObjects = (locationData.name)
    console.log(locationObjects)
    let location = locationData.name
    let addLocation = document.querySelector('#location')
    addLocation.innerHTML = `Weekly Weather Forecast for ${location}`
})
fetch(urlMilwaukee).then((res) => {
    return res.json()
}).then((weatherData) => {
    weatherObjects = (weatherData.properties.periods)
    console.log(weatherObjects)
    weatherObjects.forEach(function(Object){
        console.log(Object.name + ' ' + Object.temperature + Object.temperatureUnit + ' ' + Object.shortForecast + ' ' + Object.detailedForecast + Object.icon + Object.windSpeed + Object.windDirection)
        let date = Object.name
        let temp = Object.temperature + Object.temperatureUnit
        let short = Object.shortForecast
        let icon = Object.icon
        let detailed = Object.detailedForecast
        let windSpeed = Object.windSpeed
        let windDirection = Object.windDirection
        let addTableData = document.createElement('tr')

        let dayData = document.createElement('td')
        dayData.innerHTML = date
        let tempData = document.createElement('td')
        tempData.innerHTML = temp
        let shortData = document.createElement('td')
        shortData.innerHTML = short
        let iconData = document.createElement('td')
        iconData.innerHTML = icon
        let detailedData = document.createElement('td')
        detailedData.innerHTML = detailed
        let windSpeedData = document.createElement('td')
        windSpeedData.innerHTML = windSpeed
        let windDirectionData = document.createElement('td')
        windDirectionData.innerHTML = windDirection

        addTableData.append(dayData, tempData, shortData, iconData, detailedData, windSpeedData, windDirectionData)
        weatherTableData.appendChild(addTableData)
    })

})