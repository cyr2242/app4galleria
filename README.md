app4galleria
============

sort of scripts to make a photo gallery application with galleria (https://github.com/aino/galleria) by looking the directory tree for images and videos

In order to run galleria, you have to fill a javascript data object with all photos and videos what you want to show with galleria. 

As we want to show the photo gallery on ipad & android devices we'll need to prepare thumbnails, low weight preview images and h264 videos from the original files from several pixel resolutions and formats they where in our disk. Therefore we have a bash shell script to do that. We'll preprocess the images with imagemagick to make thumbmails and previews and to extract the exif information. Then we'll preprocess the videos with ffmpeg to make preview images and to convert them to h264. Wnen all this stuff will be ready, we'll make a data.js file pointing to all these images and videos as galleria likes to be imported from the javascript running galleria.

Once all the stuff be converted and the data.js file generated, we have the index.html file which runs the galleria js library and imports the data.js file to make the photo and video gallery application. There are also two auxiliary files to show the original image when clicking on a preview image and for playing videos in a frame using the html5 tag.
