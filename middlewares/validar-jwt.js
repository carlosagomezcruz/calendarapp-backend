const { request, response } = require('express')
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, resp = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return resp.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        req.uid = payload.uid;
        req.name = payload.name;


    } catch (error) {
        return resp.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })

    }

    next();

}

module.exports = {
    validarJWT
}