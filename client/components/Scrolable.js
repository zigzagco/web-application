import React ,{useEffect, useRef, useState} from "react";
import Link from "next/link";
import ScrollContainer from "react-indiana-drag-scroll";

const Scrolable = props => {
    const headers = [
        {n:"1",title:"Политика",link:"politika"},
        {n:"2",title:"В мире",link:"v_mire"},
        {n:"3",title:"Экономика",link:"ekonomika"},
        {n:"4",title:"Общество",link:"ekonomika"},
        {n:"5",title:"Политика",link:"politika"},
        {n:"6",title:"В мире",link:"v_mire"},
        {n:"7",title:"Экономика",link:"ekonomika"},
        {n:"8",title:"Общество",link:"ekonomika"},
        {n:"9",title:"Политика",link:"politika"},
        {n:"10",title:"В мире",link:"v_mire"},

    ]
    return (
        <div className="container">
            <div className="container_head">
                <ScrollContainer className="items" horizontal={true} hideScrollbars={true}>
                    {headers.map(el => (
                        <div key={el.n} className="cattext">
                            <div className="ctext">
                                <Link href={"/[dir]"} as={"/"+el.link} passHref>
                                    <span className="catname">{el.title}</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </ScrollContainer>
            </div>
        </div>
    );
};


export default Scrolable;