// thanks to this thread for unblocking me somewhat https://community.monday.com/t/mutating-a-date-in-v2/10404/5
// and thanks to the great Randall Munroe for helping me laugh as I stare into the abyss of this backslash dystopia https://m.xkcd.com/1638/

function testUncheckOptions() {
  var statusQuery =
    '{  items(ids: ' + Item_id + ') {    column_values(ids: "status") {      id      value      text    }  }}'

  Logger.log("Started: " + new Date())

  var queryCheckboxState
    = '{  items(ids: ' + Item_id + ') {    column_values(ids: "checkbox") {      id      value      text    }  }}'

  Logger.log("Checking baseline checkbox state")

  let result = runQuery(queryCheckboxState);
  getCheckedStateFromResult(result)

  Logger.log("-------")

  let checkboxTrue = '\\\"true\\\"';
  testParameterEncoding(checkboxTrue);
  getCheckedStateFromResult(runQuery(queryCheckboxState))

  // all of these fail silently (they do not change state of checkbox to true, but they don't throw errors either)
  var silentFailParameters = [
    null,
    false,
    'false',
    '\"false\"',
    '\\"false\\"',
    '\\\"false\\\"',
    '"{}"',
    '\"{}\"',
    '\\"{}\\"',
    '\\\"{}\\\"',
    '\\\"\\\"'
  ];

  // iterate through all possible options to see if any successfully UNcheck the box. I'll save you the suspense. Nothing works.
  silentFailParameters.forEach(testParameterEncoding);

  var fatalErrorParameters = [
    "",
    {}
  ];

  // running this will break the script; uncomment if you wish to be convinced
  // fatalErrorParameters.forEach(testParameterEncoding);

  Logger.log("COMPLETED:" + new Date())

  function testParameterEncoding(permutation) {
    var query =
      'mutation{change_column_value(' +
      'board_id: ' + Board_id + ",item_id:" + Item_id +
      ',column_id: "checkbox",value:"{\\"checked\\": ' + permutation + '}"){id}}'

    Logger.log('-----------------------------')
    Logger.log("Testing query with: " + JSON.stringify(permutation));

    runQuery(query);
    let result = runQuery(queryCheckboxState);
    getCheckedStateFromResult(result)
  }

  function getCheckedStateFromResult(rawResult) {
    // Logger.log("State of the checkbox: ");
    var parsedResult = JSON.parse(rawResult);
    let state = parsedResult['data']['items'][0]['column_values'][0]['value'];
    Logger.log(state)
    return state;
  }

  function runQuery(query) {

    var result = UrlFetchApp.fetch("https://api.monday.com/v2", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': MONDAY_KEY
      },
      payload: JSON.stringify({
        'query': query

      })
    })

    return result;
  }
}

function insertNewItemWithVars() {
  let query5 = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:' + Board_id + ', item_name:$myItemName, column_values:$columnVals) { id } }';

  let vars = {
    "myItemName": "Hello, world!",
    "columnVals": JSON.stringify({
      "status": { "label": "Done" },
      "date4": { "date": "1993-08-27" }
    })
  };

  var result = UrlFetchApp.fetch("https://api.monday.com/v2", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': MONDAY_KEY
    },
    payload: JSON.stringify({
      'query': query5,
      'variables': JSON.stringify(vars)
    })
  })

  Logger.log(result);

}

function listColNamesAndIds(boardId) {
  let queryListCols = '{   boards(ids: ' + boardId + ') {     columns {       id       title     }   } }';
  runQuery(queryListCols)

}

function getColIDFromName(boardId, colName) {

  let query = '{   boards(ids: ' + boardId + ') {     columns {       id       title     }   } }';

  var result = UrlFetchApp.fetch("https://api.monday.com/v2", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': MONDAY_KEY
    },
    payload: JSON.stringify({
      'query': query

    })
  })

  Logger.log(result);

  var obj = JSON.parse(result);

  var matchedId = null;
  let columns = obj['data']['boards'][0]['columns'];

  columns.forEach(function (colId) {
    if (colName === colId['title']) {
      matchedId = colId['id']
    }
  })

  return matchedId;

}




