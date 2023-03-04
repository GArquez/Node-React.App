const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})
.then((db) => {
    console.log('Database is connected to', db.connection.host)
})
.catch((err) => {
    console.log(err)
})

