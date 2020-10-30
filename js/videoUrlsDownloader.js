//performance.clearResourceTimings();
//1. run above line
//2. click on desired video in playlist to load new xhr requests
//3. paste and run this script
function onGetVideoSegmentManifest(videoSegmentManifest)
{
    console.log("got video segment manifest");
    let videoSegmentUrls = videoSegmentManifest.split("\n").filter(item => item.startsWith("http"));
    for (let i =0; i< videoSegmentUrls.length; i++)
    {
        videoSegmentUrls[i] = `file ${videoSegmentUrls[i]}\n`;
    }
    let file = new Blob(videoSegmentUrls,{ type: "text/plain;charset=utf-8" });
    const a = document.createElement('a');
    a.href= URL.createObjectURL(file);

    a.download = getFileName();
    a.click();
    URL.revokeObjectURL(a.href);
}

function getFileName()
{
    let title = document.getElementsByClassName("comp titleLabel pull-left")[0].innerText;
    let titleNum = title.split(" ")[0];
    let titleLabel = title.substring(titleNum.length, title.length).replace("-", "").replace(/\s+/g, '').replace(",","");
    return `${titleNum}_${className}_${titleLabel}.txt`;
}

function onGetVideoManifest(manifestText)
{
    console.log("got video manifest");
    let videoManifestLines = manifestText.split("\n").filter(item => item !== "");
    let playlistUrl1080 = videoManifestLines[videoManifestLines.length - 1];
    let playlistUrl720 = videoManifestLines[videoManifestLines.length - 2];

    $.get(playlistUrl720, onGetVideoSegmentManifest);
}

let videoManifestUrl = document.getElementsByTagName("video")[0].getAttribute("src");
var className = "ois6040";
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