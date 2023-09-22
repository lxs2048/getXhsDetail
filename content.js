let BTN_MOVING = false;
function setBtnStyle(btn, text) {
  btn.innerText = text;
  btn.style.position = "fixed";
  btn.style.top = "100px";
  btn.style.left = "100px";
  btn.style.zIndex = 9999;
  btn.style.padding = "10px";
  btn.style.border = "none";
  btn.style.outline = "none";
  btn.style.background = "#000";
  btn.style.color = "#fff";
  btn.style.cursor = "pointer";
  btn.style.fontSize = "16px";
  btn.style.fontWeight = "bold";
  btn.style.borderRadius = "5px";
  btn.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
}

function setMessageStyle(message) {
  message.style.position = "fixed";
  message.style.top = "10px";
  message.style.zIndex = 9999;
  message.style.padding = "10px";
  message.style.border = "none";
  message.style.outline = "none";
  message.style.background = "#2ba33e";
  message.style.color = "#fff";
  message.style.cursor = "pointer";
  message.style.fontSize = "16px";
  message.style.fontWeight = "bold";
  message.style.borderRadius = "5px";
  message.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
  message.style.left =
    (document.body.clientWidth - message.clientWidth) / 2 + "px";
}

function closeModal(){
  let closeElement = document.querySelector('.close-circle');
  if (closeElement) {
    closeElement.click();
  } else {
    console.log("没有找到类名为'close'的元素");
  }
}

function executeCopy() {
  let titleElement = document.getElementById("detail-title");
  let descElement = document.getElementById("detail-desc");

  let titleText = titleElement ? titleElement.innerText : "";
  let descText = descElement ? descElement.innerText : "";

  let result = titleText + '\n' + descText;

  navigator.clipboard.writeText(result).then(
    function () {
      /* clipboard successfully set */
      let message = document.createElement("div");
      message.innerText = "内容已复制到剪贴板！";
      // 提示消息的样式
      setMessageStyle(message);
      document.body.appendChild(message);
      // 自动关闭按钮
      closeModal()

      setTimeout(function () {
        document.body.removeChild(message);
      }, 2000);
    },
    function () {
      /* clipboard write failed */
      alert("复制失败！");
    }
  );
}

function moveBtn(btn) {
  let isDragging = false;
  let diffX = 0;
  let diffY = 0;
  
  btn.onmousedown = function(event) {
    isDragging = true;
    BTN_MOVING=false;
    diffX = event.clientX - btn.offsetLeft;
    diffY = event.clientY - btn.offsetTop;
  };

  document.onmouseup = function(event) {
    isDragging = false;
    if (BTN_MOVING) {
      btn.removeEventListener('click', executeCopy);
      setTimeout(function() {
        btn.addEventListener('click', executeCopy);
      }, 0);
    }
  };

  document.onmousemove = function(event) {
    if (isDragging) {
      BTN_MOVING=true;
      btn.style.left = event.clientX - diffX + 'px';
      btn.style.top = event.clientY - diffY + 'px';
    }
  };
}

function main() {
  let btn = document.createElement("button");
  setBtnStyle(btn, "Copy Content");
  // 让这个按钮可以拖动
  moveBtn(btn);

  btn.addEventListener('click', executeCopy);
  document.body.appendChild(btn);
}
main();
