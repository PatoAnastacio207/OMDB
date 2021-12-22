
// recibe un array de las peliculas que le gustan al user
// recibe un array de todos los users
// crea un array contando cuantas coincidencias hay
// devuelve los 5 usuarios con mas coincidencias

const getCoincidencesId = (likedMovies, users) => {
    console.log("id coin")
    const coincidencesArr = []
    for(let index = 0; index < users.length; index++) {
        
        const arr1 = users[index].favorites
        const arr2 = likedMovies

        let coincidences = 0

        let obj = {}

        for(let i = 0; i < arr1.length; i++) {
            if(!obj[arr1[i]]) {
                const element = arr1[i]
                obj[element] = true
            }
        }

        for(let j = 0; j < arr2.length; j++) {
            if(obj[arr2[j]]) {
                coincidences++
            }
        }

        coincidencesArr.push({ id: users[index].id, coincidences })
    }
    coincidencesArr.sort((a, b) => a.coincidences < b.coincidences ? 1 : -1 )

    return coincidencesArr.splice(0,5)
}

module.exports = { getCoincidencesId }