from tkinter import *
from PIL import Image
from PIL import ImageTk
import tkinter.filedialog
import cv2
import os
import json
import copy

######################################## Data types

class Framer:
    def __init__(self, numFrame, directory, currentFrame=0):
        # number of frames
        self.numFrame = numFrame
        # the path to the folder with all the frames
        self.directory = directory
        # current frame framer is on
        self.currentFrame = currentFrame
        # paths to images
        self.images=os.listdir(self.directory)

    def __init__(self, directory, currentFrame=0):
        
        # the path to the folder with all the frames
        self.directory = directory
        # current frame framer is on
        self.currentFrame = currentFrame
        # paths to images
        self.images=sorted(os.listdir(self.directory), key=sort_key)
        # number of frames
        self.numFrame = len(self.images)

    def changeFrame(self, num):
        if num >= 0 and num < self.numFrame:
            self.currentFrame = num
        else:
            print('index of frame out of range')
    
    def getPath(self):
        return os.path.join(self.directory, self.images[self.currentFrame])
        


    def __str__(self):
        return f'number of frames: {self.numFrame} images: {self.images}\n'



class IVid:

    def __init__(self, name, articles):
        #name of vid
        self.name = name
        # list of articles to track
        self.articles = articles

    
    def __str__(self):
        return f'name: {self.name}\nnum-articles: {len(self.articles)}\n'
    

    def addArticle(self, a):
        self.articles.append(a)

    def updateArticle(self, idx, newArt):
        self.articles[idx] = newArt

    def removeArticle(self, idx):
        self.articles.pop(idx)

    def containsArticle(self, a):
        for article in self.articles:
            if a.name == article.name:
                return True
        return False

    def containsArticleWithName(self, name):
        for article in self.articles:
            if name == article.name:
                return True
        return False
    
    def findArticleWithName(self, name):
        for article in self.articles:
            if name == article.name: return article
        return None

# Object to track 
class Article:
    def __init__(self, name, contours):
        #name of article
        self.name = name
        # areas of interaction
        self.contours = contours

    def __str__(self):
        return f'name: {self.name}\ncontours: {self.contours}'

    def addContour(self, c):
        self.contours.append(c)

    def updateContour(self, newC):

        if self.contours[newC.frame].coordArr == None: 
            self.contours[newC.frame].coordArr = []

        self.contours[newC.frame].coordArr.append(newC.coordArr)
        self.contours[newC.frame] = Contour(newC.frame, self.contours[newC.frame].coordArr)


    def removeContour(self, idx):
        self.contours.pop(idx)

    def findContourByFrame(self, frame):
        for c in self.contours:
            print(" c:  ", c)
            if c.frame == frame:
                return c
        return None

    


# Area of interaction 
class Contour:
    def __init__(self, frame, coordArr):
        #frame number
        self.frame = frame
        # array of coordinate arrays :[[x,y][x,y],[x,y][x,y]]
        self.coordArr = coordArr

    def __str__(self):
        return f'frame: {self.frame}\ncoordinatesArray: {self.coordArr}\n'

    
    def addCoord(self, c):
        self.coordArr.append(c)

    def updateAllCoord(self, newC):
        self.coordArr = newC

    def updateCoord(self, idx, newC):
        self.coordArr[idx] = newC

    def updateSingleCoord(self, idx,  cIdx, pt):

        if len(self.coordArr) > idx and len(self.coordArr[idx]) > cIdx:
            if cIdx == 0 or cIdx == len(self.coordArr[idx]) - 1:
                self.coordArr[idx][0] = pt
                self.coordArr[idx][len(self.coordArr[idx]) - 1] = pt
            else:
                self.coordArr[idx][cIdx] = pt

    def removeCoord(self, idx):
        self.coordArr.pop(idx)

##################################### Functionality
# provides functionality to selectVideo button
def selectVideo():
    global framer
    global vid

    path = tkinter.filedialog.askopenfilename()
    if len(path) > 0:
        if path.lower().endswith(('.png', '.jpg', '.jpeg')):
            print(os.path.basename(os.path.normpath(path)).split('.')[0])
            
        elif path.lower().endswith(('.mp4')):
            numFrames, outdir = frameVideo(path)
            if numFrames < 1:
                framer = Framer(directory=outdir)
            else:
                framer = Framer(numFrame=numFrames, directory=outdir)
            vid = IVid(os.path.basename(os.path.normpath(path)).split('.')[0], [])
        else:
            print("bad file type")
            return

        read_image()
        




# separates videos in frames and saves in local directory
def frameVideo(path):

    vidcap = cv2.VideoCapture(path)
    success,image = vidcap.read()
    count = 0
    outdir = '/Users/tommysarni/design_capstone/frames/'
    enddir_name = os.path.basename(os.path.normpath(path)).split('.')[0]
    outdir = os.path.join(outdir , enddir_name)

    if not os.path.exists(outdir):
        os.makedirs(outdir)

        while success:
        #   cv2.imwrite("frame%d.jpg" % count, image)     # save frame as JPEG file 
            cv2.imwrite(os.path.join(outdir , "frame%d.jpg" % count), image)
            success,image = vidcap.read()
            print('Read a new frame: ', success)
            count += 1
    else:
        print("directory already exists (video probably already framed)")
    return count, outdir


# Creates contour areas
def editFrame():
    global editting
    global current_contour
    global current_article
    
    if not workingCopy == None:
        editting = not editting
        if editting:
            canvas.bind('<Button-1>', prep, add=False)
            popup = tkinter.Tk()
            tkinter.Label(popup, text="Frame #").grid(row=0)
            tkinter.Label(popup, text="Collection").grid(row=1)

            frame = tkinter.Entry(popup)
            collection = tkinter.Entry(popup)
            frame.insert(0, f'{framer.currentFrame}')

            frame.grid(row=0, column=1)
            collection.grid(row=1, column=1)
            tkinter.Button(popup, text='Cancel', command=popup.destroy).grid(row=3, column=0, sticky=tkinter.W, pady=4)
            tkinter.Button(popup, text='Submit', command= lambda: submit(popup, frame.get(), collection.get())).grid(row=3, column=1, sticky=tkinter.W, pady=4)
        else:
            
            if len(current_contour) > 0:
                current_contour.append(current_contour[0])
                print("b4 update: ", current_contour)
                current_article.updateContour(Contour(framer.currentFrame, current_contour))

                updateUI()
                current_contour = []


def copyLast():
    
    if framer.currentFrame > 0:
        print("copied last")
        for art in vid.articles:
            last = copy.deepcopy(art.findContourByFrame(framer.currentFrame - 1).coordArr)
            print("last", last)
            now = art.findContourByFrame(framer.currentFrame)
            now.updateAllCoord(last)
        updateUI()
            




def submit(popup, frame, collection):
    global vid
    global current_article
    global current_contour

    current_contour = []
    if not vid.containsArticleWithName(collection):
        
        empty = [Contour(i, []) for i in range(framer.numFrame)]
        a = Article(collection, empty)
        vid.addArticle(a)
        current_article = a
    else:
        current_article = vid.findArticleWithName(collection)


    
    popup.destroy()


# Sets the current frame
def setFrame(idx):
    global framer
    reset()
    framer.changeFrame(idx)
    read_image()
    canvas.update()
    updateUI()


# Sets the current frame to the previous one
def prevFrame():
    global framer
    global current_article
    if framer.currentFrame > 0:
        setFrame(framer.currentFrame - 1)
        #current_article = framer.articles[framer.]
        for a in vid.articles:
            current_article = a
            updateUI(delete=False)



# Sets the current frame to the next one
def nxtFrame():
    global framer
    global current_article
    if framer.currentFrame < framer.numFrame:
        setFrame(framer.currentFrame + 1)
        for a in vid.articles:
            current_article = a
            updateUI(delete=False)

# removes all contours with a given tag
def removeByTag():
    pass

# removes all contours on frame
def reset():
    global workingCopy
    global canvas
    global current_contour
    global current_article
    global listbox
    global handle_arr
    workingCopy = None
    current_contour = []
    current_article = None
    listbox.delete(0, END)
    
    canvas.delete("line")

    
    # selected = False
    # canvas.delete("circle")

    canvas.update()

    
def sort_key(str):
    ending = os.path.basename(os.path.normpath(str))
    ending = ending.split(".")
    ending = ending[0]
    ending = ending.split("frame")
    if len(ending) == 2:
        return int(ending[1])
    else:
        return -1

def read_image():
    global workingCopy
    global image_size
    if not framer == None:
        path = framer.getPath()
        image = cv2.imread(path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # convert the images to PIL format...
        image = Image.fromarray(image)

        # print("image size", image.width, image.height)

        workingCopy = image.copy()
        
        resizeRatio = min(w / workingCopy.width, h / workingCopy.height)
        # print("resize ratio: ", resizeRatio)
        workingCopy = workingCopy.resize((round(workingCopy.size[0]*resizeRatio), round(workingCopy.size[1]*resizeRatio)))

        # print("image size", workingCopy.width, workingCopy.height)

        # ...and then to ImageTk format
        workingCopy = ImageTk.PhotoImage(workingCopy)
        image_size = [workingCopy.width(), workingCopy.height()]

        canvas.create_image(0,0, image=workingCopy, anchor='nw', tag="image")
        canvas.bind('<Button-1>', prep)
        # updateFrameLabel()

def prep(event):
    global current_contour

    if editting:
        if event.x < image_size[0] and event.y < image_size[1]:
            current_contour.append([event.x, event.y])
            updateUI()




##################################### Gui
framer = None
workingCopy = None
editting = False
current_article = None
vid = None
current_contour = []
draw_these = []
_drag_data = {"x": 0, "y": 0, "item": None}
_moving_pt  =  None
hasHandle = False
handle_arr = []
placeholder_handles = []
image_size = [0, 0]


def updateUI(delete=True):
    global canvas
    global draw_these
    global listbox
    
    if not canvas == None:
        if delete: canvas.delete("line")

        if len(current_contour) > 1:
            canvas.create_line(current_contour, tag="line")

        for art in vid.articles:
            ctour = art.findContourByFrame(framer.currentFrame)
            if not ctour == None:
                for coords in ctour.coordArr:
                    if len(coords) > 0:
                        boxvals = listbox.get(0, END)
                        if art.name not in boxvals:
                            listbox.insert(0, art.name)
                        canvas.create_line(coords, tag="line")


                
def go(event):
    hideHandles()
    cs = listbox.curselection()
    # listbox.get(cs[0], cs[0])[0]
    art = vid.findArticleWithName(listbox.get(cs[0], cs[0])[0])
    current_article  = art
    c = art.findContourByFrame(framer.currentFrame)
    

    showHandles(c)

    # Updating label text to selected option
    # w.config(text=Lb.get(cs))


def hideHandles():
    global canvas
    for h_id in placeholder_handles:
        canvas.delete(h_id)

    for a_id in handle_arr:
        canvas.delete(a_id)
    

def showHandles(c):
    global canvas
    global hasHandle
    global handle_arr
    global placeholder_handles
    print("showing handles")
    hasHandle = True
    # canvas.create_line(c.coordArr, tag="token")
    
    for i, c in enumerate(c.coordArr):
        # individual arrays
        for idx, pt in enumerate(c):
            # smaller array
            h_id = create_circle(pt[0], pt[1], 10, canvas)
            circ_id = create_circle(pt[0], pt[1], 10, canvas, fill='red')
            print("circ id: ", circ_id)
            canvas.tag_bind(circ_id, "<Button-1>", drag_start, add=False)
            canvas.tag_bind(circ_id, "<ButtonRelease-1>", drag_stop, add=False)
            canvas.tag_bind(circ_id, "<B1-Motion>", drag, add=False)

            placeholder_handles.append(h_id)
            handle_arr.append([i, idx, circ_id, pt])
            

def create_circle(x, y, r, canvasName, fill='grey'): #center coordinates, radius
    x0 = x - r
    y0 = y - r
    x1 = x + r
    y1 = y + r
    return canvasName.create_oval(x0, y0, x1, y1, fill=fill)

def drag_start(event):
        """Begining drag of an object"""
        global canvas
        global _drag_data
        global _moving_pt
        print("drag start")
        if hasHandle:
            if event.x < image_size[0] and event.y < image_size[1]:
                _moving_pt  = [event.x, event.y]
                # record the item and its location
                _drag_data["item"] = canvas.find_closest(event.x, event.y)[0]
                print("draged start: ", _drag_data["item"])
                _drag_data["x"] = event.x
                _drag_data["y"] = event.y

def drag_stop(event):
    """End drag of an object"""
    global canvas
    global _drag_data
    global  current_article
    global handle_arr
    # update vid article contour 

    

    if hasHandle:
        c = current_article.findContourByFrame(framer.currentFrame)
        # some how update the correct contour
        # need to find the correct contour
        # I need the index of the (big contour) and then the index of the little one
        for handle in handle_arr:
            if handle[2] == _drag_data['item']:
                handle[3] = [_drag_data['x'], _drag_data['y']]
                


        # reset the drag information
        

def drag(event):
    """Handle dragging of an object"""
    global canvas
    global _drag_data
    if hasHandle:
        if event.x < image_size[0] and event.y < image_size[1]:
            # compute how much the mouse has moved
            delta_x = event.x - _drag_data["x"]
            delta_y = event.y - _drag_data["y"]
            # move the object the appropriate amount
            canvas.move(_drag_data["item"], delta_x, delta_y)
            # record the new position
            _drag_data["x"] = event.x
            _drag_data["y"] = event.y
    

def endAdjustment():
    global hasHandle
    global current_article
    global handle_arr
    global placeholder_handles
    if hasHandle:
        hasHandle = False
        print("ended adjustment")
        print(_drag_data)
        c = current_article.findContourByFrame(framer.currentFrame)
        for handle in handle_arr:

            c.updateSingleCoord(handle[0], handle[1], handle[3])

            canvas.delete(handle[2])
        handle_arr = []
        for h_id in placeholder_handles:
            canvas.delete(h_id)
        placeholder_handles = []
        canvas.delete('line')
        updateUI()
        _drag_data["item"] = None
        _drag_data["x"] = 0
        _drag_data["y"] = 0


def output():
    final = {}
    vid_copy = copy.deepcopy(vid)
    final['name'] = vid_copy.name
    final['articles'] = []
    outfile_name = vid_copy.name + "_data.txt"

    for idx, art in enumerate(vid_copy.articles):
        stub = {
            'name': art.name,
            'contours': art.contours
        }
        final['articles'].append(stub)

        for i, c in enumerate(art.contours):
            _stub  = {
                'frame': c.frame,
                'coordinates': c.coordArr
            }
            final['articles'][idx]['contours'][i] = _stub
    write_json(vid_copy.name + '.json', final)

    
            
        
        
def write_json(target_file, data, target_path = '/Users/tommysarni/design_capstone/output', ):
    if not os.path.exists(target_path):
        try:
            os.makedirs(target_path)
        except Exception as e:
            print(e)
            raise
    with open(os.path.join(target_path, target_file), 'w') as f:
        json.dump(data, f)


# root
root = Tk()
w, h = root.winfo_screenwidth(), root.winfo_screenheight()
root.geometry("%dx%d+0+0" % (w, h))

# canvas
canvas = Canvas(root,width=w,height=h)

canvas.pack(expand=YES, fill=BOTH, side=LEFT)

# listbox with scroll
listbox = Listbox(root)
listbox.bind('<Double-1>', go)
listbox.pack(side=LEFT, fill=BOTH)
scrollbar = Scrollbar(root)
scrollbar.pack(side = RIGHT, fill = BOTH)
listbox.config(yscrollcommand = scrollbar.set)
scrollbar.config(command = listbox.yview)

# select video button
btn_select_video = Button(canvas, text="Select Video", command=selectVideo)
btn_select_video.grid(row=0,column=0)

# edit frame button
btn_edit_frame = Button(canvas, text="Edit", command=editFrame)
btn_edit_frame.grid(row=0,column=1)

# prev frame button
btn_prev = Button(canvas, text="Prev", command=prevFrame)
btn_prev.grid(row=0,column=2)

# next frame button
btn_next = Button(canvas, text="Next", command=nxtFrame)
btn_next.grid(row=0,column=3)

# reset button
btn_reset = Button(canvas, text="Reset Frame", command=reset)
btn_reset.grid(row=0,column=4)

#end adjustment
btn_adjustment = Button(canvas, text="End Adjustment", command=endAdjustment)
btn_adjustment.grid(row=0,column=5)

#copy last, replaces the current with the last details
btn_copy = Button(canvas, text="Copy Prev", command=copyLast)
btn_copy.grid(row=0,column=6)

#copy last, replaces the current with the last details
btn_output = Button(canvas, text="Save/Output", command=output)
btn_output.grid(row=0,column=7)



mainloop()

