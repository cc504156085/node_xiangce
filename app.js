
var express = require("express");
var router = require("./controller/router.js");

var app = express();

app.set("view engine","ejs");

//路由中间件
app.use(express.static("./public"));
app.use(express.static("./uploads"));


console.log(__dirname);
app.get("/",router.showIndex);

app.get("/:albumName",router.showAlbum);

app.get("/up",router.showuploads);

app.post("/up",router.doPost);


app.use(function(req,res){
    res.render("err");
})

app.listen(3000);