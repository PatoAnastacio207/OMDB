class Validators {
    static onlyTextAndNumbers (text) {
        const regex = /^[a-z0-9\s*]+$/i
        return [text !== "" ? regex.test(text) : true, "Only text and numbers"]
    }
}

export default Validators