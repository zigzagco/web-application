import Link from 'next/link'
import Hamburger from "./Hamburger";
import styles from '../styles/NavBar.module.css'
import {useEffect, useState} from "react";

export default function Navbar(){

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () =>{
        setHamburgerOpen(!hamburgerOpen)
    }
    //------------------------animation head start--------------------------

    const [clientWindowHeight, setClientWindowHeight] = useState("");
    const [headOpen, setheadOpen] = useState(false);
    const [padding, setPadding] = useState(0);
    const [pos, setPos] = useState('');

    const handleScroll = () => {
        setClientWindowHeight(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });
    useEffect(() => {
        let backgroundTransparacyVar = clientWindowHeight
        console.log("bg:  "+backgroundTransparacyVar)
        if (backgroundTransparacyVar < 80){
            setPos('absolute')
            setPadding(0)
            setheadOpen(false)
        }
        if (backgroundTransparacyVar > 80 && backgroundTransparacyVar<130) {
            let paddingVar = -130 + backgroundTransparacyVar
            setPadding(paddingVar)
            setPos('fixed')
            setheadOpen(true)
    }
        if (backgroundTransparacyVar > 130){
            setPos('fixed')
            setPadding(0)
            setheadOpen(true)
        }

    }, [clientWindowHeight]);

    //--------------------------end animation head------------------------------
    return(
        <>
            <div className="sticky_head" style={{
                top: `${padding}px`,
                position: `${pos}`,
            }}>
                <div className="container">
                    <div className={styles.header_row}>
                        <div className={styles.header_logo}><Link href="/">
                            <a><span className="red">YN.</span ><span className="blue">G</span><span className="yellow">L</span></a>
                        </Link></div>
                        <div className="searchfield">
                            <form className="search_form">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Поиск в YNGL"
                                    className="search_input"
                                />
                                <button id="button"><i className="fa-search"/></button>
                            </form>
                        </div>

                        <div className={styles.header_login}>
                            <div className="navigation">
                                {/*<div className="hamburger" onClick={toggleHamburger}>
                                <Hamburger isOpen={hamburgerOpen}/>
                            </div>*/}
                            </div>
                        </div>
                        <div className="navComponent">
                            <div className="navContainer">
                                <ul>
                                    <li><Link href="/contact">
                                        <a>КОНТАКТЫ</a>
                                    </Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <header className={styles.header}>
            <div className="bbemp"/>
            <div className="bottom_bar">
                <div className="container">
                    <div className="container_head">
                        <div className="cattext"><Link href="/politics">Политика</Link></div>
                        <div className="cattext"><Link href="">В мире</Link></div>
                        <div className="cattext"><Link href="">Экономика</Link></div>
                        <div className="cattext"><Link href="">Авто</Link></div>
                        <div className="cattext"><Link href="">Спорт</Link></div>
                        <div className="cattext"><Link href="">Недвижимость</Link></div>
                    </div>
                </div>
            </div>
        </header>
    <style jsx global>{`
                .bbb{
                padding-right: ${hamburgerOpen ? '140px' : '0px'};
                }
                @media (max-width: 768px){
                  .bbb{
                padding-right: 0px;
                }
                }    
                @media (min-width: 992px) {
                .bbb{
                padding-right: ${hamburgerOpen ? '140px' : '0px'};
                }
                }   
                `}</style>
    <style jsx>{`
                
                .bbemp{
                height: 50px;
                }
                .sticky_head{
                width: 100%;
                background: #fff;
                z-index: 999;
                box-shadow: ${headOpen ? '0 1px 6px 0 rgb(32 33 36 / 28%)' : 'none'};
                }
                .container_head{
                  display: flex;
                  flex-direction: row;
                  justify-content: start;
                  padding: 10px 10px 10px 15px;
                }
                .cattext{
                padding-right: 10px;
                padding-left: 10px;
                }
                .searchfield{
                -webkit-flex: 1 1 100%;
                flex: 1 1 100%;
                -webkit-justify-content: center;
                justify-content: center;
                }
                .search_form{
                align-items: center;
                display: flex;
                justify-content: space-between;
                padding: 0 0.5em 0 1em;
                background: #f1f3f4;
                border: 1px solid transparent;
                -webkit-border-radius: 8px;
                border-radius: 8px;
                margin-left: 50px;
                margin-right: auto;
                max-width: 500px;
                position: relative;
                height: 40px;
                }
                .search_input{
                padding: 0;
                overflow: hidden;
                background: #f1f3f4;
                width: 100%;
                }
                .navigation{
                    width: 100%;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    z-index: 6;
                }
                .navComponent{
                transform: ${hamburgerOpen ? 'translateX(0)' : 'translateX(280px)'};
                        max-width: 280px;
                        margin-top: 200px;
                        position: absolute;
                        right: 0;
                        transition: transform .25s cubic-bezier(0.4,0.0,0.2,1) ,visibility 0s linear 0s;
                        background-color: transparent;
                        -webkit-box-shadow: 0 0;
                        box-shadow: 0 0;
                        display: flex;
                        flex-direction: column;
                        overflow-y: auto;
                        overflow-x: hidden;
                        z-index: 990;
                        height: max-content;
                }
                .navContainer{
                display: flex;
                align-items: flex-end;
                flex-direction: column;
                padding-right: 70px;
                width: 100%;
                right: 0;
                }
                .navContainer ul{
                  margin-top: 20px;
                  display: block;
                    }
                .navContainer ul li{
                    display: block;
                    list-style-type: none;
                    color: rgb(251,64,29);
                    padding-right: 10px;
                    margin-top: 15px;
                    font-size: 18px;
                    font-weight: normal;
                }
                .red{
                color: rgb(251,64,29);
                font-family: 'NunitoSans', sans-serif;
                }
                .blue{
                color:rgb(67,133,243);
                font-family: 'Poppins', sans-serif;
                }
                .yellow{
                color:rgb(67,133,243);
                font-family: 'Poppins', sans-serif;
                }
                .hamburger{
                        display: flex;
                        margin-left: 10px;
                        z-index: 6;
                        justify-content: flex-end;
                    }
                .serachfield{
                  -webkit-flex: 1 1 100%;
                  flex: 1 1 100%;
                  height: 48px;
                  vertical-align: middle;
                  white-space: nowrap;
                  -webkit-box-align: center;
                  -webkit-align-items: center;
                  align-items: center;
                  display: -webkit-box;
                  display: -webkit-flex;
                  display: flex;
                  -webkit-user-select: none;
                  justify-content: center;
                }
            `}</style>
    </>


    )
}