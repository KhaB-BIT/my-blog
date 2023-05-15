/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, useMemo } from "react"
import { Button } from "primereact/button"
import { TabView, TabPanel } from "primereact/tabview"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase_setup/firebase"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Skeleton } from "primereact/skeleton"
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"
import { Toast } from "primereact/toast"
import ModalUpdate from "../modal/ModalUpdate"
import ModalCreate from "../modal/ModalCreate"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { getAuth, signOut } from "firebase/auth"

const Admin = () => {
    const [data, setData] = useState()
    const navigate = useNavigate()
    const [openModelUpdate, setOpenModalUpdate] = useState(false)
    const [openModelCreate, setOpenModalCreate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0) // 0: source_javap; 1: source_springboot
    const [selected, setSelected] = useState()
    const toast = useRef(null)
    const [cookies, removeCookie] = useCookies(["email", "accessToken"])
    const auth = getAuth()

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
                const sortData = newData.sort((l1, l2) =>
                    l1.order > l2.order ? 1 : l1.order < l2.order ? -1 : 0
                )
                setData(sortData)
                setLoading(false)
            })
        }
        fetchData()
    }, [activeIndex])

    //show toast when accepted delete
    const accept = async () => {
        await deleteDoc(
            doc(
                db,
                activeIndex ? "source_springboot" : "source_java",
                selected.id
            )
        )
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

    const nextOrder = useMemo(() => {
        let maxOrder = 0
        for (let i = 0; i < data?.length; i++) {
            if (data?.[i].order > maxOrder) maxOrder = data?.[i].order
        }
        return maxOrder + 1
    }, [data])

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Sign-out successful")
                removeCookie("email")
                removeCookie("accessToken")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        if (
            !cookies.hasOwnProperty("email") ||
            !cookies.hasOwnProperty("accessToken") ||
            cookies.email === "undefined" ||
            cookies.accessToken === "undefined"
        ) {
            navigate("/login")
        }
    }, [cookies])

    return (
        <div style={{ margin: "50px" }}>
            <h1 className="text-2xl font-bold">
                Hello, {cookies.email}{" "}
                <span className="cursor-pointer" onClick={() => navigate("/")}>
                    🏠
                </span>
            </h1>
            <div className="flex justify-end gap-3">
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
                    severity={selected ? "warning" : "secondary"}
                    size="small"
                    onClick={() => {
                        setOpenModalUpdate(true)
                    }}
                    disabled={selected ? false : true}
                />
                <Button
                    label="Delete"
                    severity={selected ? "danger" : "secondary"}
                    size="small"
                    disabled={selected ? false : true}
                    onClick={confirm}
                />
                <Button
                    label="Sign out"
                    severity="help"
                    size="small"
                    onClick={handleSignOut}
                />
            </div>
            <TabView
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
            >
                <TabPanel header="Java"></TabPanel>
                <TabPanel header="Springboot"></TabPanel>
                {/* <TabPanel header="Other"></TabPanel> */}
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
            <Toast ref={toast} position="bottom-right" />
            <ConfirmDialog />

            {/* modal update */}
            <ModalUpdate
                openModelUpdate={openModelUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                data={selected}
                showUpdateSuccess={showUpdateSuccess}
                activeIndex={activeIndex}
            />

            {/* modal create */}
            <ModalCreate
                openModelCreate={openModelCreate}
                setOpenModalCreate={setOpenModalCreate}
                showSuccess={showCreateSuccess}
                activeIndex={activeIndex}
                nextOrder={nextOrder}
            />
        </div>
    )
}

export default Admin
