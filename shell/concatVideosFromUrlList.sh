#!/usr/local/bin/bash

#this script takes a file with a list of video urls and concatenates them into a single, compressed output .mp4 video
#run this script like "./concatVideosFromUrlList.sh ./myVideoUrlsDirectory" and all .txt files within will be made into a .mp4
#or run this script like "./concatVideosFromUrlList.sh ./myVideoUrlsFile.txt" for a single file
#where myVideoUrlsFile.txt is a newline-separated list of urls, starting with file
#eg:
#file https://www.example.com/myVideoUrl1
#file https://www.example.com/myVideoUrl2
#...
VIDEO_URLS_INPUT_PATH=$1
if [[ -d $VIDEO_URLS_INPUT_PATH ]]; then
  echo "creating videos for all .txt files in this folder at the time the script was started"
  files=($( ls "$VIDEO_URLS_INPUT_PATH" ))
  for ((i=0; i<${#files[@]}; i++)); do
    files[$i]="$VIDEO_URLS_INPUT_PATH/${files[$i]}"
    echo "${files[$i]%.*}"
    ffmpeg -f concat -safe 0 -protocol_whitelist "file,http,https,tcp,tls" -i "${files[$i]}" -vcodec libx264 -crf 28 "${files[$i]%.*}.mp4"
  done
else
  OUTPUT_DIR="$( dirname "$VIDEO_URLS_INPUT_PATH" )"
  OUTPUT_FILENAME=$(basename "$VIDEO_URLS_INPUT_PATH" ".txt")".mp4"
  OUTPUT_PATH="$OUTPUT_DIR"/"$OUTPUT_FILENAME"
  ffmpeg -f concat -safe 0 -protocol_whitelist "file,http,https,tcp,tls" -i "$VIDEO_URLS_INPUT_PATH" -vcodec libx264 -crf 28 "$OUTPUT_PATH"
fi
