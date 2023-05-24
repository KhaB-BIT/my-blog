/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react"
import { useFormik } from "formik"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const auth = getAuth()
    const [cookies, setCookie] = useCookies(["email", "accessToken"])
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (data) => {
            const { email, password } = data
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user
                    setCookie("email", user.email, { path: "/" })
                    setCookie("accessToken", user.accessToken, { path: "/" })
                    navigate("/admin")
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    console.log(errorCode, errorMessage)
                    formik.resetForm()
                })
        },
    })

    useEffect(() => {
        if (
            cookies.hasOwnProperty("email") &&
            cookies.hasOwnProperty("accessToken") &&
            cookies.email !== "undefined" &&
            cookies.accessToken !== "undefined"
        ) {
            navigate("/admin")
        }
    }, [cookies])

    return (
        <div className="w-full h-[100vh] flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500">
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-2 w-[400px] bg-white p-8 rounded-xl drop-shadow-2xl"
            >
                <span className="p-float-label mb-1">
                    <InputText
                        id="value1"
                        name="email"
                        value={formik.values.email}
                        onChange={(e) => {
                            formik.setFieldValue("email", e.target.value)
                        }}
                        className="w-full"
                    />
                    <label htmlFor="input_value">Email</label>
                </span>
                <span className="p-float-label w-full mt-4 mb-4">
                    <InputText
                        id="value2"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={(e) => {
                            formik.setFieldValue("password", e.target.value)
                        }}
                        className="w-full"
                    />
                    <label htmlFor="input_value">Password</label>
                </span>
                <Button type="submit" label="Login" />
            </form>
        </div>
    )
}
