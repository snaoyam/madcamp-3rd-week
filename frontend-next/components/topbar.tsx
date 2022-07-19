import React from 'react'
import { Box, InputBase, IconButton } from '@mui/material'
import Router from 'next/router'
import DownloadingIcon from '@mui/icons-material/Downloading'
import { textAlign } from '@mui/system'


const appbar = () => {

  const [idInput, setIdInput] = React.useState<number>(0)

  return (
    <Box sx={{
      height: '4rem',
      backgroundColor: '#7aae5d',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
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
          padding: '0 15px',
        }}>
        <Box sx={{
          color: 'white'
        }}>
          PDF PADDER
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 15px',
        color: 'white',
      }}>
        <Box sx={{
          padding: '0 5px',
          textAlign: 'right',
        }}>
          Type ID to Download: 
        </Box>
        <InputBase 
          value={idInput == 0 ? '' : idInput}
          onChange={v => {
            if (v.target.value.length < 10) {
              setIdInput(parseInt(v.target.value == '' ? '0' : v.target.value))
            }
          }}
        sx={{
          backgroundColor: 'white',
          borderRadius: '4px',
          color: 'black',
          padding: '0 5px',
        }} />
        <IconButton sx={{color: 'white'}} aria-label="upload picture" component="label" onClick={
          () => {
            if (idInput >= 100000000 && idInput < 1000000000) {
              Router.push(`/download/${idInput}`)
            }
          }
        }>
          <DownloadingIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default appbar