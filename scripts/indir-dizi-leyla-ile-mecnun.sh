#!/bin/bash
# Author:       emre. < piskin[dot]emre[at]gmail[dot]com >
# Title:        "Leyla ile Mecnun" Downloader Script
# Version:      0.1
# Date:         2017.01.22
# Description:  
# Language:     Turkish

#i=3
LINKS=mp4_links.txt

while read p; do
  #echo "$i curl -s -N '$p' | grep -n 'file:\"' | grep -o '\".*\"' | sed 's/\"//g'"
  curl -s -N "$p" | grep -n 'file:"' | grep -o '".*"' | sed 's/"//g' >> "$LINKS"
  #((i++))
done <lm_links2
