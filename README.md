app4galleria
============

sort of scripts to make a photo gallery application with galleria by looking the directory tree for images and videos

In order to run galleria, you have to prepare a data property in javascript with all photos and videos what you want to show with galleria. 

We have a bash shell script:
We want to show the gallery on ipad & android therefore we need to prepare thumbnails, low weight preview images and h264 videos from the orginal files in several resolutions and formats they are in our disk. Then we'll preprocess the images with imagemagik to prepare thumbmails and previews and to extract the exif information. We'll preprocess the videos with ffmpeg to make preview images and to convert them to h264. Wnen all this stuff will be ready, we'll make a data.js file pointing to all these images and videos as galleria likes.

We also have several html files:
Once converted all the stuff and generated the data.js file, we have the index.html which uses the galleria js library and the data.js file to make the photo and video gallery application. There are two auxiliary files to show the original image and to play a video in a frame using the html5 tag.
