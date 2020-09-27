#!/usr/local/bin/bash

#this script takes a file with a list of video urls and concatenates them into a single, compressed output .mp4 video
#run this script like "./concatVideosFromUrlList.sh ./myVideoUrlsFile.txt ./myConcatenatedVideoOutput.mp4"
#where myVideoUrlsFile.txt is a newline-separated list of urls, starting with file
#eg:
#file https://www.example.com/myVideoUrl1
#file https://www.example.com/myVideoUrl2
#...
VIDEO_URLS_INPUT_PATH=$1
OUTPUT_PATH=$2
ffmpeg -f concat -safe 0 -protocol_whitelist "file,http,https,tcp,tls" -i "$VIDEO_URLS_INPUT_PATH" -vcodec libx264 -crf 28 "$OUTPUT_PATH"