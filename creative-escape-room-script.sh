#!/bin/bash
# Author:       emre. < piskin[dot]emre[at]gmail[dot]com >
# Contributor:  Emre Pişkin < piskin[dot]emre[at]gmail[dot]com >
# Title:        Creative Escape Room Script
# Version:      0.1
# Description:  

# Language: Turkish

PATH_Z="/media/koruncak/Z/"
VID_DOIGT="video/quand le doigt.mp4"
VID_CAY_ERD="video/cay_erdal.mp4"
VID_CAY_BEN="video/cay_benim.mp4"
MSG_QUESTION="#__?"
MSG_EKSIK="Hep bir parçam eksikti hayatta... Parçaları kaybolmuş yapbozlar gibiyim.
Ben o parçaları hep kaybettim. Kaybetmenin varlığına inanmam aslında.
Yeni bir parça kazanma hevesiyle bazı parçaları bir kenara attım.
Döndüğümde o parçalar yerinde hiç olmadı. Fark ettim ki yüreğimde
eksilen parçalar beni her zaman yarım bir insan yapıyor. Elimden
hiçbir şey gelmiyor. Bakıyorum. <b>Beni</b> anlamsızlaştırması gereken o
parçaların eksikliği <a href='http://www.emre.com'>şimdilerle</a> gerçek bir insanın olması gerektiği
gibi yapıyor beni. Belki de yarım insan olmak tam olmaktan daha iyidir..."

# ask the question
INPUT=`zenity --entry --text="$MSG_QUESTION" --entry-text="" --title=""`

if [ "$INPUT" = "doigt" ]; then
	mplayer "$PATH_Z$VID_DOIGT" -fs
	exit 0;
elif [ "$INPUT" = "doi" ]; then
	zenity --info --text="$MSG_EKSIK" --icon-name="face-crying" --title=""
	exit 0;
elif [ "$INPUT" = "k" ]; then
	timeout 5 eog -f -w "/home/emre/Masaüstü/c3zvj.gif"
	exit 0;
elif [ "$INPUT" = "l" ]; then
	mplayer -fs "$PATH_Z$VID_CAY_BEN" "$PATH_Z$VID_CAY_ERD" "$PATH_Z$VID_CAY_BEN"
	exit 0;
else
	exit 0;
fi
