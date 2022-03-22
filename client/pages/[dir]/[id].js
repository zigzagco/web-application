import Head from "next/head";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";
const { URL_API } = process.env;

export default function Post({post}){
    const router = useRouter()
    console.log(router.basePath)
    if (!post) return  'Loading...'
    return (
        <div>
            <Head>
                <title>{post.title}</title>
            </Head>
            <Navbar/><div className="container">
                <div>
                    <div>
                        <h1 className="title_post">{post.title}</h1>
                        {
                            post.en_keywords.map((postk,index)=>{
                                return(
                                    <div key={index}>
                                        <Link href={'/'+postk} passHref>{post.keywords[index]}</Link>
                                    </div>

                                )
                            })
                        }
                        <Image
                            src={post.imgUri}
                            alt="Picture of the author"
                            width={600}
                            height={250}
                        />
                        <div>
                            {post.text}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}



export async function getServerSideProps(context) {
    const {id}= context.query
    const res = await fetch(process.env.API_URL+`/post/${id}`)
    const post = await res.json()

    if (!post) {
        return {
            notFound: true,
        }
    }

    return {
        props: {post},
    }
}
