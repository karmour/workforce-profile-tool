import React, { Component } from 'react'
import * as PlusPlot from '@plot-and-scatter/plusplot'
import GraphFrame from './GraphFrame'
import Legend from './Legend'
import { withRouter } from 'react-router-dom'

import { VARIABLE_MANAGER } from '../Variables/VariableManager'

import './Graphs.css'

import { parseFloatClean, formatPercent } from '../Services/formatter'
import { subtitle } from '../Views/Title'

class MinistryGraph extends Component {
  render () {
    if (!this.props.data) return <div>&nbsp;</div>

    // Split the data
    const dataMap = {}
    this.props.data.forEach(d => {
      dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
      dataMap[d.Des_Grp].push(d)
    })

    const graphs = Object.keys(dataMap).map(k => {
      const title = VARIABLE_MANAGER.displayNameByKey('Des_Grp', k)
      const shortTitle = VARIABLE_MANAGER.shortDisplayNameByKey('Des_Grp', k)

      return (
        <div key={k}>
          <h2>{subtitle(this.props.location.search, title)}</h2>
          <MinistrySubGraph
            data={dataMap[k]}
            masterTitle={this.props.title}
            title={title}
            shortTitle={shortTitle}
            varKey={k}
          />
          <br />
          <br />
        </div>
      )
    })

    return (<div>{graphs}</div>)
  }
}

class MinistrySubGraph extends Component {
  render () {
    if (!this.props.data) return <div>&nbsp;</div>

    let categories = this.props.data && this.props.data.length
      ? Object.keys(this.props.data[0])
      : []

    const provincialRepresentation = parseFloat(this.props.data[0]['BC Population'])

    categories = categories.filter(c => c !== 'key' && c !== 'Des_Grp' && c !== 'BC Population')

    let hasSuppressedData = false
    let color = ''

    const COLOR_MAP = {
      'IND': '#234075',
      'DIS': '#70CCDB',
      'VM': '#D2E2EE',
      'WOM': '#E6B345'
    }

    const chartData = categories.sort().map(category => {
      const count = this.props.data.map(row => +parseFloatClean(row[category]))[0]

      if (count === 0) hasSuppressedData = true

      color = COLOR_MAP[this.props.data[0]['Des_Grp']]

      if (category.length > 40) { category = category.replace(/[^A-Z]/g, '') }

      return {
        category,
        count,
        color
      }
    })

    chartData.sort((a, b) => (a.count < b.count ? 1 : (a.count > b.count ? -1 : 0)))

    const formatter = (d) => (d === 0) ? '<3' : formatPercent(d, 1, 100)

    const graph = (
      <PlusPlot.BarChart
        data={chartData}
        xLines={[{
          value: provincialRepresentation,
          label: `BC Pop: ${formatter(provincialRepresentation)}`,
          color: 'black',
          yPosition: -20
        }]}
        options={{
          height: 600,
          dataLabels: { position: 25, formatter },
          margins: { top: 0, left: 250, bottom: 40, right: 40 },
          axes: { yAxisLabel: '', xAxisLabel: '% representation' },
          font: '"myriad-pro", "Myriad Pro"'
        }}
      />
    )

    const legendItems = this.props.data.map((d, i) => {
      const k = d['Des_Grp']
      const label = VARIABLE_MANAGER.displayNameByKey('Des_Grp', k)
      return { label, color }
    })

    const legend = (
      <Legend
        items={legendItems}
        notes={!hasSuppressedData ? null : <span><b>&lt;3</b> indicates that data has been suppressed because the underlying value is less than 3.</span>} />
    )

    return (
      <GraphFrame
        className={`Ministry-${this.props.varKey}`}
        title={`${this.props.masterTitle} — ${this.props.title}`}
        hideFilterNotes
        graph={graph}
        legend={legend}
      />
    )
  }
}

export default withRouter(MinistryGraph)
