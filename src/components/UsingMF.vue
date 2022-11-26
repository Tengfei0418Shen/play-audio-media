<template lang="">
    <div>
        <audio ref="audio" controls></audio>
        <select v-model="selectAudioDeviceIndex">
            <option v-for="(d,index) in audioInputDevices" :value="index" :key="d.id">{{d.label}}</option>
        </select>
    </div>
</template>
<script setup>
import {onMounted,ref,watch} from "vue"
import { getCurrentInstance } from '@vue/runtime-core';
const currentInstance = getCurrentInstance()
const audioInputDevices = ref([])
const selectAudioDeviceIndex = ref(0)

onMounted(
    () => {
        // 获取设备信息
        getDevice()
    }

  
)
// 获取设备信息
const  getDevice = async() => {
    let devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices)
    audioInputDevices.value = devices.filter(value => value.kind === "audioinput")
    console.log(audioInputDevices)
}

 // 按选择的设备进行播放
const showSelectedDevice = async(index) => {
    let diviceInfo = await audioInputDevices.value[index];
    console.log(diviceInfo)
    let stream = await navigator.mediaDevices.getUserMedia({video:false,audio:diviceInfo});
    currentInstance.ctx.$refs.audio.srcObject  = stream
    currentInstance.ctx.$refs.audio.play()
   
}
//监听
watch(selectAudioDeviceIndex, (newValue, oldValue) => { 
    showSelectedDevice(newValue)
});

</script>
<style lang="">
    
</style>