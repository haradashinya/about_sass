var canvas;
var msg;
var detailMsg;
var ctx;
var ctxt;
var cvt;
var cW ;	//キャンバス横サイズ
var cH ;	//キャンバス縦サイズ
var x0;
var y0;
var dBox;
var intervalOfBitmap;
var xsuu;
var fontSize;
var ImageData;
// 使用する色の数:縦の列
var colorNum;
var iti;
// 同じメッセージを表示する回数
var counter = 0;

var arrDat;
// 一秒間に５０フレーム
window.requestAnimationFrame = (function(){
  return function(callback,element){
    setTimeout(callback,1000/60);
  }
})();






window.onload = function() {
  canvas = document.getElementById('cvMessageBoard');
  if ( ! canvas || ! canvas.getContext ) return false;
  canvas.width=document.documentElement.clientWidth+50;
  cW=canvas.width;
  cH=200;
  // set Color num
  colorNum = 50;
  intervalOfBitmap=(cH/colorNum) ;
  xsuu=Math.floor(cW/intervalOfBitmap);
  dBox=intervalOfBitmap*0.9;
  x0=(cW-(xsuu-1)*intervalOfBitmap-dBox);
  y0=(cH-(colorNum-1)*intervalOfBitmap-dBox);
  ctx = canvas.getContext('2d');
  setup()
};

function changeText(text){
  ctxt.clearRect(0, 0, cvt.width, cvt.height);
  ctxt.font = fontSize + "px" + " sans-serif";
  ctxt.textAlign = "left";
  ctxt.fillText(text,0,fontSize);
  var tm = ctxt.measureText(msg);
  ImageData = ctxt.getImageData(0,0,tm.width,colorNum);
  arrDat = [];
  for (var x = 0; x <  ImageData.width; ++x) {
    var aa= [];
    for (var y = 0; y < colorNum; ++y) {
      // 対象pixelのindex（色情報があるので*4する）
      var index = (x + y * ImageData.width) * 4;
      if(ImageData.data[index + 3]!=0) {
        aa[y]=1;
      }
    }
    arrDat[x]=aa;
  }
  iti=0;
}
function currentDate(){
  var date = new Date();
  var res = date.getFullYear() + " / " +date.getMonth() + " / " + date.getDate() +" "+ date.getHours() + " : " + date.getMinutes() + "    ";
  return "WordBench香川 ";

}
function setup() {
  msg = currentDate();
  detailMsg = "this is a detail msg";
  cvt = document.getElementById('cvTextPut');
  if ( ! cvt || ! cvt.getContext ) return false;
  ctxt = cvt.getContext('2d');
  ctxt.clearRect(0, 0, cvt.width, cvt.height);
  fontSize =19;
  ctxt.font = fontSize + "px sans-serif" ;
  ctxt.textAlign = "left";
  // 文字の表示位置
  ctxt.fillText(msg, 0,fontSize);
 var tm = ctxt.measureText(msg);
  ImageData = ctxt.getImageData(0,0,tm.width,colorNum);
    arrDat = [];
  renderText(ImageData);
  animationLoop();
}


function renderText(text){
    for (var x = 0; x <  ImageData.width; ++x) {
    var aa= [];
    for (var y = 0; y < colorNum; ++y) {
      // 対象pixelのindex（色情報があるので*4する）
      var index = (x + y * ImageData.width) * 4;
      if(ImageData.data[index + 3]!=0) {
        aa[y]=1;
      } else {
        aa[y]=0;
      }
    }
    arrDat[x]=aa;
  }
  iti=0;


}



function render() {

  msg = currentDate();
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0, 0, cW, cH);
  var i;
  var j;
  var iti2=-iti;
  var red = Math.floor(Math.random()*255) > 125 ? 255 : 0;
  var green = Math.floor(Math.random()*255) > 125 ? 255 : 0;
  var yellow = Math.floor(Math.random() *255) > 125 ? 255 : 0 ;
  ctx.fill
  ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + yellow +')';
//  ctx.fillStyle = 'rgb(0,255,0)';
  for(i=0;i<xsuu;i++) {
    for(j=0;j<colorNum;j++) {
      if(iti2>=0) {
        if(arrDat[iti2][j]==1) {
          // dKanの数字を大きくするとビットマップの感覚が広がって
          // 文字が大きく見える
          ctx.fillRect(x0+i*intervalOfBitmap*1.5, y0+j*intervalOfBitmap*1.5, dBox*0.8, dBox);
        }
      }
    }
    iti2++;
    if(iti2>arrDat.length-1) iti2=0;
  }
  iti--;
  if(iti<= -arrDat.length){
    counter += 1;

    if (counter % 1== 0){
//          changeText(counter);
    }
    // タイムラインに一回文字が流れたら、メッセージの内容を変更する。

    iti=0
  };

}

function animationLoop(){
  render();
  requestAnimationFrame(animationLoop)
}
