const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const { getMenuFrontend } = require("../helpers/menu-frontend");


const login = async( req, res= response ) => {
    const { email, password } = req.body;

    try {
        //verifica email
        const usuarioDB = await Usuario.findOne({ email });
        if ( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo no valido',
            })
        }

        //verifica contrasenia
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contrasenia no valido',
            })
        }

        //generar token 
        const token = await generarJWT( usuarioDB.id );
        res.json({
            ok: true,
            token,
            menu: getMenuFrontend( usuarioDB.role ),
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hbale con el administrador'
        })
    }
}


const googleSingIn = async( req, res= response ) => {

    try {
        const { email, name, picture } = await  googleVerify(req.body.token);

        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google:true,
            })
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        // guardar usuario
        await usuario.save();

         //generar token 
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            email, name, picture,
            token,
            menu: getMenuFrontend( usuario.role ),

        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de google no es correcto'
        })
    }

}

const renewToke = async (req, res =response ) => {

    const uid = req.uid;

    //generar token 
    const token = await generarJWT( uid );

    // obtener el usuario por token 
    const usuario = await Usuario.findById(uid)
    res.json({
        ok: true,
        token,
        usuario,
        menu: getMenuFrontend( usuario.role ),

    })
}


module.exports = {
    login,
    googleSingIn,
    renewToke,
}