import React, { useEffect, useState, DragEvent, ChangeEvent, useRef } from 'react'
import { Box, IconButton } from '@mui/material'
import { Document, Page, /*pdfjs*/ } from 'react-pdf'

type pdfPageProps = { file: File, itemsPerRow: number }
type pdfPageState = { pdfDimension: { width: number[], height: number[] }, numPages: number }

class PdfRender extends React.PureComponent<pdfPageProps, pdfPageState> {
  file: File
  itemsPerRow: number
  constructor(props: { key: string, file: File, itemsPerRow: number }) {
    super(props)
    this.file = props.file
    this.itemsPerRow = props.itemsPerRow
    this.state = {
      pdfDimension: { width: [], height: [] },
      numPages: 1
    }
    //{ pdfDimension:  }
  }

  render(): JSX.Element {
    return (
      <Document file={this.file} onLoadSuccess={((info) => {
        this.setState((state) => {
          return {...state, numPages: info.numPages}
        })
      })}>
        {Array.from({ length: this.state.numPages }, (_, i) => i + 1).map(pageindex => {
          return(
            <Box sx={{
              width: `calc(100% / ${this.itemsPerRow})`,
              paddingTop: `calc(100% * ${(this.state.pdfDimension.width.length == 0 || this.state.pdfDimension.height.length == 0) ? 1
                : (this.state.pdfDimension.height.reduce((v, c) => v + c) / this.state.pdfDimension.height.length) / (this.state.pdfDimension.width.reduce((v, c) => v + c) / this.state.pdfDimension.width.length)} / ${this.itemsPerRow})`,
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
                    '& > div > div': {
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
                  <Page pageNumber={pageindex} height={0} onLoadSuccess={(e) => {
                    this.setState((state) => {
                      return {...state, pdfDimension: { width: [...state.pdfDimension.width, e.width], height: [...state.pdfDimension.height, e.height] }}
                    })
                  }} />
                </Box>
              </Box>
            </Box>
          )
        })}
      </Document>
    )
  }
}

export default PdfRender