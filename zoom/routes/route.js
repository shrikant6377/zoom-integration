const express=require("express");

const controller=require("../controller/controller.js")

var Router=express.Router();
Router.get("/signIn",controller.signIn )
Router.post("/Authorization",controller.Authorization )
Router.get("/getuserDetail",controller.getuserDetail )
Router.get("/createmeeting", controller.createmeeting)

module.exports=Router