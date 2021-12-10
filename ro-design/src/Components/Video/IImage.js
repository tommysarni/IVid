import test_video from "../../Assets/test_video2.json";
import {inContours} from "./IVid";
import React, {useEffect, useState} from "react";

export const IImage = ({img, json, overlays, setInsideName, insideName, handleSelection,selected, setSelected, css, cName }) => {
    const [mousePosition, setMousePosition] = useState([0,0])
    const [items, setItems] = useState([])
    const aspectRatio = json.resized_size[0] / json.resized_size[1]
    let ratio = (600 / 2) / Math.min(json.resized_size[0], json.resized_size[1])
    // const ratio = (300) / json.resized_size[1]
    const vWidth = ratio * json.resized_size[0]
    const vHeight = ratio * json.resized_size[1]

    const makeConstraints = (imageSize) => {
        if (imageSize === undefined) return [];
        const resize = (arr) => {
            const currImage = document.getElementById(`im${json.name}`)
            const l = imageSize[0] / json.resized_size[0]
            const y_l = imageSize[1] / json.resized_size[1]
            return arr.map(coord => {
                return [Math.floor((coord[0] * l)), Math.floor((coord[1] * y_l))]
            })
        }
        let allConstraints = []

        for (const a of json.articles) {
            // console.log('all', a.contours[0].coordinates)
            let coords = []
            for (const coor of a.contours[0].coordinates) {
                let artCoord = resize(coor)
                coords.push(artCoord)
            }

            let obj = {
                arr: coords,
                name: a.name
            }
            allConstraints.push(obj)

        }
        return allConstraints
        // setConstraints(allConstraints)
    }

    const [constraints, setConstraints] = useState(makeConstraints())


    useEffect(() => {
        const hereImage = document.getElementById(`im${json.name}`)
        // on initializing the original video: update it's size and add a reset when the video ends
        if (hereImage) {
            setConstraints(makeConstraints([hereImage.width, hereImage.height]))
        }


    }, []);

    const inAnyContours = (c , pt) => {
        for (const a of c) {
            if (inContours(a.arr, pt)) {
                setInsideName((prev) => {
                    return a.name
                })
                return true
            }
        }
        setInsideName((prev) => undefined)
        //hide article videos
        return false
    }


    // const overlays = [[jacket, "jacket"], [shoes, "shoe"]];

    const handleMouseMove = (ev) => {
        const rect = ev.target.getBoundingClientRect()
        const x = ev.clientX - rect.left; //x position within the element.
        const y = ev.clientY - rect.top;  //y position within the element.
        setMousePosition([x, y])
        inAnyContours(constraints, mousePosition)
    }

    const handleMouseClick = (ev) => {
        ev.target.focus()
        const rect = ev.target.getBoundingClientRect()
        const x = ev.clientX - rect.left; //x position within the element.
        const y = ev.clientY - rect.top;  //y position within the element.
        setMousePosition([x, y])
        if (inAnyContours(constraints, mousePosition)) {
            if (!insideName) return;
            handleSelection(insideName)
        }
    }

    // let stuff = []
    // let colors = ["red", "blue", "black", "white"]
    // let count = 0
    // for (const art of constraints) {
    //     for (const arr of art.arr) {
    //
    //         stuff.push(<div style={{zIndex: '1000' ,position: 'absolute' ,background: colors[count], width: '10px', height:'10px', left: `${arr[0]}px`, top:`${arr[1]}px`}} />)
    //     }
    //     count++
    // }

    return  <div className={`videoContent ${cName}`} style={css} onMouseMove={handleMouseMove}
         onClick={handleMouseClick}>
        {/*{stuff}*/}
        <img id={`im${json.name}`} draggable="false" width={vWidth} height={vHeight}
             className={'cardBorder'}
             style={{ position: 'absolute', zIndex: 1, cursor: `${insideName !== undefined ? 'pointer' : 'auto'}`, aspectRatio: `${Math.floor(json.resized_size[0])} / ${Math.floor(json.resized_size[1])}` }}
             onDrag={() => {}}
             src={img} alt={'im'}/>
        {overlays.map(([src, articleName]) => {
            return <img
                id={`i2${json.name}`} width={vWidth} height={vHeight}
                style={{ position: 'absolute', zIndex: 2,  pointerEvents: 'none' ,
                    visibility: `${(insideName === articleName || (selected.filter((str) => str === articleName).length > 0) ?  'visible' : 'hidden')}`,
                    cursor: `${(insideName === articleName || (selected.filter((str) => str === articleName).length > 0) ?  'pointer' : 'auto')}`}}
                src={src} alt={'overlay'}/>
        })}
    </div>
}