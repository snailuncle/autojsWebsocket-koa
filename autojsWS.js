//请求截图
if(!requestScreenCapture()){
  toast("请求截图失败");
  exit();
}
importClass(android.util.Base64)
// 新建一个WebSocket
// 指定web socket的事件回调在当前线程（好处是没有多线程问题要处理，坏处是不能阻塞当前线程，包括死循环）
// 不加后面的参数则回调在IO线程
// let ws = web.newWebSocket("wss://echo.websocket.org", {
let ws = web.newWebSocket("ws://192.168.12.109:3000", {
    eventThread: 'this'
});
console.show();
// 监听他的各种事件
ws.on("open", (res, ws) => {
    log("WebSocket已连接");
}).on("failure", (err, res, ws) => {
    log("WebSocket连接失败");
    console.error(err);
}).on("closing", (code, reason, ws) => {
    log("WebSocket关闭中");
}).on("text", (text, ws) => {
    console.info("收到文本消息: ", text);
    if(text==='screenCapture'){
      alert('screenCapture')
      showScreenCapture(ws)
    }else if(text==='launchQQ'){
      alert('launchQQ')
      launchApp('QQ')
    }else{
      alert('其他消息'+text)
    }
}).on("binary", (bytes, ws) => {
    console.info("收到二进制消息:");
    console.info("hex: ", bytes.hex());
    console.info("base64: ", bytes.base64());
    console.info("md5: ", bytes.md5());
    console.info("size: ", bytes.size());
    console.info("bytes: ", bytes.toByteArray());
}).on("closed", (code, reason, ws) => {
    log("WebSocket已关闭: code = %d, reason = %s", code, reason);
});


// 发送图片
function showScreenCapture(ws){
  var img = captureScreen();
  img=images.scale(img, 0.5, 0.5)
  var imgBase64=images.toBase64(img)
  var info={
    type:'img',
    content:'data:image/png;base64,'+imgBase64
  }
  info = JSON.stringify(info)
  ws.send(info);
}

// 发送文本消息
log("发送消息: Hello, WebSocket!");
ws.send("Hello, WebSocket!");
// setTimeout(() => {
//     // 两秒后发送二进制消息
//    log("发送二进制消息: 5piO5aSp5L2g6IO96ICDMTAw5YiG44CC");
//    ws.send(web.ByteString.decodeBase64("5piO5aSp5L2g6IO96ICDMTAw5YiG44CC"));
// }, 2000);
// setTimeout(() => {
//     // 8秒后断开WebSocket
//     log("断开WebSocket");
//     // 1000表示正常关闭
//     ws.close(1000, null);
// }, 8000);
// setTimeout(() => {
//     log("退出程序");
// }, 12000)
setInterval(
  ()=>{},1000
)
