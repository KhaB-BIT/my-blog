import React, { useEffect, useState } from "react"
import parse from "html-react-parser"
import { useLocation, useNavigate } from "react-router-dom"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../../firebase_setup/firebase"
import ScrollToTop from "react-scroll-to-top"
import NotFoundPage from "../notfoundpage/NotFoundPage"

const LessonDetail = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [detail, setDetail] = useState()
    const [flag, setFlag] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            const pathName = location?.pathname
            const q = query(
                collection(
                    db,
                    pathName.includes("java")
                        ? "source_java"
                        : "source_springboot"
                ),
                where(
                    "url",
                    "==",
                    pathName.substring(pathName.lastIndexOf("/") + 1).toString()
                )
            )
            try {
                const querySnapshot = await getDocs(q)
                setFlag(false)
                querySnapshot.forEach((doc) => {
                    setFlag(true)
                    setDetail({
                        docId: doc.id,
                        ...doc.data(),
                    })
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [location])

    return (
        <div>
            {flag === true ? (
                <div className="w-full lg:w-[60vw] px-[20px] m-auto py-10 relative">
                    <h1 className="text-2xl mb-3 font-bold text-orange-600">
                        {detail?.title}
                    </h1>
                    <div>{parse(detail?.content || "")}</div>
                    <ScrollToTop smooth />
                    <div
                        className="fixed top-1 left-1 sm:top-[40px] sm:left-[40px] bg-white drop-shadow-xl p-1 rounded-lg cursor-pointer opacity-70 lg:opacity-100"
                        onClick={() => navigate(-1)}
                    >
                        <svg
                            width="28"
                            height="28"
                            fill="black"
                            viewBox="0 0 256 256"
                            className="-rotate-45"
                        >
                            <path d="M222.138,91.475l-89.6-89.6c-2.5-2.5-6.551-2.5-9.051,0l-89.6,89.6c-2.5,2.5-2.5,6.551,0,9.051s6.744,2.5,9.244,0L122,21.85  V249.6c0,3.535,2.466,6.4,6,6.4s6-2.865,6-6.4V21.85l78.881,78.676c1.25,1.25,2.992,1.875,4.629,1.875s3.326-0.625,4.576-1.875  C224.586,98.025,224.638,93.975,222.138,91.475z"></path>
                        </svg>
                    </div>
                </div>
            ) : flag !== 1 ? (
                <NotFoundPage />
            ) : (
                ""
            )}
        </div>
    )
}

export default LessonDetail
