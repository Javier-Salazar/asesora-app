import React, { Component } from 'react'
import Quagga from 'quagga'
import { alpha, styled } from '@mui/material/styles';



class Scanner extends Component {

  componentDidMount() {
      
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: 410,
            height: 400,
            facingMode: 'environment', 
          },
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: 4,
        decoder: {
          readers: ['code_128_reader'],
        },
        locate: true,
      },
      function(err) {
        if (err) {
          return console.log(err)
        }
        Quagga.start()
      },
    )
    Quagga.onDetected(this._onDetected)
  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected)
  }

  _onDetected = result => {
    this.props.onDetected(result)
  }

  render() {
    return <div id="interactive" className="viewport" />
  }
}

export default Scanner