import React, { useEffect, useState } from 'react'

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search";

const SearchBox = ({ setSelectedPosition }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [locationList, setLocationList] = useState([])
    const [focus, setFocus] = useState(false)
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

    const handleSelectedLocation = (location) => () => {
        setSelectedPosition(location)
        setLocationList([])
    }

    console.log(focus)
    return (
        <div className='input-suggesion-wrap'>
            <input
                type="text"
                className='search-box'
                placeholder='Search Location'
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' ? handleSeachedApi() : null}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
            {locationList?.length > 0 && focus && <div className='suggestion-box'>
                {locationList.map(location => {
                    const { display_name, place_id } = location
                    return (
                        <div key={place_id} className='row mx-0 px-2 name-wrapper' onClick={handleSelectedLocation(location)}>
                            <div className='d-flex align-items-center justify-content-center'>
                                <img src="./location.svg" alt="recent" className='' />
                            </div>
                            <div className='location-result-text col'>{display_name}</div>
                        </div>
                    )
                })}
            </div>}

        </div>
    )
}

export default SearchBox