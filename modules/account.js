const account = {
  create(req, res, next) {
    const userCollection = db.collection('users'); // Connect to the mongoDB collection named 'users'.
    const newUser = { // Data from form, collected by body-parser package
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    // findOne = check if username already exists in db..
    userCollection.findOne({
      username: newUser.username
    }, function(err, user) {
      console.log(user);
      if (user) {
        // .. if it exists
        console.log('Bestaat al');
      } else {
        // .. if it doesn't - use save (from body-parse to mongoDB)
        userCollection.save(newUser, (err, result) => {
          if (err) return console.log(err);
          // console.log('Opgeslagen');
          next();
        });
      }
  });
  },
}

module.exports = account;
