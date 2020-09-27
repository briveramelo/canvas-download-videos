//performance.clearResourceTimings();
//1. run above line
//2. click on desired video in playlist to load new xhr requests
//3. paste and run this script
function onGetVideoSegmentManifest(videoSegmentManifest)
{
    console.log("got video segment manifest");
    const a = document.createElement('a');
    let videoSegmentUrls = videoSegmentManifest.split("\n").filter(item => item.startsWith("http"));
    for (let i =0; i< videoSegmentUrls.length; i++)
    {
        videoSegmentUrls[i] = `file ${videoSegmentUrls[i]}\n`;
    }
    let file = new Blob(videoSegmentUrls,{ type: "text/plain;charset=utf-8" });
    a.href= URL.createObjectURL(file);
    a.download = '_mgt6051_videoUrls.txt';
    a.click();
    URL.revokeObjectURL(a.href);
}

function onGetVideoManifest(manifestText)
{
    console.log("got video manifest");
    let videoManifestLines = manifestText.split("\n").filter(item => item !== "");
    let topQualityPlaylistUrl = videoManifestLines[videoManifestLines.length - 1];

    $.get(topQualityPlaylistUrl, onGetVideoSegmentManifest);
}

let videoManifestUrl = document.getElementsByTagName("video")[0].getAttribute("src");
if (videoManifestUrl.startsWith("blob:"))
{
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    let playlistUrl = performance.getEntriesByType("resource").filter(item=>item.name.includes("index.m3u8?Policy")).map(item=>item.name).filter(onlyUnique)[0];
    $.get(playlistUrl, onGetVideoSegmentManifest);
}
else
{
    $.get(videoManifestUrl, onGetVideoManifest);
}