require('dotenv').config();
const mongoose = require('mongoose');
const URI = process.env.MONGO_URI

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Step 2: Create a Mongoose Model
const Schema = mongoose.Schema

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})

const Person = mongoose.model('Person', personSchema)

// Step 3: Create and Save a Person
const createAndSavePerson = done => {
  const janeFonda = new Person({ name: 'Jane Fonda', age: 26, favoriteFoods: ["eggs", "fish", "fresh fruit"] })

  janeFonda.save((err, data) => {
    if (err) return console.error(err)
    done(null, data)
  })
}

// Step 4
const arrayOfPeople = [
  { name: "Frankie", age: 74, favoriteFoods: ["Del Taco"] },
  { name: "Sol", age: 76, favoriteFoods: ["roast chicken"] },
  { name: "Robert", age: 78, favoriteFoods: ["wine"] }
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err)
    done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return console.log(err)
    done(null, personFound)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) console.log(err)
    done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound) => {
    if (err) console.log(err)
    done(null, personFound)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedDoc) => {
    if (err) console.log(err)
    done(null, updatedDoc)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deletedPerson) => {
    if (err) console.log(err)
    done(null, deletedPerson)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, removedPerson) => {
    if (err) console.log(err)
    done(null, removedPerson)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
