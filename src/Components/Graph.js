import React from 'react';
import { connect } from 'react-redux';
import { Pie, Line } from 'react-chartjs-2';


class Graph extends React.Component {
    
    
    render() {
        const pieData = {
            labels: [
                'Physical',
                'Magic',
                'True'
            ],
            datasets: [{
                data: [
                    this.props.userData.averagePhysicalDamageDealtToChampions,
                    this.props.userData.averageMagicDamageDealtToChampions,
                    this.props.userData.averageTrueDamageDealtToChampions
                ],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ], 
                maintainAspectRatio: false,
                responsive: true,
            }]
        };

        const pieOptions = {
            title: {
                display: true,
                text: 'Average Percentage Of Damage Types',
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        return data['labels'][tooltipItem[0]['index']];
                    },
                    label: function (tooltipItem, data) {
                        return data['datasets'][0]['data'][tooltipItem['index']];
                    },
                    afterLabel: function (tooltipItem, data) {
                        var dataset = data['datasets'][0];
                        var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
                        return '(' + percent + '%)';
                    }
                }
            }
        }

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
                data: this.props.userTimelineData.averageCsNumbersAtMinutes, 
                maintainAspectRatio: false,
                responsive: true,
                pointBackgroundColor: 'red',
                backgroundColor: '#DA6678',
            }]
        }

        const csLineOptions = {
            title: {
                display: true,
                text: 'Average CS At X Minutes',
            },
            legend: {
                display: false,

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
                data: this.props.userTimelineData.averageLevelAtMinutes,
                maintainAspectRatio: false,
                responsive: true,
                pointBackgroundColor: 'blue',
                backgroundColor: '#8AB0CD',
            }]
        }

        const xpLineOptions = {
            title: {
                display: true,
                text: 'Average Level At X Minutes',
            },
            legend: {
                display: false,

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
                data: this.props.userTimelineData.averageGoldNumbersAtMinutes,
                maintainAspectRatio: false,
                responsive: true,
                pointBackgroundColor: 'green',
                backgroundColor: '#66B266',
            }]
        }

        const goldLineOptions = {
            title: {
                display: true,
                text: 'Average Gold Gained At X Minutes',
            },
            legend: {
                display: false,

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
                data: this.props.userTimelineData.averageJungleMinionsAtMinutes,
                maintainAspectRatio: false,
                responsive: true,
                pointBackgroundColor: 'purple',
                backgroundColor: '#B266B2',
            }]
        }

        const jungleLineOptions = {
            title: {
                display: true,
                text: 'Average Jungle CS At X Minutes',
            },
            legend: {
                display: false,

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

        return (
            <div>
                <div className="col-3">
                    <Pie data={pieData} options={pieOptions} />
                    <Line data={csLineData} options={csLineOptions} />
                    <Line data={jungleLineData} options={jungleLineOptions} />
                </div>
                <div className="col-3">
                    <Line data={xpLineData} options={xpLineOptions} />
                    <Line data={goldLineData} options={goldLineOptions} />
                </div>
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
