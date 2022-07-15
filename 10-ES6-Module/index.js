/*
// 两种方式混合使用
import Person,{name, age, say} from "./c.js";
let p = new Person();
console.log(p);

console.log(name);
console.log(age);
say();
*/

import icon from "./lnj.jpg";
import "./index.css";

let oImg = document.createElement("img");
oImg.src = icon;
oImg.setAttribute("class", "size");
document.body.appendChild(oImg);
