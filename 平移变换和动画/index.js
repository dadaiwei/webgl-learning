// 获取canvas dom元素
const canvas = document.getElementById('webgl');

// 获取webGl上下文
const gl = canvas.getContext('webgl');

// 获取定点着色器代码
const vertexShaderSource = document.getElementById('vertexShader').innerText;
// 获取片元着色器代码
const fragShaderSource = document.getElementById('fragmentShader').innerText;

var program = initShader(gl, vertexShaderSource, fragShaderSource);

// 获取顶点着色器的位置变量apos，即aposLocation指向apos变量。
const aposLocation = gl.getAttribLocation(program, 'apos');

// 矩形四个顶点坐标的数据
const data = new Float32Array([
  0.0, 0.0, 1.0,
  0.0, 1.0, 0.0,
  1.0, 0.0, 0.0
]);


// 创建缓冲区对象
const buffer = gl.createBuffer();

// 绑定缓冲区对象，激活buffer
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

function drawWebGlInterval() {
  for (let i = 0; i < 9; i += 3) {
    data[i] -= 0.05;
  }
  drawWebGl();
}

const interval = setInterval(() => {
  if (data[0] >= -1.0) {
    drawWebGlInterval();
  } else {
    clearInterval(interval);
  }
}, 50);


function drawWebGl() {
  // 顶点数据传入缓冲区
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  // 缓冲区中的数据按照一定的规律传递给变量apos
  gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0);

  // 允许数据传递
  gl.enableVertexAttribArray(aposLocation);

  // 开始绘制图形
  gl.drawArrays(gl.TRIANGLES, 0, 4);
};


function initShader(gl, vertexShaderSource, fragementShaderSource) {
  // 创建顶点着色器对象
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  // 创建片元着色器对象
  const fragementShader = gl.createShader(gl.FRAGMENT_SHADER);

  // 引入顶点、片元着色器源代码
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.shaderSource(fragementShader, fragementShaderSource);

  // 编译顶点、片元着色器代码
  gl.compileShader(vertexShader);
  gl.compileShader(fragementShader);

  // 创建程序对象program
  const program = gl.createProgram();
  // 附着顶点着色器和片元着色器到program
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragementShader);

  // 链接program
  gl.linkProgram(program);

  // 使用program
  gl.useProgram(program);

  // 返回program
  return program;
}

function initShader(gl, vertexShaderSource, fragementShaderSource) {
  // 创建顶点着色器对象
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  // 创建片元着色器对象
  const fragementShader = gl.createShader(gl.FRAGMENT_SHADER);

  // 引入顶点、片元着色器源代码
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.shaderSource(fragementShader, fragementShaderSource);

  // 编译顶点、片元着色器代码
  gl.compileShader(vertexShader);
  gl.compileShader(fragementShader);

  // 创建程序对象program
  const program = gl.createProgram();
  // 附着顶点着色器和片元着色器到program
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragementShader);

  // 链接program
  gl.linkProgram(program);

  // 使用program
  gl.useProgram(program);

  // 返回program
  return program;
}