import UserCard from "../components/UserCard"
import Grid from '@mui/material/Grid'


function UserGrid ({ users }) {
    return (
        <Grid container spacing={0} justifyContent="space-evenly">{
                users.map((user, index) => <UserCard key={index} index={index} user={user}/>)
        }</Grid>
    )
}

export default UserGrid