import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';

class Graph extends React.Component {


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
            <div className="uk-padding-large uk-padding-remove-bottom uk-margin-bottom">
                <div data-uk-slider>
                    <div className="uk-position-relative">
                        <div className="uk-slider-container">
                            <ul className="uk-slider-items uk-child-width-1-1">
                                <li data-uk-slider-item="0"><Line data={csLineData} options={csLineOptions} /></li>
                                <li data-uk-slider-item="1"><Line data={jungleLineData} options={jungleLineOptions} /></li>
                                <li data-uk-slider-item="2"><Line data={xpLineData} options={xpLineOptions} /></li>
                                <li data-uk-slider-item="3"><Line data={goldLineData} options={goldLineOptions} /></li>
                            </ul>
                        </div>
                        <a className="uk-position-center-left-out" uk-icon="icon: chevron-left; ratio: 2" href="#" data-uk-slider-item="previous"></a>
                        <a className="uk-position-center-right-out" uk-icon="icon: chevron-right; ratio: 2" href="#" data-uk-slider-item="next"></a>
                    </div>
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
