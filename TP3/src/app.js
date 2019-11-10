const express = require('express')
const app = express()
const { getTranslation } = require('./services/utils')
const path = require('path')
const createError = require('http-errors')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const moment = require('moment')
const i18n = require('i18n-express')
const fs = require('fs')
const yaml = require('js-yaml')
const directory = require('serve-index')

const formatter = require('./helpers/formatter')

const config = require('./config.json')
const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(config.dbUrl, { useNewUrlParser: true })
console.log("Connecting to MongoDB ...")
client.connect(async err => {
    if (err) {
        // Be sure that your IP address has been whitelisted in the firewall host of the MongoDB.
        throw err
    }

    const db = client.db(config.dbName)

    console.log("CONNECTED TO MONGODB")
    await insertDefaultDBData(db)
        //client.close()
});

const collections = [
    { name: "news", collection: undefined },
    { name: "seminars", collection: undefined },
    { name: "members", collection: undefined },
    { name: "publications", collection: undefined },
    { name: "projects", collection: undefined }
]

const findCollection = (name) => {
    return collections[collections.findIndex(c => c.name === name)]
}

const deleteCollection = async(name, db) => {
    try {
        const collection = await db.collection(name)
        await collection.drop()
        console.log("===> Collection " + name + " deleted")
    } catch (err) {
        if (err.message === "ns not found") {
            console.log("===> No collection by the name " + name + " in the DB.")
        } else {
            console.log("===> Error during collection deletion of " + name + " : " + err.message)
        }

    }
}

const createCollection = async(name, db) => {
    try {
        const collection = await db.createCollection(name)
        console.log("===> Collection " + name + " created")
        return collection
    } catch (err) {
        console.log("===> Error during collection creation of " + name + " : " + err.message)
    }
}

const deleteCollections = db => {
    let count = 0;
    return new Promise((resolve) => {
        collections.map(async(c, index) => {
            await deleteCollection(c.name, db)
            count++
            if (count === collections.length) {
                resolve();
                console.log("resolve");
            }
        })
    })
}

const createCollections = db => {
    let count = 0;
    return new Promise(resolve => {
        collections.map(async(c) => {
            c.collection = await createCollection(c.name, db)
            count++
            if (count === collections.length) {
                resolve();
                console.log("resolve");
            }
        })
    })
}

const obtainNews = async => {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/news.yml', 'utf8', (err, content) => {
            if (err) {
                callback(err, null)
            } else {
                const yamlContentOpt = yaml.safeLoad(content)
                const news = ((yamlContentOpt === null) ? [] : yamlContentOpt)
                    .map(s => {
                        const text_fr = getTranslation('fr', s.text)
                        const text_en = getTranslation('en', s.text)
                        const newCreatedAtDate = moment(s.createdAt, 'YYYY-MM-DD HH:mm:ss').toDate()
                        return {
                            ...s,
                            text: { fr: text_fr, en: text_en },
                            type: 'news',
                            createdAt: newCreatedAtDate
                        }
                    })
                resolve(news)
            }
        })
    })
}


const insertDefaultDBData = async(db) => {
    // DELETE COLLECTIONS
    console.log("===> Deleting Collections ...")
    await deleteCollections(db)
    console.log("===> Collections Deleted.")

    // CREATING COLLECTIONS
    console.log("===> Creating Collections ...")
    await createCollections(db)
    console.log("===> Collections Created.")


    // data/news.yml into news collection
    console.log("===> Inserting News ...")
    const news = await obtainNews()
    await db.collection('news').insertMany(news)
    console.log("===> News Inserted ...")

    // data/seminars.yml into seminars collection
    // console.log("===> Creating Seminars ...")
    // console.log("===> Seminars Created ...")

    // data/team.yml into members collection
    // console.log("===> Creating Members ...")
    // console.log("===> Members Created ...")

    // data/publications.yml into publications collection
    // console.log("===> Creating Publications ...")
    // console.log("===> Publications Created ...")

    // data/projects.yml into projects collection (with _id of MongoDB)
    // console.log("===> Creating Projects ...")
    // console.log("===> Projects Created ...")
}



// Possibilité de spécifier le numéro de port par ligne de commande.
const port = process.env.PORT || 3000

// Initialisation de l'engin de la vue Pug
app.set('views', path.join(__dirname, '/views'))
app.engine('pug', require('pug').__express)
app.set('view engine', 'pug')

// Initialisation des fichiers statiques
app.use(express.static(path.join(__dirname, '/public')))

// Initialisation du bodyParser pour être capable de récupérer le contenu JSON
// d'un corpus de requête HTTP.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Initialisation de express-session pour être capable de l'utiliser
app.use(cookieParser())
app.use(session({
    secret: 'log4420',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

// Initialisation de l'internationalisation
app.use(i18n({
    translationsPath: path.join(__dirname, 'locales'),
    browserEnable: false,
    defaultLang: 'fr',
    siteLangs: ['fr', 'en'],
    cookieLangName: 'ulang',
    textsVarName: 't'
}))

// Initialisation de la langue de momentjs
moment.locale(['fr', 'en'])
app.locals.formatter = formatter

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next()
})

// Fichier de définitions des routes de l'applications
app.use(require('./routes'))
app.use('/api', require('./routes/rest'))

// Si l'URL n'a pas pu être traité par les middlewares précédents, on envoie
// une page d'erreur 404.
app.use((req, res, next) => {
    next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

// Amorçage de l'application web avec la base de données
// À COMPLÉTER
app.listen(port, function() {
    console.log('Listening on port ' + port)
})

module.exports = app