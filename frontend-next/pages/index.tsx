import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState, useRef } from 'react'
import styles from '../styles/Home.module.css'
import { Box } from '@mui/material'
import DragNDrop from '../components/drag_n_drop'
import SideBar from '../components/sidebar'
import useWindowDimensions from '../utils/get_window_size'

const Home: NextPage = () => {
  const [itemsPerRow, setItemsPerRow] = useState<number>(3)
  const { width, height } = useWindowDimensions()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [margin, setMargin] = useState<{ left: number, top: number, right: number, bottom: number }>({left: 0, top: 0, right: 0, bottom: 0})

  useEffect(() => {
    console.log(itemsPerRow)
    //if(itemsPerRow !== 2 && width < 600) setItemsPerRow(2)
    if(itemsPerRow !== 3 && width < 1000) setItemsPerRow(3)
    if(itemsPerRow !== 4 && width > 1000) setItemsPerRow(4)
  }, [width])
  return (
    <Box
      sx={{
        display: 'flex',
        padding: '8px',
        paddingBottom: '100px',
      }}>
      <Box sx={{
        width: '70%',
        height: '100%',
      }}>
        <DragNDrop
          fileInputRef={fileInputRef}
          itemsPerRow={itemsPerRow}
          margin={margin}
          sx={{
            width: '100%',
            height: '70vh',
          }} />
      </Box>
      <Box sx={{
        width: '30%',
        position: 'relative',
        verticalAlign: 'baseline',
        boxSizing: 'border-box',
        display: 'block',
      }}>
        <Box sx={{
          position: 'sticky',
          top: '0',
          padding: '50px 5px'
        }}>
          <SideBar fileInputRef={fileInputRef} margin={margin} setMargin={setMargin}/>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
