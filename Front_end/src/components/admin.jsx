import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import "../css/admin.css";

class Admin extends Component {
    state = {
        pets: [],
        petTypes: [],
        editingPet: null,
        updatedPetName: '',
        updatedPetDescription: '',
        updatedPetType: '',
        addingNewPet: false,
        newPetName: '',
        newPetDescription: '',
        newPetType: '',
    };

    componentDidMount = async () => {
        try {
            const { data: petData } = await axios.get('http://localhost:9000/pet');
            this.setState({ pets: petData });

            const { data: petTypesData } = await axios.get('http://localhost:9000/pet/types');
            this.setState({ petTypes: petTypesData });
        } catch (e) {
            toast.error("Error fetching the data");
        }
    };

    handleDelete = async (petId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this pet?");
        if (!confirmDelete) return;

        try {
            const {data} = await axios.get(`http://localhost:9000/pet/${petId}`);
            const {status: deleteStatus} = await axios.delete(`http://localhost:9000/pet/${petId}`);
            if(deleteStatus === 204)
            {
                this.setState(prevState => ({
                pets: prevState.pets.filter(pet => pet._id !== petId),
                }));
                toast.success("Pet deleted successfully");

                const {status: emailStatus} = await axios.post(`http://localhost:9000/pet/email`, data);
                if(emailStatus === 200)
                {
                    toast.success("Successfully send email to administrator");
                }
            }
            else
            {
                toast.error("Error deleting pet");
            }
            
        } catch (error) {
            toast.error("Error");
        }
    };

    handleEdit = (pet) => {
        this.setState({
            editingPet: pet,
            updatedPetName: pet.petname,
            updatedPetDescription: pet.petdescription,
            updatedPetType: pet.pettype,
        });
    };

    handleUpdate = async () => {
        const { updatedPetName, updatedPetDescription, updatedPetType, editingPet } = this.state;
        const updatedPet = {
            petname: updatedPetName,
            petdescription: updatedPetDescription,
            pettype: updatedPetType,
        };

        try {
            const {status} = await axios.put(`http://localhost:9000/pet/${editingPet._id}`, updatedPet);
            if (status === 204)
            {
                this.setState(prevState => ({
                pets: prevState.pets.map(pet =>
                    pet._id === editingPet._id ? { ...pet, ...updatedPet } : pet
                ),
                    editingPet: null,
                }));
                toast.success("Pet updated successfully");
            }
            else
            {
                toast.error("Error updating pet");
            }
        } catch (error) {
            toast.error("Error updating pet");
        }
    };

    handleAddNewPet = () => {
        this.setState({ addingNewPet: true });
    };

    handleCancelAddNewPet = () => {
        this.setState({
            addingNewPet: false,
            newPetName: '',
            newPetDescription: '',
            newPetType: '',
        });
    };

    handleSaveNewPet = async () => {
        const { newPetName, newPetDescription, newPetType } = this.state;

        if (!newPetName || !newPetDescription || !newPetType) {
            toast.error("Please fill in all fields");
            return;
        }

        const newPet = {
            petname: newPetName,
            petdescription: newPetDescription,
            pettype: newPetType,
        };

        try {
            const { data, status } = await axios.post('http://localhost:9000/pet', newPet);
            if(status === 201)
            {
                this.setState(prevState => ({
                pets: [...prevState.pets, data],
                    addingNewPet: false,
                    newPetName: '',
                    newPetDescription: '',
                    newPetType: '',
                }));
                toast.success("New pet added successfully");
            }
            else
            {
                toast.error("Error adding new pet");
            }
        } catch (error) {
            toast.error("Error adding new pet");
        }
    };

    render() {
        const { pets, petTypes, updatedPetName, updatedPetDescription, updatedPetType, editingPet, addingNewPet, newPetName, newPetDescription, newPetType } = this.state;

        return (
            <div className="admin-container">
                <div className="admin-header">
                    <h2>Pet List</h2>
                    <div className="admin-actions">
                        <button onClick={this.handleAddNewPet} className="add-new-pet-btn">
                            <i className="bi bi-plus-circle-fill me-2"></i>
                            Add New Pet
                        </button>
                        <Link to="/chart" className="btn btn-primary">
                            <i className="bi bi-bar-chart-fill me-2"></i>
                            View Statistics
                        </Link>
                    </div>
                </div>

                {addingNewPet && (
                    <div className="add-new-pet-form">
                        <h3>Add New Pet</h3>
                        <div className="form-group">
                            <label>Pet Name</label>
                            <input
                                type="text"
                                value={newPetName}
                                onChange={(e) => this.setState({ newPetName: e.target.value })}
                                placeholder="Pet Name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                value={newPetDescription}
                                onChange={(e) => this.setState({ newPetDescription: e.target.value })}
                                placeholder="Description"
                            />
                        </div>
                        <div className="form-group">
                            <label>Pet Type</label>
                            <select
                                value={newPetType}
                                onChange={(e) => this.setState({ newPetType: e.target.value })}
                            >
                                <option value="">Select Pet Type</option>
                                {petTypes.map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-actions">
                            <button onClick={this.handleSaveNewPet}>Save</button>
                            <button onClick={this.handleCancelAddNewPet}>Cancel</button>
                        </div>
                    </div>
                )}

                {pets.length > 0 ? (
                    <table className="tbl_style">
                        <thead>
                            <tr>
                                <th>Pet Name</th>
                                <th>Description</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pets.map((pet) => (
                                <tr key={pet._id}>
                                    <td>{pet.petname}</td>
                                    <td>{pet.petdescription}</td>
                                    <td>{pet.pettype}</td>
                                    <td>
                                        <button onClick={() => this.handleEdit(pet)} className="edit-btn">Edit</button>
                                        <button onClick={() => this.handleDelete(pet._id)} className="delete-btn">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data available</p>
                )}

                {editingPet && (
                    <div className="edit-form">
                        <h3>Edit Pet</h3>
                        <div className="form-group">
                            <label>Pet Name</label>
                            <input
                                type="text"
                                value={updatedPetName}
                                onChange={(e) => this.setState({ updatedPetName: e.target.value })}
                                placeholder="Pet Name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                value={updatedPetDescription}
                                onChange={(e) => this.setState({ updatedPetDescription: e.target.value })}
                                placeholder="Description"
                            />
                        </div>
                        <div className="form-group">
                            <label>Pet Type</label>
                            <select
                                value={updatedPetType}
                                disabled
                            >
                                {petTypes.map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-actions">
                            <button onClick={this.handleUpdate}>Update Pet</button>
                            <button onClick={() => this.setState({ editingPet: null })}>Cancel</button>
                        </div>
                    </div>
                )}

                <ToastContainer />
            </div>
        );
    }
}

export default Admin;