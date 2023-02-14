//import required modules
const { request, response } = require("express");
const express = require("express");
const path = require("path");
const library = require("./components/Library/library");

//Set up express app
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//set up public folder
app.use(express.static(path.join(__dirname, "public")));


//test express app
app.get("/", async (request, response) => {
    let libraryData = await library.loadBranches();
    // response.status(200).send("Test Page again");
    response.render("index", { title: "Home", libs : libraryData });
});
app.get("/branch/:id", async (request, response) =>{
    let branch = await library.loadBranchById(request.params.id)
    response.render("branch" , {title: "Branch", branch : branch})
})
//set put server listening 
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
