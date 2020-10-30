#!/usr/local/bin/bash

DIR=$1
FILES=($( ls "$DIR" ))
for ((i=0; i<${#FILES[@]}; i++)); do
  FILE_NAME="${FILES[$i]}"
  REG_MATCH="[a-zA-Z0-9]{5,9}"
  REPLACEMENT="acctg6000"
  NEW_NAME=$(echo "$FILE_NAME" | sed -E "s|$REG_MATCH|$REPLACEMENT|")
  mv "${FILES[$i]}" "$NEW_NAME"
done
