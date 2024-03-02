let animals = ['Giraffe', 'Elephant', 'Yak']

animals.forEach( function(animal, index){
    console.log(`Animal number ${index} is ${animal}`)
})

animals.forEach( (animal, index) => {
    console.log(animal, index)
})

animals.forEach( (animal, index) => console.log(animal, index))

animals.forEach(animal => console.log(animal))