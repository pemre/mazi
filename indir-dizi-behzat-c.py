# #################################
# 
# Star Tv'den Behzat C'yi indirir
# 
# Author: Emre Pişkin, 2013.03, piskin.emre@gmail.com
# 
# http://www.startv.com.tr/dizi/behzatc/video-galeri/sayfa/1/behzat-c-X-bolum/Y
# X = bolum numarası
# Y = part numarası (1-5)
#
# #################################

import time

def getVideo(video_link):

   # Firefox'u aç
   window.activate("Firefox")
   time.sleep(0.5)

   # Yeni sekme aç
   keyboard.send_keys("<ctrl>+t")
   time.sleep(0.5)

   # Bağlantıyı yapıştır
   keyboard.send_keys(video_link)
   time.sleep(0.5)

   # Sitenin açılması için 15sn bekle
   keyboard.send_keys("<enter>")
   time.sleep(15)

   # Video downloader eklentisi videoyu bulmuş olmalı
   # Fareyi oraya hareket ettirelim, tıklayalım
   # Menüden ilk videoyu seçip tıklayalım
   system.exec_command("xte 'mousemove 1350 70'")
   time.sleep(0.5)
   system.exec_command("xte 'mouseclick 1'")
   time.sleep(0.5)
   system.exec_command("xte 'mousemove 1350 120'")
   time.sleep(0.5)
   system.exec_command("xte 'mouseclick 1'")
   time.sleep(1.5)

   # DownThemAll açıldı, geriye Start'a basmak kalıyor
   system.exec_command("xte 'mousemove 900 600'")
   time.sleep(0.5)
   system.exec_command("xte 'mouseclick 1'")
   time.sleep(2)

   # DownThemAll yöneticisi açıldı, Firefox'a dönüp
   # Sekmeyi kapatalım
   window.activate("Firefox")
   time.sleep(0.5)
   keyboard.send_keys("<ctrl>+w")
   time.sleep(1500)

# Dosyadaki bağlantıları listeye atalım
list_video = open("behzatc_linkler.txt").readlines()

for video_link in list_video:
   getVideo(video_link)

