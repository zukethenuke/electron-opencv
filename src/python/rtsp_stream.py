from cv2 import cv2
import base64
import sys
from time import sleep

cap = cv2.VideoCapture('http://166.166.91.84/mjpg/video.mjpg')
# cap = cv2.VideoCapture('rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov')

while(True):
    ret, frame = cap.read()
    cv2.imshow('frame',frame)
    success, encoded_img = cv2.imencode('.jpg', frame)

    image = base64.b64encode(encoded_img).decode()
    b64_src = 'data:image/jpg;base64,'
    img_src = b64_src + image
    print(img_src, flush=True)


    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()

