import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from "next/link";
import Navbar from "../../components/Navbar";
import NextScript from "next/script";
import InfiniteScroll from "react-infinite-scroll-component"
import {useEffect,useState} from "react";
import {useRouter} from "next/router";


export default function Home({data,categoryDate}) {
    const router = useRouter()
    const [posts,setPosts] = useState(data)
const getMorePosts = async () =>{
    const res = await fetch(process.env.API_URL+`/post?_start=${posts.length}&_limit=10`)
    const newPosts = await res.json()
    setPosts(posts => [...posts, ...newPosts])
}
    return (
    <div>
      <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8;"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>YNGL</title>
      </Head>
    <Navbar/>
        <div className="container">
            <InfiniteScroll next={getMorePosts} hasMore={false} loader={<h4>Loading...</h4>} dataLength={posts.length}>
                <div className="tags_title"><h1>{categoryDate.keywords}</h1></div>
            <div className="container_left bbb">
                        {
                            data.map((post,idx)=>{
                                return(
                                    <article className="article_card" key={idx}>
                                        <div className="article">
                                    <Link  href={'[dir]/[id]'} as={'/'+post.date+'/'+post._id} passHref>
                                        <div className="article_inner">
                                            <div className="article_box">
                                                <div className="article_left">
                                                    <Image className="image"
                                                    src={post.imgUri}
                                                    alt="Picture of the author"
                                                    width={150}
                                                    height={100}
                                                />
                                                </div>
                                                <div className="article_right">
                                                    <div className="article_title"><h3>{post.title}</h3></div>
                                                    <div className="article_desc">{post.text.substr(0,250)}</div>
                                                    <div className="article_meta">
                                                        <time dateTime={post.time +" "+post.date} className="news__date">
                                                            {post.time +" "+post.date}
                                                        </time>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </Link>
                                        </div>
                                    </article>
                                )
                            })
                        }
            </div>
            </InfiniteScroll>
        </div>
        </div>
  )
}

export async function getServerSideProps(context) {

    const res = await fetch(process.env.API_URL+`/post?_path=${context.query.dir}`)
    const rest = await fetch(process.env.API_URL+`/post/get?_path=${context.query.dir}`)
    const data = await res.json()
    const categoryDate = await rest.json()

    if (data.length===0 || categoryDate.keywords.length===0) {
        return {
            notFound: true,
        }
    }
    return {
        props: {data,categoryDate},
    }
}
