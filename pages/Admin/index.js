import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { decodeToken, isExpired } from 'react-jwt'

// components
import AdminAuthGuardLayout from '../../components/layout/authGuard/AdminAuthGuard.layout'

function AdminIndexPage() {
    const [email, setEmail] = useState('')

    const router = useRouter()

    const [loading, setLoading] = useState(false)

    function onLogout() {
        setLoading(true)
        sessionStorage.removeItem('token')
        setLoading(false)
        router.push('/Login')
    }

    useEffect(() => {
        function handler() {
            const token = sessionStorage.getItem('token');
            if (!isExpired(token)) {
                if (decodeToken(token) !== null) {
                    setEmail(decodeToken(token).data.email)
                }
            } else {
                sessionStorage.removeItem('token')
                router.push('/Login')
            }

        }
        handler()
    }, [])



    return (
        <div className='container'>
            <div className='row d-flex align-items-center vh-100'>
                <div className='col-md-8 col-lg-6 mx-auto'>
                    <div className='border border-primary rounded shadow p-3 w-100'>
                        <div className='mb-3'>
                            <h1 className='display-5 fw-bold text-center text-primary'>Admin</h1>
                        </div>
                        {/* email */}
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input value={email} type="email" disabled className="form-control" />
                        </div>
                        <div className="mb-3">

                            {loading ?
                                <button className="btn btn-danger w-100" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                </button>
                                :
                                <button className='btn btn-danger w-100' onClick={() => onLogout()}>Log Out</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminIndexPage

AdminIndexPage.getLayout = function getLayout(page) {
    return (
        <AdminAuthGuardLayout>
            {page}
        </AdminAuthGuardLayout>
    )
}