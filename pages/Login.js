import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'


// components
import AlertComponent from '../components/Alert.component'
import MainAuthGuardLayout from '../components/layout/authGuard/MainAuthGuard.layout'

// service
import { emailValidation, loginFormValidation } from '../services/PageValidation.service'
import { axiosLogin } from '../services/Axios.service'



function LogInPage() {
    const emailRef = useRef()
    const passwordRef = useRef()

    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState('')
    const [alertText, setAlertText] = useState('')

    const [loading, setLoading] = useState(false)

    const router = useRouter()

    async function OnSubmit(e) {
        e.preventDefault()
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (loginFormValidation(email, password)) {
            if (emailValidation(email)) {
                const form = {
                    email: email.toLowerCase(),
                    password
                }

                setLoading(true)
                // axios
                const res = await axiosLogin(form)
                if (res.success) {
                    sessionStorage.setItem('token', res.token)
                    setLoading(false)
                    router.push('/Admin')
                } else {
                    setAlert(true)
                    setAlertType('danger')
                    setAlertText(`${res.msg}`)
                    setLoading(false)
                }
            } else {
                setAlert(true)
                setAlertType('danger')
                setAlertText('Email is not correct.')
            }
        } else {
            setAlert(true)
            setAlertType('danger')
            setAlertText('Please fill in all the fields.')
        }
    }
    return (
        <div className='container'>
            <div className='row d-flex align-items-center vh-100'>
                <div className='col-md-8 col-lg-6 mx-auto'>
                    <form className='border border-primary rounded shadow p-3 w-100' onSubmit={(e) => OnSubmit(e)}>
                        <div className='mb-3'>
                            <h1 className='display-5 fw-bold text-center text-primary'>Log In</h1>
                        </div>
                        {alert && <AlertComponent type={alertType} text={alertText} />}
                        {/* email */}
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input ref={emailRef} type="email" className="form-control" />
                        </div>
                        {/* password */}
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input ref={passwordRef} type="password" className="form-control" />
                        </div>
                        {/* forget password */}
                        <div className='mb-3'>
                            {loading ?
                                <button className="btn btn-primary w-100" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                </button>
                                :
                                <button className='btn btn-primary w-100'>Log In</button>
                            }
                        </div>
                        <div className='mb-3'>
                            <p>Don't have an account? <span className='fw-bold text-primary'><Link href='/Signup'>Sign Up</Link></span></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogInPage

LogInPage.getLayout = function getLayout(page) {
    return (
        <MainAuthGuardLayout>
            {page}
        </MainAuthGuardLayout>
    )
}