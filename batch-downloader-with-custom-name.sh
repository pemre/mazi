#!/bin/bash
#title           :res.sh
#description     :download files with custom name
#author		 :emre
#date            :14 Ekim 2014
#version         :0.1

while read file url; do 
    wget -c -O "$file".jpg "$url"
done < res.txt
