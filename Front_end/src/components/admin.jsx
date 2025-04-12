import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        // Confirmation before deleting
        const confirmDelete = window.confirm("Are you sure you want to delete this pet?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:9000/pet/${petId}`);
            // Remove the deleted pet from state
            this.setState(prevState => ({
                pets: prevState.pets.filter(pet => pet._id !== petId),
            }));
            toast.success("Pet deleted successfully");
        } catch (error) {
            toast.error("Error deleting pet");
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
            await axios.put(`http://localhost:9000/pet/${editingPet._id}`, updatedPet);
            // Update the pets state with the updated pet data
            this.setState(prevState => ({
                pets: prevState.pets.map(pet =>
                    pet._id === editingPet._id ? { ...pet, ...updatedPet } : pet
                ),
                editingPet: null, // Close the edit form after updating
            }));
            toast.success("Pet updated successfully");
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
            const { data } = await axios.post('http://localhost:9000/pet', newPet);
            console.log(data);
            // Add the new pet to the pets state
            this.setState(prevState => ({
                pets: [...prevState.pets, data], // Ensure the new pet is added to the list
                addingNewPet: false,
                newPetName: '',
                newPetDescription: '',
                newPetType: '',
            }));
            toast.success("New pet added successfully");
        } catch (error) {
            toast.error("Error adding new pet");
        }
    };

    render() {
        const { pets, petTypes, updatedPetName, updatedPetDescription, updatedPetType, editingPet, addingNewPet, newPetName, newPetDescription, newPetType } = this.state;

        return (
            <div className="admin-container">
                <h2>Pet List</h2>

                <button onClick={this.handleAddNewPet} className="add-new-pet-btn">
                    Add New Pet
                </button>

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
                                <th>Actions</th> {/* Column for Edit and Delete */}
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
                                disabled // Disable the dropdown
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