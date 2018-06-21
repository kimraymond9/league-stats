import React from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';


class Graph extends React.Component {
    
    
    render() {

        const data = {
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
            }]
        };

        const options = {
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Average Percentage Of Damage Types',
            },
        }

        if (!this.props.userData) {
            return null;
        }
        return (
            <div>
                <Pie data={data} options={options} width={300} height={300} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userData
    }
};

export default connect(mapStateToProps)(Graph);
