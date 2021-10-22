var canvas = document.getElementsByTagName('canvas')[0]; // 获取要下载的图片
var image = document.createElement('img');
document.body.appendChild(image);
image.src = canvas.toDataURL('image/png');
var url = image.src; // 获取图片地址
var a = document.createElement('a'); // 创建一个a节点插入的document
var event = new MouseEvent('click'); // 模拟鼠标click点击事件
a.download = '图片名字尝试初阶'; // 设置a节点的download属性值
a.href = url; // 将图片的src赋值给a节点的href
a.dispatchEvent(event); // 触发鼠标点击事件
