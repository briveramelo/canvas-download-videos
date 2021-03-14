let getResource = function (url) {
    return new Promise(function(resolve, reject) {
        $.get(url).done(function (text) {
            resolve(text);
        });
    });
};
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getFileName()
{
    let title = document.getElementsByClassName("comp titleLabel pull-left")[0].innerText;
    let titleNum = title.split(" ")[0];
    let titleLabel = title.substring(titleNum.length, title.length).replace("-", "").replace(/\s+/g, '').replace(",","");
    return `${titleNum}_${className}_${titleLabel}.txt`;
}

function onGetVideoSegmentManifest(videoSegmentManifest)
{
    if(videoSegmentManifest === null)
    {
        console.error("videoSegmentManifest failed to load");
        return;
    }

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

async function onGetVideoManifest(manifestText)
{
    console.log("got video manifest");
    let videoManifestLines = manifestText.split("\n").filter(item => item !== "");
    let playlistUrl1080 = videoManifestLines[videoManifestLines.length - 1];
    let playlistUrl720 = videoManifestLines[videoManifestLines.length - 2];

    let videoSegmentManifest = await getResource(playlistUrl720);
    onGetVideoSegmentManifest(videoSegmentManifest);
}

async function onMediaLoaded()
{
    let videoManifestUrl = document.getElementsByTagName("video")[0].getAttribute("src");
    if (videoManifestUrl.startsWith("blob:"))
    {
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        let playlistUrl = performance.getEntriesByType("resource").filter(item=>item.name.includes("index.m3u8?Policy")).map(item=>item.name).filter(onlyUnique)[0];
        let videoSegmentManifest = await getResource(playlistUrl);
        onGetVideoSegmentManifest(videoSegmentManifest);
    }
    else
    {
        let manifestText = await getResource(videoManifestUrl);
        await onGetVideoManifest(manifestText);
    }
}
async function tryLoadNextVideoRecursive()
{
    videoIndex++;
    if(videoIndex >= videoLinks.length)
    {
        console.log(`Final video loaded.`);
        return;
    }

    //call this to clear the current history of url queries to start fresh for the next download
    performance.clearResourceTimings();
    videoLinks[videoIndex].click();
    await sleep(videoLoadDelay_ms);
    await onMediaLoaded();
    console.log(`video loaded: ${videoIndex + 1}/${videoLinks.length} complete.`);
    tryLoadNextVideoRecursive();
}

function loadAllVideos()
{
    videoLinks = $('.chapterBox.mediaBox');
    if(videoLinks.length === 0)
    {
        videoLinks = $('.btn.comp.playPauseBtn.display-high.icon-play');
    }
    tryLoadNextVideoRecursive();
}

function loadCurrentVideo()
{
    videoLinks = $('.chapterBox.mediaBox.active');
    if(videoLinks.length === 0)
    {
        videoLinks = $('.btn.comp.playPauseBtn.display-high.icon-play');
    }
    tryLoadNextVideoRecursive();
}

//globals
var videoLinks =[];
var videoIndex = -1;


//options
var className = "finan6026";
var videoLoadDelay_ms = 4000;
loadAllVideos();
// loadCurrentVideo();
// performance.clearResourceTimings();
