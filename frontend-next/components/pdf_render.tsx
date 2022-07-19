import React, { useEffect, useState, DragEvent, ChangeEvent, useRef, ReactElement } from 'react'
import { Box, ButtonBase } from '@mui/material' //!Grow
import { Document, Page, /*pdfjs*/ } from 'react-pdf'
import { ThirtyFpsSharp, ThreeSixty } from '@mui/icons-material'

type pdfPageProps = { 
  file: { file: File, index: number }, 
  itemsPerRow: number, 
  id: string, 
  setDataTransferList: React.Dispatch<React.SetStateAction<{ file: File, index: number }[]>>, 
  margin: { left: number, top: number, right: number, bottom: number },
}
type pdfPageState = { pdfDimension: { width: number[], height: number[] }, numPages: number, expanded: boolean }

class PdfRender extends React.Component<pdfPageProps, pdfPageState> {
  file: { file: File, index: number }
  HeightL: boolean
  itemsPerRow: number
  id: string
  margin: { left: number, top: number, right: number, bottom: number }
  pdfDimensionIndexed: { index: number, width: number, height: number }[]
  constructor(props: pdfPageProps, state: pdfPageState) {
    super(props)
    this.file = props.file
    this.HeightL = false
    this.itemsPerRow = props.itemsPerRow
    this.id = props.id
    this.pdfDimensionIndexed = []
    this.margin = props.margin
    this.state = {
      pdfDimension: { width: [], height: [] },
      numPages: 1,
      expanded: false,
    }
  }

  shouldComponentUpdate(nextProps: pdfPageProps, nextState: pdfPageState) {
    this.itemsPerRow = nextProps.itemsPerRow
    this.margin = nextProps.margin
    return (
      this.props.itemsPerRow !== nextProps.itemsPerRow || this.props.margin !== nextProps.margin || this.state !== nextState
    )
  }

  overflowBound(pagenum: number): number[] {
    const bound: number = pagenum > (this.HeightL ? 2 : 3) * (this.itemsPerRow + (this.HeightL ? 1 : 0)) ? (this.HeightL ? 2 : 3) * (this.itemsPerRow + (this.HeightL ? 1 : 0)) : pagenum
    return [bound, pagenum - bound > (this.HeightL ? 2 : 3) ? (this.HeightL ? 2 : 3) : (pagenum > bound ? pagenum - bound : 0)]
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        <Box sx={{
          display: 'flex',
          justifyContent: 'end',
          padding: '4px 8px 0 8px',
        }}>
          {this.overflowBound(this.state.numPages)[1] !== 0 ? <ButtonBase onClick={() => {
            this.setState((state) => {
              return { ...state, expanded: !this.state.expanded }
            })
          }} sx={{ textTransform: 'unset', color: '#adadad', borderRadius: '4px', padding: '3px 4px' }}>{this.state.expanded ? 'Collapse Pages' : 'Expand Pages'}</ButtonBase> : null}
          <ButtonBase onClick={() => {
            this.props.setDataTransferList(v => {
              return v.filter(v => v != this.file)
            })
          }} sx={{ textTransform: 'unset', color: '#e76464', borderRadius: '4px 8px 4px 4px', padding: '3px 4px' }}>Delete File</ButtonBase>
        </Box>
        <Box id={this.id}
          sx={{
            padding: '0 8px 4px 8px',
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
            <Document file={this.file.file} onLoadSuccess={((info) => {
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
                        : ((this.state.pdfDimension.height.reduce((v, c) => v + c) / this.state.pdfDimension.height.length) + ((this.margin.top + this.margin.bottom) * 30)) / ((this.state.pdfDimension.width.reduce((v, c) => v + c) / this.state.pdfDimension.width.length) + ((this.margin.left + this.margin.right) * 30))} / ${this.itemsPerRow + (this.HeightL ? 1 : 0)})`,
                      transition: 'padding-top .3s linear',
                      position: 'relative',
                      height: 0,
                    }}>
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      width: '100%',
                      height: '100%',
                      padding: 'min(5px, 2%)',
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
                            padding: ((e, g) => {
                              if(e)
                                return `${(g < e.height / e.width) ? (this.margin.top * g * 6700 / e.height) : (this.margin.top * 6700 / e.width)}% ${this.margin.right * g * 6700 / e.height}% ${(g < e.height / e.width) ? (this.margin.bottom * g * 6700 / e.height) : (this.margin.bottom * 6700 / e.width)}% ${this.margin.left * g * 6700 / e.height}%`
                              else
                                return '0px'
                            })(this.pdfDimensionIndexed.find(e => e.index == pageindex), (this.state.pdfDimension.width.length == 0 || this.state.pdfDimension.height.length == 0) ? 1 : (((this.state.pdfDimension.height.reduce((v, c) => v + c) / this.state.pdfDimension.height.length) / (this.state.pdfDimension.width.reduce((v, c) => v + c) / this.state.pdfDimension.width.length)) / (this.itemsPerRow + (this.HeightL ? 1 : 0)))), 
                          },
                        }}>
                        <Page pageNumber={pageindex} height={0} onLoadSuccess={(e) => {
                          this.setState((state: Readonly<pdfPageState>) => {
                            this.HeightL = ([...state.pdfDimension.height, e.height].reduce((v, c) => v + c) > [...state.pdfDimension.width, e.width].reduce((v, c) => v + c))
                            this.pdfDimensionIndexed.push({ index: pageindex , width: e.width, height: e.height})
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
                        : ((this.state.pdfDimension.height.reduce((v, c) => v + c) / this.state.pdfDimension.height.length) + ((this.margin.top + this.margin.bottom) * 30)) / ((this.state.pdfDimension.width.reduce((v, c) => v + c) / this.state.pdfDimension.width.length) + ((this.margin.left + this.margin.right) * 30))} / ${this.itemsPerRow + (this.HeightL ? 1 : 0)})`,
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
                      padding: 'min(5px, 2%)',
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
                            padding: ((e, g) => {
                              if (e)
                                return `${(g < e.height / e.width) ? (this.margin.top * g * 6700 / e.height) : (this.margin.top * 6700 / e.width)}% ${this.margin.right * g * 6700 / e.height}% ${(g < e.height / e.width) ? (this.margin.bottom * g * 6700 / e.height) : (this.margin.bottom * 6700 / e.width)}% ${this.margin.left * g * 6700 / e.height}%`
                              else
                                return '0px'
                            })(this.pdfDimensionIndexed.find(e => e.index == pageindex), (this.state.pdfDimension.width.length == 0 || this.state.pdfDimension.height.length == 0) ? 1 : (((this.state.pdfDimension.height.reduce((v, c) => v + c) / this.state.pdfDimension.height.length) / (this.state.pdfDimension.width.reduce((v, c) => v + c) / this.state.pdfDimension.width.length)) / (this.itemsPerRow + (this.HeightL ? 1 : 0)))),
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
      </React.Fragment>
    )
  }
}

export default PdfRender