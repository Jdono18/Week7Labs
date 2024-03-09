let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector('#user-answer')
let submitButton = document.querySelector('#submit-answer')
let resultTextElement = document.querySelector('#result')
let playAgainButton = document.querySelector('#play-again')

// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array country names and two-letter country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files included with script elements as one big file,
// organized in the order of the script tags. So the countriesAndCodes array from countries.js
// is available to this script.

console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available
game()
function game() {
    let new_random_countryArr = []  // initializes new array to hold single random country
    let random_country = (countriesAndCodes[Math.floor(Math.random() * countriesAndCodes.length)])  // pulls random country from countriesandcodes array source: geeksforgeeks.org
    new_random_countryArr.push(random_country.name) // pushes random country generated by code above to new array
    new_random_countryArr.push(random_country["alpha-2"])
    let randomCountryName = new_random_countryArr[0]
    let randomCountryCode = new_random_countryArr[1]
    console.log(randomCountryName)
    console.log(randomCountryCode)
    randomCountryElement.innerHTML = randomCountryName // prints random country into #random-country id field
    //let url = `https://api.worldbank.org/v2/country/${randomCountryCode}?format=json`

// TODO when the page loads, select an element at random from the countriesAndCodes array
// TODO display the country's name in the randomCountryElement
    submitButton.addEventListener('click', function () {
        let userAnswer = userAnswerElement.value
        let url = `https://api.worldbank.org/v2/country/${randomCountryCode}?format=json`

        fetch(url).then((res) => {
            return res.json()
        }).then((worldBankData) => {
            console.log(worldBankData)
            let countryCapital = worldBankData[1][0].capitalCity
            console.log(countryCapital)
            resultTextElement.innerHTML = countryCapital
            if (userAnswer === countryCapital) {
                resultTextElement.innerHTML = (`Correct! The capital of ${randomCountryName} is ${countryCapital}. You win the game!`)
                userAnswerElement.value = ''
            } else {
                resultTextElement.innerHTML = (`Incorrect! The capital of ${randomCountryName} is not ${userAnswer}, it is ${countryCapital}.`)
                userAnswerElement.value = ''
            }
        }).catch((err) => {
            console.log('Error', err)
        })
    })

    window.addEventListener('keyup', function () {
        if (event.keyCode === 13) {
            let inputElement = [userAnswerElement, submitButton]
            if (inputElement.includes(document.activeElement)) {
                submitButton.click()
                userAnswerElement.focus()
            }
        }
    })
}
playAgainButton.addEventListener('click', function(){  // click event listener tied to the playAgainButton that reloads the page for another game.
   location.reload() // https://www.freecodecamp.org/news/javascript-refresh-page-how-to-reload-a-page-in-js/
})
// TODO add a click event handler to the submitButton.  When the user clicks the button,
//  * read the text from the userAnswerElement 
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
//  * If the API call was successful, extract the capital city from the World Bank API response.
//  * Compare the actual capital city to the user's answer. 
//      You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein 
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong. 
//      For example 'Correct! The capital of Germany is Berlin' or 'Wrong - the capital of Germany is not G, it is Berlin'


// TODO finally, connect the play again button. Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. If you didn't use functions in the code you've 
// already written, you should refactor your code to use functions to avoid writing very similar code twice. 