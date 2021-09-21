import cv2
import os
vidcap = cv2.VideoCapture('sample_vid.mp4')
success,image = vidcap.read()
count = 0
path = '/Users/tommysarni/design_capstone/frames/vid1'
while success:
#   cv2.imwrite("frame%d.jpg" % count, image)     # save frame as JPEG file 
    if count < 10:
        cv2.imwrite(os.path.join(path , "frame0%d.jpg" % count), image)
    else:
        cv2.imwrite(os.path.join(path , "frame%d.jpg" % count), image)

      
    success,image = vidcap.read()
    print('Read a new frame: ', success)
    count += 1