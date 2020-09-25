let videoManifestUrl = document.getElementsByTagName("video")[0].getAttribute("src");

//todo: download the plaintext from the url
let videoManifest = "";
let videoManifestLines = videoManifest.split("\n").filter(item => item !== "");
let topQualityPlaylistUrl = videoManifestLines[videoManifestLines.length - 1];

//todo: download plaintext from the url
let videoSegmentManifest = ""
let videoSegmentUrls = videoSegmentManifest.split("\n").filter(item => item.startsWith("http"));

let ffmpegUrl = "https://cdn.jsdelivr.net/npm/@salomvary/ffmpeg.js-umd@3.1.9001/ffmpeg-webm.min.js";
$.getScript(ffmpegUrl, function (data) {
    // ffmpeg should be available now. inspect it for the api
    // https://www.mankier.com/1/ffmpeg#Examples
    for (let i = 0; i < videoSegmentUrls.length; i++) {
        //todo: concat video urls into a single output file for local download
    }
});
