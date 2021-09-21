import cv2
import PIL
import tkinter


def is_contour_bad(c):
	# approximate the contour
	c
	# the contour is 'bad' if it is not a rectangle
	return not len(approx) == 4

def is_contour_good(c, pt1, pt2):

    arr = c[0]
    for point in arr:
        x = point[0]
        y = point[1]
        if x > max(pt1[0], pt2[0]) or x < min(pt1[0], pt2[0]) or y > max(pt1[1], pt2[1]) or y < min(pt1[1], pt2[1]):
            return False
    return True

def filter_contours(contours, posn1, posn2):
    print("filtering")
    c = []
    for contour in contours:
        if is_contour_good(contour, posn1, posn2):
            c.append(contour)
    return c


#  [[[1087 1826]]

#  [[1086 1827]]

#  [[1087 1827]]]


def analyze_img(posn1, posn2):
    print(posn1, posn2)
    #read the image
    global image1
    image = image1

    #convert the image to greyscale
    img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    equ = cv2.equalizeHist(img_gray)
    #apply binary thresholding
    ret, thresh = cv2.threshold(equ, 70, 255, cv2.THRESH_BINARY)

    #th2=cv2.adaptiveThreshold(img_gray,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,11,2)

    #visualize binary image

    # cv2.imshow('Binary Image', thresh)
    # cv2.waitKey(0)
    # cv2.imwrite('image_thres1.jpg', thresh)

    # cv2.destroyAllWindows()

    #detect the contours on the binary image using cv2.CHAIN_APPROX_NONE
    contours, hierarchy = cv2.findContours(image=thresh, mode=cv2.RETR_LIST, method=cv2.CHAIN_APPROX_NONE)

    contours = filter_contours(contours, posn1, posn2)


    #draw contours on original image
    image_copy = image.copy()
    cv2.drawContours(image=image_copy, contours=contours, contourIdx=-1, color=(0, 255, 0), thickness=2, lineType=cv2.LINE_AA)

    #see results

    cv2.imshow('None approx', image_copy)
    cv2.waitKey(0)
    cv2.imwrite('contours_none_image', image_copy)
    cv2.destroyAllWindows()

first_pt = None
second_pt = None



def click_event(event, x, y, flags, params):
    if event == cv2.EVENT_LBUTTONDOWN:
        print(x, ' ', y)
        global first_pt
        global second_pt
        global image1
        if first_pt == None:
            first_pt = [x, y]
            cv2.circle(image1, (x,y), 25, (255,0,0), 2)
            cv2.imshow('image', image1)
        elif second_pt == None:
            second_pt = [x, y]
            cv2.circle(image1, (x,y), 25, (255,0,0), 2)
            cv2.imshow('image', image1)
            analyze_img(first_pt, second_pt)

        

 
        # # displaying the coordinates
        # # on the image window
        # font = cv2.FONT_HERSHEY_SIMPLEX
        # b = img[y, x, 0]
        # g = img[y, x, 1]
        # r = img[y, x, 2]
        # cv2.putText(img, str(b) + ',' +
        #             str(g) + ',' + str(r),
        #             (x,y), font, 1,
        #             (255, 255, 0), 2)
        # cv2.imshow('image', img)



if __name__ == "__main__":
    image1 = cv2.imread('./shoes_sample.png')
    cv2.imshow('image', image1)
    cv2.setMouseCallback('image', click_event)

    cv2.waitKey(0)
    cv2.destroyAllWindowss()

    
