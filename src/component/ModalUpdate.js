import { doc, updateDoc } from "firebase/firestore"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Editor } from "primereact/editor"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import React, { useEffect, useState } from "react"
import { db } from "../firebase_setup/firebase"

const ModalUpdate = ({
    openModelUpdate,
    setOpenModalUpdate,
    data,
    showUpdateSuccess,
}) => {
    const [lesson, setLesson] = useState({ ...data })

    useEffect(() => {
        setLesson({ ...data })
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
        const docRef = doc(db, "source_java", lesson.id)

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
                    value={lesson.title}
                    type="text"
                    className="p-inputtext-sm"
                    placeholder="Enter title for lesson"
                    style={{
                        width: "80%",
                        marginBottom: "10px",
                        marginRight: "10px",
                    }}
                    onChange={(e) =>
                        setLesson({ ...lesson, title: e.target.value })
                    }
                />
                <InputNumber
                    inputId="minmax"
                    className="p-inputtext-sm"
                    value={lesson.order}
                    onValueChange={(e) =>
                        setLesson({ ...lesson, order: e.target.value })
                    }
                    min={1}
                    max={100}
                    placeholder="Enter order"
                />
                <Editor
                    value={lesson.content}
                    onTextChange={(e) =>
                        setLesson({ ...lesson, content: e.htmlValue })
                    }
                    style={{ height: "600px" }}
                />
            </Dialog>
        </div>
    )
}

export default ModalUpdate
