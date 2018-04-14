var FB = require("fb");
var fs = require("fs");
var MESSAGES = require("./trump").messages;
fs.readFile("./token", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }
  data = data.split(",");
  FB.setAccessToken(data[2]);
  var params = {
    message: MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
  };
  FB.api("me/feed", "post", params, function(res) {
    if (!res || res.error) {
      console.log(!res ? "error occurred" : res.error);
      return;
    }
    console.log("Post Id: " + res.id);
  });

  FB.api(
    "oauth/access_token",
    {
      client_id: data[0],
      client_secret: data[1],
      grant_type: "fb_exchange_token",
      fb_exchange_token: data[2]
    },
    function(res) {
      if (!res || res.error) {
        console.log(!res ? "error occurred" : res.error);
        return;
      }

      var accessToken = res.access_token;
      var expires = res.expires ? res.expires : 0;
      console.log(res);
      fs.writeFile("./token", `${data[0]},${data[1]},${data[2]}`, function(
        err
      ) {
        if (err) {
          return console.log(err);
        }

        console.log("The file was saved!", `${data[0]},${data[1]},${data[2]}`);
      });
    }
  );
});
