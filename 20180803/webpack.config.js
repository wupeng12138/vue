// var webpack = require("webpack");

// var path = require("path");


// module.exports = {
//     // entry : __dirname + "/src/a.js",//记录入口文件的文件路径(包括文件名)   __dirname变量记录当前文件所在路径
//     entry : { //当有多个入口文件时  需要将entry属性变为对象类型  对象下属性名为输出文件名,属性值为对应入口文件
//         index : __dirname + "/src/a.js",
//         goods : __dirname + "/src/g.js"
//     },
//     output : {  //配置输出文件相关配置(文件路径以及文件名等等)
//         path : path.resolve(__dirname ,"dist") ,//只能放输出文件路径(不能包含文件名)
//         filename : "[name].js", //配置输出文件的文件名(只放文件名)
//         // (当配置有多个入口文件时,此处的文件名不能是固定值,而应该采用变量[name] 它指向entry的属性名)
//         publicPath : "/"
//     },
//     devtool : "source-map", //开启资源地图模式
//     devServer : {
//         contentBase :__dirname+"/dist/",//配置本地web服务根目录
//         port : 3000, //端口号
//         inline : true, //自动刷新
//         // compress : true,
//         // hot : true,
//         // publicPath : "/",
//         // historyApiFallback : true,
//         // disableHostCheck : true
//     },
//     module : {
//         rules : [
//             {test:/\.css$/,loader:"style-loader!css-loader"},
//             // {test:/\.less$/,loader:"style-loader!css-loader!less-loader"},
//             // {test:/\.scss$/,loader:"style-loader!css-loader!sass-loader"},
//             // {test:/\.js$/,exclude:/node_modules/,loader:"babel-loader?presets[]=env"},
//         ]
//     },
//     plugins :[
//         new webpack.ProvidePlugin({//配置全局变量(引入模块,其作用范围在全局范围内生效)
//             $ : "jquery"
//         })
//     ]

// }







let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebapckPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  // entry:'./src/index.js',
  entry: {
    //输出要求多输出
    app: './src/index.js',
    'vendor/jquery': 'jquery',
    'common/b': './src/mod/b',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),//指定编译目录  不写默认指定到dist
    publicPath: '/', //指定虚拟目录 不写指向编译目录
    // filename: 'js/[name].js'//以编译目录为根的出口文件路径
    filename: 'js/[name].js'//以编译目录为根的出口文件路径
  },
  module: {
    rules: [
      // {test:/\.css$/,use:'style-loader!css-loader'}
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { 
        test: /\.css$/, 
        use: ExtractTextWebapckPlugin.extract({
          use: 'css-loader'
        })
      },

      {
        test: /\.js$/,
        exclude: /node_modules/, //排除
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      },

      {
        test:/\.(png|jpg|gif)/,
        use:[{
          loader: 'url-loader',
          options: {
            limit: 5000,
            outputPath: 'imgs/', //5000意思存到images
          }
        }]
      }

    ]
  },
  
  mode: 'development', // | production 区别环境
  devServer: {
    port: 8088,
    open: true,
    // hot:true
  },
  // devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.css', '.json', '.jsx', '.png', '.vue']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',//默认到output目录
      hash: true,//防止缓存,会给文件后面加入hash
      minify: {
        removeAttributeQuotes: true//压缩 去掉引号
      }
    }),
    new ExtractTextWebapckPlugin('css/[name][hash:6].css'),//css抽出位置
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname,'src','static'), to: path.resolve(__dirname,'dist/static') }
    ])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        jq: {// 自定义
          test: /jquery/,
          chunks: 'initial',//有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
          name: 'vendor/jquery',//拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；设置ture则使用默认值
          priority: 10//表示缓存的优先级
        },
        cm: {
          test: /mod/,
          chunks: 'initial',
          name: 'common/b',
          priority: 10
        }
      }
    }
  }
}