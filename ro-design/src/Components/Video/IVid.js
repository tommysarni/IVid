import React, {useEffect, useRef, useState} from 'react'
import test_video from "../../Assets/test_video2.json";
import Video from "../../Assets/test_video.mp4";
import useVideoFrames from './useVideoFrames';
import jacket from "../../Assets/jacket.webm"
import shoes from "../../Assets/shoes.webm"
import './video.css'
import DraggableDiv from "../Collection/DraggableDiv";
import Interactive from "../Collection/Interactive";
import ReactDOM from "react-dom";
import {Container} from "../Collection/menuStyles";
import {Tree} from "../Collection/Menu";
const classifyPoint = require("robust-point-in-polygon")
// import DraggableList from "../Collection/DraggableList";

/**
 * Things that matter
 * Original Video
 * Overlay Videos
 * Article Contraints
 * Number of Frames
 */

export function inside(point, vs) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

    // let x = point[0], y = point[1];
    //
    // let inside = false;
    // for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    //     let xi = vs[i][0], yi = vs[i][1];
    //     let xj = vs[j][0], yj = vs[j][1];
    //
    //     let intersect = ((yi > y) !== (yj > y))
    //         && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    //     if (intersect) inside = !inside;
    // }

    return classifyPoint(vs, point) <= 0;
};

export const inContours = (c, pt) => {
    for (const polygon of c) {
        if (inside(pt, polygon)) {
            // setPtInside(true)
            return true
        }

    }
    // setPtInside(false)
    return false

}


// // get the ul#menu
// const menu = document.querySelector('#menu');
// // add menu item
// menu.appendChild(createMenuItem('Home'));
// menu.appendChild(createMenuItem('Services'));
// menu.appendChild(createMenuItem('About Us'));

export const ptInRectangle = (pt, vs) => {


    let xs = vs.map((el) => el[0])
    let ys = vs.map((el) => el[1])
    let maxX = Math.max(...xs);
    let maxY= Math.max(...ys);
    let minX = Math.min(...xs);
    let minY = Math.min(...ys);
    return pt[0] >= minX && pt[0] <= maxX && pt[1] >= minY && pt[1] <= maxY;

}


export const OverlapInteractive =({article, setMovingArticle, setInBasket, inBasket, movingArticle}) => {
    const [pos, setPos] = useState(undefined)

    useEffect(()=> {
        if (!pos) {
            const offsets = document.getElementById(`${article.name}stable`).getBoundingClientRect()
            setPos([offsets.left, offsets.top])
        }
    })

    return <div style={{width:'50px', height: '30px'}}>
                <div id={`${article.name}`}
                    style={{position:'absolute', display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'rgba(0,0,0,0)', borderColor:'rgba(0,0,0,0)'}} className={''}
                     onMouseDown={(ev) => {
                         const el = document.getElementById(`${article.name}`)
                         el.style.color = 'rgba(36, 41, 46, 1)'
                         el.style.borderColor = 'rgba(36, 41, 46, 1)'
                         const container = document.getElementById(`${article.name}i`)
                         if (container) container.style.borderColor = 'rgba(36, 41, 46, 1)'
                         setMovingArticle(true)

                     }}
                     onMouseUp={(ev) => {
                         //let elemBelow = document.elementFromPoint(ev.clientX, ev.clientY);
                         const browseArea = document.getElementById('browseArea')
                         const bounds = browseArea.getBoundingClientRect()
                         const polygon = [[bounds.left, bounds.top], [bounds.left + bounds.width, bounds.top],
                             [bounds.left, bounds.top + bounds.height], [bounds.left + bounds.width, bounds.top
                             + bounds.height]]
                         const isGood = ptInRectangle([ev.clientX, ev.clientY], polygon)
                         if (isGood) {
                             setInBasket([...inBasket, article.name])
                         }
                         setMovingArticle(false);
                         const el = document.getElementById(`${article.name}`);
                         el.style.color = 'rgba(36, 41, 46, 0)';
                         const container = document.getElementById(`${article.name}i`);
                         if (container) {
                             container.style.borderColor = 'rgba(36, 41, 46, 0)'

                         }
                }}>
                    <div className={'container'}>
                    <Interactive id={`${article.name}motion`}
                                 content={<div className={'vidItem noselect'}
                                               style={{borderColor: 'rgba(0,0,0,0)'}}
                                               id={`${article.name}i`}>{article.name}</div>}
                                movingArticle={movingArticle}/>
                    </div>
                </div>
                <div id={`${article.name}stable`}
                    style={{position:'absolute', display: 'flex', flexDirection: 'row', alignItems: 'center'}} className={'vidItem noselect'}>
                   <div>{article.name}</div>
                </div>
            </div>
}

export const VideoMenu = ({articles, handleSelection, setMovingArticle, setSelected, selected, movingArticle, setInBasket, inBasket}) => {
    return (
        <Container>
            <Tree name="available items" defaultOpen={true}>
                {articles.map((article) => <Tree name={article.name} style={{ color: '#37ceff' }}
                                                 selected={selected}
                                                 article={article}
                                                 setSelected={setSelected}
                                                 handleSelection={() => handleSelection(article.name)}
                content={<OverlapInteractive article={article} handleSelection={handleSelection} setInBasket={setInBasket} inBasket={inBasket} setMovingArticle={setMovingArticle} movingArticle={movingArticle}/>}/>)}
            </Tree>
        </Container>
    )
}


export const VideoSideList = ({articles, handleSelection, setMovingArticle, setInBasket, inBasket, movingArticle, selected, setSelected}) => {
    //<Interactive content={<div style={{ backgroundImage: `url(${imgs[0]})` }} />} className={'card'}/>
    return <div className={'videoList'}>
        <VideoMenu articles={articles} handleSelection={handleSelection} selected={selected} setSelected={setSelected} inBasket={inBasket} setMovingArticle={setMovingArticle} movingArticle={movingArticle} setInBasket={setInBasket} />

        {/*{articles.map((article) => {*/}
        {/*    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>*/}
        {/*        <div style={{width: '10px', height: '10px', backgroundColor: 'black'}}*/}
        {/*        onClick={(ev) => {*/}
        {/*            console.log('clicked')*/}
        {/*            handleSelection(article.name)*/}
        {/*        }}/>*/}
        {/*        <OverlapInteractive article={article} handleSelection={handleSelection} setInBasket={setInBasket} inBasket={inBasket} setMovingArticle={setMovingArticle} movingArticle={movingArticle}/>*/}
        {/*    </div>*/}
        {/*})}*/}
    </div>
}


export default function IVid({setInsideName, insideName, handleSelection,selected, setSelected}) {

    const ratio = (window.innerHeight / 2) / test_video.resized_size[1]

    const vWidth = ratio * test_video.resized_size[0]
    const vHeight = ratio * test_video.resized_size[1]

    const overlays = [[jacket, "jacket"], [shoes, "shoe"]];
    const [mousePosition, setMousePosition] = useState([0,0])
    const [constraints, setConstraints] = useState([{arr: [], name: ""}])
    const [frameNum, setFrameNum] = useState(0)
    const [vidTime, setVidTime] = useState(0)
    // const [video, setVideo] = useVideoFrames((vt, fid) => {setFrameNum(fid); setVidTime(vt); myFunction();});
    const [video, setVideo] = useVideoFrames((vt, fid) => {setFrameNum(fid); setVidTime(vt); updateVideoContours();});
    const [vidSize, setVidSize] = useState([0,0])


    const [paused, setPaused] = useState(true)





    useEffect(() => {

        setVideo(document.getElementById("v"))


        // on initializing the original video: update it's size and add a reset when the video ends
        if ((video !== null) && vidSize.toString() === [0, 0].toString()) {
            setVidSize([video.width, video.height])
            video.onended = (event) => {
                const vids = document.querySelectorAll((`#${test_video.name} > video`))
                reset()
                vids.forEach((vid) => {vid.currentTime = 0; vid.play();})
            };
        }

    }, [setVideo, video, vidSize]);

    // Resets the values to return to initial video state
    function reset() {
        setConstraints([{ arr: [], name: "" }])
        setFrameNum(0)
        setInsideName(undefined)
        setVidTime(0)
    }





    function handleMouseMove(ev) {
        const rect = ev.target.getBoundingClientRect()
        // console.log('rectl', rect.left, ' recttop', rect.top)
        const x = ev.clientX - rect.left; //x position within the element.
        const y = ev.clientY - rect.top;  //y position within the element.
        setMousePosition([x, y]);
        inAnyContours(constraints, mousePosition)

    }

    function handleVideoClick(ev) {
        if (inAnyContours(constraints, mousePosition)) {
            if (!insideName) return;
            handleSelection(insideName)
        }
    }


    const resize = (arr) => {
        // const l = 1 - vidSize[0] / test_video.resized_size[0]
        const l = vidSize[0] / test_video.resized_size[0]
        const y_l = vidSize[1] / test_video.resized_size[1]
        return arr.map(arr => arr.map(coord => [Math.floor((coord[0] * l)), Math.floor((coord[1] * y_l))]))
    }

    function updateVideoContours(event = null) {
        // for resizing article constraints
        const l = 1 - vidSize[0] / test_video.original_size[0]
        const y_l = vidSize[1] / test_video.resized_size[1]
        // The currentTime property returns the current position of the audio/video playback

        if (video !== null) {
            let allConstraints = []

            for (const a of test_video.articles) {
                if (frameNum !== undefined) {
                    const currentFrame = Math.floor((vidTime / video.duration) * test_video.lastFrameNum)
                    let coordArr = a.contours[currentFrame % (test_video.lastFrameNum + 1)].coordinates

                    coordArr = resize(coordArr)

                    let obj = {
                        arr: coordArr,
                        name: a.name
                    }
                    allConstraints.push(obj)
                } else {
                    console.log("undefined framNum?")
                }
            }
            setConstraints(allConstraints)
            // inAnyContours(constraints, mousePosition)
        } else {
            console.log("went bad")
        }

    }




     const inAnyContours = (c , pt) => {
        for (const a of c) {
            if (inContours(a.arr, pt)) {
                setInsideName(a.name)
                // display article video
                return true
            }
        }
        setInsideName(undefined)
        //hide article videos
        return false
    }



    // let items = []
    // for (const con of constraints) {
    //     for (const ind of con.arr) {
    //         for (const idx of ind) {
    //             items.push(idx)
    //         }
    //     }
    // }
    return (
            <div className="videoContent" style={{width: vWidth, height: vHeight, marginBottom: '20px', marginRight: '20px'}} onMouseMove={(ev) => handleMouseMove(ev)} id={test_video.name}>
                <video autoPlay={true} muted={true} loop={false}
                    id="v" width={vWidth} height={vHeight}
                       className={'cardBorder'}
                       style={{ position: 'absolute', zIndex: 1, cursor: `${insideName !== undefined ? 'pointer' : 'auto'}` }}
                       onTimeUpdate={(ev) => updateVideoContours(ev)}
                       onMouseDown={(ev) => handleVideoClick(ev)}
                       src={Video}>
                </video>
                {overlays.map(([src, articleName]) => {
                    return <video autoPlay={true} muted={true} loop={false}
                                  id='v2' width={vWidth} height={vHeight}
                                  style={{ position: 'absolute', zIndex: 2,  pointerEvents: 'none' ,
                                      visibility: `${(insideName === articleName || (selected.filter((str) => str === articleName).length > 0) ?  'visible' : 'hidden')}`}}
                                  src={src}>
                    </video>
                })}

            {/*<footer>{`hello`}</footer>*/}
            </div>
    )
}










