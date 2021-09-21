from tkinter import *
from PIL import Image
from PIL import ImageTk
import tkinter.filedialog
import cv2

class Contours:
    def __init__(self, name, contours):
        self.name = name
        self.contours = contours

    def __str__(self):
        return f'name: {self.name}\ncontours: {self.contours}\n'

    
class Contour:
    def __init__(self, name, contours, frame):
        self.name = name
        self.frame = frame
        self.contours = contours

    def __init__(self, name, frame):
        self.name = name
        self.frame = frame
        self.contours = []
    
    def __str__(self):
        return f'name: {self.name}\nframe: {self.frame}\ncontours: {self.contours}\n'
    

    

    

    def addContour(self, c):
        self.contours.append(c)

    def updateContour(self, idx, newPt):
        self.contours[idx] = newPt

    def removeContour(self, idx):
        self.contours.pop(idx)




def select_image():
    #grab reference to the image panels
    print("run")
    global panelA
    global workingCopy

    # open a file chooser dialog and allow the user to select an input
    path = tkinter.filedialog.askopenfilename()
    
    # ensure a file path was selected
    if len(path) > 0:
		# load the image from disk, convert it to grayscale, and detect
        image = cv2.imread(path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

		# convert the images to PIL format...
        image = Image.fromarray(image)

        print("image size", image.width, image.height)
        
        global w, h 
        global workingCopy
        global canvas

        workingCopy = image.copy()
        
        resizeRatio = min(w / workingCopy.width, h / workingCopy.height)
        print("resize ratio: ", resizeRatio)
        workingCopy = workingCopy.resize((round(workingCopy.size[0]*resizeRatio), round(workingCopy.size[1]*resizeRatio)))


		# ...and then to ImageTk format
        workingCopy = ImageTk.PhotoImage(workingCopy)
        canvas.create_image(0,0, image=workingCopy, anchor='nw')
        canvas.bind('<Button-1>', prep)




        
        # if the panels are None, initialize them
        # if panelA is None:
		# 	# the first panel will store our original image
        #     panelA = Label(master=canvas, image=newImage)
        #     panelA.image = newImage
        #     panelA.pack(padx=10, pady=10)
        #     panelA.bind('<Button-1>', prep)
            
        # else:
		# 	# update thes pannels
        #     panelA.configure(image=newImage)
        #     panelA.image = newImage
        #     panelA.pack()

    
def create_circle(x, y, r, canvasName): #center coordinates, radius
    x0 = x - r
    y0 = y - r
    x1 = x + r
    y1 = y + r
    return canvasName.create_oval(x0, y0, x1, y1, tag='circle', fill="blue")

def updateUI():
    global current
    global canvas
    if not current == None and not canvas == None:
        draw_smth(current.contours)
        # for c in current.contours:
        #     circ = create_circle(c[0], c[1], 10, canvas)
        #     canvas.tag_raise("circle",'all')


def edit_contour():
    print("editting mode active")
    global editing
    global collection
    global frame
    global popup
    global current
    global canvas
    global res
    print(current)
    if not editing:
        editing = True
        popup = tkinter.Tk()
        tkinter.Label(popup, 
                text="First Name").grid(row=0)
        tkinter.Label(popup, 
                text="Last Name").grid(row=1)

        collection = tkinter.Entry(popup)
        frame = tkinter.Entry(popup)

        collection.grid(row=0, column=1)
        frame.grid(row=1, column=1)

        tkinter.Button(popup, 
                text='Quit', 
                command=popup.destroy).grid(row=3, 
                                            column=0, 
                                            sticky=tkinter.W, 
                                            pady=4)
        tkinter.Button(popup, 
                text='Show', command=submit).grid(row=3, 
                                                            column=1, 
                                                            sticky=tkinter.W, 
                                                            pady=4)
    else:
        current.addContour(current.contours[0])
        updateUI()
        editing = False
        if res == None:
            res = Contours("Stuff", current.contours)
        else:
            res.contours.append(current.contours)

        print("res: ", res)



def submit():
    global current
    global collection
    global popup
    if not collection.get() == "" and not frame.get() == "":
        current = Contour(collection.get(), frame.get())
        popup.destroy()
    

def reset():
    global workingCopy
    global canvas
    global current
    current = None
    workingCopy = None
    selected = False
    canvas.delete("circle")
    canvas.delete("line")
    canvas.update()

def prep(event):
    global editing
    global current
    if editing and not current == None:
        print(event.x, event.y)
        current.addContour([event.x, event.y])
        # event.widget.config(bg='light blue')
        event.widget.focus_set()  # give keyboard focus to the label
        print(current)
        updateUI()
    


def get_x_and_y(event):
    global lasx, lasy
    lasx, lasy = event.x, event.y

def draw_smth(contours):
    if len(contours) > 1:
        print(contours)
        canvas.create_line(contours, tag="line")
    # for idx, val in enumerate(contours):
    #     if len(contours) > 1:
    #         print(contours[idx - 1])
    #         print(val)
    #         canvas.create_line((contours[idx - 1][0], contours[idx - 1][1], val[0], val[1]), fill='red', width=2, tag='line')
    
    
        

# initialize the window toolkit along with the two image panels
root = Tk()
w, h = root.winfo_screenwidth(), root.winfo_screenheight()
root.geometry("%dx%d+0+0" % (w, h))
canvas = Canvas(root,
           width=w,
           height=h)
canvas.pack(expand=YES, fill=BOTH)
panelA = None
workingCopy = None
editing = False
res = None
current = None
collection = None
frame = None
popup = None



# create a button, then when pressed, will trigger a file chooser
# dialog and allow the user to select an input image; then add the
# button the GUI
btn = Button(canvas, text="Select an image", command=select_image)
btn.pack(side="bottom", fill="both",  padx="10", pady="10")
editContours = Button(canvas, text="edit the contours", command=edit_contour)
editContours.pack(side="bottom", fill="both", padx="10", pady="10")
reset = Button(canvas, text="Reset", command=reset)
reset.pack(side="bottom", fill="both", padx="10", pady="10")

# cv2.setMouseCallback('image', click_event)

# kick off the GUI
mainloop()
        
        


    