import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import { Box } from '@mui/material'
import DragNDrop from '../components/drag_n_drop'

const Home: NextPage = () => {
  const [itemsPerRow, setItemsPerRow] = useState<number>(3)

  return (
    <Box
      sx={{
        margin: '50px 40px',
      }}>
      <DragNDrop 
        itemsPerRow={itemsPerRow}
        sx={{
        width: 800,
        height: 100,
      }}/>
    </Box>
  )
}

export default Home
