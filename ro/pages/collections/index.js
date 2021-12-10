import s from '../../styles/Collections.module.css'
import CollectionLine from "../../ui/Collections/CollectionLine";
import CollectionTitle from "../../ui/Collections/CollectionTitle";
import NavUI from "../../ui/Collections/NavUI";
import CollectionBackground from "../../ui/Collections/CollectionBackground";

//Snap grid demo
// https://codepen.io/chriscoyier/pen/pMRgwW

function Collections() {
    return <div id="Ro_Collections">
        <div className={s.container}>
            <NavUI className={`${s.nav}`}/>
            <div className={`${s.bg} ${s.main} text-center`}>
                <p className={'text-center mt-24 pb-12'}><span className={s.heading}>COLLECTIONS</span></p>

                <CollectionTitle title={'SKATE'}/>
                <CollectionLine direction={'right'}/>


                <CollectionTitle title={'TATTOO'}/>
                <CollectionLine direction={'left'}/>

                <CollectionTitle title={'CLUB'}/>
                <CollectionLine direction={'right'}/>

                <CollectionTitle title={'CAMERA'}/>
                <CollectionLine direction={'left'}/>

                <CollectionTitle title={'RAP'}/>
                <CollectionLine direction={'right'}/>

                <CollectionTitle title={'FRIENDS'}/>
            </div>

            <div className={`${s.bg}`}>
                <CollectionBackground />
            </div>
        </div>
    </div>
}

export default Collections