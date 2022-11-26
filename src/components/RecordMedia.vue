<template lang="">
    <div>
        <div>
            <video ref="preview" width="400" height="300" autoplay></video>
        </div>
        <div>
            <button @click="btnRecordClicked" :disabled="recording">记录</button>
            <button @click="btnPauseClicked" :disabled="!recording||pause" >暂停</button>
            <button @click="btnResumeClicked" :disabled="!recording||!pause">继续</button>
            <button @click="btnStopClicked" :disabled="!recording">停止</button>
        </div>
        
        <video  width="600" height="400" controls ref="player"></video>
        <button :disabled="!currentWebmData" @click="btnPlayClicked">播放</button>
        <button :disabled="!currentWebmData" @click="btnDownloadClicked">下载</button>
    </div>
</template>
<script>
const fs = require('fs')
export default {
    data(){
        return {
            currentWebmData:null,
            recording:false,
            pause:false
        }
    },
    mounted() {
     this.init()
    },
    methods:{
        async init(){
            // 获取音视频流
            this._stream1 =await navigator.mediaDevices.getUserMedia({
                video:true,audio:false
            })
            // 获取桌面窗体流
            // this._stream1 =await navigator.mediaDevices.getDisplayMedia()
            this.$refs.preview.srcObject = this._stream1
            // 创建一个记录器
            this._recorder = new MediaRecorder(this._stream1,{
                mimeType:"video/webm;codecs=h264"
            });
            
            this._recorder.ondataavailable = this.recorder_dataAvaliableHandler.bind(this)
        },

        // 获取录制的数据
        recorder_dataAvaliableHandler(e){
            console.log(e)
            this.currentWebmData = e.data
        },
        async btnRecordClicked(){
            this._recorder.start()
            this.currentWebmData = null
            this.recording=true;
        },
        btnPauseClicked(){
            this.pause=true
            this._recorder.pause()
        },
        btnResumeClicked(){
            this.pause=false
            this._recorder.resume()
        },
        btnStopClicked(){
            this._recorder.stop()
            this.recording=false;
        },
        // 播放录制的数据
        btnPlayClicked(){
            this.$refs.player.src = URL.createObjectURL(this.currentWebmData)
            this.$refs.player.play()
        },
        btnDownloadClicked(){
            console.log()
            this.downloadUrl(this.currentWebmData,"ScreenMedia")    
        },
         downloadUrl(blob, name) {
            const fileName = name + '.webm' // 导出文件名
             const elink = document.createElement('a') // 创建a标签
            elink.download = fileName // a标签添加属性
             elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
             document.body.appendChild(elink)
            elink.click() // 执行下载
            URL.revokeObjectURL(elink.href) // 释放URL 对象
             document.body.removeChild(elink) // 释放标签
        }
    }
}
</script>
<style lang="">
    
</style>