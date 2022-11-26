<template lang="">
    <div>
        <div>
            <video ref="preview" width="400" height="300" autoplay></video>
            <video ref="camera" width="400" height="300" autoplay></video>
        </div>
        <!-- <div>
            <button @click="btnRecordClicked" :disabled="recording">记录</button>
            <button @click="btnPauseClicked" :disabled="!recording||pause" >暂停</button>
            <button @click="btnResumeClicked" :disabled="!recording||!pause">继续</button>
            <button @click="btnDownloadClicked" :disabled="!recording">停止</button>
            <input type="button"  id="file" @click="fileChange">
        </div> -->
        <!-- <canvas width="600" height="400" ref="canvas"></canvas> -->
        <video  width="1000" height="750" controls ref="player"></video>
        
        <!-- <button :disabled="!currentWebmData" @click="btnPlayClicked">播放</button> -->
    </div>
</template>
<script>
//  import { start } from "repl";
//  import fs from "fs";
import  PlayCanvas  from "../assets/js/PlayerCanvas";
export default {

   
    data(){
        return {
            SCREEN_WIDTH : 1920,
            SCREEN_HEIGHT : 1080,
            currentWebmData:null,
            recording:false,
            pause:false,
            path:''
        }
    },
    mounted() {
     this.init()
     this._playCanvas = new PlayCanvas(this.SCREEN_WIDTH,this.SCREEN_HEIGHT)
    },
    methods:{
        async init(){
            this.stream = new MediaStream();

            // 获取音视频流
            this._stream1 =await navigator.mediaDevices.getUserMedia({
                video:true,audio:true
            })
            // 给画布添加摄像头数据流
            this._playCanvas.setCameraVideo(this.createVideoElementWithStream(this._stream1))
            this.$refs.camera.srcObject = this._stream1
            // 获取桌面窗体流
            this._stream =await navigator.mediaDevices.getDisplayMedia()
            this._playCanvas.setScreenVideo(this.createVideoElementWithStream(this._stream))
            this.$refs.preview.srcObject = this._stream

            // 将获取新绘制的画布流
            let playerCanvasStream = this._playCanvas._canvas.captureStream();
            playerCanvasStream.getTracks().forEach(value=>this.stream.addTrack(value))
            this.$refs.player.srcObject = playerCanvasStream;
            this.$refs.player.play()

            // 创建一个记录器
            this._recorder = new MediaRecorder(this.stream,{
                mimeType:"video/webm;codecs=h264"
            });
            this._recorder.start()
            this.recording=true;
           
            
            this._recorder.ondataavailable = this.recorder_dataAvaliableHandler.bind(this)
        },

        // 获取录制的数据
        recorder_dataAvaliableHandler(e){
            console.log(e)
            this.currentWebmData = e.data
        },
//         btnRecordClicked(){
//             this._recorder.start()
//             this.recording=true;
//         },
//         btnPauseClicked(){
//             this.pause=true
//             this._recorder.pause()
//         },
//         btnResumeClicked(){
//             this.pause=false
//             this._recorder.resume()
//         },
//         btnDownloadClicked(){
//             this._recorder.stop()
//             var file = document.getElementById("open")
//             file.click()
//             console.log(file)
//             let path = "E:/ScreenData.webm"

//             // fs.writeFileSync(path, new Uint8Array(currentWebmData.arrayBuffer()))
//             this.recording=false;
//         },
       
// fileChange() {
//     var that = this;
//       ipcRenderer.send('open-directory-dialog', 'openDirectory');
//       ipcRenderer.on('selectedItem', function (e, files) {
//         that.path = files
//       });
//       console.log(this.path)
//     },
        // 创建video
        createVideoElementWithStream(stream) {
            let video = document.createElement("video")
            video.autoplay = true
            video.srcObject = stream
            console.log(video)
            return video
        },
    }
}
</script>
<style lang="">
    
</style>