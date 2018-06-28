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
                    this.props.userData.averagePercentageOfPhysicalDamage,
                    this.props.userData.averagePercentageOfMagicDamage,
                    this.props.userData.averagePercentageOfTrueDamage
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
                fill: false, 
            }]
        }

        const csLineOptions = {
            title: {
                display: true,
                text: 'CS At X Minutes',
            },
            legend: {
                display: false,

            },
            tooltips: {
                mode: 'index',
                intersect: false,
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
                data: this.props.userTimelineData.averageXpNumbersAtMinutes,
                maintainAspectRatio: false,
                responsive: true,
                pointBackgroundColor: 'blue',
                fill: false,
            }]
        }

        const xpLineOptions = {
            title: {
                display: true,
                text: 'Experience Numbers At X Minutes',
            },
            legend: {
                display: false,

            },
            tooltips: {
                mode: 'index',
                intersect: false,
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
                        labelString: 'Experience'
                    }
                }]
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
                fill: false,
            }]
        }

        const goldLineOptions = {
            title: {
                display: true,
                text: 'Gold Gained At X Minutes',
            },
            legend: {
                display: false,

            },
            tooltips: {
                mode: 'index',
                intersect: false,
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
                pointBackgroundColor: 'yellow',
                fill: false,
            }]
        }

        const jungleLineOptions = {
            title: {
                display: true,
                text: 'Jungle CS At X Minutes',
            },
            legend: {
                display: false,

            },
            tooltips: {
                mode: 'index',
                intersect: false,
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
            }
        }

        return (
            <div>
                <div class="col-3">
                    <Pie data={pieData} options={pieOptions} />
                    <Line data={csLineData} options={csLineOptions} />
                    <Line data={jungleLineData} options={jungleLineOptions} />
                </div>
                <div class="col-3">
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
