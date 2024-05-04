import { useEffect, useRef } from "react"
import { createPortal } from "react-dom";

export default function Modal({ children, open,...props }) {
    const dialog = useRef();

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]);


    return createPortal(
        <dialog ref={dialog} className="modal" {...props}>{children}</dialog>, document.getElementById("modal")
    )
}
