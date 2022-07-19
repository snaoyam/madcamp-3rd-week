import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'
import React from 'react'


const Result = () => {
  const router = useRouter()
  useEffect(() => {
    window.location.href = `http://192.249.18.169/download/${router.query.id}`
    Router.replace('/')
  })
  return (
    <>
    </>
  )
}

export default Result
