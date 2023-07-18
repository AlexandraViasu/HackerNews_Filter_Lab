import React from 'react';



const NewsFilter = ({filterValue, setFilterCallback}) => {
    const handleChange = (event) => {
        setFilterCallback(event.target.value);
    }
    return (
        <input type='text' onChange={handleChange} value={filterValue}/>
    )
}

export default NewsFilter;