import React, { useEffect, useState, DragEvent, ChangeEvent, useRef } from 'react'
import { Box, IconButton } from '@mui/material'
import { Document, Page, /*pdfjs*/ } from 'react-pdf'

type pdfPageProps = { file: File, itemsPerRow: number }
type pdfPageState = { pdfDimension: { width: number[], height: number[] }, numPages: number, expanded: boolean }

class PdfRender extends React.Component<pdfPageProps, pdfPageState> {
  file: File
  HeightL: boolean
  itemsPerRow: number
  constructor(props: pdfPageProps, state: pdfPageState) {
    super(props)
    this.file = props.file
    this.HeightL = false
    this.itemsPerRow = props.itemsPerRow
    this.state = {
      pdfDimension: { width: [], height: [] },
      numPages: 1,
      expanded: false,
    }
  }

  shouldComponentUpdate(nextProps: pdfPageProps, nextState: pdfPageState) {
    this.itemsPerRow = nextProps.itemsPerRow
    return (
      this.props.itemsPerRow !== nextProps.itemsPerRow || this.state !== nextState
    )
  }

  overflowBound(pagenum: number): number[] {
    const bound: number = pagenum > (this.HeightL ? 2 : 3) * (this.itemsPerRow + (this.HeightL ? 1 : 0)) ? (this.HeightL ? 2 : 3) * (this.itemsPerRow + (this.HeightL ? 1 : 0)) : pagenum
    return [bound, pagenum - bound > (this.HeightL ? 2 : 3) ? (this.HeightL ? 2 : 3) : (pagenum > bound ? pagenum - bound : 0)]
  }

  render(): JSX.Element {
    return (
      <Box onClick={() => {
        this.setState((state) => {
          return { ...state, expanded: !this.state.expanded }
        })
      }}
        sx={{
          padding: '8px',
        }}>
        <Box sx={{
          backgroundColor: 'rgb(100 100 100 / 10%)',
          borderRadius: '8px',
          padding: '5px',
          '& > div': {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            width: '100%',
            position: 'relative',
          }
        }}>
          <Document file={this.file} onLoadSuccess={((info) => {
            this.setState((state) => {
              return { ...state, numPages: info.numPages }
            })
          })}>
            {Array.from({ length: this.state.expanded ? this.state.numPages : this.overflowBound(this.state.numPages)[0] }, (_, i) => i + 1).map(pageindex => {
              return (
                <Box
                  key={pageindex}
                  sx={{
                    width: `calc(100% / ${this.itemsPerRow + (this.HeightL ? 1 : 0)})`,
                    paddingTop: `calc(100% * ${(this.state.pdfDimension.width.length == 0 || this.state.pdfDimension.height.length == 0) ? 1
                      : (this.state.pdfDimension.height.reduce((v, c) => v + c) / this.state.pdfDimension.height.length) / (this.state.pdfDimension.width.reduce((v, c) => v + c) / this.state.pdfDimension.width.length)} / ${this.itemsPerRow + (this.HeightL ? 1 : 0)})`,
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
                        this.setState((state: Readonly<pdfPageState>) => {
                          this.HeightL = ([...state.pdfDimension.height, e.height].reduce((v, c) => v + c) > [...state.pdfDimension.width, e.width].reduce((v, c) => v + c))
                          return { ...state, pdfDimension: { width: [...state.pdfDimension.width, e.width], height: [...state.pdfDimension.height, e.height] } }
                        })
                      }} />
                    </Box>
                  </Box>
                </Box>
              )
            })}
            {Array.from({ length: (this.state.expanded ? 0 : this.overflowBound(this.state.numPages)[1]) }, (_, i) => i + 1).map(pageindex => {
              return (
                <Box
                  key={pageindex + this.overflowBound(this.state.numPages)[0]}
                  sx={{
                    width: `calc(100% / ${this.itemsPerRow + (this.HeightL ? 1 : 0)})`,
                    paddingTop: `calc(100% * ${(this.state.pdfDimension.width.length == 0 || this.state.pdfDimension.height.length == 0) ? 1
                      : (this.state.pdfDimension.height.reduce((v, c) => v + c) / this.state.pdfDimension.height.length) / (this.state.pdfDimension.width.reduce((v, c) => v + c) / this.state.pdfDimension.width.length)} / ${this.itemsPerRow + (this.HeightL ? 1 : 0)})`,
                    transition: 'padding-top .3s linear',
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    height: 0,
                    zIndex: (pageindex == 1 ? 10 : (pageindex == 2 ? -10 : -20)),
                    transform: (pageindex == 1 ? 'rotate(4deg)' : (pageindex == 2 ? 'rotate(-4deg)' : 'rotate(-8deg)')),
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
                          boxShadow: '2px 3px 24px 0px rgb(0 0 0 / 3%), 1px 1px 12px 0px rgb(0 0 0 / 10%)',
                          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                          backgroundColor: 'white',
                          color: 'white',
                        },
                      }}>
                      <Page pageNumber={this.overflowBound(this.state.numPages)[0]} height={0} onLoadSuccess={(e) => {
                        this.setState((state: Readonly<pdfPageState>) => {
                          this.HeightL = ([...state.pdfDimension.height, e.height].reduce((v, c) => v + c) > [...state.pdfDimension.width, e.width].reduce((v, c) => v + c))
                          return { ...state, pdfDimension: { width: [...state.pdfDimension.width, e.width], height: [...state.pdfDimension.height, e.height] } }
                        })
                      }} />
                    </Box>
                  </Box>
                </Box>
              )
            })}
          </Document>
        </Box>
      </Box>
    )
  }
}

export default PdfRender