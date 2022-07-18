import React, { useEffect, useState, DragEvent, ChangeEvent, useRef, ReactElement } from 'react'
import { Box, ButtonBase } from '@mui/material'
import { Document, Page, /*pdfjs*/ } from 'react-pdf'
import MarginInput from './margin_input'

type sideBarProps = { 
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>, 
  margin: { left: number, top: number, right: number, bottom: number }, 
  setMargin: React.Dispatch<React.SetStateAction<{left: number, top: number, right: number,bottom: number}>>
}
type sideBarState = {}

class SideBar extends React.PureComponent<sideBarProps, sideBarState> {
  constructor(props: sideBarProps, state: sideBarState) {
    super(props)
  }

  render(): JSX.Element {
    return (
      <Box sx={{
        width: '100%',
        position: 'relative',
        paddingTop: 'min(200%, calc(100vh - 4rem - 150px))',
        height: 0,
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          height: '100%',
          width: '100%',
        }}>
          <Box
            onClick={() => { this.props.fileInputRef.current?.click() }}
            sx={{
              width: '100%',
              height: '30%',
              backgroundColor: '#f6f6f6',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              textAlign: 'center',
            }}>
            Click here to choose PDF
          </Box>
          <Box sx={{
            width: '100%',
            height: '70%',
            paddingTop: '16px',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Box sx={{
              width: '80%',
            }}>
              <Box sx={{
                width: '100%',
                height: 0,
                paddingTop: '100%',
                position: 'relative',
              }}>
                <Box sx={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                }}>
                  <MarginInput margin={this.props.margin} setMargin={this.props.setMargin} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }
}

export default SideBar