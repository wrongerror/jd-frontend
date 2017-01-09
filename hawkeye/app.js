import Koa from 'koa'
import cors from 'koa-cors'
import compress from 'koa-compress'
import json from 'koa-json'
import send from 'koa-send'
import views from 'koa-views'
import serve from 'koa-static'
import logger from 'koa-logger'
import convert from 'koa-convert'
import bodyParser from 'koa-bodyparser'
import path from 'path'
import session from "koa-session2";

import { KoaErr } from './helper'

const app = new Koa();
console.log('start app');
// 全局错误处理
if(process.env.NODE_ENV=='production'){
    app.use(async(ctx, next) => {
        try {
            await next()
        } catch (err) {
            await ctx.render('errors/index',{err})
        }
    });
}else {
    app.use(async(ctx, next) => {
        try {
            await next()
        } catch (err) {
            ctx.body = err;
            ctx.status = err.status || 500
        }
    });
}
// 使用自定义错误
app.use(async (ctx, next) => {
  ctx.Err = KoaErr;
  await next()
});

// 设置Header
app.use(async (ctx, next) => {
  await next();
  ctx.set('X-Powered-By', 'Trimtabs')
});

// 设置gzip
app.use(compress({
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}));

// 记录所用方式与时间
app.use(convert(logger()));

// 设置跨域
app.use(convert(cors()));

// 传输JSON
app.use(convert(json()));

// body解析
app.use(bodyParser());

app.use(session({
    // store: new Store(),
    key:'trimtabs-laundry',
    maxAge:7200000
}));

var static_path,rootpath;
if(process.env.NODE_ENV=='production'){
  rootpath=static_path='public';
}else{
  rootpath='app/views';
  static_path='.tmp/public';
}
console.log('rootpath:'+rootpath);
// 设置渲染引擎
app.use(views(path.resolve(__dirname,rootpath ), {
  extension: 'ejs'
}));

app.use(convert(serve(path.resolve(__dirname, static_path))));
// 静态文件夹

// 发送文件，如HTML
app.use(async (ctx, next) => {
  ctx.send = send;
  await next();
});


// 路由
var route = require('./router');
route.init(app);

app.listen(process.env.PORT || 3002);
console.log(`Server up and running! On port ${process.env.PORT || 3002}!`);
