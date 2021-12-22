import axios from "axios"
import { useEffect, useState } from "react"
import UserGrid from "../containers/UserGrid"
import Loading from "./Loading"

function ActiveUsers () {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        axios.get("/api/users/active")
            .then(({data}) => setUsers(data))
            .then(() => setLoading(false))
    }, [])
    return (
        <div>
            <p><b>Most active users!</b></p>
            {loading ? <Loading /> : null}
            <UserGrid users={users} />
        </div>
    )
}

export default ActiveUsers