#!/bin/bash
# Author:       HJMills < hjmills[at]gmail[dot]com >
# Contributor:  Emre Pişkin < piskin[dot]emre[at]gmail[dot]com >
# Title:        Creative Zen & Zen Vision:M Video Converter Script
# Version:      0.2
# Description:  Converts video into a format suitable for transfer to the Creative Zen Vision:M

# Conversion command used:
# mencoder file1.avi -o test1.avi -vf scale=320:-10,harddup -oac mp3lame -ovc xvid -xvidencopts bitrate=XX

# Language: English, Turkish

BITRATE="192"

case "$LANG" in
"tr_TR.UTF-8")
	MSG_YES="Evet"
	MSG_NO="Hayır"
	MSG_SELECT_VIDEO="Dönüştürülecek video dosyasını seçin"
	MSG_SELECT_VIDEO_ERROR="Dosya seçilmedi - çıkılıyor"
	MSG_SELECT_SUB_QUESTION="Altyazı dosyası eklemek istiyor musunuz?"
	MSG_SELECT_SUB="Altyazı dosyasını seçin"
	MSG_SELECT_SUB_ERROR="Altyazı seçilmedi - çıkılıyor"
;;
*)
	MSG_YES="Yes"
	MSG_NO="No"
	MSG_SELECT_VIDEO="Select the file to convert"
	MSG_SELECT_VIDEO_ERROR="No input file selected - exiting"
	MSG_SELECT_SUB_QUESTION="Do you want to add subtitle?"
	MSG_SELECT_SUB="Select a subtitle"
	MSG_SELECT_SUB_ERROR="No subtitle selected - exiting"
;;
esac

# First, select the video
INPUT=`zenity --file-selection --title="$MSG_SELECT_VIDEO"`
echo $INPUT
if [ "$INPUT" = "" ]; then
	echo "$MSG_SELECT_VIDEO_ERROR"
	exit 0;
fi

# If you want, select a subtitle
zenity --question --text="$MSG_SELECT_SUB_QUESTION" --ok-label="$MSG_YES" --cancel-label="$MSG_NO"
ANSWER=$?
if [ "$ANSWER" = "0" ]; then
	INPUTSUB=`zenity --file-selection --title="$MSG_SELECT_SUB"`
	if [ "$INPUTSUB" = "" ]; then
		echo "$MSG_SELECT_SUB_ERROR"
		exit 0;
	fi
fi

# Prepare output folder
FILENAME=`basename "$INPUT"`
if [ -d /home/$USER/Zen/Video ]; then
	echo "~/Zen/Video dizini mevcut - çıkış için kullanılıyor"
	OUTPUT="/home/$USER/Zen/Video/$FILENAME"
else
	echo "~/Zen/Video dizini mevcut değil - oluşturuluyor ve çıkış için kullanılıyor"
	mkdir -p "/home/$USER/Zen/Video"
	OUTPUT="/home/$USER/Zen/Video/$FILENAME"
fi
echo $OUTPUT

# Start converting (with or without subtitle)
# echo 'mencoder "$INPUT" -o "$OUTPUT" -vf scale=320:240 -oac mp3lame -ovc xvid -xvidencopts bitrate="$BITRATE"'
if [ "$ANSWER" = "0" ]; then
	mencoder "$INPUT" -o "$OUTPUT" -sub "$INPUTSUB" -subcp latin5 -subfont-text-scale 3.3 -vf scale=320:-10,harddup,expand=:-64::32:1 -oac mp3lame -ovc xvid -xvidencopts bitrate=$BITRATE | awk -vRS="\r" '$1 ~ /Pos/ {gsub(/Pos:/," ");gsub(/%\)/," ");gsub(/ \(/," ");print $3"\n#Konum :\\t"$1"\\nÇerçeve :\\t"$2"\\nYüzde :\\t"$3"%\\nÇerçeve Oranı :\\t"$4"\\nKalan Zaman :\\t"$6; fflush();}' | zenity --progress  --auto-kill --auto-close
else
	mencoder "$INPUT" -o "$OUTPUT" -vf scale=320:-10,harddup,expand=:-64::32:1 -oac mp3lame -ovc xvid -xvidencopts bitrate=$BITRATE | awk -vRS="\r" '$1 ~ /Pos/ {gsub(/Pos:/," ");gsub(/%\)/," ");gsub(/ \(/," ");print $3"\n#Konum :\\t"$1"\\nÇerçeve :\\t"$2"\\nYüzde :\\t"$3"%\\nÇerçeve Oranı :\\t"$4"\\nKalan Zaman :\\t"$6; fflush();}' | zenity --progress  --auto-kill --auto-close
fi

# After converting
zenity --info --text="$FILENAME dosyasının dönüştürülmesi tamamlandı."
