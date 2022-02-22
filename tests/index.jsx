#include "../ActionSuite.js"; // Including ActionSuite to inherit classes
var rootPath = new File($.fileName).parent; // Folder path to write tests to


// var fakeSet = new ActionSet({
//   name: "Test"
// })
// alert(fakeSet.actions)
// alert(fakeSet.actions.parent)

// Testing constructors
var aiaSet = new ActionSet(new File(rootPath + "/input.aia"));
// var jsonSet = new ActionSet(new File(rootPath + "/input.json"));

// Testing fully dynamic construction:
// var dynamicSet = new ActionSet({
//   name: "DynamicSet",
//   isOpen: 1,
//   actions: [
//     {
//       name: "DynamicAction",
//       keyIndex: 8,
//       colorIndex: 5,
//       isOpen: 0,
//       events: [
//         {
//           internalName: "(ai_plugin_setColor)",
//           localizedName: "setColorEvent",
//           hasDialog: 0,
//           parameters: [
//             {
//               key: "idct",
//               showInPalette: -1,
//               type: "(ustring)",
//               value: "Stroke color",
//             },
//             {
//               key: "fill",
//               showInPalette: -1,
//               type: "(boolean)",
//               value: 0,
//             },
//             {
//               key: "type",
//               showInPalette: -1,
//               type: "(enumerated)",
//               name: "RGB color",
//               value: 2,
//             },
//             {
//               key: "red.",
//               showInPalette: -1,
//               type: "(real)",
//               value: 239,
//             },
//             {
//               key: "gren",
//               showInPalette: -1,
//               type: "(real)",
//               value: 239,
//             },
//             {
//               key: "blue",
//               showInPalette: -1,
//               type: "(real)",
//               value: 239,
//             },
//           ],
//         },
//       ],
//     },
//   ],
// });
var parentCheck1 = printKeys(aiaSet.actions.parent, "ActionCollection: ");
alert(parentCheck1)


// Action is still missing correct inheritance
var parentCheck2 = printKeys(aiaSet.actions[0].parent, "Action: ");
alert(parentCheck2)

function printKeys(obj, type) {
  var temp = []
  for (var key in obj)
    temp.push(key)
  return type + temp.join(",")
}

// alert(aiaSet.actions[0].parent.parent.name)
// var jsonParentCheck = aiaSet.actions[0].parent.parent.name;
// var aiaParentCheck = aiaSet.actions[0].parent.parent.name;
// alert(jsonParentCheck)

// var tests = [
//   {
//     contents: JSON.stringify(aiaSet.getJSONSchema()),
//     dest: rootPath + "/input_AIA_File_output_JSON.json",
//   },
//   {
//     contents: jsonSet.toAIA(),
//     dest: rootPath + "/input_JSON_File_output_AIA.aia",
//   },
//   {
//     contents: dynamicSet.toAIA(),
//     dest: rootPath + "/input_JSON_Dynamic_output_AIA.aia",
//   },
// ];

// for (var ind = 0; ind < tests.length; ind++) {
//   var testCase = tests[ind];
//   var tmp = File(testCase.dest);
//   tmp.open("w");
//   tmp.write(testCase.contents);
//   tmp.close();
// }
alert("Done");
