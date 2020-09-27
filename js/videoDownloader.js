function onGetVideoManifest(manifestText)
{
    console.log("got video manifest");
    let videoManifestLines = manifestText.split("\n").filter(item => item !== "");
    let topQualityPlaylistUrl = videoManifestLines[videoManifestLines.length - 1];

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
        a.download = '_mgt6051_videoUrls_.txt';
        a.click();
        URL.revokeObjectURL(a.href);
    }

    $.get(topQualityPlaylistUrl, onGetVideoSegmentManifest);
}

let videoManifestUrl = document.getElementsByTagName("video")[0].getAttribute("src");
$.get(videoManifestUrl, onGetVideoManifest);