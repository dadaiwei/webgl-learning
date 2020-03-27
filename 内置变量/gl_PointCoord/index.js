// 获取canvas dom元素
const canvas = document.getElementById('webgl');

// 获取webGl上下文
const gl = canvas.getContext('webgl');

// 获取定点着色器代码
const vertexShaderSource = document.getElementById('vertexShader').innerText;
// 获取片元着色器代码
const fragShaderSource = document.getElementById('fragmentShader').innerText;

var program = initShader(gl, vertexShaderSource, fragShaderSource);
gl.drawArrays(gl.POINTS, 0, 1);


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