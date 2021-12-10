import s from "../styles/Collections.module.css";

function NavUI(props) {
    return <div className={s.column12}>
        <div style={{'grid-area' :  "3 / 2 / 4 / 2" }}>
            <div id="_idContainer003" className={s._idGenObjectStyleOverride3}>
                <p className={'text-right'}><span className={s.CharOverride1}>Ro x Concepts</span></p>
            </div>
        </div>
        <div style={{'grid-area' :  "11 / 2 / 12 / 2" }}>
            <div id="_idContainer004" >
                <p><span className={s.CharOverride2}>Shop</span></p>
            </div>
            <div id="_idContainer005" >
                <p><span className={s.CharOverride2}>Collections</span></p>
            </div>
            <div id="_idContainer006" >
                <p><span className={s.CharOverride2}>About</span></p>
            </div>
        </div>
        <div style={{'grid-area' :  "1 / 12 / 2 / 12" }}>
            <div id="_idContainer018" >
                <p><span className={s.CharOverride5}>Cart 0</span></p>
            </div>
        </div>

    </div>
}

export default NavUI