const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = 3000
app.set('view engine', 'ejs');
const session = require('express-session');

app.use(express.urlencoded({extended : true}));

app.set('views', './views');
app.set('layouts', './layouts');
app.use(express.static('public/views'));
app.use('/css', express.static('public/css'));
app.use('/images', express.static('public/images'));
app.use('/js', express.static('public/js'));
app.use('/controllers', express.static('public/js/controllers'));

//APIs enlaces
const userApi = require('./api/user');
const newApi = require('./api/new');
const medicoApi = require('./api/medico');
const comentApi = require('./api/coment');
const vacunaApi = require('./api/vacuna');
const centroApi = require('./api/centro');
const citaApi = require('./api/cita');
const historialApi = require('./api/historial');
const forumApi = require('./api/forum');
//

app.use(
    session({
        secret: "Patentado por Abaco",
        resave: false,
        saveUninitialized: false
    })
)

app.get('/' ,(req, res) => {
    if(req.session.isAuth && req.session.isClient){
        res.redirect('/inicio');
    }else if(req.session.isAuth && req.session.isProgrammer){
        res.redirect('/programador');
    }
    else{
        res.render('index');
    }
    
});

app.get('/inicio' ,(req, res) => {
    if(req.session.isAuth && req.session.isClient){
        res.render('inicio');
        console.log(req.session.userId)
    }
    else {
        res.redirect('/');
    }
    
});
// APIs
app.post('/login', userApi.login);
app.post('/loginpro', userApi.loginProgramador);
app.post('/register', userApi.register);
app.post('/destroy', userApi.endSession);
app.get('/news', newApi.getAllNews);
app.get('/medicos', medicoApi.getAllMedicos);
app.post('/medico', medicoApi.getMedico);
app.get('/comentarios', comentApi.getAllComents);
app.get('/actualuser', userApi.getUserInSession)
app.post('/user', userApi.getUser)
app.post('/dosis', userApi.actualizarDosisVacuna)
app.get('/vacunas', vacunaApi.getAllVacunas)
app.post('/vacuna', vacunaApi.getVacuna)
app.get('/centros', centroApi.getAllCentros)
app.post('/centro', centroApi.getCentro)
app.get('/citas', citaApi.getAllCitas)
app.post('/cita', citaApi.getCitaByUser)
app.post('/insert', citaApi.insertCita)
app.post('/update', citaApi.updateCita)
app.post('/historial', historialApi.getHistorialByUser)
app.post('/newhistorial', historialApi.insertHistorial)
app.get('/forum', forumApi.getAllPosts)
app.post('/post', forumApi.insertPost)

//

app.get('/historial' ,(req, res) => {
    if(req.session.isAuth && req.session.isClient){
        res.render('historial');
    }
    else {
        res.redirect('/');
    }
    
});
app.get('/perfil' ,(req, res) => {
    if(req.session.isAuth && req.session.isClient){
        res.render('perfil');
    }
    else {
        res.redirect('/');
    }
    
});

app.get('/foro', (req, res) => {
    if(req.session.isAuth && req.session.isClient){
        res.render('foro');
    }
    else {
        res.redirect('/');
    }
    
})

app.get('/programador' ,(req, res) => {
    if(req.session.isAuth && req.session.isProgrammer){
        res.render('programador');
    }
    else {
        res.redirect('/');
    }
    
});
//Historial clínico Persoanl GET


app.listen(PORT , () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
})