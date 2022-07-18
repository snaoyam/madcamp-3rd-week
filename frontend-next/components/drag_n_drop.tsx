import React, { useEffect, useState, DragEvent, ChangeEvent, useRef } from 'react'
import { Box, IconButton } from '@mui/material'
import PdfRender from './pdf_render'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
//import { Document, Page, /*pdfjs*/ } from 'react-pdf'
//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
import ClearIcon from '@mui/icons-material/Clear'

const DragNDrop = ({ sx, itemsPerRow }: { sx: { width: number | string, height: number | string }, itemsPerRow: number }) => {
  const [dragActive, setDragActive] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [dataTransferList, setDataTransferList] = useState<{file: File, index: number}[]>([])
  //const [pdfHeight, setPdfHeight] = useState<number[]>([1])
  //const [pdfWidth, setPdfWidth] = useState<number[]>([1])
  //const [pdfDimension, setPdfDimension] = useState<{ width: number[], height: number[] }>({ width: [], height: [] })

  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => {
    setIsBrowser(typeof window == "object")
  }, [])

  useEffect(() => {
    const dataTransfer = new DataTransfer()
    dataTransferList.forEach(file => {
      dataTransfer.items.add((file.file ?? {name: null}))
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
        if (file.type == 'application/pdf') { //! alert when not pdf
          setDataTransferList((list) => [...list, { file: file, index: list.length }])
        }
      })
    }
  }

  const handleInputChange = function (e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const { files } = e.target
    if (files && files.length) {
      Array.from(files).forEach(file => {
        if (file.type == 'application/pdf') { //! alert when not pdf
          setDataTransferList((list) => [...list, { file: file, index: list.length }])
        }
      })
    }
  }

  const reorder = (list: { file: File, index: number }[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    setDataTransferList(v => reorder(
      v,
      result.source.index,
      result.destination.index,
    ))
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
        /*onClick={() => { fileInputRef.current?.click() }}*/
        onDragOver={(e) => { e.preventDefault() }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          border: '2px dashed rgb(128, 128, 128)',
          padding: '0px',
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
          {isBrowser ? <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <Box ref={provided.innerRef} {...provided.droppableProps}>
                  {dataTransferList.map((file, index) => {
                    return (
                      <Draggable key={(file.file ?? {name: null}).name + file.index} draggableId={(file.file ?? {name: null}).name + file.index} index={index}>
                        {(provided, snapshot) => (
                          <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <PdfRender id={(file.file ?? {name: null}).name + file.index} file={(file.file ?? {name: null})} itemsPerRow={itemsPerRow} />
                          </Box>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext> : null}
        </Box>
      </Box>
    </Box>
  )
}


export default DragNDrop
