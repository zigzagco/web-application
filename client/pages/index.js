import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import Navbar from "../components/Navbar";
import InfiniteScroll from "react-infinite-scroll-component"
import {useEffect,useState} from "react";
import useSWRInfinite from "swr/infinite";
import {useRouter} from "next/router";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home({data , NumberOfPosts}) {
    const [posts,setPosts] = useState(data)
    const [hasMore,sethasMore] = useState(true)
const getMorePosts = async () =>{
        try {
            const res = await fetch(process.env.API_URL+`/post?start=${posts.length}&limit=10`)
            const newPosts = await res.json()
            setPosts(posts => [...posts, ...newPosts])
        }catch (err){
            console.log(err)
        }
}
useEffect(()=>{
    sethasMore(NumberOfPosts > posts.length)
},[posts])

    return (
    <div>

      <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8;"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>YNGL</title>
      </Head>
    <Navbar/>
        <header>
            <div className="bottom_bar">
                <div className="container">
                    <div className="container_head">
                        <div className="cattext"><div className="ctext">
                                <Link href={"/[dir]"} as={"/politika"} passHref>
                                    <span className="catname">Политика</span>
                                </Link>
                            </div></div>
                        <div className="cattext"><div className="ctext">
                            <Link href={"/[dir]"} as={"/v_mire"} passHref>
                                <span className="catname">В мире</span>
                            </Link>
                        </div></div>
                        <div className="cattext"><div className="ctext">
                            <Link href={"/[dir]"} as={"/ekonomika"} passHref>
                                <span className="catname">Экономика</span>
                            </Link>
                        </div></div>
                        <div className="cattext"><div className="ctext">
                            <Link href={"/[dir]"} as={"/ekonomika"} passHref>
                                <span className="catname">Экономика</span>
                            </Link>
                        </div></div>
                        <div className="cattext"><div className="ctext">
                            <Link href={"/[dir]"} as={"/ekonomika"} passHref>
                                <span className="catname">Экономика</span>
                            </Link>
                        </div></div>

                    </div>
                </div>
            </div>
        </header>
        <div className="container">
            <InfiniteScroll next={getMorePosts} hasMore={hasMore} dataLength={posts.length} loader={<div>loading</div>}>
            <div className="container_left bbb">
                        {
                            posts.map((post,idx)=>{
                                return(
                                    <article className="article_card" key={idx}>
                                        <div className="article">
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
                                                    <Link  href={'[dir]/[id]'} as={'/'+post.date+'/'+post._id} passHref>
                                                        <div className="article_title">
                                                            <h3>{post.title}</h3>
                                                        </div>
                                                    </Link>
                                                    <div className="article_desc">{post.text[0]}</div>
                                                    <div className="article_meta">
                                                        <time dateTime={post.time +" "+post.date} className="news__date">
                                                            {post.date}
                                                        </time>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
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

export async function getServerSideProps({ req, res }) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    const resp = await fetch(process.env.API_URL+`/post?start=0&limit=10`)
    const data = await resp.json()
    const getNumberOfPosts = await fetch(process.env.API_URL+`/post/count`)
    const NumberOfPosts = await getNumberOfPosts.json()
    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data,
            NumberOfPosts: +NumberOfPosts

        },

    }
}
