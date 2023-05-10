import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { db } from "../../firebase_setup/firebase"
import { collection, getDocs } from "firebase/firestore"
import ModalContent from "../modal/ModalContent"
import { Skeleton } from "primereact/skeleton"
import HeaderLesson from "./HeaderLesson"

const ListLesson = () => {
    const location = useLocation()
    const [data, setData] = useState()
    const [detailContent, setDetailContent] = useState()
    const [visible, setVisible] = useState()

    useEffect(() => {
        const fetchData = async () => {
            await getDocs(
                collection(
                    db,
                    location.pathname === "/java"
                        ? "source_java"
                        : "source_springboot"
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
            })
        }
        fetchData()
    }, [location])

    const openDialog = (item) => {
        setDetailContent(item)
        setVisible(true)
    }

    return (
        <div className="p-9 w-[900px] mt-10 m-auto shadow-lg">
            <HeaderLesson location={location} />
            <div className="text-lg font-bold">💡Bài học</div>
            {data ? (
                data?.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="my-4 cursor-pointer"
                            onClick={() => openDialog(item)}
                        >
                            <p className="text-lg hover:underline">
                                {item.title}
                            </p>
                        </div>
                    )
                })
            ) : (
                <>
                    <Skeleton height="2rem" className="my-3"></Skeleton>
                    <Skeleton height="2rem" className="my-3"></Skeleton>
                    <Skeleton height="2rem" className="my-3"></Skeleton>
                    <Skeleton height="2rem" className="my-3"></Skeleton>
                    <Skeleton height="2rem" className="my-3"></Skeleton>
                </>
            )}

            <ModalContent
                visible={visible}
                setVisible={setVisible}
                detailContent={detailContent}
            />
        </div>
    )
}

export default ListLesson
