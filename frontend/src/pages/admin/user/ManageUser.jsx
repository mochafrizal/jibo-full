import React, { useState } from 'react'; // Mengimpor React dan useState untuk mengelola state lokal.
import { useDeleteUserMutation, useGetUserQuery } from '../../../redux/features/auth/authApi'; // Hook RTK Query.
import { MdModeEdit } from 'react-icons/md'; // Ikon edit.
import { useNavigate } from 'react-router-dom'; // Untuk navigasi (meskipun tidak digunakan di sini).
import UpdateUserModal from './UpdateUserModal'; // Mengimpor komponen modal untuk edit user.

const ManageUser = () => {
    const [selectedUser, setSelectedUser] = useState(null); // State untuk menyimpan pengguna yang dipilih.
    const [isModalOpen, setIsModalOpen] = useState(false); // State untuk membuka/menutup modal.
    const { data, error, isLoading, refetch } = useGetUserQuery(); // RTK Query untuk mendapatkan data user.
    const [deleteUser] = useDeleteUserMutation(); // RTK Query untuk fungsi penghapusan user.

    const handleDelete = async (id) => { // Fungsi untuk menghapus user.
        try {
            await deleteUser(id).unwrap(); // Memanggil API dan menunggu hasilnya.
            alert("User deleted successfully"); // Pesan sukses.
            refetch(); // Memuat ulang data.
        } catch (error) {
            console.error("Failed deleting user", error); // Log jika gagal.
        }
    };

    const handleEdit = (user) => { // Fungsi untuk membuka modal edit.
        setIsModalOpen(true); // Membuka modal.
        setSelectedUser(user); // Menyimpan data user yang dipilih.
    };

    const handleCloseModal = () => { // Fungsi untuk menutup modal.
        setIsModalOpen(false); // Menutup modal.
        setSelectedUser(null); // Membersihkan state pengguna.
    };

    if (error) { // Jika terjadi error saat mengambil data.
        return <h2 className="text-2xl font-bold text-center text-red-500">Failed to fetch users: {error?.message}</h2>;
    }

    return (
        <>
            {isLoading && <h2 className="text-2xl font-bold text-center">Loading...</h2>} {/* Tampilkan loading */}
            <section className="py-1 bg-blueGray-50">
                <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">All Users</h3> {/* Judul */}
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            No
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            User Email
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            User Role
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Edit
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data?.users && data.users.map((user, index) => ( // Iterasi data user.
                                            <tr key={index}>
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                                    {index + 1} {/* Nomor urut */}
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {user?.email} {/* Email */}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <span className={`rounded-full px-3 py-2
                                                        ${user?.role === "admin" ? "bg-blue-500 text-white" : "bg-yellow-500 text-white"}`}>
                                                        {user?.role} {/* Role dengan styling */}
                                                    </span>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button
                                                        onClick={() => handleEdit(user)} // Tombol edit.
                                                        className="hover:text-indigo-700">
                                                        <MdModeEdit /> Edit
                                                    </button>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button
                                                        onClick={() => handleDelete(user?._id)} // Tombol delete.
                                                        className="bg-red-500 text-white px-2 py-1 rounded-md">
                                                        DELETE
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            {
                isModalOpen && <UpdateUserModal user={selectedUser} onClose={handleCloseModal} onRoleUpdate={refetch} />
            }
        </>
    );
};

export default ManageUser;
