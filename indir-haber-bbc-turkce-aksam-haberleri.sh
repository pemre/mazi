#!/bin/bash
#
# BBC Türkçe'deki haberleri alır, mp3'e çevirir.
#

# BBC Türkçe'nin adresini ve indireceğimiz dosyanın adını verelim.
ADRES="http://www.bbc.co.uk/turkish/"
DOSYA="1600tx.ram"

# Önce internetten ram dosyamızı home dizinimize indirelim.
wget $ADRES$DOSYA

# Bugün günlerden ne?
TARIH=`date +%y.%m.%d`

# şimdi mplayer ile ram dosyamızı wav'a çevirelim.
mplayer -playlist $DOSYA -vc null -vo null -ao pcm:fast:waveheader:file=$TARIH.wav | zenity --progress --title="Haber akışı indiriliyor..." --text="Bu işlem haber süresi kadar zaman alacak (30-50dk)..." --auto-close

# wav dosyasını mp3'e çevirelim
lame $TARIH.wav --preset standard -o $TARIH.mp3 | zenity --progress --title="Dosyalar indirildi" --text="$TARIH.wav mp3'e çeviriliyor..." --auto-close

# En son indirdiğimiz ram ve wav dosyalarını silelim.
#rm $DOSYA
rm $TARIH.wav

# Her şey bitti, kullanıcıya haber verelim
zenity --notification --text="$TARIH.mp3 hazır..." --window-icon=/usr/share/icons/gnome/48x48/apps/hint.png

