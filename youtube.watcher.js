var YouTubeWatch = require('youtube-watch');
var downloader = require('./downloader');

function youtubeWatcher() {
    var self = this;

    // DB
    self.channels = [
        {
            name: 'TESE ONZE',
            id: 'UC0fGGprihDIlQ3ykWvcb9hg'
        }
    ]

    self.yw = new YouTubeWatch({
        secretKey: '',
        hubCallback: '',
        hubPort: '9001'
    });

    self.yw.on('start', function() {
        var channels = self.channels.map(function(ch) {
            return ch.id;
        });

        self.yw.watch(channels);
    });

    self.yw.on('notified', function(video) {
        var dl = new downloader();

        dl.getMP3(video.url)
            .then(function(data) {
                console.log('video downloaded');
            })
            .catch(function(error) {
                console.log(error);
            })
    });

    self.start = function() {
        self.yw.start();
    }

    self.updateList = function(newChannel) {
        self.channels.push(newChannel);
        
        self.yw.stop();
        self.yw.start();
    }
}

module.exports = youtubeWatcher;