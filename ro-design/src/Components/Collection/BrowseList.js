import {CloseSquareO} from "./Icons";


const CartItem = ({name, index, inBasket, setInBasket, selectedInBasket, setSelectedInBasket}) => {
    return <div className={'browseItem'} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background:  (selectedInBasket && selectedInBasket[0] === index) ? '#eb3342' : ''}}
    onClick={() => {
        if (selectedInBasket !== index) setSelectedInBasket([index,name]);
        else setSelectedInBasket(undefined)
    }}>
        <div>{name}</div>
        <CloseSquareO className={'deleteButton'} onClick={(ev) => {
            let newItems = [...inBasket]
            newItems.splice(index, 1)
            setInBasket(newItems)
            setSelectedInBasket(undefined)
        }}/>
    </div>
}

export const BrowseList = ({inBasket, setInBasket, selectedInBasket, setSelectedInBasket}) => {
    return <ul className={"sidelist"}>
        {inBasket.map((item, i) => <CartItem name={item} index={i} inBasket={inBasket} setInBasket={setInBasket
        } selectedInBasket={selectedInBasket} setSelectedInBasket={setSelectedInBasket}/>)}
    </ul>
}