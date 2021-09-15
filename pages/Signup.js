import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// services
import { axiosSignup } from '../services/Axios.service'


// components
import AlertComponent from '../components/Alert.component'
import { emailValidation, passwordConfirmationValidation, passwordLength, registerFormValidation } from '../services/PageValidation.service'
import MainAuthGuardLayout from '../components/layout/authGuard/MainAuthGuard.layout'

function SignUpPage() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState('')
    const [alertText, setAlertText] = useState('')

    const [loading, setLoading] = useState(false)

    const router = useRouter()

    async function OnSubmit(e) {
        e.preventDefault()
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirm = passwordConfirmRef.current.value;

        if (registerFormValidation(email, password, passwordConfirm)) {
            if (emailValidation(email)) {
                if (passwordLength(password)) {
                    if (passwordConfirmationValidation(password, passwordConfirm)) {
                        const form = {
                            email: email.toLowerCase(),
                            password
                        }

                        setLoading(true)
                        // axios
                        const res = await axiosSignup(form)
                        if (res.success) {
                            setAlert(true)
                            setAlertType('success')
                            setAlertText(`${res.msg}`)
                            setLoading(false)
                        } else {
                            setAlert(true)
                            setAlertType('danger')
                            setAlertText(`${res.msg}`)
                            setLoading(false)
                        }
                    } else {
                        setAlert(true)
                        setAlertType('danger')
                        setAlertText('Password confirmation not matched.')
                    }
                } else {
                    setAlert(true)
                    setAlertType('danger')
                    setAlertText('Password must be at least 8 characters.')
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
                            <h1 className='display-5 fw-bold text-center text-primary'>Sign up</h1>
                        </div>
                        {alert && <AlertComponent type={alertType} text={alertText} />}
                        {/* email */}
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input ref={emailRef} type="text" className="form-control" />
                        </div>
                        {/* password */}
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input ref={passwordRef} type="password" className="form-control" />
                        </div>
                        {/* password confirm */}
                        <div className="mb-3">
                            <label className="form-label">Password confirmation</label>
                            <input ref={passwordConfirmRef} type="password" className="form-control" />
                        </div>
                        <div className='mb-3'>
                            {loading ?
                                <button className="btn btn-primary w-100" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                </button>
                                :
                                <button className='btn btn-primary w-100'>Register</button>
                            }
                        </div>
                        <div className='mb-3'>
                            <p>Have an account? <span className='fw-bold text-primary'><Link href='/Login'>Log In</Link></span></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage

SignUpPage.getLayout = (page) => {
    return (
        <MainAuthGuardLayout>
            {page}
        </MainAuthGuardLayout>
    )
}
