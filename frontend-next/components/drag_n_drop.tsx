import React, { useEffect, useState, DragEvent, ChangeEvent } from 'react'
import { Box } from '@mui/material'
import { Document, Page } from 'react-pdf'

const DragNDrop = () => {
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
      for (let i = 0; i < (fileInputRef.current?.files?.length ?? 0); i++) {
        setDataTransferList((list) => [...list, fileInputRef.current?.files?.item(i)!])
      }
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
        width: '100%',
        height: '100%',
        padding: '12px',
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
          height: '100%',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Box sx={{
          //display: 'none',
        }}>
          <input ref={fileInputRef} onClick={(e) => { (e.target as HTMLInputElement).value = '' }} type="file" multiple={true} onChange={handleInputChange} />
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>

        </Box>
        <Box sx={{
          width: '100%',
          height: '100%',
        }}>
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            width: '100%',
          }}>
            {dataTransferList.map(v => {
              return (
                <Box sx={{
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
                  }}>
                    <Box sx={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'green',
                    }}>
                      {/*<Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                      </Document>*/}
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