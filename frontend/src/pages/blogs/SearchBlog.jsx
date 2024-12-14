import React, { useState } from 'react'

const SearchBlog = ({ search, handleSearchChange, handleSearch }) => {
    const handlekeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className='w-full flex'>
            <input type="text"
                value={search}
                onChange={handleSearchChange}
                onKeyPress={handlekeyPress}
                placeholder='find your location'
                className='py-2 px-4 mr-5 w-full bg-[#f7f8f9] fokus:outline-none '
            />
            <button
                onClick={handleSearch}
                className='bg-[#1E93BE] px-4 py-2 text-white rounded-md transform hover:bg-blue-600 active:bg-blue-700 hover:scale-95 transition duration-300'>Search</button>
        </div>
    )
}

export default SearchBlog;