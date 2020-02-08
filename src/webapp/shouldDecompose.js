/**
 * Just a little script to run and look at the components and see if we should think about decomposing into smaller components
 */
const fs = require("fs");
const path = require("path");
require("colors");


showResultsMessage(getOversizedComponents(getDirectories()))


/**
 * 
 * functions below 
 */

function getListOfComponents(dir) {
  return fs.readdirSync(dir).map(file => {
    return dir + "/" + file;
  });
}

function getDirectories(dir) {
  dir = dir || path.dirname(__filename) + "/components";
  let paths = fs.readdirSync(dir).map(function(d) {
    return dir + "/" + d;
  });

  return paths;
}

function getStatusWithColor(component, size) {
  if (size >= 5000) return `${component}`.red;
  if (size >= 4000) return `${component}`.magenta;
  if (size >= 3000) return `${component}`.yellow;
  return `${component}`.yellow;
}

function getOversizedComponents(directories) {
  return directories
    .map(function(dir) {
      let jsFiles = getListOfComponents(dir);
      return jsFiles;
    })
    .reduce(function(a, b) {
      return [...a, ...b];
    }, [])
    .filter(function(component) {
      if (fs.readFileSync(component).length >= 3000) {
        return component;
      }
    });
}

function showResultsMessage(components) {
  if (components.length < 1)
    return console.log(`
  =========================
  No oversized components 
  =========================`);

  console.log(`
  =========================
  Here are some components you may want to decompose:
  =========================
  |Legend|  ${"not too bad".bgYellow.black} ${"kinda bad".bgMagenta} ${
    "bro look at it".bgRed
  }
  
  `);

  components.forEach(function(component) {
    let data = fs.readFileSync(component);
    console.log(getStatusWithColor(component, data.length));
  });
}

