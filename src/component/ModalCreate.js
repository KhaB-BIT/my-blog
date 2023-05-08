import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Editor } from "primereact/editor"
import { InputText } from "primereact/inputtext"
import { InputNumber } from "primereact/inputnumber"
import React, { useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase_setup/firebase"

const ModalCreate = ({ openModelCreate, setOpenModalCreate, showSuccess }) => {
    const [lecture, setLecture] = useState({
        title: "",
        content: "",
        order: 0,
    })

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
            const docRef = await addDoc(collection(db, "source_java"), lecture)
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
                value={lecture.title}
                type="text"
                className="p-inputtext-sm"
                placeholder="Enter title for lesson"
                style={{
                    width: "80%",
                    marginBottom: "10px",
                    marginRight: "10px",
                }}
                onChange={(e) =>
                    setLecture({ ...lecture, title: e.target.value })
                }
            />
            <InputNumber
                inputId="minmax"
                className="p-inputtext-sm"
                value={lecture.order}
                onValueChange={(e) =>
                    setLecture({ ...lecture, order: e.target.value })
                }
                min={1}
                max={100}
                placeholder="Enter order"
            />
            <Editor
                value={lecture.content}
                onTextChange={(e) =>
                    setLecture({ ...lecture, content: e.htmlValue })
                }
                style={{ height: "600px" }}
            />
        </Dialog>
    )
}

export default ModalCreate
