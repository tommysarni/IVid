import React, {useEffect, useRef} from 'react'
import {animated, to, useSpring} from '@react-spring/web'
import {useGesture} from 'react-use-gesture'
import {clamp} from 'lodash'
import './tiles.css'


const calcX = (y, ly) => -(y - ly - window.innerHeight / 2) / 20
const calcY = (x, lx) => (x - lx - window.innerWidth / 2) / 20



export default function Interactive({content, className, id, movingArticle=undefined}) {
    useEffect(() => {
        const preventDefault = (e) => e.preventDefault()
        document.addEventListener('gesturestart', preventDefault)
        document.addEventListener('gesturechange', preventDefault)

        return () => {
            document.removeEventListener('gesturestart', preventDefault)
            document.removeEventListener('gesturechange', preventDefault)
        }
    }, [])

    const domTarget = useRef(null)
    const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(
        () => ({
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 1,
            zoom: 0,
            x: 0,
            y: 0,
            config: { mass: 5, tension: 350, friction: 40 },
        })
    )

    /**
     rotateX: calcX(py, y.get()),
     rotateY: calcY(px, x.get()),
     */

    useGesture(
        {
            onDrag: ({ active, movement: [x, y], offset: [offX, offY], xy }) => {
                if (movingArticle !== undefined) {
                    return api({
                        x: active ? x : 0,
                        y: active ? y : 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: active ? 1 : 1.025
                    })
                }
                return api({ x: offX, y: offY, rotateX: 0, rotateY: 0, scale: active ? 1 : 1.025 })
            },
            // onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
            onMove: ({ xy: [px, py], dragging }) =>
                !dragging &&
                api({
                    rotateX: 1,
                    rotateY: 1,
                    scale: 1.025,
                }),
            onHover: ({ hovering }) => {
                return !hovering  && api({ rotateX: 0, rotateY: 0, scale: 1 })
            },
        },
        { domTarget, eventOptions: { passive: false } }
    )

    const AnimatedDiv = (content, target, className, id, movingArticle) => {

        useEffect(() => {
            if (movingArticle !== undefined && !movingArticle) {
                api.set({x: 0, y:0})
            }
        }, [movingArticle])

        let defaults = {
            transform: 'perspective(600px)',
            x,
            y,
            scale: to([scale, zoom], (s, z) => s + z),
            rotateX,
            rotateY,
            rotateZ,
        }



        return <animated.div
            ref={target}
            className={className}
            style={defaults}
            id={id}>
            {content}
        </animated.div>
    }

    return AnimatedDiv(content, domTarget, className, id);

}
