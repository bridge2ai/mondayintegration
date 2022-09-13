// // function myNewItem() {

// //   var baseURL = 'https://api.monday.com/v2'
// //   var mondayApiToken = MAPIKey

// //   var query = mutation newItem { create_item('board_id: boardID, group_id: myGroup, item_name: test2, column_values: {edit_request: New text){ id };
// // }

// var headers = {
//   'Authorization': mondayApiToken,
//   'Content-Type': 'application/json'
// }

// var options = {

//   headers: headers,
//   method: "Post",
//   payload: JSON.stringify({

//     query: query

//   })
// }

// var response = UrlFetchApp.fetch(baseURL, options).getContentText()
// var result = JSON.parse(response)

// console.log("result:", result.data)

// }

// objective: update the status of item 3214398576 on board 3214164451 from blank to Done.

function udpateValueOLD() {

  //creating the item de novo works (item ID is ignored)
  let query5 = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:3214164451, item_name:$myItemName, column_values:$columnVals) { id } }';

  let query6 = 'mutation ($myItemName: String!, $columnVals: JSON!) { change_column_value (board_id:3214164451, column_values:$columnVals) { id value} }';

  let query9 = 'mutation {  change_column_value(item_id: 3214398576, column_id: "status", board_id: 3214164451,     value: "{\"status\": \"Done\"}") {    name    column_values {       id       value    }  }}'

  let query8 = "mutation { change_column_value ( board_id: 3214164451,  item_id:$myItemID, column_values:$columnVals)}"

  let vars = {
    // "myItemName":"hey dogs",
    "myItemID": "3214398576",
    "columnVals": JSON.stringify({
      "status": { "label": "Done" }
    })
  };
  var boardId = '3214164451';
  var itemId = '3214398576'
  var colId = 'status'
  let query7 = 'mutation { change_column_value ( board_id: ' + boardId + '),  item_id: ' + itemId + ', column_id: ' + colId + ', value: { label : Done} }';

  var result = UrlFetchApp.fetch("https://api.monday.com/v2", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': MONDAY_KEY
    },
    payload: JSON.stringify({
      'query': query6,
      'variables': JSON.stringify(vars)

    })
  })

  Logger.log(result);

}

function test3() {
  // If user doesn't currently exist in monday.com, we write an email to the form filler saying submission failed or something 
  const uri = 'https://api.monday.com/v2'; 
  const graphql = JSON.stringify({
    query: "query {\n users {\n id\n email\n}",
    variables: {}
  });
  const params = {
    method: 'POST',
    uri,
    payload: graphql,
    headers: {
      'Content-Type': 'application/json',
      authorization: MONDAY_KEY,
    },
    redirect: 'follow',
  };
  const response = UrlFetchApp.fetch(uri, params);
  Logger.log(response);
}

// Logger.log("\nSingle escaped brackets don't work")
  // var querySingleEscapedBrackets = "mutation{change_column_value(board_id: " + board_id + ",item_id:" + item_id + ",column_id: \"checkbox\",value:\"{\\\"checked\\\": \{\}){id}}"
  // runQuery(querySingleEscapedBrackets);
  // runQuery(checkBoxStatusQuery);

  // Logger.log("\nDouble escaped brackets don't work")
  // var queryDoubleEscapedBrackets = "mutation{change_column_value(board_id: " + board_id + ",item_id:" + item_id + ",column_id: \"checkbox\",value:\"{\\\"checked\\\": \\{\\}){id}}"
  // runQuery(queryDoubleEscapedBrackets);
  // runQuery(checkBoxStatusQuery);

  // Logger.log("\nTriple escaped brackets don't work")
  // var queryTripleEscapedBrackets = "mutation{change_column_value(board_id: " + board_id + ",item_id:" + item_id + ",column_id: \"checkbox\",value:\"{\\\"checked\\\": \\\{\\\}}\"){id}}"
  // runQuery(queryTripleEscapedBrackets);
  // runQuery(checkBoxStatusQuery);


  // Logger.log("---------------")

  // Logger.log("Updating status, however, works just fine")
  // runQuery(statusQuery);

  // Logger.log("Setting status to Done")
  // var queryStatusToDone = "mutation{change_column_value(board_id:" + board_id + ",item_id:" + item_id + ",column_id: \"status\",value:\"{\\\"label\\\": \\\"Done\\\"}\"){id}}"
  // runQuery(queryStatusToDone);

  // Logger.log("Result of update:")
  // runQuery(statusQuery);

  // Logger.log("Setting status to Stuck")
  // var queryStatusToDone = "mutation{change_column_value(board_id:" + board_id + ",item_id:" + item_id + ",column_id: \"status\",value:\"{\\\"label\\\": \\\"Stuck\\\"}\"){id}}"
  // runQuery(queryStatusToDone);

  // Logger.log("Result of update:")
  // runQuery(statusQuery);

  // Logger.log("---------------")

  // Logger.log("Setting checked to true")
  // var queryCheckedToTrue = "mutation{change_column_value(board_id: " + board_id + ",item_id:" + item_id + ",column_id: \"checkbox\",value:\"{\\\"checked\\\": \\\"true\\\"}\"){id}}"
  // var queryCheckedToTrue2 = 'mutation{change_column_value(board_id: ' + board_id + ",item_id:" + item_id + ',column_id: "checkbox",value:\"{\\"checked\\": \\"true\\"}"){id}}'
  // runQuery(queryCheckedToTrue2);

  // Logger.log("Successfully updates to true:")
  // runQuery(checkBoxStatusQuery);

  // Logger.log("Setting checked to false should absolutely work but doesn't because the API syntax is egregiously opaque")
  // var queryCheckedToFalse = "mutation{change_column_value(board_id: " + board_id + ",item_id:" + item_id + ",column_id: \"checkbox\",value:\"{\\\"checked\\\": \\\"false\\\"}\"){id}}"
  // runQuery(queryCheckedToFalse);
  // Logger.log("Fails to update update to unchecked")
  // runQuery(checkBoxStatusQuery);

  // Logger.log("\nUnescaped brackets don't work")
  // var queryUnEscapedBrackets = "mutation{change_column_value(board_id: " + board_id + ",item_id:" + item_id + ",column_id: \"checkbox\",value:\"{\\\"checked\\\": {}){id}}"
  // runQuery(queryUnEscapedBrackets);
  // runQuery(checkBoxStatusQuery);