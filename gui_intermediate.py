from tkinter import *
from PIL import Image
from PIL import ImageTk
import tkinter.filedialog
import cv2
import os



# def start():
#     global currentImage
#     global w
#     global h
#     global canvas
#     input_images_path = "/Users/tommysarni/design_capstone/frames/vid1"
#     output_images_path = "something"
#     print("started")
#     images_list = [image_name for image_name in os.listdir(input_images_path)]
#     full_paths = []

#     for path in images_list:
#         full_paths.append(os.path.join(input_images_path, path))
#     print(len(full_paths))

#'/Users/tommysarni/design_capstone/frames/vid1/frame00.jpg'
def sort_key(str):
    ending = os.path.basename(os.path.normpath(str))
    ending = ending.split(".")
    ending = ending[0]
    ending = ending.split("frame")
    if len(ending) == 2:
        return int(ending[1])
    else:
        return -1



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


def start(idx = 0):

    global currFrame
    global w, h 
    global workingCopy
    global canvas

    input_images_path = "/Users/tommysarni/design_capstone/frames/vid1"
    output_images_path = "something"
    print("started")
    images_list = [image_name for image_name in os.listdir(input_images_path)]
    
    full_paths = []

    for path in images_list:
        full_paths.append(os.path.join(input_images_path, path))
    
    full_paths.sort(key=sort_key)

    if len(full_paths) > idx and idx >= 0:
        path = full_paths[idx]
        currFrame = idx
        if len(path) > 0:
            reset()
            # load the image from disk, convert it to grayscale, and detect
            image = cv2.imread(path)
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

            # convert the images to PIL format...
            image = Image.fromarray(image)

            print("image size", image.width, image.height)

            workingCopy = image.copy()
            
            resizeRatio = min(w / workingCopy.width, h / workingCopy.height)
            print("resize ratio: ", resizeRatio)
            workingCopy = workingCopy.resize((round(workingCopy.size[0]*resizeRatio), round(workingCopy.size[1]*resizeRatio)))

            print("image size", workingCopy.width, workingCopy.height)



            # ...and then to ImageTk format
            workingCopy = ImageTk.PhotoImage(workingCopy)
            canvas.create_image(0,0, image=workingCopy, anchor='nw')
            canvas.bind('<Button-1>', prep)
            updateFrameLabel()
    
def updateFrameLabel():
    global frameLabel
    frameLabel.config(text=f'Frame: {currFrame}', width=100)

def nxt():
    global currFrame
    start(idx=currFrame+1)



def prev():
    global currFrame
    start(idx=currFrame-1)
    frameLabel.config(text=f'Frame: {currFrame}', width=100)



def select_image():
    #grab reference to the image panels
    print("run")

    global workingCopy

    # open a file chooser dialog and allow the user to select an input
    path = tkinter.filedialog.askopenfilename()
    print(path)
    
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







class Contours:


    def __init__(self, name, contour):
        self.name = name
        self.contour = contour


    def __str__(self):
        return f'name: {self.name}\ncontours: {self.contour}\n'

    
class Contour:

    
    def __init__(self, name, contours):
        self.name = name
        self.contours = contours

    
    def __str__(self):
        return f'name: {self.name}\ncontours: {self.contours}\n'
    

    def addContour(self, c):
        self.contours.append(c)

    def updateContour(self, idx, newPt):
        self.contours[idx] = newPt

    def removeContour(self, idx):
        self.contours.pop(idx)



def create_circle(x, y, r, canvasName): #center coordinates, radius
    x0 = x - r
    y0 = y - r
    x1 = x + r
    y1 = y + r
    return canvasName.create_oval(x0, y0, x1, y1, tag='circle', fill="blue")

def updateUI():
    global current
    global canvas
    global listbox
    if not current == None and not canvas == None:
        draw_smth(current.contours)


        # for c in current.contours:
        #     circ = create_circle(c[0], c[1], 10, canvas)
        #     canvas.tag_raise("circle",'all')


def edit_contour():
    print("editting mode active")
    global editing
    #name for contour group
    global collection
    # frame number added 
    global frame
    #popup window for editing
    global popup
    #current image
    global current
    #canvas to draw
    global canvas
    #end result
    global res
    #current frame
    global currFrame
    #last collection label
    global lastCollection

    global listbox

    if not editing:
        editing = True
        popup = tkinter.Tk()
        tkinter.Label(popup, 
                text=f'Frame #').grid(row=0)
        tkinter.Label(popup, 
                text="Collection").grid(row=1)

        frame = tkinter.Entry(popup)
        collection = tkinter.Entry(popup)
        frame.insert(0, f'{currFrame}')
        if not lastCollection == None:
            collection.insert(0, f'{lastCollection}')

        

        frame.grid(row=0, column=1)
        collection.grid(row=1, column=1)
        

        tkinter.Button(popup, 
                text='Cancel', 
                command=popup.destroy).grid(row=3, 
                                            column=0, 
                                            sticky=tkinter.W, 
                                            pady=4)
        tkinter.Button(popup, 
                text='Submit', command=submit).grid(row=3, 
                                                            column=1, 
                                                            sticky=tkinter.W, 
                                                            pady=4)
    else:
        current.addContour(current.contours[0])
        
        updateUI()
        editing = False
        if res == None:
            res = Contours("vid1", Contour(lastCollection, [current.contours]))
        else:
            res.contour.append(current.contours)

        for c in res.contour.contours:
            print(c.name)
        print("res: ", res)



def submit():
    global current
    global collection
    global frame
    global popup
    global lastCollection
    if not collection.get() == "" and not frame.get() == "":
        lastCollection = collection.get()
        current = Contour(collection.get(), [])
        popup.destroy()
    



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
    
    
workingCopy = None
editing = False
res = None
current = None
collection = None
frame = None
popup = None
currentPath = None
currFrame = None
lastCollection = None
lastContours = None

# initialize the window toolkit along with the two image panels
root = Tk()
w, h = root.winfo_screenwidth(), root.winfo_screenheight()
root.geometry("%dx%d+0+0" % (w, h))
canvas = Canvas(root,
           width=w,
           height=h)
canvas.pack(expand=YES, fill=BOTH, side=LEFT)

# sidebar = Frame(root, width=200, bg='white', height=500, relief='sunken', borderwidth=2)
# sidebar.pack(expand=True, fill=BOTH, side=RIGHT)

listbox = Listbox(root)
listbox.pack(side=LEFT, fill=BOTH)
scrollbar = Scrollbar(root)
scrollbar.pack(side = RIGHT, fill = BOTH)


listbox.config(yscrollcommand = scrollbar.set)
scrollbar.config(command = listbox.yview)






begin = Button(canvas, text="Start", command=start)
begin.grid(row=0,column=0)

editContours = Button(canvas, text="edit the contours", command=edit_contour)
editContours.grid(row=0,column=1)

startOver = Button(canvas, text="Reset", command=reset)
startOver.grid(row=0,column=2)

prev = Button(canvas, text="Previous", command=prev)
prev.grid(row=0,column=3)

nxt = Button(canvas, text="Next", command=nxt)
nxt.grid(row=0,column=4)

frameLabel = Label(canvas, text=f'Frame: {currFrame}')
frameLabel.grid(row=0, column=5)
print("test: ", Contours("vid1", Contour("name",[])))






# kick off the GUI
mainloop()
        
        


    
    