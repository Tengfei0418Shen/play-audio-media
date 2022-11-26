<template lang="">
    <div>
        <div>  
            <video ref="video"  controls width="600" height="400"></video>
            <canvas width="600" height="400" ref="canvas"></canvas>
            
        </div>
      
        <!-- <button @click="btnTakePhotoClicked">
            拍照
        </button> -->
    </div>
</template>
<script>
// import {
//   detectSingleFace,
//   nets,
//   matchDimensions,
//   resizeResults,
//   draw,
//   SsdMobilenetv1Options,
//   Box,
// } from 'face-api.js';
import * as faceapi from "face-api.js";

export default {
    mounted(){
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
        faceapi.nets.faceExpressionNet.loadFromUri('./models')
      ]).then(this.getC())
        
    },
    methods:{
        async getC(){
          // 获取视频流
            this._stream =  await navigator.mediaDevices.getUserMedia({
                video:true,audio:false
            })

            // 将视频流绑定video播放
            this.$refs.video.srcObject =this._stream
            this.$refs.video.play()

            // 获取二维的上下文
            this._context2d = this.$refs.canvas.getContext("2d")
            // 创建一张贴图
            this._img = new Image();
            this._img.src = "https://ts2.cn.mm.bing.net/th?id=OIP-C.KubpI_I_NorWteAwcamjeQHaHV&w=251&h=248&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2";

          // 实时显示数据
            // window.requestAnimationFrame(this._animationFrameHandler.bind(this))

            this.addImage()
           
       
        },
        // 更新动画
        async _animationFrameHandler(){
            if(this._stream){
              this._context2d.drawImage(this.$refs.video,0,0)
            }
            window.requestAnimationFrame(this._animationFrameHandler.bind(this))
        },
        // 添加贴纸
        async addImage(){
          // 实时绘制贴图
          setInterval(async () => {
            const detections = await faceapi.detectAllFaces(this.$refs.video, new faceapi.TinyFaceDetectorOptions())
            console.log(detections)
            this._context2d.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
            this._context2d.drawImage(this.$refs.video,0,0)
            this._context2d.drawImage(this._img,detections[0]._box._x-10,detections[0]._box._y-10,detections[0]._box._width+10,detections[0]._box._height+10)
          }, 10)
        }
    }
}
</script>
<style lang="">
    
</style>