import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import "../css/plist.css";
import config from '../config';

class PList extends Component {
    state = {
        pets: [],
        filteredPets: [],
        filterType: '',
        petTypes: []
    };

    componentDidMount = async () => {
        try {
            const { data: petData } = await axios.get(`${config.apiUrl}/pet`);
            this.setState({ pets: petData, filteredPets: petData });

            const { data: petTypesData } = await axios.get(`${config.apiUrl}/pet/types`);
            this.setState({ petTypes: petTypesData });
        } catch (e) {
            toast.error("Error fetching the data");
        }
    };

    filterPetsByType = (type) => {
        this.setState({ filterType: type }, () => {
            const { pets, filterType } = this.state;
            const filtered = filterType ? pets.filter(pet => pet.pettype === filterType) : pets;
            this.setState({ filteredPets: filtered });
        });
    };

    render() {
        const { filteredPets, filterType, petTypes } = this.state;

        return (
            <div className="container mt-5">
                <h2 className="text-center mb-4">Pet List</h2>

                <div className="form-group mb-4">
                    <label htmlFor="petType" className="form-label">Filter by Pet Type</label>
                    <select
                        id="petType"
                        value={filterType}
                        onChange={(e) => this.filterPetsByType(e.target.value)}
                        className="form-select"
                    >
                        <option value="">All</option>
                        {petTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {filteredPets.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="table-light">
                                <tr>
                                    <th>Pet Name</th>
                                    <th>Description</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPets.map((pet) => (
                                    <tr key={pet._id}>
                                        <td>{pet.petname}</td>
                                        <td>{pet.petdescription}</td>
                                        <td>{pet.pettype}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No data available</p>
                )}

                <ToastContainer />
            </div>
        );
    }
}

export default PList;