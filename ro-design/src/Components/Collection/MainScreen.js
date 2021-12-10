import './screen.css'
import Slide from "./Slide";
import Slider from "./Slider";
import {useState} from "react";
import {BrowseList} from "./BrowseList";
import shirt_close from '../../Assets/shirt_close.jpg'
import shoe_close from '../../Assets/shoe_close.jpg'
import pants_close from '../../Assets/pants_close.jpg'
import hat_close from '../../Assets/close_hat.jpg'
import vest_close from '../../Assets/vest_close.jpg'
import fleece_close from '../../Assets/fleece_close.jpg'
import drawPants_close from '../../Assets/drawpants_close.jpg'

import Menu from "./Menu";
import adjacentimg1 from "../../Assets/adjacentimg1/adjacentimg1.jpg";
import adjacentimgjson from "../../Assets/adjacentimg1/adjacentimg1 copy.json";
import adjacentimg1Hat from '../../Assets/adjacentimg1/adjacentimg1Hat.png'
import adjacentimg1Jacket from '../../Assets/adjacentimg1/adjacentimg1Jacket.png'
import adjacentimg1Pants from '../../Assets/adjacentimg1/adjacentimg1Pants.png'
import adjacentimg1Shoe from '../../Assets/adjacentimg1/adjacentimg1Shoe.png'
import fleeceGirlKickFlip from "../../Assets/fleece/fleeceGirlKickFlip.jpg";
import fleeceGirljson from "../../Assets/fleece/fleeceGirlKickFlip.json";
import fleeceGirlFleece from "../../Assets/fleece/fleeceGirlKickFlipJacket.png"
import fleeceGirlPants from "../../Assets/fleece/fleeceGirlKickFlipPants.png"
import vanPoseAll from "../../Assets/van/vanPoseAll.jpg";
import vanPosejson from "../../Assets/van/vanPoseAll.json";
import vanPoseAllHat from "../../Assets/van/vanPoseAllHat.png";
import vanPoseAllFleece from "../../Assets/van/vanPoseAllFleece.png";
import vanPoseAllVest from "../../Assets/van/vanPoseAllVest.png";
import vanPoseAllCanvasPants from "../../Assets/van/vanPoseAllCanvasPants.png";
import vanPoseAllDrawPants from "../../Assets/van/vanPoseAllDrawPants.png";
import vanPoseAllJacket from "../../Assets/van/vanPoseAllJacket.png";
import test_videojson from "../../Assets/test_video2.json"
import test_video from "../../Assets/test_video.mp4"
import {Link} from "react-router-dom";



export default function MainScreen() {
    const slides = [0,1,2]
    const [lo, setLo] = useState([0,0])
    const [inBasket, setInBasket] = useState([]);
    const [movingArticle, setMovingArticle] = useState(false)
    const [selectedInBasket, setSelectedInBasket] = useState(undefined)


    const videoContent = [test_video,test_videojson]
    const imageContent = [[adjacentimg1, adjacentimgjson, [[adjacentimg1Hat, "hat"], [adjacentimg1Jacket, "jacket"], [adjacentimg1Shoe, "shoe"], [adjacentimg1Pants, "pants"]]],
        [fleeceGirlKickFlip, fleeceGirljson, [[fleeceGirlFleece, "fleece jacket"], [fleeceGirlPants, "draw-string pants"]]],
        [vanPoseAll, vanPosejson, [[vanPoseAllHat, "hat"], [vanPoseAllFleece, "fleece jacket"], [vanPoseAllVest, 'canvas vest'], [vanPoseAllCanvasPants, 'pants'],
        [vanPoseAllDrawPants, 'draw-string pants'], [vanPoseAllJacket, 'jacket']]]]
    const imageStyle = [{top: '-10px', position: 'absolute', right: '45px'}, {left: '20px', position: 'absolute'}, {bottom: '20px', position: 'absolute', right: '150px'}]


    return <div className={"main"}
                onMouseMove={(ev) => setLo([ev.clientX, ev.clientY])}
    >
        <div style={{fontSize: '16px' ,position: 'absolute', top: '10px', 'right': '30px', display: 'flex', color: 'white', width:'100px', justifyContent: 'space-between'}}>
            <Link style={{textDecoration: 'none'}} to={'/'}><b>Home</b></Link>
            <Link style={{textDecoration: 'none'}} to={'/about'}><b>About</b></Link>
        </div>
        {/*<Menu />*/}
        <Slider inBasket={inBasket} setInBasket={setInBasket} setMovingArticle={setMovingArticle} movingArticle={movingArticle}
        imageContent={imageContent} imageStyle={imageStyle} videoContent={videoContent}/>
        <div className={'sideContainer'}>
            <div style={{color:'white', marginRight: 'auto'}}><b>Preview</b></div>
            <div className={'content holder'} onClick={(ev) => console.log(ev)}>
                {/*Hides inside the holder box kinda cool*/}
                {selectedInBasket !== undefined && selectedInBasket[1] === 'jacket' &&
                <img style={{width: '100%', height: '100%' ,objectFit: 'cover', objectPosition: '50% 100%'}} src={shirt_close} />}
                {selectedInBasket !== undefined && selectedInBasket[1] === 'shoe' &&
                <img style={{width: '100%', height: '100%' ,objectFit: 'cover', objectPosition: '50% 100%'}} src={shoe_close} />}
                {selectedInBasket !== undefined && selectedInBasket[1] === 'pants' &&
                <img style={{width: '100%', height: '100%' ,objectFit: 'cover', objectPosition: '50% 100%'}} src={pants_close} />}
                {selectedInBasket !== undefined && selectedInBasket[1] === 'hat' &&
                <img style={{width: '100%', height: '100%' ,objectFit: 'cover', objectPosition: '50% 0%'}} src={hat_close} />}
                {selectedInBasket !== undefined && selectedInBasket[1] === 'canvas vest' &&
                <img style={{width: '100%', height: '100%' ,objectFit: 'cover', objectPosition: '50% 50%'}} src={vest_close} />}
                {selectedInBasket !== undefined && selectedInBasket[1] === 'fleece jacket' &&
                <img style={{width: '100%', height: '100%' ,objectFit: 'cover', objectPosition: '50% 50%'}} src={fleece_close} />}
                {selectedInBasket !== undefined && selectedInBasket[1] === 'draw-string pants' &&
                <img style={{width: '100%', height: '100%' ,objectFit: 'cover', objectPosition: '50% 100%'}} src={drawPants_close} />}


            </div>
            <div style={{color:'white', marginRight: 'auto', marginBottom: '15px'}}><b>Interested</b></div>
            <div className={`${movingArticle ? 'listContainerMoving' : 'listContainer'}`} id={'browseArea'}>
                {/*<div>Interested</div>*/}
                <BrowseList inBasket={inBasket} setInBasket={setInBasket} selectedInBasket={selectedInBasket} setSelectedInBasket={setSelectedInBasket}/>
                {/*<DraggableList className={"sidelist"} items={inBasket} />*/}
            </div>
            {movingArticle &&
            <div style={{color:'white', margin: 'auto', fontSize: '12px'}}><b>Drag to add to Interested Collection</b></div>}
        </div>
        {/*<footer>Ro Catalog</footer>*/}
    </div>

}