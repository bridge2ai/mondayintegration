var GH_TOKEN = "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";

function onFormSubmit(e) {

  var title = e.values[2] + ": " + e.values[4];

  var body = "| Contact Email | Organization Name | Change Date | Change Type | Plan | Licenses | Comments |\n" +
    "|---|---|---|---|---|---|---|\n" +
    "| " + e.values[1] + " | " + e.values[2] + " | " + e.values[3] + " | " + e.values[4] + " | " + e.values[5] + " | " + e.values[6] + " | " + e.values[7] + " |";

  var payload = {
    "title": title,
    "body": body
  };

  var options = {
    "method": "POST",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  var response = UrlFetchApp.fetch("https://api.github.com/repos/bmcbride/my-repo/issues?access_token=" + GH_TOKEN, options);
}

function test() {
  let query = '{boards(limit:1) { name id description items { name column_values{title id type text } } } }';
  let query3 = 'mutation{ create_item (board_id:3214164451, item_name:\"WHAT IS UP YALL!\", status:\"Done\") { id } }';


  let query4 = 'mutation ($myItemName: String!) { create_item (board_id:3214164451, item_name:$myItemName) { id } }';
  let vars = { "myItemName": "Hello, world!" };

  let query5 = JSON.stringify('mutation {change_column_value(board_id: 3214164451, item_id: 3214398576, column_id: "status", value: "{"label": "Stuck"}") {id}}')


  var result = UrlFetchApp.fetch("https://api.monday.com/v2", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': MONDAY_KEY
    },
    payload: JSON.stringify({
      'query': query5
    })
  })

  Logger.log(result);

  // note the "then" syntax doesn't work in GAS
  // .then(res => res.json())
  // .then(res => console.log(JSON.stringify(res, null, 2)));
}

function createIssue() {

  var title = "test title";

  var body = "test body";

  var payload = {
    "title": title,
    "body": body
  };

  var options = {
    "method": "POST",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  var response = UrlFetchApp.fetch("https://api.github.com/repos/bridge2ai/mondayintegration/issues?access_token=" + GH_TOKEN, options);
}

function fetchIssues() {
  var repo = 'https://github.com/bridge2ai/mondayintegration'
  var stuckIssues = "https://api.github.com/search/issues?q=mondayintegration:bridge2ai/issues+state:stuck"
  // var closedPatches = "https://api.github.com/search/issues?q=repo:vizorvr/patches+state:closed"

  var openResponse = UrlFetchApp.fetch(stuckIssues, { 'muteHttpExceptions': true });
  var Data = JSON.parse(openResponse.getContentText());
  Logger.log("Open issues on Patches GitHub:")
  Logger.log(Data.total_count)
}
