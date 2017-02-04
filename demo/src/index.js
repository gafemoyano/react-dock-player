import React from 'react'
import {render} from 'react-dom'
import './normalize.css'
import DockPlayer from '../../src/'

let Demo = React.createClass({
  render() {
    return <div>
      <h1>react-dock-player Demo</h1>
      <DockPlayer/>
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
