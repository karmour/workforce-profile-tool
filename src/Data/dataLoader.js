import * as d3 from 'd3'
// import FlowReport from './FlowReport'

const DATA_PATH_BASE = 'data/2015/'

class DataLoader {
  static async loadTextAsArray (url) {
    const response = await window.fetch(url)
    const text = await response.text()
    const array = text.split('\n')
    return array
  }

  static async loadCSV (url) {
    return d3.csv(url)
  }

  static async getFlowReport () {
    const url = `${DATA_PATH_BASE}WP2015_Flow-1.csv`
    return DataLoader.loadCSV(url)
  }

  static async getOccupationRegionReport () {
    const url = `${DATA_PATH_BASE}WP2015_Rep_Occ_Rgn-1.csv`
    return DataLoader.loadCSV(url)
  }

  static async loadAllData () {
    const orReport = await DataLoader.getOccupationRegionReport()
    const flowReport = await DataLoader.getFlowReport()
    return {
      orReport,
      flowReport
    }
  }
}

export default DataLoader
