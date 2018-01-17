


var file = require("../models/file.js");

var formidable = require('formidable');
var fs = require("fs");
var path = require("path");
var sd = require("silly-datetime");

exports.showIndex= function(req,res,next){

    console.log(__dirname);

    file.getAllAlbums(function(err,allAlabums){
        if(err){
            next();
            return;
        }
        res.render("index",{
            "albums":allAlabums
        });
    })
   
}


exports.showAlbum= function(req,res,next){

    var albumName = req.params.albumName;

    file.getAllImagesByAlbumName(albumName,function(err,imagesArray){
        if(err){
            next();
            return;
        }
        res.render("album",{
            "albumname":albumName,
            "images" : imagesArray
        });
    // })
    // res.send("我是相册页"+req.params.albumName);
})

}


exports.showuploads= function(req,res,next){

    // var albumName = req.params.albumName;

    // file.getAllImagesByAlbumName(albumName,function(err,imagesArray){
    //     if(err){
    //         next();
    //         return;
    //     }
    file.getAllAlbums(function(err,albums){
        res.render("uploads",{
            albums:albums
        });
    })
       
    // })
    // res.send("我是相册页"+req.params.albumName);
// })

}



//上传表单
exports.doPost = function(req,res){
    var form = new formidable.IncomingForm();

    form.uploadDir = path.normalize(__dirname + "/../tempup/");

    form.parse(req, function(err, fields, files,next) {
        console.log(fields);
        console.log(files);
        //改名
        if(err){
            next();     //这个中间件不受理这个请求了，往下走
            return;
        }
        //判断文件尺寸
        var size = parseInt(files.tupian.size);
        if(size > 20000){
            res.send("图片尺寸应该小于1M");
            //删除图片
            fs.unlink(files.tupian.path);
            return;
        }

        var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
        var ran = parseInt(Math.random() * 89999 + 10000);
        var extname = path.extname(files.tupian.name);

        var wenjianjia = fields.wenjianjia;
        var oldpath = files.tupian.path ;
        var newpath = path.normalize(__dirname + "/../uploads/" + wenjianjia + "/" + ttt + ran + extname);
        fs.rename(oldpath,newpath,function(err){
            if(err){
                res.send("改名失败");
                return;
            }
            res.send("成功");
        });
    });
    return;
}

// exports.doPost= function(req,res){

  
//     var form = new formidable.IncomingForm();

//     form.uploadDir = path.normalize(__dirname + "/../tempup/");
 
//     form.parse(req, function(err, fields, files,next) {



//             console.log(fields);
//             console.log(files);

//             if(err){
//                 next();
//                 return;
//             }

//             //判断文件尺寸
//             var size = parseInt(files.tupian.size);
//             if(size > 20000){
//                 res.send("图片尺寸应该小于1M");
//                 //删除图片
//                 fs.unlink(files.tupian.path);
//                 return;
//             }

//         var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
//         var ran = parseInt(Math.random() * 89999 + 10000);
//         var extname = path.extname(files.tupian.name);




//         var wenjianjia = fields.wenjianjia;
//         var oldpath = files.tupian.path ;
//         var newpath = path.normalize(__dirname + "/../uploads/" + wenjianjia + "/" + ttt + ran + extname);
            

//         fs.rename(oldpath,newpath,function(err){
//             if(err){
//                 res.send("改名失败");
//                 return;
//             }
//             res.send("成功");
//         });

//     //   res.writeHead(200, {'content-type': 'text/plain'});
//     //   res.write('received upload:\n\n');
//     //   res.end(util.inspect({fields: fields, files: files}));
//     });
 
//     return;
  

// }


//相册页
// exports.showAlbum = function(req,res,next){
//     //遍历相册中的所有图片
//     var albumName = req.params.albumName;
//     //具体业务交给model
//     file.getAllImagesByAlbumName(albumName,function(err,imagesArray){
//         if(err){
//             next(); //交给下面的中间件
//             return;
//         }
//         res.render("album",{
//             "albumname" : albumName,
//             "images" : imagesArray
//         });
//     });
// };

