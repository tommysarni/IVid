import s from "../styles/Collections.module.css";

function CollectionLine(props) {
    return <div style={{'text-align': `${props.direction || 'center'}`}}>
        <div className={s.collectionLine}>
        </div>
    </div>;
}

export default CollectionLine