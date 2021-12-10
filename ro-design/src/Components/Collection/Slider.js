import './screen.css'
import Slide from "./Slide";
import {useState, useRef} from "react";
import {Lethargy} from "lethargy"
import {useWheel} from "@use-gesture/react";
import {BrowseList} from "./BrowseList";

const slides = [0, 1, 2, 3, 4, 5]
// creates a new Lethargy check
// could be stored as a ref, or a global anywhere in your app
const lethargy = new Lethargy()

export function LethargyWheel(props) {
    const [index, setIndex] = useState(0)
    const ref = useRef()
    const clamp = (value, min, max) => Math.max(Math.min(max, value), min)
    useWheel(
        ({ event, last, memo: wait = false }) => {
            if (last) return // event can be undefined as the last event is debounced
            event.preventDefault() // this is needed to prevent the native browser scroll
            const wheelDirection = lethargy.check(event)
            // wheelDirection === 0 when Lethargy thinks it's an inertia-triggered event
            if (wheelDirection) {
                // wait is going to switch from false to true when an intentional wheel
                // event has been detected
                if (!wait) setIndex((i) => clamp(i - wheelDirection, 0, slides.length - 1))
                return true // will set to wait to true in the next event frame
            }
            return false // will set to wait to false in the next event frame
        },
        // we need to use a ref to be able to get non passive events and be able
        // to trigger event.preventDefault()
        { target: ref, eventOptions: { passive: false } }
    )

    return (
        <div ref={ref} style={{ transform: `translateY(${-index * 330}px)` }}>
            {props.slides.map((i) => (
                i
            ))}
        </div>
    )
}


export default function Slider({inBasket, setInBasket, setMovingArticle, movingArticle, imageContent, imageStyle, videoContent}) {

    const slides = [<Slide inBasket={inBasket} setInBasket={setInBasket} setMovingArticle={setMovingArticle} movingArticle={movingArticle}
    imageContent={imageContent} imageStyle={imageStyle} videoContent={videoContent}/>]
    return <div className={"slider"}>
            {slides.map((i) => (
                i
            ))}

        </div>


}