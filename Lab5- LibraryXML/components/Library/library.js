const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var xml;

async function loadLibrary() {
  if (xml == undefined) {
    let response = await fetch(
      "https://www.torontopubliclibrary.ca/data/library-data.kml",
      {
        method: "get",
        headers: {
          "Content-Type": "application/xml"
        }
      }
    );
    //convert XML string to XML DOM document
    // console.log(await response.text());
    data = new JSDOM(await response.text(), { contentType: "application/xml" });

    xml = data.window.document; //set the xml to the XML DOM document which we can query using DOM methods
  }
  return xml;
}

async function loadBranches() {
  xml = await loadLibrary();
  return xml.querySelectorAll("Placemark");
}

async function loadBranchById(id){
    xml = await loadLibrary();
    return xml.querySelector(`Placemark[id = '${id}`);
};
module.exports = {
    loadLibrary,
    loadBranches,
    loadBranchById
};