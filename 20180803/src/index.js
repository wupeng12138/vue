// let oDiv = document.querySelector('#app');
// oDiv.innerHTML="bbb";





import moda from './mod/a';
import $ from 'jquery';
// let moda = require('./mod/a');

// require('style-loader!css-loader!./assets/css/a.css'); //全局导入
require('./assets/css/a'); //全局导入
// let style = require('./assets/css/a.css'); //模块化导入  class="style.类型"

import img from './assets/img/a.png';
import bg from './assets/img/bg.jpg';

import modb from './mod/b';

$(function(){console.log('jq...');})

let oDiv = document.querySelector('#app');
oDiv.innerHTML=moda.a

// $('#app').html(moda.a+modb.b);

/* 
let oImg=new Image();
oImg.src=img;

oDiv.appendChild(oImg);
document.body.style.background='url('+bg+')'; */