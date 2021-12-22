import useInput from "../hooks/useInput"
import { useEffect, useState } from "react"
import { TextField, Box, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

function SearchBar ({ setValue, manageSubmit, filter = null, setLoading }) {
    const searchInput = useInput("")
    const [firstRender, setFirstRender] = useState(true)
    const handleSubmit = (e) => {
        setLoading(true)
        e?.preventDefault()
        manageSubmit(searchInput, filter)
            .then(({ data }) => {
                setValue(data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        if (!firstRender) {
            handleSubmit()
        } else setFirstRender(false)
    }, [filter])
    return (
        <Box component="form" onSubmit={handleSubmit} display="flex" justifyContent="space-around">
            <Box>
                <TextField
                id="search-query"
                label="Search"
                variant="standard"
                sx={{width: "40vw", marginBottom: "20px"}}
                {...searchInput}
                />
                <Button variant="text" color="primary" onClick={handleSubmit}>
                    <SearchIcon />
                </ Button>
            </Box>
        </Box>
    )
}

export default SearchBar