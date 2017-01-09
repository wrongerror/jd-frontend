// var gulp = require('gulp'),
//     os = require('os'),
//     gutil = require('gulp-util'),
//     // less = require('gulp-less'),
//     // concat = require('gulp-concat'),
//     // gulpOpen = require('gulp-open'),
//     uglify = require('gulp-uglify'),
//     // cssmin = require('gulp-cssmin'),
//     // md5 = require('gulp-md5-plus'),
//     // fileinclude = require('gulp-file-include'),
//     // clean = require('gulp-clean'),
//     // spriter = require('gulp-css-spriter'),
//     // base64 = require('gulp-css-base64'),
//     webpack = require('webpack'),
//     webpackConfig = require('./webpack.config.js');
//     // connect = require('gulp-connect');
//
// //mac chrome: "Google chrome",
// // var browser = os.platform() === 'linux' ? 'Google chrome' : (
// //     os.platform() === 'darwin' ? 'Google chrome' : (
// //         os.platform() === 'win32' ? 'chrome' : 'firefox'));
// // var pkg = require('./package.json');
//
// //将图片拷贝到目标目录
// // gulp.task('copy:images', function (done) {
// //     gulp.src(['src/images/**/*']).pipe(gulp.dest('dist/images')).on('end', done);
// // });
//
// //压缩合并css, css中既有自己写的.less, 也有引入第三方库的.css
// // gulp.task('lessmin', function (done) {
// //     gulp.src(['src/css/main.less', 'src/css/*.css'])
// //         .pipe(less())
// //         //这里可以加css sprite 让每一个css合并为一个雪碧图
// //         //.pipe(spriter({}))
// //         .pipe(concat('style.min.css'))
// //         .pipe(gulp.dest('dist/css/'))
// //         .on('end', done);
// // });
//
// //将js加上10位md5,并修改html中的引用路径，该动作依赖build-js
// // gulp.task('md5:js', ['build-js'], function (done) {
// //     gulp.src('dist/js/*.js')
// //         .pipe(md5(10, 'dist/app/*.html'))
// //         .pipe(gulp.dest('dist/js'))
// //         .on('end', done);
// // });
//
// //将css加上10位md5，并修改html中的引用路径，该动作依赖sprite
// // gulp.task('md5:css', ['sprite'], function (done) {
// //     gulp.src('dist/css/*.css')
// //         .pipe(md5(10, 'dist/app/*.html'))
// //         .pipe(gulp.dest('dist/css'))
// //         .on('end', done);
// // });
//
// //用于在html文件中直接include文件
// // gulp.task('fileinclude', function (done) {
// //     gulp.src(['app/views/*.pug','app/tpls/*.pug'])
// //         .pipe(fileinclude({
// //             prefix: '@@',
// //             basepath: '@file'
// //         }))
// //         .pipe(gulp.dest('dist/app'))
// //         .on('end', done);
// //     // .pipe(connect.reload())
// // });
//
// //雪碧图操作，应该先拷贝图片并压缩合并css
// // gulp.task('sprite', ['copy:images', 'lessmin'], function (done) {
// //     var timestamp = +new Date();
// //     gulp.src('dist/css/style.min.css')
// //         .pipe(spriter({
// //             spriteSheet: 'dist/images/spritesheet' + timestamp + '.png',
// //             pathToSpriteSheetFromCSS: '../images/spritesheet' + timestamp + '.png',
// //             spritesmithOptions: {
// //                 padding: 10
// //             }
// //         }))
// //         .pipe(base64())
// //         .pipe(cssmin())
// //         .pipe(gulp.dest('dist/css'))
// //         .on('end', done);
// // });
//
// // gulp.task('clean', function (done) {
// //     gulp.src(['dist'])
// //         .pipe(clean())
// //         .on('end', done);
// // });
//
// gulp.task('watch', function (done) {
//     gulp.watch('src/**/*', ['lessmin', 'build-js', 'fileinclude'])
//         .on('end', done);
// });
//
// // gulp.task('connect', function () {
// //     console.log('connect------------');
// //     connect.server({
// //         root: host.path,
// //         port: host.port,
// //         livereload: true
// //     });
// // });
//
// // gulp.task('open', function (done) {
// //     gulp.src('')
// //         .pipe(gulpOpen({
// //             app: browser,
// //             uri: 'http://localhost:3000/app'
// //         }))
// //         .on('end', done);
// // });
//
// var myDevConfig = Object.create(webpackConfig);
//
// var devCompiler = webpack(myDevConfig);
//
// //引用webpack对js进行操作
// // gulp.task("build-js", ['fileinclude'], function(callback) {
// //     devCompiler.run(function(err, stats) {
// //         if(err) throw new gutil.PluginError("webpack:build-js", err);
// //         gutil.log("[webpack:build-js]", stats.toString({
// //             colors: true
// //         }));
// //         callback();
// //     });
// // });
//
// //发布
// // gulp.task('default', ['connect', 'fileinclude', 'md5:css', 'md5:js', 'open']);
//
// //开发
// // gulp.task('dev', ['connect', 'copy:images', 'fileinclude', 'lessmin', 'build-js', 'watch', 'open']);

// var glob = require('glob');
// var fs = require("fs");
// var coffeeConcat = require('gulp-coffeescript-concat');
var gulp = require('gulp'),
    coffee=require('gulp-coffee'),
    uglify=require('gulp-uglify'),
    cssnano=require('gulp-cssnano'),
    minify=require('gulp-minify'),
    clean=require('gulp-clean'),
    pug=require('./gulp-pug'),
    sass=require('gulp-sass'),
    plumber=require('gulp-plumber'),
    webpack = require('webpack-stream'),
    wp = require('webpack'),
    fs=require('fs'),
    inject = require('gulp-inject');
    // bower = require('main-bower-files');

// gulp.task('es6', function () {
//     // glob("./app/**/*.coffee", function(err, files) {
//     //     console.log(files);
//     //     files.forEach(function (file) {
//     //         console.log( coffeeConcat(file))
//     //             // .pipe(fs.createWriteStream('.temp/public/'+file.replace('./app/','')));
//     //     });
//     //
//     // });
//     gulp.src(['app/*.coffee', 'app/**/*.coffee'])
//         .pipe(coffeeConcat('all.coffee'))
//         .pipe(gulp.dest('.temp/public/'));
// });

var webpack_config_dev=function (name,path) {
    var config={
        // devtool: "source-map",
        externals: {
            "jquery": "jQuery",
            "underscore": "underscore",
            "lodash": "_",
        },
        devtool: false,
        module: {
            loaders: [
                {
                    test: /\.(scss|css)$/,
                    loaders: [
                        "style", "css", "sass"
                    ]
                }
            ],
        },
        plugins: [
            new wp.LoaderOptionsPlugin({
                test: /\.js$/,
                // minimize: true,
                debug: false,
                options: {
                    exclude: /(node_modules|bower_components)/,
                }
            }),
        ],
        output: {
            filename: name,
            pathinfo: true,
            // chunkFilename: 'chunk-'+name
        }
    };
    if(path!=undefined){
       config. entry={
            app: __dirname+'/'+ path,
        };
    }
    return config;
};
var webpack_config=function (name,path) {
    var config={
        // devtool: "source-map",
        externals: {
            "jquery": "jQuery",
            "underscore": "underscore",
            "lodash": "_",
        },
        devtool: false,
        module: {
            loaders: [
                {
                    test: /\.(scss|css)$/,
                    loaders: [
                        "style", "css", "sass"
                    ]
                }
            ],
        },
        plugins: [
            new wp.LoaderOptionsPlugin({
                test: /\.js$/,
                minimize: true,
                debug: false,
                options: {
                    exclude: /(node_modules|bower_components)/,
                }
            }),
            new wp.optimize.UglifyJsPlugin({minimize: true}),
            new wp.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        ],
        output: {
            filename: name,
            // pathinfo: true,
            // chunkFilename: 'chunk-'+name
        }
    };
    if(path!=undefined){
       config. entry={
            app: __dirname+'/'+ path,
        };
    }
    return config;
};
//deal js
gulp.task('copy-js',function(done) {
    gulp.src(['app/tpls/**/*.{coffee,js.map}','app/views/**/*.{coffee,js.map}','app/coffee/**/*.{coffee,js.map}']).pipe(gulp.dest('.tmp/public'));//.on('end', done);
    // gulp.src(['app/tpls/**/*.js','app/views/**/*.js'])
    //     .pipe(webpack({output: {
    //         filename: '[name].js',
    //         devtool: false,
    //     }
    //     })).pipe(gulp.dest('.tmp/public'));//.on('end', done);
    done();
});
gulp.task('copy-js2',function (done) {
    gulp.src(['app/tpls/**/*.js','app/views/**/*.js'])._transform=function (file,encoding,cb) {
        var path=file.path.replace(__dirname+'/', '');
        var name=path;
        name=path.substr(name.lastIndexOf('/')+1);
        console.log('concat js file:'+path);
        var _path=path.replace('/'+name,'').replace('app/views','').replace('app/tpls','');
        gulp.src(path).pipe(
            webpack(webpack_config(name),wp
            )).on('error', function (error) {
            console.error('' + error);
        }).pipe(gulp.dest('.tmp/public'+_path));
    };
    done();
});

gulp.task('uglify-js',function (done) {
    gulp.src(['.tmp/public/**/*.js','!.tmp/public/bower_components/**']).pipe(uglify()).pipe(gulp.dest('public')).on('end', done);
});
//deal html
gulp.task('copy-html',function(done) {
    gulp.src('app/tpls/**/*.html').pipe(gulp.dest('.tmp/public')).pipe(minify()).pipe(gulp.dest('public'));//.on('end', done);
    done();
});
gulp.task('mini-html',function (done) {
    // gulp.src('app/tpls/**/*.html')
    //     .pipe(minify())
    //     .pipe(gulp.dest('public')).on('end', done);
});
//deal css
gulp.task('copy-css',function(done) {
    gulp.src(['app/tpls/**/*.{css,css.map,scss}','app/views/**/*.{css,css.map,scss}']).pipe(gulp.dest('.tmp/public'));// .on('end', done);
    done();
});
gulp.task('mini-css',function (done) {
    gulp.src(['app/views/**/*.css','app/tpls/**/*.css']).pipe(cssnano({
        autoprefixer: {browsers: ['> 1%', 'last 2 versions', 'IE >= 9']},
        postcssReduceIdents: {
        keyframes: false,
    }})).pipe(gulp.dest('public'));
    done();
});
//media
gulp.task('copy-media',function(done) {
    gulp.src(['app/src/**/*.{jpg,png,jpeg,mp3,mp4,appcache,ico,js}','app/tpls/**/*.{jpg,jpeg,ico,png,mp3,mp4,appcache}','app/views/**/*.{jpg,jpeg,ico,png,mp3,mp4,appcache}']).pipe(gulp.dest('.tmp/public')).pipe(gulp.dest('public')).on('end', done);
});
//copy html
gulp.task('copy-ejs',function (done) {
   gulp.src(['app/views/**/*.ejs'])
       ._transform=function  (file, encoding, cb) {
       var data = fs.readFileSync(file.path, encoding);

       console.log('cp:' + file.path);

       // data=data.replace(/"\/bower_components/g, '"http://source.wedor.cn/bower_components');
       var path=file.path.replace('app/views','public');
       fs.writeFile(path, data, (err) => {
           if (err) throw err;
       });
       cb();
   };
   done();
});
//deal source
gulp.task('copy-bower',function (done) {
    console.log('copy-bower');
    // gulp.series(function () {
    //     gulp.src(['.tmp/public/bower_components/**/*.js'], {read: false}).pipe(clean()).on('end', done);
    // });
    // gulp.src('./bower.json')
    // gulp.src(bower()).pipe(gulp.dest('.tmp/public/bower_components/')).on('end', done);
    gulp.src('bower_components/**').pipe(gulp.dest('.tmp/public/bower_components'));//.on('end', done);
    // !{md,json,ps1,scss,coffee,nuspec,csslintrc,sass,less,jshintrc,yml,map}
    // gulp.src('bower_components/**').pipe(gulp.dest('public/bower_components'));//.on('end', done);
    done()
});
gulp.task('clear-all',function (done) {
    del(['public/**','.tmp/public/**']);
    // gulp.src(['public/**'],{read:false}).pipe(clean({force:true})).on('end',
    // function () {
    //    gulp.src(['.tmp/public/**'],{read:false}).pipe(clean({force:true}));//.on('end',done);
    // });
    done()
});
// gulp.task('coffee',function (done) {
//     gulp.src(['app/tpls/**/*.coffee','app/views/**/*.coffee']).pipe(coffee()).pipe(gulp.dest(''))
// });
gulp.task('reload-all',gulp.series('copy-ejs','copy-css','mini-css','copy-html','mini-html','copy-js','copy-js2','uglify-js','copy-media','copy-bower'));
gulp.task('default',function (done) {
    // gulp.watch(['app/tpls/**/*.js','app/views/**/*.js'
    //     //,'app/coffee/**/*.js'
    // ],gulp.series('copy-js','uglify-js'));
    // gulp.watch(['.tmp/public/**/*.js','!.tmp/public/bower_components/**'],gulp.series('uglify-js'));
    gulp.watch(['app/**/*.html'],gulp.series('copy-html','mini-html'));
    gulp.watch(['app/**/*.css'],gulp.series('copy-css','mini-css'));
    gulp.watch(['app/views/**/*.ejs']) //,gulp.series('copy-ejs'));
        .on('change',function (path) {
            console.log('cp:' + path);
            path=__dirname+'/'+path;
            var data = fs.readFileSync(path,'utf8');
            // data=data.replace(/"\/bower_components/g, '"http://source.wedor.cn/bower_components');
            path=path.replace('app/views','public');
            //TODO mkdir
            fs.writeFile(path, data,(err) => {
                if (err) {
                    throw err;
                }
            });

        });

    // gulp.watch(['app/pug/**/*.ejs'],gulp.series('deal-pug'));
    // gulp.watch(['bower_components/**'],gulp.series('copy-bower'));
    // gulp.watch(['app/tpls/**/*.coffee','app/views/**/*.coffee'],gulp.series('coffee'));
    gulp.watch(['app/tpls/**/*.coffee','app/views/**/*.coffee'])
        .on('unlink' , function(path, stats){
            console.log('delete coffee');
            path = path.replace(__dirname, '').replace('app/views/','').replace('app/tpls/','').replace('app/coffee/','');
            gulp.src(['.tmp/public/' + path], {read: false}).pipe(plumber()).pipe(clean());
            path = path.replace('.coffee', '.js');
            gulp.src(['.tmp/public/' + path, '.tmp/public/' + path + '.map', 'public/' + path], {read: false}).pipe(plumber()).pipe(clean());
        }
    );
    gulp.watch(['app/views/**/*.pug','app/tpls/**/*.pug'])
        .on('unlink', function (path, stats) {
            console.log('delete pug');
            path = path.replace(__dirname, '').replace('app/views/', '').replace('app/tpls/', '').replace('.pug', '.html');
            gulp.src(['.tmp/public/' + path, 'public/' + path], {read: false}).pipe(plumber()).pipe(clean());
        }
    );
    gulp.watch(['app/**/*.scss'])
        .on('unlink', function (path, stats) {
            console.log('delete scss' );
            path = path.replace(__dirname, '').replace('app/views/', '').replace('app/tpls/', '');
            gulp.src(['.tmp/public/' + path], {read: false}).pipe(plumber()).pipe(clean());
            path = path.replace('.scss', '.css');
            gulp.src(['.tmp/public/' + path, '.tmp/public/' + path + '.map', 'public/' + path], {read: false}).pipe(plumber()).pipe(clean());
        }
    );
    gulp.watch(['app/src/**/*.{png,jpg,jpeg,mp3,mp4,appcache,ico,js}','app/views/**/*.{png,jpg,jpeg,mp3,mp4,appcache,ico}','app/tpls/**/*.{png,jpg,jpeg,mp3,mp4,appcache,ico}'])
        .on('change',gulp.series('copy-media'))
        .on('add',gulp.series('copy-media'))
        .on('unlink', function (path, stats) {
            console.log('delete media');
            path = path.replace(__dirname, '').replace('app/views/', '').replace('app/tpls/', '');
            try {
                gulp.src(['.tmp/public/' + path, 'public/' + path], {read: false}).pipe(plumber()).pipe(clean());
            }catch(e) {

            }
        }
    );

    gulp.watch(['app/pug/**/*.pug'])
        .on('change',function (path) {
            console.log('refresh pug files');
            path=path.replace(__dirname, '');
            path=path.replace('.pug','');
            path=path.substr(path.lastIndexOf('/')+1);

            gulp.src(['app/views/**/*.pug','app/tpls/**/*.pug'],{read:false})
                ._transform=function  (file, encoding, cb) {
                    var data=fs.readFileSync(file.path,encoding);
                    if(data.match(new RegExp('(extends|include)\\s+.*'+path+'\\W'))!=null){
                        gulp.src(file.path).pipe(pug({ejs:true})).pipe(gulp.dest(file.path.substr(0,file.path.lastIndexOf('/'))))
                            // .on('end', cb);
                    }else {
                    }
                cb();
            };
        });
    gulp.watch(['app/sass/**/*.scss'])
        .on('change',function (path) {
            console.log('refresh scss files');
            path=path.replace(__dirname, '');
            path=path.replace('.scss','');
            path=path.substr(path.lastIndexOf('/')+1);

            gulp.src(['app/views/**/*.scss','app/tpls/**/*.scss'],{read:false})
                ._transform=function  (file, encoding, cb) {
                var data = fs.readFileSync(file.path, encoding);

                if (data.match(new RegExp('@import\\s+.*' + path + '\";(\\W|$)')) != null) {
                    gulp.src(file.path).pipe(sass()).pipe(gulp.dest(file.path.substr(0, file.path.lastIndexOf('/'))))
                        .on('end', cb);
                } else {
                    cb();
                }
            }
        });

    //TODO 多向反推
    gulp.watch(['app/coffee/**/*.js'])
        .on('change',function (ppath) {
            console.log('refresh es6 files');
            ppath=ppath.replace(__dirname, '');
            ppath=ppath.substr(ppath.lastIndexOf('coffee/'));

            gulp.src(['app/views/**/*.es6','app/tpls/**/*.es6'],{read:false})
                ._transform=function  (file, encoding, cb) {
                var data=fs.readFileSync(file.path,encoding);

                if(data.match(new RegExp('import\\s+.*'+ppath+'(\"|\')(\\W|$)'))!=null) {
                    var path=file.path.replace('.es6','.js');
                    var path=path.replace(__dirname+'/', '');

                    var name=path.substr(path.lastIndexOf('/')+1);
                    var _path=path.replace('/'+name,'').replace('app/views','').replace('app/tpls','');

                    // gulp.src(path).pipe(webpack(webpack_config(name,path), wp
                    //     )).on('error', function (error) {
                    //     console.error('' + error);
                    // }).pipe(gulp.dest('.tmp/public' + _path));
                    //
                    // gulp.series('copy-js', 'uglify-js');

                    gulp.src(path).pipe(
                        webpack(
                            webpack_config_dev(name,path),wp
                        )).on('error', function (error) {
                        console.error('' + error);
                    }).pipe(gulp.dest('.tmp/public'+_path));

                    gulp.src(path).pipe(
                        webpack(
                            webpack_config(name,path),wp
                        )).on('error', function (error) {
                        console.error('' + error);
                    }).pipe(gulp.dest('public'+_path));

                    gulp.series('copy-js');

                }
                cb();
            };
        });

    gulp.watch(['app/tpls/**/*.js','app/views/**/*.js'])
        .on('change',function (path) {
            var name=path.substr(path.lastIndexOf('/')+1);
            console.log('concat es6 file:'+name);
            var _path=path.replace('/'+name,'').replace('app/views','').replace('app/tpls','');
            gulp.src(path).pipe(
             webpack(
                webpack_config_dev(name,path),wp
            )).on('error', function (error) {
                console.error('' + error);
            }).pipe(gulp.dest('.tmp/public'+_path));

            gulp.src(path).pipe(
             webpack(
                webpack_config(name,path),wp
            )).on('error', function (error) {
                console.error('' + error);
            }).pipe(gulp.dest('public'+_path));

            gulp.series('copy-js');
        });



    // gulp.watch(['app/**/*.html','app/**/*.js','app/**/*.coffee','app/**/*.css'], ['copy']);
    // var watcher=
    // watcher.on('change', function (event) {
    //     console.log(event)
    //     if (stats === 'deleted') {
    //         console.log(event)
    //         // // Simulating the {base: 'src'} used with gulp.src in the scripts task
    //         // var filePathFromSrc = path.relative(path.resolve('app'), event.path);
    //         // // Concatenating the 'build' absolute path used by gulp.dest in the scripts task
    //         // var destFilePath = path.resolve('.tmp/public', filePathFromSrc);
    //         //
    //         // del.sync(destFilePath);
    //     }
    // });
    done();
});
