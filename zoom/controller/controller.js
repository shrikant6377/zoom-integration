const { application } = require('express');
require('dotenv/config')
var request = require('request');

// entry point for 3000
//1. 3000/createMeeting
// 2. redi.rect zoom
// zoom code -> redirect (query,-> acdcess token)
// query -> Access token => meeting crate (create)
const signIn = function (req, res) {
  let code = req.query.code
  console.log(req.query)
  if (!code) {
    res.redirect('https://zoom.us/oauth/authorize?response_type=code&client_id=' + process.env.client_id + '&redirect_uri=' + process.env.redirectURL)
    //console.log()
  }
}

const Authorization = function (req, res) {
  let code = req.query.code
  console.log(req.query)
  var options = {
    method: 'POST',
    url: 'https://zoom.us/oauth/token',
    qs: {
      grant_type: 'authorization_code',
      //The code below is a sample Authorization Code. Replace it with your actual Authorization Code while making requests.
      code: req.query.code,
      //The uri below is a sample redirect_uri. Replace it with your actual redirect_uri while making requests.
      redirect_uri: process.env.redirectURL,
    },
    headers: {
      /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
       **/
      Authorization: 'Basic' + Buffer.from(process.env.client_id + ':' + process.env.client_secret).toString('base64')
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    // response.send(body)
  });

  res.send({ msg: "authoraization call succussful" })

}
const getuserDetail = function (req, res) {
  let data = req.body
  //console.log(data)
  //console.log("-----",data.access_token)
  let access_Token = data.access_Token
  // console.log(access_Token)
  var options = {
    method: 'GET',
    // A non-existing sample userId is used in the example below.
    url: 'https://api.zoom.us/v2/users/me',
    headers: {
      authorization: `Bearer ${access_Token}`,
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    //return res.send(body)

    console.log(body);
  });
  res.send("getuserDetail API call successful")


}

const createmeeting = function (req, res) {
  let body = req.body;
  console.log(body)
  let access_Token = req.body
  console.log(access_Token)

  var options = {
    uri: "https://api.zoom.us/v2/users/" + "kantshri561@gmai.com" + "/meetings",
    method: "POST",
    body: {
      "topic": "testing meeting",
      "type": 2,
      "start_time": "2022-11-05T20:30:00",
      "duration": "30", // 30 mins
      "password": "123456"
    },
    // oauth:{
    //    Bearer : `Bearer ${access_Token}`
    //  },
    headers: {
      authoraization: `Bearer ${access_Token}`,
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };
  console.log("-------", access_Token),
    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      console.log(body)
    })
  res.send({ status: false, msg: "something Wrong" })
}

module.exports = {
  Authorization,
  getuserDetail,
  signIn,
  createmeeting
}