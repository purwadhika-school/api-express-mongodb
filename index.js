var Models = require("./models"); //Instantiate a Models object so you can access the models.js module.

var Bee = new Models.Bug({ //You're entering a new bug here, giving it a name, and specifying it's type.
	bugName: "Scruffy",
	bugColour: "Orange",
	Genus: "Bombus"
});
 
Bee.save(function(error) { //This saves the information you see within that Bee declaration (lines 4-6).
    console.log("Your bee has been saved.");
	if (error) {
		console.error(error);
	}
});