import Head from "next/head";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";
const { URL_API } = process.env;

export default function Post({post}){
    const router = useRouter()
    console.log(router.asPath)
    if (!post) return  'Loading...'
    return (
        <div>
            <Head>
                <title>{post.title}</title>
                <meta property="og:site_name" content="yn.gl"/>
                <meta property="og:title" content={post.title}/>
                <meta property="og:type" content="article"/>
                <meta property="og:url" content={"yn.gl/"+router.asPath}/>
                <meta property="og:image" content={post.imgUri}/>
                <meta name="Description" content=""/>

            </Head>
            <Navbar/><div className="container">
                <div>
                    <div>
                        <h1 className="title_post">{post.title}</h1>
                        <div className="post_img">
                            <Image
                                src={post.imgUri}
                                alt="Picture of the author"
                                layout="fill"
                                objectFit="contain"
                                priority
                            />
                        </div>
                        <div className="container_text">
                            {
                                post.text.map((postkk,indexx)=>{
                                    return(
                                        <p key={indexx}>{post.text[indexx]}</p>
                                    )
                                })
                            }
                        </div>
                        {
                            <div className="key_plate">
                                {
                                    post.en_keywords.map((postk,index)=>{
                                        return(
                                            <div className="key_item" key={index}>
                                                <Link href={'/'+postk} passHref>{post.keywords[index]}</Link>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        }
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
