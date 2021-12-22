import { useState } from "react";
import { message as notification } from "antd"

function useInput (initialState, validator = () => [true, ""]) {
    const [value, setValue] = useState(initialState)
    const onChange = (e) => {
        const [validation, message] = validator(e.target.value)
        if(validation) setValue(e.target.value)
        else notification.warning(message)
    }

    return { value, onChange }
}

export default useInput