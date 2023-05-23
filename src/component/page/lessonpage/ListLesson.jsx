import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { db } from "../../../firebase_setup/firebase"
import { collection, getDocs } from "firebase/firestore"
import { Skeleton } from "primereact/skeleton"
import HeaderLesson from "./HeaderLesson"

const ListLesson = () => {
    const location = useLocation()
    const [data, setData] = useState()
    const navigate = useNavigate()

    const handleNavigate = (url) => {
        if (location.pathname === "/java") {
            navigate(`/java/${url}`)
        } else {
            navigate(`/springboot/${url}`)
        }
    }

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
                const newData = querySnapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        id: doc.id,
                    }
                })
                const sortData = newData.sort((l1, l2) =>
                    l1.order > l2.order ? 1 : l1.order < l2.order ? -1 : 0
                )
                setData(sortData)
            })
        }
        fetchData()
    }, [location])

    return (
        <div className="p-9 w-full lg:w-[900px] px-[15px] mt-10 m-auto shadow-lg">
            <HeaderLesson location={location} />
            <div className="text-lg font-bold mt-3">💡Bài học</div>
            {data ? (
                data?.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="my-4 cursor-pointer"
                            onClick={() => handleNavigate(item.url)}
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
        </div>
    )
}

export default ListLesson
