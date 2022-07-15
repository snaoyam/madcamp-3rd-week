
import React from 'react'
import {Box} from '@mui/material'


const appbar = () => {

  return (
    <Box sx={{
      height: '4rem',
      backgroundColor: '#7aae5d',
    }}>
      <Box sx={{
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