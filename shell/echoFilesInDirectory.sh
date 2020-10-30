#!/usr/local/bin/bash

DIR=$1
FILES=($( ls "$DIR" ))
for ((i=0; i<${#FILES[@]}; i++)); do
  echo "${FILES[$i]}"
done
