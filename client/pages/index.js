import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import Navbar from "../components/Navbar";
import NextScript from "next/script";

export default function Home({posts}) {
    if(!posts) 'Loading...'

    return (
    <div>
        <NextScript
            src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
            strategy="afterInteractive"
        />
        <NextScript id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GA_MEASUREMENT_ID');
        `}
        </NextScript>
      <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8;"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>YNGL</title>
      </Head>
    <Navbar/>
        <div className="container">
            <div className="container_left bbb">
                        {
                            posts.map((post,idx)=>{
                                return(
                                    <article className="article_card" key={idx}>
                                        <div className="article">
                                    <Link  href={'/[id]'} as={'/'+post._id} passHref>
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
                                                        <time dateTime={post.date} className="news__date">
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
            </div>
        </div>
        </div>
  )
}

export async function getServerSideProps() {
    const res = await fetch(process.env.API_URL+`/post`)
    const posts = await res.json()

    if (!posts) {
        return {
            notFound: true,
        }
    }

    return {
        props: {posts},
    }
}
