// For testing in Node, not Illustrator

const path = require("path");
const fs = require("fs");
require("../ActionSuite.js");

async function test() {
  let actionData = await readFile(path.resolve("./input.aia"));
  let testSet = ActionSet(actionData);
  makeFile(
    path.resolve("./result.json"),
    JSON.stringify(testSet.data, null, 2)
  );
  console.log("Done?");
}

async function readFile(targetPath, verbose = false) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(targetPath), "utf-8", (err, data) => {
      if (err) reject(err);
      if (!verbose) resolve(data);
      let temp = {
        data: data,
        stats: fs.lstatSync(path.resolve(targetPath)),
      };
      resolve(temp);
    });
  });
}

function makeFile(targetPath, data, options = null) {
  return fs.writeFileSync(path.resolve(targetPath), data, options);
}

test();
