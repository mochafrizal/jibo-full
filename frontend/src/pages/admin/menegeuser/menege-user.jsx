import React, { useState } from 'react';
import { useGetUsersQuery, useGetAdminsQuery, useUpdateUserMutation, useUpdateAdminMutation, useDeleteUserMutation, useDeleteAdminMutation } from '../../../redux/features/auth/authApi';

const ManageUsers = () => {
    const [editMode, setEditMode] = useState({ id: null, type: null });
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [selectedType, setSelectedType] = useState('user');

    const { data: usersData, isLoading: usersLoading, refetch: refetchUsers } = useGetUsersQuery();
    const { data: adminsData, isLoading: adminsLoading, refetch } = useGetAdminsQuery();
    const [updateUser] = useUpdateUserMutation();
    const [updateAdmin] = useUpdateAdminMutation();
    const [deleteUser] = useDeleteUserMutation();
    const [deleteAdmin] = useDeleteAdminMutation();

    const handleEdit = (item, type) => {
        setEditMode({ id: item._id, type });
        setFormData({ name: item.name || '', email: item.email || '', password: '' });
    };

    const handleUpdate = async () => {
        try {
            const updateData = { id: editMode.id, ...formData };
            if (!formData.password) delete updateData.password;

            if (editMode.type === 'user') {
                await updateUser(updateData).unwrap(),
                    alert('User updated successfully');
                refetchUsers();
            } else if (editMode.type === 'admin') {
                await updateAdmin(updateData).unwrap(),
                    alert('Admin updated successfully');
                refetch();
            }

            setEditMode({ id: null, type: null });
            setFormData({ name: '', email: '', password: '' });
            refetch()
        } catch (error) {
            console.error('Update failed:', error.data?.message || error.message);
            setMessage('Failed to update user');
        }
    };

    const handleDelete = async (id, type) => {
        if (window.confirm('Are you sure you want to delete this account?')) {
            try {
                if (type === 'user') {
                    await deleteUser(id).unwrap(),
                        alert('deleted user successfully');
                    refetchUsers();
                } else if (type === 'admin') {
                    await deleteAdmin(id).unwrap();
                    alert('deleted user successfully');
                }
                refetch();
            } catch (error) {
                console.error('Delete failed:', error.data?.message || error.message);
                setMessage('Failed to delete user');
            }
        }
    };

    const renderTable = (data, type) => (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">{type === 'user' ? 'Users' : 'Admins'}</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 border-b text-left">Name</th>
                            <th className="px-6 py-3 border-b text-left">Email</th>
                            <th className="px-6 py-3 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 border-b">
                                    {editMode.id === item._id ? (
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                                        />
                                    ) : (
                                        item.name
                                    )}
                                </td>
                                <td className="px-6 py-4 border-b">
                                    {editMode.id === item._id ? (
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                                        />
                                    ) : (
                                        item.email
                                    )}
                                </td>
                                <td className="px-6 py-4 border-b">
                                    {editMode.id === item._id ? (
                                        <>
                                            <input
                                                type="password"
                                                placeholder="New password (optional)"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 mb-2"
                                            />
                                            <button
                                                onClick={handleUpdate}
                                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mr-2"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditMode({ id: null, type: null })}
                                                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleEdit(item, type)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id, type)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    if (usersLoading || adminsLoading) {
        return <div className="text-center p-8">Loading products...</div>;
    }

    return (
        <div className="bg-white p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Manage Users and Admins</h2>
            </div>

            {message && <p className="text-red-500 mb-4">{message}</p>}

            <div className="mb-4">
                <button
                    onClick={() => setSelectedType('user')}
                    className={`px-4 py-2 rounded ${selectedType === 'user' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300'}`}
                >
                    Show Users
                </button>
                <button
                    onClick={() => setSelectedType('admin')}
                    className={`ml-4 px-4 py-2 rounded ${selectedType === 'admin' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300'}`}
                >
                    Show Admins
                </button>
            </div>

            {selectedType === 'user' && renderTable(usersData?.users, 'user')}
            {selectedType === 'admin' && renderTable(adminsData?.admins, 'admin')}
        </div>
    );
};

export default ManageUsers;