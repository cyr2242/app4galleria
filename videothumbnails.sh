#!/bin/bash
#-----------------------------------------------------------------------------------
# Script para procesar los archivos de foto y video de un directorio
# Este script debe ejecutarse en el directorio donde están las imagenes: ../videothumbnails.sh
# El archivo play.png debe estar el el directorio donde se encuentre el script
# - Crea el subdirectorio .thumbnails
# - Itera el directorio por archivos de imagen y luego de video
# - Genera thumbnails, imagenes tamaño web y videos h264 a partir de los originales
# - Escribe un archivo data.js en formato JSON con las imagenes procesadas para galleria
#-----------------------------------------------------------------------------------

# Reinicializa directorio destino de imagenes procesadas y crea archivo data.js
rm -r .thumbnails
mkdir .thumbnails
echo "var data = [" > data.js

# Procesa imagenes jpg encontradas en el directorio actual
for f in *.[Jj][Pp][Gg]
do
	if [ $f != '*.[Jj][Pp][Gg]' ]
	then
		echo "Procesando $f"
		i=$(identify -format %[EXIF:DateTime]\ %[EXIF:Model] $f)
		echo "{" >> data.js
		echo "  title: '$f'," >> data.js
		echo "  description: '$i'," >> data.js
		echo "  thumb: path + '.thumbnails/thm_$f'," >> data.js
		echo "  image: path + '.thumbnails/web_$f'," >> data.js
		echo "  link: link_uri + '?image=' + path + '$f'," >> data.js
		echo "}," >> data.js
		convert $f -auto-orient -resize @3350 -quality 70 .thumbnails/thm_$f
		convert $f -auto-orient -resize @786432 -quality 70 .thumbnails/web_$f
	fi
done

# Procesa videos encontrados en el directorio actual
for f in *.[MmAa3][PpVvOoGg][4IiVvPpGg]
do 
	if [ $f != '*.[MmAa3][PpVvOoGg][4IiVvPpGg]' ]
	then
		echo "Procesando $f"
		echo "{" >> data.js
		echo "  title: '$f'," >> data.js
		echo "  description: '$f'," >> data.js
		echo "  thumb: path + '.thumbnails/thm_$f.jpg'," >> data.js
		echo "  iframe: iframe_uri + '?video=' + path + '.thumbnails/$f&image=' + path + '.thumbnails/web_$f.jpg'," >> data.js
		echo "}," >> data.js
		ffmpeg -y -itsoffset -4 -i "$f" -vcodec mjpeg -vframes 1 -an -f rawvideo -s vga ".thumbnails/web_$f.jpg" 2> /dev/null
		composite $(dirname $0)/play.png -dissolve 35 -resize 66x50 .thumbnails/web_$f.jpg .thumbnails/thm_$f.jpg
		~/ffmpeg/common/bin/ffmpeg -i "$f" -filter_complex aresample=48000 -vcodec libx264 -vprofile high -preset slow -bufsize 1000k -threads 0 -acodec libfaac -crf 22 -pix_fmt yuv420p ".thumbnails/$f.mp4"
	fi
done
echo "];" >> data.js

