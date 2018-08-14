import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import '../App.css'

class Graph extends React.Component {
    state ={
        value: 0,
    }

    handleChange = (event, value) => {
        this.setState({ value });
        event.preventDefault();
    };

    handleChangeIndex = (event, index) => {
        event.preventDefault();
        this.setState({ value: index });
    };

    

    render() {

        const csLineData = {
            labels: [
                '0',
                '5',
                '10',
                '15',
                '20',
                '25',
                '30'
            ],
            datasets: [{
                label: "You",
                data: this.props.userTimelineData.averageCsNumbersAtMinutes,
                maintainAspectRatio: false,
                responsive: true,
                pointBackgroundColor: '#00CC66',
                backgroundColor: '#00CC66',
                fill: false,
            },
            {   
                label: "Opponent",
                data: this.props.userTimelineData.averageOpponentCsNumbersAtMinutes,
                maintainAspectRatio: false,
                responsive: true,
                pointBackgroundColor: '#f50057',
                backgroundColor: '#f50057',
                fill: false,
            }
            ]
        }

        const csLineOptions = {
            title: {
                display: true,
                text: 'Average Lane CS At X Minutes',
            },
            legend: {
                display: true,

            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Minutes'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Creep Score'
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        return tooltipItem[0].xLabel + ' mins';
                    },
                    label: function (tooltipItem, data) {
                        return tooltipItem.yLabel.toFixed(1);
                    }
                }
            }
        }

        const xpLineData = {
            labels: [
                '0',
                '5',
                '10',
                '15',
                '20',
                '25',
                '30'
            ],
            datasets: [{
                label: "You",
                data: this.props.userTimelineData.averageLevelAtMinutes,
                maintainAspectRatio: false,
                responsive: true,
                pointBackgroundColor: '#00CC66',
                backgroundColor: '#00CC66',
                fill: false,
            },
            {
                label: "Opponent",
                data: this.props.userTimelineData.averageOpponentLevelAtMinutes,
                maintainAspectRatio: false,
                responsive: true,
                pointBackgroundColor: '#f50057',
                backgroundColor: '#f50057',
                fill: false,
            }]
        }

        const xpLineOptions = {
            title: {
                display: true,
                text: 'Average Level At X Minutes',
            },
            legend: {
                display: true,

            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Minutes'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Level'
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        return tooltipItem[0].xLabel + ' mins';
                    },
                    label: function (tooltipItem, data) {
                        return tooltipItem.yLabel.toFixed(1);
                    }
                }
            }
        }

        const goldLineData = {
            labels: [
                '0',
                '5',
                '10',
                '15',
                '20',
                '25',
                '30'
            ],
            datasets: [{
                label: "You",
                data: this.props.userTimelineData.averageGoldNumbersAtMinutes,
                maintainAspectRatio: false,
                responsive: true,
                pointBackgroundColor: '#00CC66',
                backgroundColor: '#00CC66',
                fill: false,
            },
            {
                label: "Opponent",
                data: this.props.userTimelineData.averageOpponentGoldNumbersAtMinutes,
                maintainAspectRatio: false,
                responsive: true,
                pointBackgroundColor: '#f50057',
                backgroundColor: '#f50057',
                fill: false,
            }]
        }

        const goldLineOptions = {
            title: {
                display: true,
                text: 'Average Gold Gained At X Minutes',
            },
            legend: {
                display: true,

            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Minutes'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Gold'
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        return tooltipItem[0].xLabel + ' mins';
                    },
                    label: function (tooltipItem, data) {
                        return tooltipItem.yLabel.toFixed(1);
                    }
                }
            }
        }

        const jungleLineData = {
            labels: [
                '0',
                '5',
                '10',
                '15',
                '20',
                '25',
                '30'
            ],
            datasets: [{
                label: "You",
                data: this.props.userTimelineData.averageJungleMinionsAtMinutes,
                maintainAspectRatio: false,
                responsive: true,
                pointBackgroundColor: '#00CC66',
                backgroundColor: '#00CC66',
                fill: false,
            },
            {
                label: "Opponent",
                data: this.props.userTimelineData.averageOpponentJungleMinionsAtMinutes,
                maintainAspectRatio: false,
                responsive: true,
                pointBackgroundColor: '#f50057',
                backgroundColor: '#f50057',
                fill: false,
            }]
        }

        const jungleLineOptions = {
            title: {
                display: true,
                text: 'Average Jungle CS At X Minutes',
            },
            legend: {
                display: true,

            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Minutes'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Jungle Creep Score'
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        return tooltipItem[0].xLabel + ' mins';
                    },
                    label: function (tooltipItem, data) {
                        return tooltipItem.yLabel.toFixed(1);
                    }
                }
            }
        }

        const { value } = this.state;

        function TabContainer(props) {
            return (
                <Typography component="div" style={{ padding: 8 * 3 }}>
                    {props.children}
                </Typography>
            );
        }
        return (
            <div className="graph">
                <AppBar position="static" color="primary">
                    <Tabs value={value} onChange={this.handleChange} fullWidth>
                        <Tab label="CS" />
                        <Tab label="Jungle CS" />
                        <Tab label="Experience"/>
                        <Tab label="Gold"/>
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer><Line data={csLineData} options={csLineOptions} /></TabContainer>
                    <TabContainer><Line data={jungleLineData} options={jungleLineOptions} /></TabContainer>
                    <TabContainer><Line data={xpLineData} options={xpLineOptions} /></TabContainer>
                    <TabContainer><Line data={goldLineData} options={goldLineOptions} /></TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userData,
        userTimelineData: state.userTimelineData
    }
};

export default connect(mapStateToProps)(Graph);
