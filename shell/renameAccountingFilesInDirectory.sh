#!/usr/local/bin/bash

DIR=$1
REPLACEMENT=$2
if [[ "$DIR" == "" ]]; then
  echo "missing directory arg1"
  exit 1
fi
if [[ "$REPLACEMENT" == "" ]]; then
  echo "missing text replacement arg2"
  exit 1
fi

cd "$DIR"
FILES=($( ls "$DIR" ))
for ((i=0; i<${#FILES[@]}; i++)); do
  FILE_NAME="${FILES[$i]}"
  REG_MATCH="[a-zA-Z0-9]{5,9}"
  NEW_NAME=$(echo "$FILE_NAME" | sed -E "s|$REG_MATCH|$REPLACEMENT|")
  echo "$NEW_NAME"
  mv "${FILES[$i]}" "$NEW_NAME"
done
