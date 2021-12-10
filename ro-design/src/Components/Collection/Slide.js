import './screen.css'
// import DraggableList from "./DraggableList";
import IVid, {VideoSideList} from "../Video/IVid";
import test_video from "../../Assets/test_video2.json";
import Interactive from "./Interactive";
import {useEffect, useState} from "react";
import {BrowseList} from "./BrowseList";
import * as url from "url";
import adjacentimg1 from '../../Assets/adjacentimg1/adjacentimg1.jpg'
import adjacentimgjson from '../../Assets/adjacentimg1/adjacentimg1 copy.json'
import fleeceGirlKickFlip from '../../Assets/fleece/fleeceGirlKickFlip.jpg'
import fleeceGirljson from '../../Assets/fleece/fleeceGirlKickFlip.json'
import vanPoseAll from '../../Assets/van/vanPoseAll.jpg'
import vanPosejson from '../../Assets/van/vanPoseAll.json'
import {IImage} from "../Video/IImage";
// import {adjacentimg1,adjacentimg2,adjacentimg3} from '../../Assets'



export const SideList = (props) => {
    return <div className={"sidelist"}>
        {props.list.map((el) => <div className={"itemlist"}>{el}</div>)}
    </div>
}

// const imgs = [
//     'https://drscdn.500px.org/photo/126979479/w%3D440_h%3D440/v2?webp=true&v=2&sig=09ea71b0ddb91e24a59cecfb79a0189a2ab575d10372d3e8d3258e38f97a6a49',
//     'https://drscdn.500px.org/photo/435236/q%3D80_m%3D1500/v2?webp=true&sig=67031bdff6f582f3e027311e2074be452203ab637c0bd21d89128844becf8e40',
//     'https://drscdn.500px.org/photo/188823103/w%3D440_h%3D440/v2?webp=true&v=3&sig=af23265ed9beaeeeb12b4f8dfed14dd613e5139495ba4a80d5dcad5cef9e39fd',
//     'https://drscdn.500px.org/photo/216094471/w%3D440_h%3D440/v2?webp=true&v=0&sig=16a2312302488ae2ce492fb015677ce672fcecac2befcb8d8e9944cbbfa1b53a',
//     'https://drscdn.500px.org/photo/227760547/w%3D440_h%3D440/v2?webp=true&v=0&sig=d00bd3de4cdc411116f82bcc4a4e8a6375ed90a686df8488088bca4b02188c73'
// ]



export default function Slide({inBasket, setInBasket, setMovingArticle, movingArticle, imageContent, imageStyle, videoContent}) {

    const removeArticleIfDuplicate = (articles) => {
        let res = []
        for (let i = 0; i < articles.length - 1; i++) {
            let shouldRemove = false;
            for (let j = i+1; j < articles.length; j++) {
                if (articles[i].name === articles[j].name) {
                    shouldRemove = true;
                    break;
                }
            }
            if (!shouldRemove) res.push(articles[i]);
        }
        if (articles.length > 0) res.push(articles[articles.length-1])
        return res;
    }


    const [insideName, setInsideName] = useState(undefined)
    const [selected, setSelected] = useState([])
    // const [inBasket, setInBasket] = useState([]);
    // console.log('fir', [...imageContent.map((content) => content[1].articles.map((a) => a.name))])
    let flatArr = []
    imageContent.map((content) => content[1].articles.map((a) => flatArr.push(a)))
    console.log([...flatArr, ...videoContent[1].articles])
    const allArticles = removeArticleIfDuplicate([...flatArr, ...videoContent[1].articles])
    console.log(allArticles)
    const handleSelection = (name) => {
        const idx = selected.indexOf(name)
        let newSelection = []
        if (idx === -1)  newSelection = [...selected, name]
        else newSelection = selected.filter((str) => (str !== name))
        setSelected(newSelection)
        setInsideName(undefined)
    }

    return <div className={'container'}>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            justifyContent: 'center',
            marginTop: '25vh',
            width: '100%',
            height: '100%',
            alignItems: 'flex-start',
        }}>

            <IVid insideName={insideName} setInsideName={setInsideName} selected={selected} setSelected={setSelected} handleSelection={handleSelection} videoContent={videoContent}/>
            <VideoSideList articles={allArticles} insideName={insideName} setInsideName={setInsideName} selected={selected} setSelected={setSelected} handleSelection={handleSelection}
            setInBasket={setInBasket} inBasket={inBasket} setMovingArticle={setMovingArticle} movingArticle={movingArticle}/>
        </div>
        <div className={'tile'}>
            <div className={'container'} style={{width: '100%'}}>
                {imageContent.map((el, i) => <div style={imageStyle[i]}>
                    {/*img, json, overlays, setInsideName, insideName, handleSelection,selected, setSelected, css, cName*/}
                    <Interactive content={
                        <IImage
                            css={{ objectFit: 'cover', display: 'flex', justifyContent: 'center'}}
                            cName={''}
                            img={el[0]}
                            json={el[1]}
                            setInsideName={setInsideName}
                            insideName={insideName}
                            setSelected={setSelected}
                            selected={selected}
                            handleSelection={handleSelection}
                            overlays={el[2]}
                        />
                    } className={'card'} />
                </div>)}
            </div>
        </div>

    </div>

}


