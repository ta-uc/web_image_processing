let localVideo = document.getElementById('local_video');
let localStream;
let width = ~~(window.innerWidth * 0.8);
let height = ~~(window.innerHeight * 0.8);

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let bcanvas = document.createElement('canvas');
let bctx = bcanvas.getContext('2d');
let cgid = 0;
let Id;

bcanvas.width = width;
bcanvas.height = height;
canvas.width = width;
canvas.height = height;

canvas.addEventListener("click",()=>{cgid++;});
canvas.addEventListener("tap",()=>{cgid++;});

 // start local video
function startVideo(camera) {
 navigator.mediaDevices.getUserMedia(camera)
 .then(function (stream) { // success
   localStream = stream;
   localVideo.srcObject = localStream;
 }).catch(function (error) { // error
   console.error('mediaDevice.getUserMedia() error:', error);
   return;
 });
 render();
}

function stopVideo() {
  if (localStream) {
    localStream.getVideoTracks()[0].stop();
    cancelAnimationFrame(Id);
  }
}

function flipCamera(){
  stopVideo();
  const camera = {
    audio:false,
    video:{
      facingMode:{
        exact: "environment"
      }
    }
  };
  startVideo(camera);
}

function render(){
  Id = requestAnimationFrame(render);
  bctx.drawImage(localVideo, 0, 0, width, height);
  let src = bctx.getImageData(0,0,width,height);
  let dest = src;
  pr(src,dest);
  ctx.putImageData(dest,0,0);
}
