var YoutubeMp3Downloader = require("youtube-mp3-downloader");
var path = require('path');

function downloader() {
    var self = this;

    self.YD = new YoutubeMp3Downloader({
        "ffmpegPath": path.join(__dirname, "./ffmpeg/ffmpeg.exe"),        // Where is the FFmpeg binary located?
        "outputPath": path.join(__dirname, "./audios"),    // Where should the downloaded and encoded files be stored?
        "youtubeVideoQuality": "highest",       // What video quality should be used?
        "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
        "progressTimeout": 2000                 // How long should be the interval of the progress reports
    });


    self.getMP3 = function(url) {
        var videoName = url.replace('https://www.youtube.com/watch?v=', '');

        return new Promise(function(resolve, reject){
            self.YD.download(videoName);
         
            self.YD.on("finished", function(err, data) {
                resolve(data);
            });
            
            self.YD.on("error", function(error) {
                reject(error)
            });
            
            self.YD.on("progress", function(progress) {
                //console.log(JSON.stringify(progress)); //socket bridge
            });
        })

    }

}

module.exports = downloader;