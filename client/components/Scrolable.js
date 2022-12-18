import React ,{useEffect, useRef, useState} from "react";
import Link from "next/link";
import ScrollContainer from "react-indiana-drag-scroll";

const Scrolable = props => {
    const headers = [
        {title:"Политика",link:"politika"},
        {title:"Наука",link:"nauka"},
        {title:"Экономика",link:"ekonomika"},
        {title:"Общество",link:"obshchestvo"},
    ]
    return (
        <div className="container">
            <div className="container_head">
                <ScrollContainer className="items" horizontal={true} hideScrollbars={true}>
                    {headers.map((el,index) => (
                        <div key={index} className="cattext">
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