// import { doc, updateDoc } from "firebase/firestore"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Editor } from "primereact/editor"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import React, { useEffect, useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase_setup/firebase"

const ModalUpdate = ({
    openModelUpdate,
    setOpenModalUpdate,
    data,
    showUpdateSuccess,
    activeIndex,
}) => {
    const [titleUpdate, setTitleUpdate] = useState(data?.title)
    const [contentUpdate, setContentUpdate] = useState(data?.content)
    const [orderUpdate, setOrderUpdate] = useState(data?.order)

    useEffect(() => {
        setTitleUpdate(data?.title)
        setContentUpdate(data?.content)
        setOrderUpdate(data?.order)
    }, [data])

    const footerContent = (
        <div>
            <Button
                label="Cancel"
                icon="pi pi-times"
                onClick={() => setOpenModalUpdate(false)}
                className="p-button-text"
            />
            <Button
                label="Update"
                icon="pi pi-check"
                onClick={() => handleUpdate()}
                autoFocus
            />
        </div>
    )

    const handleUpdate = () => {
        const docRef = doc(
            db,
            activeIndex ? "source_springboot" : "source_java",
            data.id
        )

        const lesson = {
            id: data.id,
            title: titleUpdate,
            content: contentUpdate,
            order: orderUpdate,
        }

        updateDoc(docRef, lesson)
            .then((docRef) => {
                showUpdateSuccess(lesson)
            })
            .catch((error) => {
                console.log(error)
            })
        setOpenModalUpdate(false)
    }

    return (
        <div>
            <Dialog
                header="Update lesson"
                visible={openModelUpdate}
                style={{ width: "80vw" }}
                onHide={() => setOpenModalUpdate(false)}
                footer={footerContent}
            >
                <InputText
                    value={titleUpdate}
                    type="text"
                    className="p-inputtext-sm"
                    placeholder="Enter title for lesson"
                    style={{
                        width: "80%",
                        marginBottom: "10px",
                        marginRight: "10px",
                    }}
                    onChange={(e) => setTitleUpdate(e.target.value)}
                />
                <InputNumber
                    inputId="minmax"
                    className="p-inputtext-sm"
                    value={orderUpdate}
                    onValueChange={(e) => setOrderUpdate(e.target.value)}
                    min={0}
                    max={100}
                    placeholder="Enter order"
                />
                <Editor
                    value={contentUpdate}
                    onTextChange={(e) => setContentUpdate(e.htmlValue)}
                    style={{ height: "600px" }}
                />
            </Dialog>
        </div>
    )
}

export default ModalUpdate
