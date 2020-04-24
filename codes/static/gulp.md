###### gulp 教程：

*英文官网 https://gulpjs.com/*

*中文官网*  https://www.gulpjs.com.cn/

民间参考教程： https://www.jianshu.com/p/87a773a81dbd 

本文所介绍插件： 

1. gulp-clean-css			 --（压缩css文件）
2. gulp-css-assets-hash  --  ( 为 css 样式中 静态文件 url 添加版本号[如 background 的 url, 引入字体文件 等])
3. `gulp-clean `				   --（清理生成的目录, 防止同资源的打包名称不一样导致内存浪费）
4. `gulp-rename  `                 --（重命名文件)
5. `gulp-autoprefixer  `     --  （css 的浏览器兼容处理，添加前缀等）
6. `gulp-babel   `                    -- （es6 语法转换等）
7. `gulp-uglify   `                  -- （压缩 js 文件 ）
8. `gulp-concat `                  -- （合并文件，将多个css（或 js） 文件合并成一个 css （或js文件））
9. `gulp-revm` + `gulp-revm-collector`   -- （对 js、css、图片等静态文件，添加版本号）

###### 一. 铺垫：

> 假设`/static/` 为静态文件目录, `output/`为输出目录
>
> gulp 3.x 与 4.x 版本写法区别：
>
> ```javascript
> /* 引入 （以 创建一个 task 和 使用 src 、 dest 函数为例 */
> // 3.x: 只引入一个 gulp 模块，	去调用gulp 下的方法：
> 
> var gulp = require('gulp');
> 
> gulp.task('funcName', function() {
> 	return gulp.src('/static/**/*‘)
> 	//... ... (其他处理过程)
>     .pipe(gulp.dest('output/'))
> })
> 
> 
> // 4.x: 按需引入对应模块：
> const { src, dest } = require('gulp'); //  (引入多个模块只需要逗号隔开)
>  
> funciton funcName() {
>  return src('/static/**/*')
>  //... ... (其他处理过程)
>     .pipe(dest('output/'))
> }
> 
> // 以下均以当前在用（3.x)版本为例
> ```

###### 二. 正文（插件介绍）

1. ##### gulp-clean-css（压缩css文件）

   > 1. 功能： 
   >
   >    压缩css文件 （去掉换行和多余的空格等）
   >
   > 2. 使用方法：
   >
   >    ```javascript
   >    // 3.x版本：
   >    var cleanCss = require('gulp-clean-css')
   >    
   >    gulp.task('handleCss',function(){
   >        return gulp.src('/static/css/*.css',function() {
   >            .pipe(cleanCss({ compatibility:"ie8"// 让css兼容到ie8 }))
   >            .pipe(gulp.dest('output/'))
   >        })
   >    })
   >    ```

2. #####  `gulp-css-assets-hash`  (为 css 文件中引入的静态文件 添加 版本号)

   > 1. 功能： 
   >
   >     (为 css 样式中 静态文件 url 添加版本号[如 background 的 url, 引入字体文件 等]
   >
   > 2. 使用方法：
   >
   >    ```javascript
   >    // 3.x版本：
   >    var cssHash = require('`gulp-css-assets-hash`')
   >    
   >    gulp.task('handleCssHash',function(){
   >        return gulp.src('/static/css/*.css',function() {
   >            .pipe(cssHash())
   >            .pipe(gulp.dest('output/'))
   >        })
   >    })
   >    ```
   >
   >    

3. ##### `gulp-clean` （清理生成的目录）

   >1. 功能：
   >
   >  清理 构建目录(防止同资源的打包名称不一样导致内存浪费)
   >
   >2. 使用方法：
   >
   >  ```javascript
   >  // 3.x 版本
   >  var clean = require('gulp-clean')
   >  
   >  gulp.task('handleClean', function() {
   >      return gulp.src('output/', { allowEmpty: true })
   >      	.pipe(clean())
   >  })
   >  // !!! allowEmpty解析： 默认为false, src的第一个参数如果没有匹配到文件， 会报错，需要设置为true则不会报错。
   >  ```

4. ##### `gulp-rename` (重命名文件)

   > 1. 功能：
   >
   >    将文件重命名。
   >
   > 2. 用法：
   >
   >    ```javascript
   >      // 3.x 版本
   >      var rename = require('gulp-rename')
   >      
   >      gulp.task('handleRename', function() {
   >          return gulp.src('/static/')
   >          	.pipe(rename('newName'))
   >          	.pipe(gulp.dest('output/'))
   >      })
   >    ```

5. ##### `gulp-babel ` ( es6 语法转换)

   > 1. 功能 
   >
   >    es6 等语法转换 
   >
   > 2. 用法：（需要同时下载：*`gulp-babel@7`、 `babel/core`、 `babel/preset-env`*  或者 *`gulp-babel@7` 、`babel-core` 、`babel-preset-env`* 任一组）
   >
   >    ```javascript
   >    // 根据Babel的版本下载：
   >    # Babel 7
   >    $ npm install --save-dev gulp-babel @babel/core @babel/preset-env
   >    
   >    # Babel 6
   >    $ npm install --save-dev gulp-babel@7 babel-core babel-preset-env
   >    ```
   >
   >    ```javascript
   >     // 3.x 版本
   >      var rename = require('gulp-rename')
   >      
   >      gulp.task('handleBabel', function() {
   >          return gulp.src('/static/')
   >          	.pipe(babel({
   >                presets: ['es2015']  // 要配置具体版本如： 'es2015' ，否则会报错
   >            }))
   >          	.pipe(gulp.dest('output/'))
   >      })
   >    ```

6. ##### gulp-uglify (压缩 js 文件)

   > 1. 功能：
   >
   >    压缩`javascript`文件，减小文件大小(将 js 文件合并成一行)
   >
   > 2. 用法：
   >
   >    ```javascript
   >     	// 3.x 版本
   >      	var uglify = require('gulp-uglify')
   >        
   >    	gulp.task('handleUglify', function() {
   >          return gulp.src('/static/css/*.js')
   >          	.pipe(uglify())	
   >          	.pipe(gulp.dest('output/js'))
   >      })
   >    ```
   >
   >    

7. ##### `gulp-concat` (合并多个文件为一)

   > 1. 功能： 
   >
   >    将多个文件合并为一个，例如用于把 多个`css` 文件合并成一个 `all.css` 等.
   >
   > 2. 用法：
   >
   >    ```javascript
   >     	// 3.x 版本
   >      	var concat = require('gulp-concat')
   >        
   >    	gulp.task('handleConcat', function() {
   >          return gulp.src('/static/css/*.css')
   >          	.pipe(concat('newName.css'))	// 为新文件取新名字
   >          	.pipe(gulp.dest('output/css'))
   >      })
   >    ```

8. ##### `gulp-revm` + `gulp-revm-collector` (对引入html 页面的静态文件 添加版本号)

   *需要两个插件配合使用*
   
   > 1. 功能：
   >
   >    在 `html` 页面中引入的静态文件后，添加类似 `?v=xxxxxx`的版本号，用作刷新缓存等。
   >
   >    ```html
   >    // 生成版本号前: 
   >    <link rel="stylesheet" href="/css/mobile.min.css">
   >    <script src="/js/mobile.min.js"></script>
   >    <img src="/img/icon_coin_bag.png" alt="">
   >    
   >    // 生成版本号后：
   >    <link rel="stylesheet" href="/dev/css/mobile.min.css?v=6f470596d2">
   >    <script src="/dev/js/mobile.min.js?v=0ae417bc25"></script>
   >    <img src="/dev/img/icon_coin_bag.png?v=e4144c3071" alt="">
   >    ```
   >
   > 2. 用法：
   >
   >    ```javascript
   >    // 3.x 版本
   >    // 先
   >      	var concat = require('gulp-concat')
   >        
   >    	gulp.task('handleConcat', function() {
   >          return gulp.src('/static/css/*.css')
   >          	.pipe(concat('newName.css'))	// 为新文件取新名字
   >          	.pipe(gulp.dest('output/css'))
   >      })
   >    ```
   >
   >    
   >
   >    
   >