import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd"

export const setUser = createAsyncThunk("LOGIN", (params) => {
    return axios.post("/api/users/login", params)
        .then((r) => {
            message.success(`Logged in!`)
            return r.data
        })
        .catch(err => message.error(`Wrong credentials`))
})

export const logoutUser = createAsyncThunk("LOGOUT", () => {
    return axios.post("/api/users/logout").then((r) => r.data)
})

export const updateUser = createAsyncThunk("UPDATE", (id) => {
    return axios.get(`/api/users/id/${id}`)
        .then((r) => r.data)
        
})

export const renewUser = createAction("renewUser")

const userReducer = createReducer({} ,{
    [setUser.fulfilled]: (state, action) => action.payload,
    [logoutUser.fulfilled]: (state, action) => action.payload,
    [updateUser.fulfilled]: (state, action) => action.payload,
    [renewUser]: (state, action) => {
        message.success(`Welcome back ${action.payload.username}!`)
        return action.payload
    }
})

export default userReducer