from tkinter import *
from PIL import Image
from PIL import ImageTk
import tkinter.filedialog
import cv2

def select_image():
    #grab reference to the image panels
    print("run")
    global panelA, panelB

    # open a file chooser dialog and allow the user to select an input
    path = tkinter.filedialog.askopenfilename()
    
    # ensure a file path was selected
    if len(path) > 0:
		# load the image from disk, convert it to grayscale, and detect
		# edges in it
        image = cv2.imread(path)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        edged = cv2.Canny(gray, 50, 100)
		# OpenCV represents images in BGR order; however PIL represents
		# images in RGB order, so we need to swap the channels
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)


        
		# convert the images to PIL format...
        image = Image.fromarray(image)
        edged = Image.fromarray(edged)

        print("image size", image.width, image.height)
        
        global halfw, halfh 
        global workingCopy

        workingCopy = edged.copy()
        
        resizeRatio = min(halfw / image.width, halfh / image.height)
        print(resizeRatio)
        newEdged = edged.resize((round(image.size[0]*resizeRatio), round(image.size[1]*resizeRatio)))
        newImg = image.resize((round(image.size[0]*resizeRatio), round(image.size[1]*resizeRatio)))


		# ...and then to ImageTk format
        image = ImageTk.PhotoImage(newImg)
        edged = ImageTk.PhotoImage(newEdged)

        
        # if the panels are None, initialize them
        if panelA is None or panelB is None:
			# the first panel will store our original image
            panelA = Label(image=image)
            panelA.image = image
            panelA.pack(side="left", padx=10, pady=10)
			# while the second panel will store the edge map
            panelB = Label(image=edged)
            panelB.image = edged
            panelB.pack(side="right", padx=10, pady=10)
		# otherwise, update the image panels
        else:
			# update the pannels
            panelA.configure(image=image)
            panelB.configure(image=edged)
            panelA.image = image
            panelB.image = edged
            panelA.pack(side="left")
            panelB.pack(side="right")
    


def edit_contour():
    print("editting mode active")
    global workingCopy
    global panelA
    global panelB
    global panelC
    if not panelA == None:
        

        resizeRatio = min(halfw * 2 / workingCopy.width, halfh * 2 / workingCopy.height)
        print(resizeRatio)
        newEdged = workingCopy.resize((round(workingCopy.size[0]*resizeRatio), round(workingCopy.size[1]*resizeRatio)))
        edged = ImageTk.PhotoImage(newEdged)
        panelC = Label(image=edged)
        panelC.image = edged
        panelC.pack(padx=10, pady=10)

        # hide other panels
        panelA.pack_forget()
        panelB.pack_forget()


    pass

def reset():
    global panelA
    global panelB
    global panelC
    global workingCopy
    global selected
    panelA.pack_forget()
    panelB.pack_forget()
    panelC.pack_forget()
    workingCopy = None
    selected = False

# initialize the window toolkit along with the two image panels
root = Tk()
w, h = root.winfo_screenwidth(), root.winfo_screenheight()
halfw, halfh = w/2, h/2
root.geometry("%dx%d+0+0" % (w, h))
panelA = None
panelB = None
panelC = None
workingCopy = None
selected = False

# create a button, then when pressed, will trigger a file chooser
# dialog and allow the user to select an input image; then add the
# button the GUI
btn = Button(root, text="Select an image", command=select_image)
btn.pack(side="bottom", fill="both",  padx="10", pady="10")
editContours = Button(root, text="edit the contours", command=edit_contour)
editContours.pack(side="bottom", fill="both", padx="10", pady="10")
reset = Button(root, text="Reset", command=reset)
reset.pack(side="bottom", fill="both", padx="10", pady="10")
# kick off the GUI
root.mainloop()
        
        


    