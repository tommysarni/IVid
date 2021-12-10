import { useRouter } from 'next/router'

const Comment = () => {
    const router = useRouter()
    const { comment } = router.query
    console.log(router.query)
    console.log(comment)
    var str;
    if (["skate", 'friends','tattoo'].includes(comment)) str  = comment
    else str = 'error'


    return <p className={`${str === 'error' ? "bg-red-500" : ""} `}>Post: {str}</p>
}

export default Comment