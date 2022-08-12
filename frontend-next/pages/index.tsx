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
  const [dataTransferList, setDataTransferList] = useState<{ file: File, index: number }[]>([])
  const [margin, setMargin] = useState<{ left: string, top: string, right: string, bottom: string }>({left: '0', top: '0', right: '0', bottom: '0'})
  const serialNumber = useRef<number>(0)

  useEffect(() => {
    console.log(itemsPerRow)
    //if(itemsPerRow !== 2 && width < 600) setItemsPerRow(2)
    if(itemsPerRow !== 3 && width < 1000) setItemsPerRow(3)
    if(itemsPerRow !== 4 && width > 1000) setItemsPerRow(4)
  }, [itemsPerRow, width])
  return (
    <React.Fragment>
      <Head>
        <title>PadPdf</title>
      </Head>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Box
          sx={{
            display: 'flex',
            //flexDirection: 'column-reverse',
            padding: '8px',
            width: '100%',
            maxWidth: '1200px',
            paddingBottom: '100px',
          }}>
          <Box sx={{
            flex: '7',
          }}>
            <DragNDrop
              dataTransferList={dataTransferList}
              setDataTransferList={setDataTransferList}
              fileInputRef={fileInputRef}
              itemsPerRow={itemsPerRow}
              margin={margin}
              sx={{
                width: '100%',
                height: 'min(70vh, 70vw)',
              }} />
          </Box>
          <Box sx={{
            flex: '3',
            position: 'relative',
            verticalAlign: 'baseline',
            boxSizing: 'border-box',
            display: 'block',
          }}>
            <Box sx={{
              position: 'sticky',
              top: '0',
              padding: '10px 5px',
            }}>
              <SideBar serialNumber={serialNumber} fileInputRef={fileInputRef} margin={margin} setMargin={setMargin} dataTransferList={dataTransferList}/>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Home
