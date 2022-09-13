const MONDAY_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3NzU2ODMwNCwidWlkIjozMzEyMjc4NiwiaWFkIjoiMjAyMi0wOC0yNVQyMjoyMzowOC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTI1NjIwNDAsInJnbiI6InVzZTEifQ.cmz6hg0krRnUWoST-hj0-KaLcmlimqVIh5rSk9uO3Dc'

const ClientID = "a170f21293ab6d618b880747661b4d0c"
const ClientSecret = 'bda2b692f64e4252e23036509902d415'
const SigningSecret = '3d55f1f01061808229599437b479fabe'

let Board_id = '3214164451'
let Item_id = '3214398576'

function Create_Line() 
{
  var ss = SpreadsheetApp.openById('1h8uV9npDhOvmbYCMd6bqpXQpAiAEa3NDS0tnFRvK2ao');
  var sh = ss.getSheetByName("tests");
  var values = sh.getDataRange().getValues();
  var mondayAPIkey = MONDAY_KEY
  for(var i=1;i<values.length;i++)
  {
    if(values[i][7]=="")
    { 
      
      var query = "mutation($board:Int!, $name:String!,$colvals:JSON!){create_item(board_id:$board, item_name:$name, column_values:$colvals){id}}";
      var variables = {
                        "board" : "board_id",
                        "name" : values[i][0], //where column A has the name I want for the item
                        "colvals": JSON.stringify({ "column_id": "Coluna 1", "value": "Done"}) //calling the now formatted date variable
                       
                       };
      var pulseID = JSON.parse(makeAPICall(mondayAPIkey, query, variables)).data.create_item.id;
      sh.getRange(i+1, 8).setValue(pulseID)
    }
  }
}

function mainGetColIdFromName() {
  var boardId = '3214164451';
  var colName = 'Status';
  var colId = getColIDFromName(boardId, colName)
  Logger.log("The column id for '" + colName + "' is '" + colId + "'")

}

