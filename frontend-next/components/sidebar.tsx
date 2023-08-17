import React from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import Router from 'next/router'
import MarginInput from './margin_input'
import UploadIcon from '@mui/icons-material/Upload'
import SendIcon from '@mui/icons-material/Send'
import Axios from 'axios'

type sideBarProps = {
  serialNumber: React.MutableRefObject<number>,
  dataTransferList: { file: File, index: number }[], 
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>,
  margin: { left: string, top: string, right: string, bottom: string },
  setMargin: React.Dispatch<React.SetStateAction<{ left: string, top: string, right: string, bottom: string }>>,
}
type sideBarState = { loading: boolean}

class SideBar extends React.PureComponent<sideBarProps, sideBarState> {
  constructor(props: sideBarProps, state: sideBarState) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  /*
  useEffect(() => {
    const dataTransfer = new DataTransfer()
    dataTransferList.forEach(file => {
      dataTransfer.items.add((file.file ?? { name: null }))
    })
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files
    }
  }, [dataTransferList])
  */

  render(): JSX.Element {
    return (
      <Box sx={{
        width: '100%',
      }}>
        <Box sx={{
          width: '100%',
          padding: '16px 0',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Box sx={{
            width: '100%',
            maxWidth: '300px',
          }}>
            <Box sx={{
              width: '100%',
              height: 0,
              paddingTop: 'calc(200% / 3)',
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
        <Box sx={{
          width: '100%',
          display: 'flex',
          'justifyContent': 'center',
        }}>
          <Button
            variant="outlined"
            endIcon={<UploadIcon />}
            onClick={() => { this.props.fileInputRef.current?.click() }}
            sx={{
              width: '100%',
              maxWidth: '240px',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: 'calc(0.1vw + 12px)',
              textTransform: 'unset',
            }}>
            Choose PDF to Upload
          </Button>
        </Box>
        <Box sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '16px',
        }}>
          <Box sx={{
            width: '100%',
            maxWidth: '240px',
            display: 'flex',
            justifyContent: 'end',
          }}>
            <Button
              variant="contained"
              disabled={this.state.loading}
              endIcon={this.state.loading ? <CircularProgress size={20} sx={{color: 'white'}}/> : <SendIcon />}
              onClick={() => {
                if(this.props.dataTransferList.length > 0) {
                  this.props.serialNumber.current = Math.floor(100000000 + Math.random() * 900000000)
                  this.setState(state => {
                    return { ...state, loading: true }
                  })
                  const dataTransfer = new DataTransfer()
                  this.props.dataTransferList.forEach(file => {
                    dataTransfer.items.add((file.file ?? { name: null }))
                  })
                  Axios.postForm('https://ssal.sparcs.org:30180/merge', {
                    'filecount': dataTransfer.files.length,
                    'files[]': dataTransfer.files,
                    'id': this.props.serialNumber.current,
                    'left': this.props.margin.left,
                    'top': this.props.margin.top,
                    'right': this.props.margin.right,
                    'bottom': this.props.margin.bottom,
                  }).then(
                    (response) => {
                      this.setState(state => {
                        return { ...state, loading: false }
                      })
                      Router.push(`/result/${this.props.serialNumber.current}`)
                    }
                  ).catch(
                    () => {
                      this.setState(state => {
                        return { ...state, loading: false }
                      })
                    }
                  )
                }
              }}
              sx={{
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: 'calc(0.1vw + 12px)'
              }}>
              Create Link
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }
}

export default SideBar