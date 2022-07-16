import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Box } from '@mui/material'
import DragNDrop from '../components/drag_n_drop'


const Home: NextPage = () => {

  return (
    <Box
      sx={{
        margin: '50px 40px',
        backgroundColor: 'rgb(255, 253, 219)',
      }}>
      <DragNDrop sx={{
        width: 800,
        height: 100,
      }}/>
    </Box>
  )
}

export default Home
