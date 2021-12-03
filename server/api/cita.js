const { pool } = require("../database/config/config");

const citaApi = {
    getAllCitas : async(req, res) => {
        const results = await pool.query(`SELECT * FROM CitaVacuna`);
        const citas = results.rows;
        if(citas!=null) {
            res.json({
                data : citas,
                msg : ""
            })
        }
        else{
            res.json({
                msg : "no-data"
            })
        }
    },

    getCitaByUser : async(req, res) => {
        let { id } = req.body;
        const results = await pool.query(`SELECT * FROM CitaVacuna WHERE ClienteCita =$1`, [id]);
        const cita = results.rows[0];
        if(cita!=null) {
            res.json({
                data : cita,
                msg : ""
            })
        }
        else{
            res.json({
                msg : "no-data"
            })
        }
    },

    insertCita : async(req,res) => {
        let { dni, fecha, ubicacion, vacuna } = req.body;
        if(dni.length == 0){
            res.json({
                msg : "Cliente no existe"
            })
        }else {
            const doExist = await pool.query(`SELECT * FROM Cliente WHERE DNICli =$1`,[dni]);
            const doExistCita = await pool.query(`SELECT * FROM CitaVacuna WHERE ClienteCita =$1`,[dni]);
        
        
            if (!(doExist.rows.length > 0)){
                res.json({
                    msg : "Cliente no existe"
                })
            }
            else if(doExistCita.rows.length > 0){
                res.json({
                    msg : "Cita ya ha sido registrada anteriormente"
                })
            }else if(dni.length==0 || fecha=="" || ubicacion==0 || vacuna==0 ){
                res.json({
                    msg : "Debes ingresar todos los campos"
                })
            }
            else{
                var num = new Date().getTime()-(Math.floor((new Date().getTime()/100000000))*100000000)
                pool.query(`INSERT INTO CitaVacuna (ID_Cita, ClienteCita, CentroCita,VacunaCita , Fecha_vacunacion , EstadoCita) VALUES($1,$2,$3,$4,$5,$6)`, [num, dni, ubicacion,vacuna,fecha,'0']);
                res.json({
                    msg : ""
                })
        
            }
        }
        
    },
    updateCita : async(req,res) => {
        let { dni, fecha, ubicacion, vacuna } = req.body;
        if(dni.length == 0){
            res.json({
                msg : "Cliente no existe"
            })
        }else {
            const doExist = await pool.query(`SELECT * FROM Cliente WHERE DNICli =$1`,[dni]);
            const doExistCita = await pool.query(`SELECT * FROM CitaVacuna WHERE ClienteCita =$1`,[dni]);
            if (!(doExist.rows.length > 0)){
                res.json({
                    msg : "Cliente no existe"
                })
            }
            else if(doExistCita.rows.length > 0){
                
                var parseVacuna='VacunaCita';
                var parseCentro='CentroCita';
                var parseFecha='Fecha_vacunacion';
                if(vacuna!=0){
                    parseVacuna = vacuna;
                }
                if(ubicacion!=0){
                    parseCentro =ubicacion;
                }
                if(fecha!=""){
                    parseFecha = `'${fecha}'`;
                }
    
    
                var query = `UPDATE CitaVacuna SET Fecha_vacunacion=${parseFecha}, CentroCita=${parseCentro}, VacunaCita=${parseVacuna} WHERE ClienteCita=${dni}`
                console.log(query)
                await pool.query(query);
                res.json({
                    msg : ""
                }).e
            }else{
                res.json({
                    msg : "Cita no ha sido registrada anteriormente"
                })
            }
        }
        
        
    },

}

module.exports = citaApi;

