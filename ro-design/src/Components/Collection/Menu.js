import React, { useRef, useState, useEffect } from 'react'
import { useSpring, a } from '@react-spring/web'
import useMeasure from 'react-use-measure'
import { Container, Title, Frame, Content, toggle } from './menuStyles'
import * as Icons from './Icons'

function usePrevious(value) {
    const ref = useRef()
    useEffect(() => void (ref.current = value), [value])
    return ref.current
}

export const Tree = React.memo(({ children, name, style, defaultOpen = false, handleSelection, content, selected, article, setSelected, link}) => {
        const [isOpen, setOpen] = useState(defaultOpen || (selected && selected.some((name) => article.name === name)))

        useEffect(() => {
            if (selected && selected.some((name) => article.name === name)) setOpen(true);
            else if (selected) setOpen(false);
        }, [selected])
        const previous = usePrevious(isOpen)
        const [ref, { height: viewHeight }] = useMeasure()
        const { height, opacity, y } = useSpring({
            from: { height: 0, opacity: 0, y: 0 },
            to: {
                height: isOpen ? viewHeight : 0,
                opacity: isOpen ? 1 : 0,
                y: isOpen ? 0 : 20,
            },
        })
        // @ts-ignore
        const Icon = Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]
        return (
            (content) ? <Frame>
                {/*<Icon style={{ ...toggle, opacity: children ? 1 : 0.3 }} onClick={() => {setOpen(!isOpen); if (handleSelection) handleSelection()}} />*/}
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{...toggle, border: '2px solid #24292e',  background: (isOpen) ? '#24292e' : 'rgba(0,0,0,0)',
                        borderColor: (isOpen) ? '#24292e' : '#24292e', width: '13px', height: '13px'}}
                         onClick={() => {
                             setOpen(!isOpen);
                        if (handleSelection) handleSelection();
                        }}>
                    </div>
                    {content}
                </div>

                <Content
                    style={{
                        opacity,
                        height: isOpen && previous === isOpen ? 'auto' : height,
                    }}>
                    <a.div ref={ref} style={{ y }} children={children} />
                </Content>
            </Frame> :
                <Frame>
                <Icon style={{ ...toggle, opacity: children ? 1 : 0.3, cursor: children ? 'pointer' : 'auto' }} onClick={() => {setOpen(!isOpen); if (handleSelection) handleSelection()}} />
                    {link ? <Title style={style}><a style={{textDecoration: 'none'}} href={link}>{name}</a></Title> : <Title style={style}>{name}</Title>}
                    <Content
                        style={{
                            opacity,
                            height: isOpen && previous === isOpen ? 'auto' : height,
                        }}>
                       <a.div ref={ref} style={{ y }} children={children} />
                    </Content>
            </Frame>
        )
    })

export default function Menu() {
    return (
        <Container>
            <Tree name="Collections">
                <Tree name="Skate" style={{ color: '#37ceff' }} link={'/Skate'}/>
                <Tree name="Photography: Coming Soon!" style={{ color: 'rgba(55,206,255,0.5)' }} />
                <Tree name="Tattoo : Coming Soon!" style={{ color: 'rgba(55,206,255,0.5)' }} />
            </Tree>
        </Container>
    )
}

// export default function Menu() {
//     return (
//         <Container>
//             <Tree name="main" defaultOpen>
//                 <Tree name="hello" />
//                 <Tree name="subtree with children">
//                     <Tree name="hello" />
//                     <Tree name="sub-subtree with children">
//                         <Tree name="child 1" style={{ color: '#37ceff' }} />
//                         <Tree name="child 2" style={{ color: '#37ceff' }} />
//                         <Tree name="child 3" style={{ color: '#37ceff' }} />
//                         <Tree name="custom content">
//                             <div
//                                 style={{
//                                     position: 'relative',
//                                     width: '100%',
//                                     height: 200,
//                                     padding: 10,
//                                 }}>
//                                 <div
//                                     style={{
//                                         width: '100%',
//                                         height: '100%',
//                                         background: 'black',
//                                         borderRadius: 5,
//                                     }}
//                                 />
//                             </div>
//                         </Tree>
//                     </Tree>
//                     <Tree name="hello" />
//                 </Tree>
//                 <Tree name="world" />
//                 <Tree name={<span>🙀 something something</span>} />
//             </Tree>
//         </Container>
//     )
// }
