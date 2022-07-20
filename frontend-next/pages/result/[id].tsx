import Router, { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import Image from 'next/image'
import React from 'react'
import { Box, Button, Divider } from '@mui/material'
import Lottie from "lottie-web"
import { any } from 'prop-types'
import lottie from 'react-lottie'

const Result = () => {
  const router = useRouter()
  /*useEffect(() => {
    window.location.href = `http://192.249.18.169/download/${router.query.id}`
    Router.replace('/')
  })*/
  const likecontainer = React.useRef<any>()

  const Animation = () => {
    //lottie
    useEffect(() => {
      Lottie.loadAnimation({
        container: likecontainer.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: require("../../assets/69380-success-check.json")
      })

    }, [])
    return (
      <Box sx={{
        width: '35%',
        height: '35%',
      }} ref={likecontainer}></Box>
    )
  }

  return (
    <Box sx={{
      width: '100%',
      height: 'calc(100vh - 4rem)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      color: 'rgb(100, 100, 100)',
    }}>
      <Animation />
      Create Download Link Done!
      <Box sx={{
        width: '100%',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        padding: '30px 0',
      }}>
        <Box sx={{
          margin: 'auto 0',
        }}>
          <Button sx={{

          }} variant="contained" onClick={
            () => {
              Router.push(`/download/${router.query.id}`)
            }
          }>
            Download File
          </Button>
        </Box>
        <Divider sx={{padding: '0 20px'}} orientation="vertical" flexItem>OR</Divider>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          margin: 'auto 0'
        }}>
          <Box>
            Type ID from Another Device
          </Box>
          <Box sx={{
            padding: '10px 0 0 0',
            fontWeight: 'bold',
          }}>
            {` ID: ${String(router.query.id).slice(0, 3)}-${String(router.query.id).slice(3, 6)}-${String(router.query.id).slice(6, 9)}`}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Result
