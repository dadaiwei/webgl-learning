//通过getElementById()方法获取canvas画布
var canvas = document.getElementById('webgl');
//通过方法getContext()获取WebGL上下文
var gl = canvas.getContext('webgl');

//顶点着色器源码
var vertexShaderSource = document.getElementById('vertexShader').innerText;

//片元着色器源码
var fragShaderSource = document.getElementById('fragmentShader').innerText;
//初始化着色器
var program = initShader(gl, vertexShaderSource, fragShaderSource);
//获取顶点着色器的位置变量apos
var aposLocation = gl.getAttribLocation(program, 'apos');

//创建立方体的顶点坐标数据
var data = new Float32Array([
  //z为0.5时，xOy平面上的四个点坐标
  0.5, 0.5, 0.5,
  -0.5, 0.5, 0.5,
  -0.5, -0.5, 0.5,
  0.5, -0.5, 0.5,
  //z为-0.5时，xOy平面上的四个点坐标
  0.5, 0.5, -0.5,
  -0.5, 0.5, -0.5,
  -0.5, -0.5, -0.5,
  0.5, -0.5, -0.5,
  //上面两组坐标分别对应起来组成一一对
  0.5, 0.5, 0.5,
  0.5, 0.5, -0.5,

  -0.5, 0.5, 0.5,
  -0.5, 0.5, -0.5,

  -0.5, -0.5, 0.5,
  -0.5, -0.5, -0.5,

  0.5, -0.5, 0.5,
  0.5, -0.5, -0.5,
]);

//创建缓冲区对象
var buffer = gl.createBuffer();
//绑定缓冲区对象
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//顶点数组data数据传入缓冲区
gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
//缓冲区中的数据按照一定的规律传递给位置变量apos
gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0);
//允许数据传递
gl.enableVertexAttribArray(aposLocation);

//LINE_LOOP模式绘制前四个点
gl.drawArrays(gl.LINE_LOOP, 0, 4);
//LINE_LOOP模式从第五个点开始绘制四个点
gl.drawArrays(gl.LINE_LOOP, 4, 4);
//LINES模式绘制后8个点
gl.drawArrays(gl.LINES, 8, 8);

//声明初始化着色器函数
function initShader(gl, vertexShaderSource, fragmentShaderSource) {
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);
  return program;
}