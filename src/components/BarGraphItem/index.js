import {XAxis, Tooltip, BarChart, Bar} from 'recharts'
import './index.css'

const BarGraphItem = props => {
  const {timelineData, activeCard} = props
  const last10DaysData = timelineData.slice(-10)
  const renderConfirmedView = () => (
    <div className="bargraph-container">
      <BarChart width={1300} height={450} data={last10DaysData}>
        <XAxis
          dataKey="date"
          tick={{fill: '#9A0E31'}}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{backgroundColor: '#222222', color: '#ffffff'}}
          labelStyle={{color: '#ffffff'}}
        />
        <Bar
          dataKey="confirmed"
          fill="#9A0E31"
          barSize={50}
          className="bar"
          label={{
            position: 'top',
            fill: '#9A0E31',
            formatter: value =>
              value >= 100000 ? `${value / 100000}L` : `${value / 1000}K`,
          }}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </div>
  )

  const renderActiveView = () => (
    <div className="bargraph-container">
      <BarChart width={1300} height={450} data={last10DaysData}>
        <XAxis
          dataKey="date"
          tick={{fill: '#0A4FA0'}}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{backgroundColor: '#222222', color: '#ffffff'}}
          labelStyle={{color: '#ffffff'}}
        />
        <Bar
          dataKey="active"
          fill="#0A4FA0"
          barSize={50}
          className="bar"
          label={{
            position: 'top',
            fill: '#0A4FA0',
            formatter: value =>
              value >= 100000 ? `${value / 100000}L` : `${value / 1000}K`,
          }}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </div>
  )

  const renderRecoveredView = () => (
    <div className="bargraph-container">
      <BarChart width={1300} height={450} data={last10DaysData}>
        <XAxis
          dataKey="date"
          tick={{fill: '#216837'}}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{backgroundColor: '#222222', color: '#ffffff'}}
          labelStyle={{color: '#ffffff'}}
        />
        <Bar
          dataKey="recovered"
          fill="#216837"
          barSize={50}
          className="bar"
          label={{
            position: 'top',
            fill: '#216837',
            formatter: value =>
              value >= 100000 ? `${value / 100000}L` : `${value / 1000}K`,
          }}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </div>
  )

  const renderDeceasedView = () => (
    <div className="bargraph-container">
      <BarChart width={1300} height={450} data={last10DaysData}>
        <XAxis
          dataKey="date"
          tick={{fill: '#474C57'}}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{backgroundColor: '#222222', color: '#ffffff'}}
          labelStyle={{color: '#ffffff'}}
        />
        <Bar
          dataKey="deceased"
          fill="#474C57"
          barSize={50}
          className="bar"
          label={{
            position: 'top',
            fill: '#474C57',
            formatter: value =>
              value >= 100000 ? `${value / 100000}L` : `${value / 1000}K`,
          }}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </div>
  )

  const renderDifferentViews = () => {
    switch (activeCard) {
      case 'CONFIRMED':
        return renderConfirmedView()
      case 'ACTIVE':
        return renderActiveView()
      case 'RECOVERED':
        return renderRecoveredView()
      case 'DECEASED':
        return renderDeceasedView()
      default:
        return null
    }
  }
  return <div>{renderDifferentViews()}</div>
}
export default BarGraphItem
