import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import GraphFrame from './GraphFrame'
import Legend from './Legend'

import { formatNumber } from '../Services/formatter'

import './Graphs.css'

import { VARIABLE_MANAGER } from '../Variables/VariableManager'

class RegionGraph extends Component {
  render () {
    if (!this.props.data) return <div>&nbsp;</div>

    const dataMap = {}
    this.props.data.forEach(d => {
      dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
      dataMap[d.Des_Grp].push(d)
    })

    const chartData = Object.keys(dataMap).map(k => {
      const data = dataMap[k].filter(d => d.Variable_Type === 'Total')[0]
      const values = [
        data.DesGrp_Count_Expected,
        data.DesGrp_Count_ORG,
        data.DesGrp_Count_Shortfall
      ]

      let title = VARIABLE_MANAGER.displayNameByKey('Des_Grp', k)

      return {
        category: title,
        values
      }
    })

    const graph = (
      <PlusPlot.GroupedBarChart
        data={chartData}
        colors={['#70CCDB', '#D2E2EE', '#6c757d']}
        options={{
          dataLabels: {
            position: 20,
            formatter: (d) => formatNumber(d, '')
          },
          margins: { top: 0, left: 140, bottom: 40, right: 20 },
          axes: { yAxisLabel: '', xAxisLabel: 'Count in BCPS' },
          font: '"myriad-pro", "Myriad Pro"'
        }}
      />
    )

    const legend = (
      <Legend items={[
        { label: 'Expected', color: '#70CCDB' },
        { label: 'Actual', color: '#D2E2EE' },
        { label: 'Shortfall', color: '#6c757d' }
      ]} />
    )

    return (
      <GraphFrame className='Region' title={this.props.title} graph={graph} legend={legend} />
    )
  }
}

export default RegionGraph
