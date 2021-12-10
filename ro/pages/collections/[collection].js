import { useRouter } from 'next/router'

const Post = () => {
    const router = useRouter()
    const { pid } = router.query
    var str;
    if (["skate", 'friends','tattoo'].includes(pid)) str  = pid
    else str = 'error'


    return <p className={`${str === 'error' ? "bg-red-500" : ""} `}>Post: {str}</p>
}

export default Post