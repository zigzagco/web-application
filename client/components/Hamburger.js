import {Fragment} from "react";

export default function Hamburger({ isOpen }){
    return(
        <Fragment>
            <div className="hamburger">
                <div className="burger burger1" />
                <div className="burger burger2" />
                <div className="burger burger3" />
            </div>
            <style jsx>{`
                .hamburger{
                    width: 22px;
                    height: 22px;
                    display: flex;
                    justify-content: space-around;
                    flex-flow: column nowrap;
                    z-index: 10;
                    margin-right: 20px;
                }
                .burger{
                    width: 22px;
                    height: 3px;
                    border-radius: 3px;
                    background-color: rgb(251,64,29);
                    transform-origin: 1px;
                    transition: all 0.3s linear;
                }
                .burger1{
                    transform: ${ isOpen ? 'rotate(45deg)' : 'rotate(0)'};
                }
                .burger2{
                    transform: ${ isOpen ? 'translateX(100%)' : 'translateX(0)'};
                    opacity: ${ isOpen ? 0 : 1};
                }
                .burger3{
                    transform: ${ isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
                }
                
            `}</style>

        </Fragment>
    )
}