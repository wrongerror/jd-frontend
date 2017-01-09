/**
 * Created by guoyu on 16/7/25.
 */
/**
 * 动态遍历目录加载路由工具
 * author: bling兴哥
 */
import fs from "fs"

// 动态路由
var loadRoute = {
    path : './router/',
    app : null,
    // 遍历目录
    listDir : function(dir){
        var fileList = fs.readdirSync(dir,'utf-8');
        for(var i=0;i<fileList.length;i++) {
            var stat = fs.lstatSync(dir + fileList[i]);
            // 是目录，需要继续
            if (stat.isDirectory()) {
                this.listDir(dir + fileList[i]  + '/');
            } else {
                this.loadRoute(dir + fileList[i]);
            }
        }
    },
    // 加载路由
    loadRoute : function(routeFile){
        console.log(routeFile);
        // import route from routeFile.substring(0,routeFile.lastIndexOf('.'));

        var route = require(routeFile.substring(0,routeFile.lastIndexOf('.')));
        // console.log(route);
        // 在路由文件中定义了一个basePath变量，设置路由路径前缀
        this.app.use(route.default.routes());
        // if(route.basePath){
        //     this.app.use(route.basePath,route);
        // }else{
        //     this.app.use(route);
        // }
    },
    // 初始化入口
    init : function(app,path){
        if(!app){
            console.error("系统主参数App未设置");
            return false;
        }
        this.app = app;
        this.path = path?path:this.path;
        this.listDir(this.path);
    }
};

module.exports = loadRoute;