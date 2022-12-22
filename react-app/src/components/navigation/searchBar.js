import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as videoActions from '../../store/video'
import search from './search.png'
const SearchBar = () => {
    const dispatch = useDispatch()

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const videos = useSelector(state=> Object.values(state.video.allVideos))

    useEffect(()=> {
        dispatch(videoActions.fetchAllVideos())
    }, [])

    return (
        <div className='search-wrapper'>
         <div>
            <input
            name='search'
            type='text'
            placeholder='search'
            className='searchInputs'
            />
        </div>
        <div className='search-button'>
            <img id='search-icon' src={search}></img>
        </div>
        </div>
    )
}


export default SearchBar
