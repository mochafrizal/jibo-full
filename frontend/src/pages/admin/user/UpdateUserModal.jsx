import React, { useState, useEffect } from 'react'; // Mengimpor React dan hook.
// import { useUpdateUserRoleMutation } from '../../../redux/features/auth/authApi'; // Hook RTK Query.

const UpdateUserModal = ({ user, onClose, onRoleUpdate }) => {
    const [role, setRole] = useState(user?.role); // State untuk menyimpan role.
    const [errorMessage, setErrorMessage] = useState(""); // State untuk pesan error.
    // const [updateUserRole] = useUpdateUserRoleMutation(); // Fungsi RTK Query untuk update role.

    useEffect(() => { // Memastikan state role selalu sinkron dengan data user.
        if (user?.role) {
            setRole(user.role);
        }
    }, [user]);

    const handleUpdateRole = async () => { // Fungsi untuk menyimpan perubahan role.
        try {
            await updateUserRole({ userId: user?._id, role }).unwrap(); // Memanggil API dan menunggu hasilnya.
            alert("Role updated successfully"); // Pesan sukses.
            onRoleUpdate(); // Refetch data.
            onClose(); // Tutup modal.
        } catch (error) {
            console.error("Failed to update user role", error); // Log error.
            setErrorMessage("Failed to update role. Please try again."); // Tampilkan pesan error.
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg w-1/3">
                <h2 className="text-xl mb-4">Edit User</h2>
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>} {/* Tampilkan error */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="text"
                        value={user?.email}
                        readOnly
                        className="mt-1 w-full bg-gray-100 block shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-5 focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value.toLowerCase())} // Selalu gunakan lowercase.
                        className="mt-1 py-2 w-full bg-gray-100 block shadow-sm sm:text-sm border-gray-300 rounded-md px-5 focus:outline-none"
                    >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600">
                        Cancel
                    </button>
                    <button onClick={handleUpdateRole} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserModal;
