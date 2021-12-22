import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormHelperText from '@mui/material/FormHelperText'
import Radio from '@mui/material/Radio'



function MovieFilters ({ setFilter}) {
    const handleChange = (e) => {
        setFilter(e.target.value)
    }
    return (
        <>
            <FormControl component="fieldset">
            <FormLabel component="legend">Filter</FormLabel>
            <RadioGroup
                aria-label="filter"
                defaultValue="all"
                name="radio-buttons-group"
            >
                <FormControlLabel onChange={handleChange} value="all" control={<Radio />} label="All" />
                <FormControlLabel onChange={handleChange} value="movie" control={<Radio />} label="Movies" />
                <FormControlLabel onChange={handleChange} value="series" control={<Radio />} label="Series" />
                <FormControlLabel onChange={handleChange} value="episode" control={<Radio />} label="Episodes" />
            </RadioGroup>
            </FormControl>
        </>
    )
}

export default MovieFilters