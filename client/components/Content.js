import React, {useCallback, useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";

const Content = ({data,number}) => {
    const router = useRouter()
    const [posts,setPosts] = useState(data);
    const [hasMore, setHasMore] = useState(true);
    const getMorePost = async () => {
        const res = await fetch(
            process.env.API_URL+`/post/getnewpost?_path=${router.query.dir}&start=${posts.length}&limit=10`
        );
        const newPosts = await res.json();
        setPosts((posts) => [...posts, ...newPosts]);
    };
    useEffect(()=>{
        setHasMore(number>posts.length ? true : false)
    },[posts])
    return (
        <>
            <InfiniteScroll
                dataLength={posts.length}
                next={getMorePost}
                hasMore={hasMore}
            >
                {
                   posts.map((post,idx)=>{
                        return(
                            <article className="article_card" key={idx}>
                                <div className="article">
                                    <Link  href={'/[dir]/[id]'} as={'/'+post.date+'/'+post._id} passHref>
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
                                                    <div className="article_desc">{post.text[0].toString().substring(350, 0)+".."}</div>
                                                    <div className="article_meta">
                                                        <time dateTime={post.time +" "+post.date} className="news__date">
                                                            {post.date}
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

            </InfiniteScroll>

        </>
    );
};


export default Content;