#!/bin/bash
#
# Rfi'deki günlük "Journal en français facile" kaydını alır, mp3'e çevirir.
#

# Bugün günlerden ne?
TARIH=`date +%Y%m%d`

# Kayıt bir önceki güne ait olduğu için tarihi düzeltelim.
TARIH=$(($TARIH-1))

# Adresi verelim.
ADRES="mms://wmod.streaming.rfi.fr.edgestreams.net/rfi/francais/audio/journaux/r001/journal_francais_facile_21h00_-_21h10_tu_"$TARIH".mp3.wsx"

# Şimdi mplayer ile haber akışını kaydedelim.
mplayer $ADRES -cache 8192 -dumpstream -dumpfile rfi_temp_$TARIH.mp3 | zenity --progress --title="Haber akışı indiriliyor..." --text="Bu işlem haber süresi kadar zaman alacak (~10dk)..." --auto-close

# Zaman kaymalarını düzeltmek için mp3 dosyasını tekrar mp3'e çevirelim.
lame --preset 64 rfi_temp_$TARIH.mp3 rfi_$TARIH.mp3 | zenity --progress --title "Dosya indirildi" --text "Ses dosyası düzeltiliyor..." --auto-close

# Geçici dosyayı silelim.
rm rfi_temp_$TARIH.mp3
