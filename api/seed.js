const axios = require("axios")
const { User, Movie, MovieComment } = require("./models/index")

const users = [
    {
        email: "patito@mail.com",
        username: "patito",
        password: "patito",
        imgUrl: "data:image/jpeg;base64,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"
,       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie at ipsum at rutrum. Maecenas purus ante, rutrum ut augue interdum, hendrerit dapibus massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras elementum erat at mi sollicitudin, quis hendrerit arcu interdum. Curabitur et augue at velit malesuada tempus. Mauris neque dolor, pellentesque a dolor a, pretium ornare elit. Phasellus tempor, eros ac semper varius, magna leo ultrices risus, sit amet vestibulum urna velit nec ante. Morbi ac pretium purus, vel eleifend nulla. In tincidunt turpis non erat consequat, eget bibendum justo tempor. Proin eu nulla. "
,       favorites: "tt0120669,tt1033643,tt1204975,tt0317219,tt1216475,tt3606752,tt1201607,tt0241527,tt0295297,tt0304141,tt0330373"
    },
    {
        email: "fisher@mail.com",
        username: "fisher",
        password: "fisher",
        favorites: "tt0120669,tt1033643,tt1204975,tt0317219,tt1216475,tt3606752,tt1201607",
        imgUrl: "https://i.scdn.co/image/ab6761610000e5eb26b6458775a693999d024473"
    },
    {
        email: "charlotte@mail.com",
        username: "charlotte",
        password: "charlotte",
        favorites: "tt1204975,tt0317219,tt1216475,tt3606752,tt1201607,tt0241527,tt0295297,tt0304141,tt0330373",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl5mb3ee-Abd1WbviX-dxT7aZhdStmHyCQ25J_dsRAhC9WouSWqb_EAseS-Qx-2oFcQhc&usqp=CAU"
    },
    {
        email: "moni@mail.com",
        username: "moni",
        password: "moni",
        favorites: "tt1204975,tt0317219,tt1216475,tt3606752",
        imgUrl: "https://i1.sndcdn.com/artworks-f7B83yI7QtVLTWaY-XQzOrw-t500x500.jpg",
    },
    {
        email: "nico@gmail.com",
        username: "nico",
        password: "nico",
        favorites: "tt0304141,tt0330373",
        imgUrl: "https://wololosound.com/wp-content/uploads/nico-moreno-696x392.jpg"
    },
    {
        email: "alejo@mail.com",
        username: "alejo",
        password: "alejo",
        favorites: "tt0120669,tt1033643,tt0304141,tt0330373",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/97/Ysy_a.jpg"
    },
    {
        email: "mauro@mail.com",
        username: "mauro",
        password: "mauro",
        favorites: "tt0120669,tt1033643,tt0304141,tt0330373",
        imgUrl: "https://images.ole.com.ar/2021/10/28/Iy3_4QI4D_720x0__1.jpg"
    },
    {
        email: "djkhaled@mail.com",
        username: "khaled",
        password: "khaled",
        favorites: "tt0120669,tt1033643,tt0304141,tt0330373",
        imgUrl: "data:image/jpeg;base64,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"
    },
    {
        email: "adam@mail.com",
        username: "adam",
        password: "adam",
        favorites: "tt0120669",
        imgUrl: "https://artists.ultramusicfestival.com/wp-content/uploads/2015/06/adambeyer-2020-1.jpg"
    },
    {
        email: "sonny@mail.com",
        username: "sonny",
        password: "sonny",
        favorites: "tt0120669",
        imgUrl: "https://img.discogs.com/Lj38kiil485AIWRRdfX7RUlypms=/600x600/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/A-1472585-1612815883-2680.jpeg.jpg"
    },
    {
        email: "empty1@mail.com",
        username: "empty1",
        password: "empty1"
    },
    {
        email: "empty2@mail.com",
        username: "empty2",
        password: "empty2"
    },
    {
        email: "empty3@mail.com",
        username: "empty3",
        password: "empty3"
    },
    {
        email: "empty4@mail.com",
        username: "empty4",
        password: "empty4"
    },
    {
        email: "empty5@mail.com",
        username: "empty5",
        password: "empty5"
    },
    {
        email: "empty6@mail.com",
        username: "empty6",
        password: "empty6"
    },
    {
        email: "empty7@mail.com",
        username: "empty7",
        password: "empty7"
    },
    {
        email: "empty8@mail.com",
        username: "empty8",
        password: "empty8"
    },
    {
        email: "empty9@mail.com",
        username: "empty9",
        password: "empty9"
    },
    {
        email: "empty10@mail.com",
        username: "empty10",
        password: "empty10"
    }
]

const movieComments = [
    {
        movieId: "tt0120669",
        userId: 1,
        text: "Deserunt cillum exercitation amet excepteur qui anim occaecat reprehenderit."
    },
    {
        movieId: "tt0120669",
        userId: 2,
        text: "Voluptate sit tempor tempor irure sunt deserunt aliquip id consequat ut consectetur veniam."
    },
    {
        movieId: "tt0120669",
        userId: 3,
        text: "Consequat ut sint ea proident sit."
    },
    {
        movieId: "tt1033643",
        userId: 1,
        text: "Deserunt cillum exercitation amet excepteur qui anim occaecat reprehenderit."
    },
    {
        movieId: "tt1033643",
        userId: 2,
        text: "Voluptate sit tempor tempor irure sunt deserunt aliquip id consequat ut consectetur veniam."
    },
    {
        movieId: "tt1033643",
        userId: 3,
        text: "Consequat ut sint ea proident sit."
    },
    {
        movieId: "tt1204975",
        userId: 1,
        text: "Deserunt cillum exercitation amet excepteur qui anim occaecat reprehenderit."
    },
    {
        movieId: "tt1204975",
        userId: 2,
        text: "Voluptate sit tempor tempor irure sunt deserunt aliquip id consequat ut consectetur veniam."
    },
    {
        movieId: "tt1204975",
        userId: 3,
        text: "Consequat ut sint ea proident sit."
    },

]

const main = async () => {
    let promesas = []
    
    users.forEach(user => promesas.push(User.create(user)))
    
    await Promise.all(promesas)
    
    objContador = {}

    let favorites = []



    User.findAll().then(users => {
        users.forEach((user) => {
            user.favorites.forEach((fav) => favorites.push(fav))
        })
        favorites.map((fav) => {
            if(objContador[fav]) objContador[fav]++
            else objContador[fav] = 1
        })
        for(item in objContador) {
            Movie.create({ movieId: item, likes: objContador[item] })
        }
    })

    movieComments.forEach((comment) => MovieComment.create(comment))
}

main()