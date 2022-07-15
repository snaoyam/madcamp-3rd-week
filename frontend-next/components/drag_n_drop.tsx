import React, { RefObject, useEffect } from 'react' 
import { Box } from '@mui/material'
import { FiveK } from '@mui/icons-material'

const DragNDrop = () => {
  const [dragActive, setDragActive] = React.useState<boolean>(false)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const [dataTransfer, setDataTransfer] = React.useState<DataTransfer>()
  useEffect(() => {
    setDataTransfer(new DataTransfer())
  }, [])

  const handleDragEnter = function (e: React.DragEvent<HTMLInputElement>) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = function (e: React.DragEvent<HTMLInputElement>) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = function (e: React.DragEvent<HTMLInputElement>) {
    console.log(2)
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const { files } = e.dataTransfer
    if (files && files.length) {
      Array.from(files).forEach(file => {
        let tempDataTransfer = dataTransfer
        tempDataTransfer?.items.add(file)
        setDataTransfer(tempDataTransfer)
        
      })
      if (fileInputRef.current && dataTransfer) {
        fileInputRef.current.files = dataTransfer.files
      }
    }
  }

  const handleInputChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e)
    e.preventDefault()
    const { files } = e.target;
    if (files && files.length) {
      for (let i = 0; i < (fileInputRef.current?.files?.length ?? 0); i++) {
        let tempDataTransfer = dataTransfer
        tempDataTransfer?.items.add(fileInputRef.current?.files?.item(i)!)
        setDataTransfer(tempDataTransfer)
      }
    }
    if (fileInputRef.current && dataTransfer) {
      fileInputRef.current.files = dataTransfer.files
    }
  }

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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Box
            className={dragActive ? "drag-active" : ""}
            sx={{
              width: 402,
              height: 80,
              backgroundColor: 'green',
            }}>

          </Box>
        </Box>
        <Box sx={{
          display: 'none',
        }}>
          <input ref={fileInputRef} type="file" multiple={true} onChange={handleInputChange} />
        </Box>
      </Box>
    </Box>
  )
}


export default DragNDrop