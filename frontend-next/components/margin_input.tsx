import React from 'react'
import { Box, OutlinedInput } from '@mui/material'



const MarginInput = ({margin, setMargin} : {
  margin: { left: string, top: string, right: string, bottom: string },
  setMargin: React.Dispatch<React.SetStateAction<{ left: string, top: string, right: string, bottom: string }>>
}): React.ReactElement => {

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateRows: '1fr 2fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr',
      width: '100%',
      height: '100%',

    }}>
      <Box></Box>
      <Box sx={{
        margin: 'auto auto 0 auto',
      }}>
        <OutlinedInput size='small' sx={{ maxWidth: '80px' }}
          value={margin.top}
          onChange={(v) => {
            setMargin(vi => {
              return { ...vi, top: ((v.target.value === '-' || v.target.value === '--' || v.target.value === '0-' || v.target.value === '-0') ? '-' : String(parseInt(v.target.value === '' ? '0' : v.target.value))) }
            })
          }} />
      </Box>
      <Box></Box>
      <Box sx={{
        margin: 'auto 0 auto auto',
      }}>
        <OutlinedInput size='small' sx={{ maxWidth: '80px' }}
          value={margin.left}
          onChange={(v) => {
            setMargin(vi => {
              return { ...vi, left: ((v.target.value === '-' || v.target.value === '--' || v.target.value === '0-' || v.target.value === '-0') ? '-' : String(parseInt(v.target.value === '' ? '0' : v.target.value))) }
            })
          }} />
      </Box>
      <Box sx={{
        width: "100%",
        height: '100%',
        padding: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Box sx={{
          width: "min(100%, 100px)",
          height: 'min(100%, 100px)',
          borderRadius: '4px',
          boxShadow: '2px 3px 12px 0px rgb(0 0 0 / 8%), 1px 1px 12px 0px rgb(0 0 0 / 8%)',
          backgroundColor: 'rgb(252, 246, 227)',
        }}></Box>
      </Box>
      <Box sx={{
        margin: 'auto auto auto 0',
      }}>
        <OutlinedInput size='small' sx={{ maxWidth: '80px' }}
          value={margin.right}
          onChange={(v) => {
            setMargin(vi => {
              return { ...vi, right: ((v.target.value === '-' || v.target.value === '--' || v.target.value === '0-' || v.target.value === '-0') ? '-' : String(parseInt(v.target.value === '' ? '0' : v.target.value))) }
            })
          }} />
      </Box>
      <Box></Box>
      <Box sx={{
        margin: '0 auto auto auto',
      }}>
        <OutlinedInput size='small' sx={{ maxWidth: '80px' }}
          value={margin.bottom}
          onChange={(v) => {
            setMargin(vi => {
              return { ...vi, bottom: ((v.target.value === '-' || v.target.value === '--' || v.target.value === '0-' || v.target.value === '-0') ? '-' : String(parseInt(v.target.value === '' ? '0' : v.target.value))) }
            })
          }} />
      </Box>
      <Box></Box>
    </Box>
  )
}

export default MarginInput