import React, { useEffect, useState, useRef } from "react"
import { Button } from "primereact/button"
import { TabView, TabPanel } from "primereact/tabview"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase_setup/firebase"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Skeleton } from "primereact/skeleton"
import ModalUpdate from "./ModalUpdate"
import ModalCreate from "./ModalCreate"
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"
import { Toast } from "primereact/toast"

const Admin = () => {
    const [data, setData] = useState()
    const [openModelUpdate, setOpenModalUpdate] = useState(false)
    const [openModelCreate, setOpenModalCreate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [selected, setSelected] = useState()
    const toast = useRef(null)

    //get data from firebase
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            await getDocs(
                collection(
                    db,
                    activeIndex ? "source_springboot" : "source_java"
                )
            ).then((querySnapshot) => {
                const newData = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                setData(newData)
                setLoading(false)
            })
        }
        fetchData()
    }, [activeIndex])

    //show toast when accepted delete
    const accept = async () => {
        await deleteDoc(doc(db, "source_java", selected.id))
        const newData = data.filter((item) => item.id !== selected.id)
        setData(newData)
        toast.current.show({
            severity: "success",
            summary: "Confirmed",
            detail: "You have accepted",
            life: 3000,
        })
    }

    //show toast when create new lesson
    const showCreateSuccess = (docRef, lecture) => {
        setData([
            ...data,
            {
                id: docRef.id,
                ...lecture,
            },
        ])
        toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Create new lesson successfully with Id: " + docRef.id,
            life: 3000,
        })
    }

    //show toast when create new lesson
    const showUpdateSuccess = (lesson) => {
        const newData = data.map((item) => {
            if (item.id === lesson.id) {
                const newItem = { ...item }
                newItem.title = lesson.title
                newItem.content = lesson.content
                newItem.order = lesson.order
                return newItem
            }
            return item
        })
        setData(newData)

        toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Update lesson successfully",
            life: 3000,
        })
    }

    //dialog confirm to delete
    const confirm = () => {
        confirmDialog({
            message: "Do you want to delete this record?",
            header: "Delete Confirmation",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            accept,
        })
    }

    return (
        <div style={{ margin: "50px" }}>
            <h1>This is Admin page</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "10px",
                }}
            >
                <Button
                    label="Add"
                    severity="success"
                    size="small"
                    onClick={() => {
                        setOpenModalCreate(true)
                    }}
                />
                <Button
                    label="Update"
                    severity="warning"
                    size="small"
                    onClick={() => {
                        setOpenModalUpdate(true)
                    }}
                    style={{ margin: "0 10px" }}
                    disabled={selected ? false : true}
                />
                <Button
                    label="Delete"
                    severity="danger"
                    size="small"
                    disabled={selected ? false : true}
                    onClick={confirm}
                />
            </div>
            <TabView
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
            >
                <TabPanel header="Java"></TabPanel>
                <TabPanel header="Springboot"></TabPanel>
            </TabView>
            {loading ? (
                <Skeleton width="100%" height="300px"></Skeleton>
            ) : (
                <DataTable
                    value={data}
                    selectionMode="single"
                    selection={selected}
                    onSelectionChange={(e) => setSelected(e.value)}
                    dataKey="id"
                    tableStyle={{ minWidth: "50rem" }}
                >
                    <Column field="id" header="Id"></Column>
                    <Column field="order" header="Order"></Column>
                    <Column field="title" header="Title"></Column>
                </DataTable>
            )}

            {/* confirm delete */}
            <Toast ref={toast} />
            <ConfirmDialog />

            {/* modal update */}
            <ModalUpdate
                openModelUpdate={openModelUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                data={selected}
                showUpdateSuccess={showUpdateSuccess}
            />

            {/* modal create */}
            <ModalCreate
                openModelCreate={openModelCreate}
                setOpenModalCreate={setOpenModalCreate}
                showSuccess={showCreateSuccess}
            />
        </div>
    )
}

export default Admin
