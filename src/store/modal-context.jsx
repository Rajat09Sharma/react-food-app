import { createContext, useContext, useState } from "react";

export const ModalContext=createContext({
    modalName:"",
    showCartModal:()=>{},
    showCheckoutModal:()=>{},
    closeModal:()=>{}
});


export default function ModalContextProvider({children}){
    const [modal,setModal]=useState("");

    function showCartModal(){
        setModal("cart");
    }
    function closeModal(){
        setModal("jii");
    }

    function showCheckoutModal(){
        setModal("checked");
    }

    const modalCtx={
        modalName:modal,
        showCartModal,
        showCheckoutModal,
        closeModal,
    }

    return <ModalContext.Provider value={modalCtx}>{children}</ModalContext.Provider>
}