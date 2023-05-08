import React, { useEffect, useState } from "react"
import { db } from "../firebase_setup/firebase"
import { collection, getDocs } from "firebase/firestore"

const Home = () => {
    const [data, setData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            await getDocs(collection(db, "source_java")).then(
                (querySnapshot) => {
                    const newData = querySnapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                    setData(newData)
                }
            )
        }
        fetchData()
    }, [])

    console.log("data", data)

    return <div>This is homepage</div>
}

export default Home
