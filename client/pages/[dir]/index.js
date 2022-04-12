import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from "next/link";
import Navbar from "../../components/Navbar";
import NextScript from "next/script";
import InfiniteScroll from "react-infinite-scroll-component"
import {useEffect,useState} from "react";
import {useRouter} from "next/router";
import Content from "../../components/Content";
import dynamic from "next/dynamic";

export default function Home({data,categoryDate,NumberOfPosts}) {

    return (
    <div>
      <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8;"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>YNGL</title>
      </Head>
    <Navbar/>
        <div className="container">
                <div className="tags_title"><h1>{categoryDate.keywords}</h1></div>
            <div className="container_left bbb">
                <Content data={data} number={NumberOfPosts}/>
            </div>
        </div>
        </div>
  )
}
export async function getServerSideProps(context) {
    const res = await fetch(process.env.API_URL+`/post/getnewpost?_path=${context.query.dir}&limit=10`)
    const rest = await fetch(process.env.API_URL+`/post/get?_path=${context.query.dir}`)
    const getNumberOfPosts = await fetch(process.env.API_URL+`/post/getnewpost/count?_path=${context.query.dir}`)
    const NumberOfPosts = await getNumberOfPosts.json()
    const data = await res.json()
    const categoryDate = await rest.json()
    if (data.length===0 || categoryDate.keywords.length===0) {
        return {
            notFound: true,
        }
    }
    return {
        props: {data,
            categoryDate,
            NumberOfPosts:+NumberOfPosts
        },
    }

}
