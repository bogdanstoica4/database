const Person = require("../models/Person");
const bodyParser = require("body-parser");



exports.list = async (req, res) => {
  const perPage = 10;
  const limit = parseInt(req.query.limit) || 10; // Make sure to parse the limit to number
  const page = parseInt(req.query.page) || 1;
  const message = req.query.message;


  try {
    const persons = await Person.find({}).skip((perPage * page) - perPage).limit(limit);
    console.log(persons);
    const count = await Person.find({}).count();
    const numberOfPages = Math.ceil(count / perPage);

    res.render("persons", {
      persons: persons,
      numberOfPages: numberOfPages,
      currentPage: page,
      message: message
    });
  } catch (e) {
    res.status(404).send({ message: "could not list persons" });
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;
  try {
 
    const person = await Person.findById(id);
    if (!person) throw Error('cant find person');
    res.render('update-person', {
    
      person: person,
     
      id: id,
      errors: {}
    });
  } catch (e) {
    console.log(e)
    if (e.errors) {
      res.render('create-person', { errors: e.errors })
      return;
    }
    res.status(404).send({
      message: `could find person ${id}`,
    });
  }
};

exports.create = async (req, res) => {
  try {

    const person = await Person.findById(req.body.person_id)
    await Person.create({
      title: req.body.title,
      taster_name: taster.name,
      taster_twitter_handle: taster.twitter_handle,
      points: parseInt(req.body.points),
      taster_id: req.body.taster_id,
      regions: req.body.regions
    })

    res.redirect('/persons/?message=person has been created')
  } catch (e) {
    if (e.errors) {
      res.render('create-person', { errors: e.errors })
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  }
}

exports.createView = async (req, res) => {
  try {
    const countries = await Country.find({});
    const tasters = await Taster.find({});
    const regions = await Region.find({});
    res.render("create-person", {
      countries: countries,
      tasters: tasters,
      regions: regions,
      errors: {}
    });

  } catch (e) {
    res.status(404).send({
      message: `could not generate create data`,
    });
  }
}

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Person.findByIdAndRemove(id);
    res.redirect("/persons");
  } catch (e) {
    res.status(404).send({
      message: `could not delete  record ${id}.`,
    });
  }
};

