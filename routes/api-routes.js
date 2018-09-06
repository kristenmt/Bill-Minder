// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var activeID;

module.exports = function (app) {
  // Get all bills
  app.get("/api/bills", function (req, res) {

    db.Bills.findAll({}).then(function (dbBills) {
      res.json(dbBills);
    });
  });


  // Load bills page (display all bills)
  app.get("/dashboard", function (req, res) {

    // Check if user is currently logged in
    if (!req.user) {
      console.log("Access Denied, user is not logged in");
    } else {
      // set activeID user to the current logged in user
      activeID = req.user.id;
      console.log("find all: " + activeID);
      db.Bills.findAll({
        where: {
          userID: activeID,
        }
      }).then(function (dbBills) {
        res.render("dashboard", {
          bills: dbBills
        });
      });
    }
  });

  // DELETE route for deleting bills
  app.delete("/api/bills/:id", function (req, res) {
    db.Bills.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbBills) {
        res.json(dbBills);
      });
  });

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/dashboard");

  });


  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  app.post("/api/bills", function (req, res) {
    console.log(req.body);
    // activeID = JSON.parse(JSON.stringify(activeID));
    console.log("active id: " + activeID);
    db.Bills.create({
      userID: activeID,
      name: req.body.name,
      amount: req.body.amount,
      dueDay: req.body.dueDay,
      URL: req.body.URL,
      remind: req.body.remind,
      paid: req.body.paid,
      recurring: req.body.recurring,
      category: req.body.category
    })
      .then(function (dbBills) {
        res.json(dbBills);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        username: req.user.username

      });
      activeID = req.user.id;

      console.log("active id: " + activeID);
    }


  });


  // PUT route for updating posts
  app.put("/api/bills/:id", function (req, res) {
    console.log("api-routes-upate: " + req.body.paid);
    // console.log("api-routes-upate: " + JSON.stringify(req.body));
    db.Bills.update(
      { paid: req.body.paid },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(function (dbBills) {
        res.json(dbBills);
      });
  });


  

};
