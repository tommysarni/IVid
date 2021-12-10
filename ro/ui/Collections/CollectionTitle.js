import s from "../styles/Collections.module.css";

function CollectionTitle(props) {
    return <div id="_idContainer010" className={s.BasicTextFrame}>
        <p className={'text-center'}><span className={s.CollectionTitles}>{props.title}</span></p>
    </div>
}

export default CollectionTitle