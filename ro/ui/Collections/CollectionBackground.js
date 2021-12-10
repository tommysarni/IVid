import s from '../styles/Collections.module.css'

function CollectionBackground() {

    return <div className={s.column12}>
        <div style={{'grid-area' :  "3 / 1 / 4 / 2" }}>
            <div id="_idContainer000" className={`${s.blueDot}`}>
            </div>
        </div>
        <div style={{'grid-area' : '7 / 9 / 8 / 10'}}>
            <div id="_idContainer017" className={s.tanDot}>
            </div>
        </div>
    </div>
}

export default CollectionBackground