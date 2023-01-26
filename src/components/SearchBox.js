import React, { useEffect, useState } from 'react'

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search";

const SearchBox = () => {
    const [searchQuery, setSearchQuery] = useState("surat")
    const [locationList, setLocationList] = useState([])
    useEffect(() => {
        handleSeachedApi()

    }, [searchQuery])


    const handleSeachedApi = () => {
        console.log("api call")
        const params = {
            q: searchQuery,
            format: "json",
            addressdetails: 1,
            polygon_geojson: 0,
        };
        const queryString = new URLSearchParams(params).toString()
        fetch(`${NOMINATIM_BASE_URL}?${queryString}`)
            .then(res => res.json())
            .then(json => setLocationList(json))
    }

    console.log(locationList)
    return (
        <div className='input-suggesion-wrap'>
            <input
                type="text"
                className='search-box'
                placeholder='Search Location'
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' ? handleSeachedApi() : null}
            />
            <div className='suggestion-box'>
                {locationList.map(location => {
                    const { display_name } = location
                    return (
                        <div className='row mx-0 px-2 name-wrapper'>
                            <div className='d-flex align-items-center justify-content-center'>
                                <img src="./location.svg" alt="recent" className='' />
                            </div>
                            <div className='location-result-text col'>{display_name}</div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default SearchBox