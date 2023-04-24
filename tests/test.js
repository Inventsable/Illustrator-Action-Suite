#include "../ActionSuite.js"; // Including ActionSuite to inherit classes
// #include "../ActionSuite.min.js"; // This is resulting in mangled Unicode, not sure what Terser is doing

var rootPath = new File($.fileName).parent; // Folder path to write tests to

// var aiaSet = new ActionSet(new File(rootPath + "/testActions.aia"));
var jsonSet = new ActionSet(new File(rootPath + "/test.json"));

// var tests = [
//   // {
//   //   contents: aiaSet.toJSON(),
//   //   dest: rootPath + "/test.json",
//   // },
//   {
//     contents: jsonSet.toAIA(),
//     dest: rootPath + "/test.aia",
//   }
// ];

// for (var ind = 0; ind < tests.length; ind++) {
//   var testCase = tests[ind];
//   var tmp = File(testCase.dest);
//   tmp.open("w");
//   tmp.write(testCase.contents);
//   tmp.close();
// }
// alert("Done");
