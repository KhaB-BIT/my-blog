import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Editor } from "primereact/editor"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import React, { useEffect, useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase_setup/firebase"
import { InputSwitch } from "primereact/inputswitch"

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
    const [urlUpdate, setUrlUpdate] = useState(data?.url)
    const [checkedUpdate, setCheckedUpdate] = useState(data?.public ?? false)

    useEffect(() => {
        setTitleUpdate(data?.title)
        setContentUpdate(data?.content)
        setOrderUpdate(data?.order)
        setUrlUpdate(data?.url)
        setCheckedUpdate(data?.public ?? false)
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
            url: urlUpdate,
            public: checkedUpdate,
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
                maximizable
                style={{ width: "80vw" }}
                onHide={() => setOpenModalUpdate(false)}
                footer={footerContent}
            >
                <InputText
                    value={titleUpdate}
                    type="text"
                    className="p-inputtext-sm w-full !mb-[10px]"
                    placeholder="Enter title for lesson"
                    onChange={(e) => setTitleUpdate(e.target.value)}
                />
                <div className="flex gap-4 items-center mb-[10px]">
                    <InputText
                        value={urlUpdate}
                        type="text"
                        className="p-inputtext-sm flex-1"
                        placeholder="Enter Url for lesson"
                        onChange={(e) => setUrlUpdate(e.target.value)}
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

                    <div>
                        <p>Public</p>
                        <InputSwitch
                            checked={checkedUpdate}
                            onChange={(e) => setCheckedUpdate(e.value)}
                        />
                    </div>
                </div>
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
