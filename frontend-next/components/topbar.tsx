import React from 'react'
import { Box } from '@mui/material'
import Router from 'next/router'


const appbar = () => {

  return (
    <Box sx={{
      height: '4rem',
      backgroundColor: '#7aae5d',
    }}>
      <Box
        onClick={() => {
          Router.replace('/')
        }}
        sx={{
          cursor: 'pointer',
          display: 'flex',
          height: '100%',
          width: '10rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Box sx={{
        }}>
          Home
        </Box>
      </Box>
    </Box>
  )
}

export default appbar