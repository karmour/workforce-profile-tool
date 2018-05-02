import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'

import './Graphs.css'

import { VARIABLE_MAPPING } from '../Variables/VariableList'

class RegionGraph extends Component {
  render () {
    if (!this.props.data) return <div>Loading...</div>

    const dataMap = {}
    this.props.data.forEach(d => {
      dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
      dataMap[d.Des_Grp].push(d)
    })

    const chartData = Object.keys(dataMap).sort().map(k => {
      const data = dataMap[k][0]
      const values = [
        +data.Applied_Leadership,
        +data.Business_Leadership,
        +data.Strategic_Leadership
      ]

      let title = VARIABLE_MAPPING
        .filter(v => v.key === 'DesignatedMinority_Group')[0]
        .options
        .filter(v => v.key === k)[0].display

      return {
        category: title,
        values
      }
    })

    return (
      <PlusPlot.GroupedBarChart
        data={chartData}
        colors={['#70CCDB', '#D2E2EE', '#6c757d']}
        options={{
          margins: { top: 0, left: 125, bottom: 40, right: 20 },
          axes: { yAxisLabel: '', xAxisLabel: '% in leadership positions' },
          font: 'Myriad Pro'
        }}
      />
    )
  }
}

export default RegionGraph