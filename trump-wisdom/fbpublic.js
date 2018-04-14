var FB = require("fb");
var fs = require("fs");
var MESSAGES = require("./messages").messages;
fs.readFile("./token", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }
  data = data.split(",");
  FB.setAccessToken(data[2]);
  var params = {
    message: MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
  };
  FB.api("4", { fields: ["id", "name"] }, function(res) {
    if (!res || res.error) {
      console.log(!res ? "error occurred" : res.error);
      return;
    }
    console.log("Post Id: " + res);
  });
});
