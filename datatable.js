import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button, Modal, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';

const DataTable = () => {
    const [cars, setCars] = useState([
        { id: 1, make: 'Toyota', model: 'Camry', year: 2020, price: 25000 },
        { id: 2, make: 'Honda', model: 'Civic', year: 2019, price: 22000 },
        { id: 3, make: 'Ford', model: 'Mustang', year: 2021, price: 35000 }
    ]);

    const { register, handleSubmit, reset } = useForm();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editCarId, setEditCarId] = useState(null);

    const handleCreate = (data) => {
        const newCar = {
            id: cars.length + 1,
            make: data.make,
            model: data.model,
            year: parseInt(data.year),
            price: parseFloat(data.price)
        };
        setCars([...cars, newCar]);
        setShowCreateModal(false);
        reset();
    };

    const handleEdit = (data) => {
        const updatedCars = cars.map(car => {
            if (car.id === editCarId) {
                return {
                    ...car,
                    make: data.make,
                    model: data.model,
                    year: parseInt(data.year),
                    price: parseFloat(data.price)
                };
            }
            return car;
        });
        setCars(updatedCars);
        setShowEditModal(false);
        reset();
    };

    const handleDelete = (id) => {
        const filteredCars = cars.filter(car => car.id !== id);
        setCars(filteredCars);
    };

    const handleOpenEditModal = (id) => {
        setEditCarId(id);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditCarId(null);
        reset();
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
        reset();
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => setShowCreateModal(true)}>
                Add Car
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Make</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Price ($)</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cars.map(car => (
                            <TableRow key={car.id}>
                                <TableCell>{car.id}</TableCell>
                                <TableCell>{car.make}</TableCell>
                                <TableCell>{car.model}</TableCell>
                                <TableCell>{car.year}</TableCell>
                                <TableCell>{car.price}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => handleOpenEditModal(car.id)}>Edit</Button>
                                    <Button color="secondary" onClick={() => handleDelete(car.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Create Car Modal */}
            <Modal open={showCreateModal} onClose={handleCloseCreateModal}>
                <div className="modal">
                    <h2>Create Car</h2>
                    <form onSubmit={handleSubmit(handleCreate)}>
                        <TextField label="Make" {...register("make", { required: true })} />
                        <br />
                        <TextField label="Model" {...register("model", { required: true })} />
                        <br />
                        <TextField label="Year" type="number" {...register("year", { required: true })} />
                        <br />
                        <TextField label="Price ($)" type="number" step="0.01" {...register("price", { required: true })} />
                        <br />
                        <Button type="submit" variant="contained" color="primary">Create</Button>
                    </form>
                </div>
            </Modal>

            {/* Edit Car Modal */}
            <Modal open={showEditModal} onClose={handleCloseEditModal}>
                <div className="modal">
                    <h2>Edit Car</h2>
                    <form onSubmit={handleSubmit(handleEdit)}>
                        <TextField label="Make" defaultValue={editCarId && cars.find(car => car.id === editCarId)?.make} {...register("make", { required: true })} />
                        <br />
                        <TextField label="Model" defaultValue={editCarId && cars.find(car => car.id === editCarId)?.model} {...register("model", { required: true })} />
                        <br />
                        <TextField label="Year" type="number" defaultValue={editCarId && cars.find(car => car.id === editCarId)?.year} {...register("year", { required: true })} />
                        <br />
                        <TextField label="Price ($)" type="number" step="0.01" defaultValue={editCarId && cars.find(car => car.id === editCarId)?.price} {...register("price", { required: true })} />
                        <br />
                        <Button type="submit" variant="contained" color="primary">Save</Button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default DataTable;
