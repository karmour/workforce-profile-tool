import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'

import { displayNameByKey } from '../Variables/VariableList'

import { formatPercent, parseFloatClean } from '../Services/formatter'

import './Table.css'

class ComparisonTable extends Component {
  render () {
    const columns = [
      {
        id: 'Des_Grp',
        name: 'Designated Group',
        accessor: d => displayNameByKey('Des_Grp', d['Des_Grp'])
      },
      {
        id: 'BCPS',
        name: 'BC Public Service, %',
        accessor: d => parseFloatClean(d['BCPS']),
        displayAccessor: d => d['BCPS'],
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'Available_Workforce',
        name: 'Available Workforce, %',
        accessor: d => parseFloatClean(d['Available_Workforce']),
        displayAccessor: d => d['Available_Workforce'],
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'Employees_BC_Population',
        name: 'BC Population, %',
        accessor: d => parseFloatClean(d['Employees_BC_Population']),
        displayAccessor: d => d['Employees_BC_Population'],
        cellClass: 'text-right',
        headerClass: 'text-right'
      }
    ]

    const rowFilter = (r) => true

    return (
      <div className='Table row'>
        <div className='col'>
          { this.props.data &&
            <div>
              <Reactor.Table
                columns={columns}
                rows={this.props.data}
                rowFilter={rowFilter}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default ComparisonTable