import React, { useEffect, useState, DragEvent, ChangeEvent } from 'react'
import { Box } from '@mui/material'
import { Document, Page, /*pdfjs*/ } from 'react-pdf';
//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const DragNDrop = ({ sx }: { sx: { width: number | string, height: number | string } }) => {
  const [dragActive, setDragActive] = useState<boolean>(false)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const [dataTransferList, setDataTransferList] = useState<File[]>([])
  const [itemsPerRow, setItemsPerRow] = useState<number>(3)

  useEffect(() => {
    const dataTransfer = new DataTransfer()
    dataTransferList.forEach(file => {
      dataTransfer.items.add(file)
    })
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files
    }
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
        setDataTransferList((list) => [...list, file])
        //dataTransfer?.items.add(file)
      })
    }
  }

  const handleInputChange = function (e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const { files } = e.target;
    if (files && files.length) {
      Array.from(files).forEach(file => {
        setDataTransferList((list) => [...list, file])
        //dataTransfer?.items.add(file)
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
            {dataTransferList.map((v, i) => {
              return (
                <Box key={v.name+i} sx={{
                  width: `calc(100% / ${itemsPerRow})`,
                  paddingTop: `calc(120% / ${itemsPerRow})`,
                  position: 'relative',
                  height: 0,
                }}>
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    height: '100%',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    <Box sx={{
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
                      },
                      '& canvas': {
                        maxWidth: '100% !important',
                        maxHeight: '100% !important',
                        width: 'auto !important',
                        height: 'auto !important',
                        margin: 'auto auto',
                      },
                    }}>
                      <Document file={v} onLoadError={console.error}>
                        <Page pageNumber={1} height={0} />
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