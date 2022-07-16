import React, { useEffect, useState, DragEvent, ChangeEvent, useRef } from 'react'
import { Box, IconButton } from '@mui/material'
import { Document, Page, /*pdfjs*/ } from 'react-pdf';
//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import ClearIcon from '@mui/icons-material/Clear'


const DragNDrop = ({ sx }: { sx: { width: number | string, height: number | string } }) => {
  const [dragActive, setDragActive] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [dataTransferList, setDataTransferList] = useState<File[]>([])
  const [itemsPerRow, setItemsPerRow] = useState<number>(3)
  //const [pdfHeight, setPdfHeight] = useState<number[]>([1])
  //const [pdfWidth, setPdfWidth] = useState<number[]>([1])
  const [pdfDimension, setPdfDimension] = useState<{ width: number[], height: number[] }>({ width: [], height: [] })
  const pdfRefs = useRef<(HTMLElement | null)[]>([])


  useEffect(() => {
    const dataTransfer = new DataTransfer()
    dataTransferList.forEach(file => {
      dataTransfer.items.add(file)
    })
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files
    }
    pdfRefs.current.push(null)
  }, [dataTransferList])

  const handleDragEnter = function (e: DragEvent<HTMLInputElement>) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = function (e: DragEvent<HTMLInputElement>) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = function (e: DragEvent<HTMLInputElement>) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const { files } = e.dataTransfer
    if (files && files.length) {
      Array.from(files).forEach(file => {
        if (file.type == 'application/pdf') { //! alert when not pdf
          setDataTransferList((list) => [...list, file])
        }
      })
    }
  }

  const handleInputChange = function (e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const { files } = e.target;
    if (files && files.length) {
      Array.from(files).forEach(file => {
        if (file.type == 'application/pdf') { //! alert when not pdf
          setDataTransferList((list) => [...list, file])
        }
      })
    }
  }
  /*<Box
    className={dragActive ? "drag-active" : ""}
    sx={{
      width: 402,
      height: 80,
      backgroundColor: 'green',
    }}>

  </Box>*/

  return (
    <Box
      onSubmit={(e) => e.preventDefault()}
      sx={{
        minHeight: sx.height,
        width: sx.width,
        padding: '12px',
        userSelect: 'none',
      }}>
      <Box
        onClick={() => { fileInputRef.current?.click() }}
        onDragOver={(e) => { e.preventDefault() }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          border: '2px dashed rgb(128, 128, 128)',
          padding: '5px',
          width: '100%',
          minHeight: 'inherit',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Box sx={{
          display: 'none',
        }}>
          <input ref={fileInputRef} accept="application/pdf" onClick={(e) => { (e.target as HTMLInputElement).value = '' }} type="file" multiple={true} onChange={handleInputChange} />
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>

        </Box>
        <Box sx={{
          width: '100%',
          minHeight: 'inherit',
        }}>
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            width: '100%',
          }}>
            {dataTransferList.map((v, index) => {
              return (
                <Box key={v.name + index} sx={{
                  width: `calc(100% / ${itemsPerRow})`,
                  paddingTop: `calc(100% * ${(pdfDimension.width.length == 0 || pdfDimension.height.length == 0) ? 1
                    : (pdfDimension.height.reduce((v, c) => v + c) / pdfDimension.height.length) / (pdfDimension.width.reduce((v, c) => v + c) / pdfDimension.width.length)} / ${itemsPerRow})`,
                  transition: 'padding-top .3s linear',
                  position: 'relative',
                  height: 0,
                }}>
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    height: '100%',
                    padding: '5px',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    <Box
                      sx={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        display: 'flex',
                        '& div': {
                          maxWidth: '100% !important',
                          maxHeight: '100% !important',
                        },
                        '& > div': {
                          display: 'flex',
                          justifyContent: 'center',
                          position: 'relative',
                        },
                        '& > div > div > div': {
                          display: 'none',
                        },
                        '& canvas': {
                          maxWidth: '100% !important',
                          maxHeight: '100% !important',
                          width: 'auto !important',
                          height: 'auto !important',
                          margin: 'auto auto',
                          borderRadius: '4px',
                          boxShadow: '2px 3px 24px 0px rgb(0 0 0 / 16%), 1px 1px 12px 0px rgb(0 0 0 / 16%)',
                          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                          backgroundColor: 'white',
                          color: 'white',
                        },
                    }}>
                      <Document file={v}>
                        <Page pageNumber={1} height={0} onLoadSuccess={(e) => {
                          setPdfDimension(w => {
                            return { width: [...w.width, e.width], height: [...w.height, e.height] }
                          })
                          console.log(getComputedStyle(pdfRefs.current[index]!).getPropertyValue('margin'))
                          
                        }} />
                        <IconButton
                          sx={{
                            width: 24,
                            height: 24,
                            position: 'absolute',
                            right: -12,
                            top: -12,
                          }}>
                          <ClearIcon />
                        </IconButton>
                      </Document>
                    </Box>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}


export default DragNDrop