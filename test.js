'ui';
threads.start(
  function(){
    //请求截图
    if (!requestScreenCapture()) {
      toast("请求截图失败");
      exit();
    }
  }
 )


function showScreenCapture() {
  var img = captureScreen();
  img = images.scale(img, 0.1, 0.1)
  var imgBase64 = images.toBase64(img)
  var info = {
    type: 'img',
    content: imgBase64
  }
  info = JSON.stringify(info)
  log(info.length)
  return imgBase64
}

ui.layout(
  <vertical>
    <button id='btn'>
      截图
    </button>
    <img id='img' />
  </vertical>
)
ui.btn.on('click',function(){
  setTimeout(() => {
    var imgBase64=showScreenCapture()
    ui.img.attr('src','data:image/png;base64,'+imgBase64)
    
  }, 2000);
})
