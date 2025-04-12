import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';  // Added this import
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import "../css/chart.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

class Chart extends Component {
    state = {
        loading: true,
        chartData: {
            labels: [],
            datasets: [{
                label: 'Number of Pets',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        }
    };

    componentDidMount = async () => {
        try {
            const { data: petTypeCounts } = await axios.get('http://localhost:9000/pet/types/count');

            const labels = petTypeCounts.map(item => item.pettype);
            const data = petTypeCounts.map(item => item.count);

            this.setState({
                loading: false,
                chartData: {
                    labels: labels,
                    datasets: [{
                        label: 'Number of Pets',
                        data: data,
                        backgroundColor: labels.map((_, i) =>
                            `hsl(${i * 360 / labels.length}, 70%, 50%)`),
                        borderColor: labels.map((_, i) =>
                            `hsl(${i * 360 / labels.length}, 70%, 30%)`),
                        borderWidth: 1
                    }]
                }
            });
        } catch (e) {
            toast.error("Error fetching chart data");
            this.setState({ loading: false });
        }
    };

    render() {
        const { loading, chartData } = this.state;

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Pet types distribution',
                    font: {
                        size: 20
                    }
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        precision: 0
                    }
                }
            }
        };

        return (
            <div className="chart-container">
                <div className="chart-header">
                    <h2 className="chart-title">Reports</h2>
                    <Link to="/admin" className="admin-nav-btn">
                        <i className="bi bi-gear-fill me-2"></i>
                        Admin
                    </Link>
                </div>

                {loading ? (
                    <div className="chart-loading">
                        <div className="chart-spinner" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="chart-card">
                        <div className="chart-card-body">
                            <div className="chart-wrapper">
                                <Bar data={chartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                )}

                <ToastContainer />
            </div>
        );
    }
}

export default Chart;