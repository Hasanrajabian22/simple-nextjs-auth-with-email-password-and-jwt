
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { decodeToken, isExpired } from 'react-jwt'

function AdminAuthGuardLayout({ children }) {

    const [pageLoading, setPageLoading] = useState(false)

    const router = useRouter()

    // token
    // const [token, setToken] = useState(undefined)
    // const { decodedToken, isExpired } = useJwt(token);

    useEffect(() => {

        function authGuard() {
            if (sessionStorage.getItem('token') !== null) {
                const token = sessionStorage.getItem('token')
                // setToken(sessionStorage.getItem('token'))
                if (!isExpired(token)) {
                    setPageLoading(true)
                } else {
                    setPageLoading(false)
                    sessionStorage.removeItem('token')
                    // setToken(undefined)
                    router.push('/Login')
                }
            } else {
                setPageLoading(false)
                router.push('/Login')
            }
        }
        authGuard()

    }, [])

    return (
        <>
            {pageLoading &&
                <div>
                    {children}
                </div>
            }
        </>
    )
}

export default AdminAuthGuardLayout

