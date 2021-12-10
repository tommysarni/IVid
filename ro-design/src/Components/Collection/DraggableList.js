// // Original: https://github.com/chenglou/react-motion/tree/master/demos/demo8-draggable-list
//
// import { render } from 'react-dom'
// import React, {useEffect, useRef, useState} from 'react'
// import clamp from 'lodash-es/clamp'
// import swap from 'lodash-move'
// import { useDrag } from "@use-gesture/react"
// import { useSprings, animated } from 'react-spring'
// import './screen.css'
//
//
//
//
// export default function DraggableList({ items }) {
//     // let order =  // Store indicies as a local ref, this represents the item order
//     const [order, setOrder] = useState([])
//     // Returns fitting styles for dragged/idle items
//     const fn = (active, originalIndex, curIndex, y) => (index) =>{
//
//        return active && index === originalIndex
//             ? { y: curIndex * 50 + y, scale: 1.1, zIndex: '1', shadow: 15, immediate: (n) => n === 'y' || n === 'zIndex' }
//             : { y: order.indexOf(index) * 50, scale: 1, zIndex: '0', shadow: 1, immediate: false }
//
//     }
//
//     const [springs, setSprings] = useSprings(items.length, fn(order)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.
//
//
//
//     useEffect(() => {
//         // console.log(items.length, items.map((_, i) => i))
//         setOrder(items.map((_, i) => i))
//         console.log("order", order)
//         console.log('rendered', items)
//     }, [items])
//
//     const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
//         const curIndex = order.indexOf(originalIndex)
//         const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, items.length - 1)
//         const newOrder = swap(order, curIndex, curRow)
//         setSprings(fn(newOrder, active, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
//         if (!active) setOrder(newOrder)
//     })
//
//     return (
//         <ul className="content bottomTransparency" >
//             {springs.map(({ zIndex, shadow, y, scale }, i) => (
//                 <animated.div
//                     {...bind(i)}
//                     key={i}
//                     className={'noselect'}
//                     style={{
//                         zIndex,
//                         boxShadow: shadow.to((s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
//                         y,
//                         scale
//                     }}
//                     children={items[i]}
//                 />
//             ))}
//         </ul>
//     )
// }
//
// // render(<DraggableList items={'Lorem ipsum dolor sit pa no sq'.split(' ')} />, document.getElementById('root'))
