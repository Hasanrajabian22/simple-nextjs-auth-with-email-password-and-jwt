import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

function HomeIndexPage() {
  const router = useRouter()
  useEffect(() => {
    router.push('/Login')
  }, [])
  
  return (
    <div>
      {/* Home */}
    </div>
  )
}

export default HomeIndexPage