import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Editor } from "primereact/editor"
import { InputText } from "primereact/inputtext"
import { InputNumber } from "primereact/inputnumber"
import React, { useEffect, useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase_setup/firebase"
import { InputSwitch } from "primereact/inputswitch"

const ModalCreate = ({
    openModelCreate,
    setOpenModalCreate,
    showSuccess,
    activeIndex,
    nextOrder,
}) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [order, setOrder] = useState(nextOrder)
    const [url, setUrl] = useState("")
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setTitle("")
        setContent("")
        setOrder(nextOrder)
    }, [activeIndex, nextOrder])

    const footerContent = (
        <div>
            <Button
                label="Cancel"
                icon="pi pi-times"
                onClick={() => setOpenModalCreate(false)}
                className="p-button-text"
            />
            <Button
                label="Create"
                icon="pi pi-check"
                onClick={() => handleSubmit()}
                autoFocus
            />
        </div>
    )

    const addTodo = async () => {
        try {
            const lecture = {
                title,
                content,
                order,
                url,
                public: checked,
            }
            const docRef = await addDoc(
                collection(
                    db,
                    activeIndex ? "source_springboot" : "source_java"
                ),
                lecture
            )
            showSuccess(docRef, lecture)
        } catch (e) {
            console.error("Error adding document: ", e)
        }
    }

    const handleSubmit = () => {
        setOpenModalCreate(false)
        addTodo()
    }

    return (
        <Dialog
            header="Create lesson"
            visible={openModelCreate}
            style={{ width: "80vw" }}
            onHide={() => setOpenModalCreate(false)}
            footer={footerContent}
        >
            <InputText
                value={title}
                type="text"
                className="p-inputtext-sm w-full !mb-[10px]"
                placeholder="Enter title for lesson"
                onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex gap-4 items-center mb-[10px]">
                <InputText
                    value={url}
                    type="text"
                    className="p-inputtext-sm flex-1"
                    placeholder="Enter Url for lesson"
                    onChange={(e) => setUrl(e.target.value)}
                />
                <InputNumber
                    inputId="minmax"
                    className="p-inputtext-sm"
                    value={order}
                    onValueChange={(e) => setOrder(e.target.value)}
                    min={0}
                    max={100}
                    placeholder="Enter order"
                />

                <div>
                    <p>Public</p>
                    <InputSwitch
                        checked={checked}
                        onChange={(e) => setChecked(e.value)}
                    />
                </div>
            </div>

            <Editor
                value={content}
                onTextChange={(e) => {
                    setContent(e.htmlValue)
                }}
                style={{ height: "600px" }}
            />
        </Dialog>
    )
}

export default ModalCreate
