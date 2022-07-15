// const icon = require("./lnj.jpg");
const icon = require("../images/abc.jpg");
const _ = require("../css/index.css");
// file-loader处理之后我们导入图片拿到的是图片打包之后的地址

let oImg = document.createElement("img");
oImg.src = icon;
oImg.setAttribute("class","size");
document.body.appendChild(oImg);
