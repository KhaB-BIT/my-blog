import React, { useEffect, useState } from "react"
import parse from "html-react-parser"
import { useLocation } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../../firebase_setup/firebase"
import ScrollToTop from "react-scroll-to-top"

const LessonDetail = () => {
    const location = useLocation()
    const [detail, setDetail] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const pathName = location?.pathname
            const docRef = doc(
                db,
                pathName.includes("java") ? "source_java" : "source_springboot",
                pathName.substring(pathName.lastIndexOf("/") + 1)
            )
            try {
                const docSnap = await getDoc(docRef)
                setDetail(docSnap.data())
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [location])
    return (
        <div className="w-[60vw] m-auto py-10">
            <h1 className="text-2xl mb-3 font-bold text-orange-600">
                {detail?.title}
            </h1>
            <div>{parse(detail?.content || "")}</div>
            <ScrollToTop smooth />
        </div>
    )
}

export default LessonDetail
