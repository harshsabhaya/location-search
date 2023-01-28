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
            limit: 50
        };
        const queryString = new URLSearchParams(params).toString()
        fetch(`${NOMINATIM_BASE_URL}?${queryString}`)
            .then(res => res.json())
            .then(json => {
                // Show only "administrative" type location
                const administrativeResult =
                    json?.length > 0
                        ? json.filter(loc => loc.type === "administrative")
                        : []
                setLocationList(administrativeResult)
            })
    }

    const handleSelectedLocation = (location) => () => {
        setSelectedPosition(location)

    }

    return (
        <div className='input-suggesion-wrap'>
            <input
                type="text"
                className='search-box'
                placeholder='Search Location'
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' ? handleSeachedApi() : null}
                onFocus={() => setFocus(true)}
                onBlur={() => setTimeout(() => setFocus(false), 100)}
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