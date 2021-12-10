import React, { useRef, useEffect, useState } from 'react'
import { useSpring, animated, to } from '@react-spring/web'
import { useGesture } from 'react-use-gesture'
import './tiles.css'






const calcX = (y, ly) => -(y - ly - window.innerHeight / 2) / 20
const calcY = (x, lx) => (x - lx - window.innerWidth / 2) / 20



export default function DraggableDiv(props) {
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
            onDrag: ({ active, offset: [x, y] }) =>
                api({ x, y, rotateX: 0, rotateY: 0, scale: active ? 1 : 1 }),
            // onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
            onMove: ({ xy: [px, py], dragging }) =>
                !dragging &&
                api({
                    rotateX: 1,
                    rotateY: 1,
                    scale: 1,
                }),
            onHover: ({ hovering }) => {
                return !hovering  && api({ rotateX: 0, rotateY: 0, scale: 1 })
            },
        },
        { domTarget, eventOptions: { passive: false } }
    )

    const animatedDiv = (content, target, className) => {

        let defaults = {
            transform: 'perspective(600px)',
            x,
            y,
            scale: to([scale, zoom], (s, z) => s + z),
            rotateX,
            rotateY,
            rotateZ,
        }

        if ((props.shouldHover !== undefined && !(props.shouldHover))) {
            defaults = {
                x,
                y
            }
        }

        return <animated.div
            ref={target}
            className={className}
            style={defaults}>
            {content}
        </animated.div>
    }

    return (
        <div className={'container'}>
            {animatedDiv(props.content, domTarget, props.className)}
        </div>

    )
}
