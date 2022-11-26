class PlayCanvas{
    constructor(width,height){
        this._canvas = document.createElement("canvas")
        this._canvas.width = width
        this._canvas.height = height
        this._canvasWidth = width
        this._canvasHeight = height
        this._CAMERA_VIDEO_WIDTH = 400;
        this._CAMERA_VIDEO_HEIGHT = 300;

        this._context2d = this._canvas.getContext("2d")
        requestAnimationFrame(this._animationFrameHandler.bind(this))
    }

    setScreenVideo(video){
        this._screenVideo = video
    }

    setCameraVideo(video){
        this._cameraVideo = video
    }

    get canvas() {
        return this._canvas
    }
    _animationFrameHandler() {
        // console.log(">>>")
        if(this._screenVideo){

            this._context2d.drawImage(this._screenVideo,0,0,this._canvasWidth,this._canvasHeight)
        }
        if(this._cameraVideo){
            this._context2d.drawImage(
                this._cameraVideo,
                this._canvasWidth-this._CAMERA_VIDEO_WIDTH,
                this._canvasHeight-this._CAMERA_VIDEO_HEIGHT,
                this._CAMERA_VIDEO_WIDTH,
                this._CAMERA_VIDEO_HEIGHT
                )
        }

        requestAnimationFrame(this._animationFrameHandler.bind(this))
    }
}

module.exports =PlayCanvas