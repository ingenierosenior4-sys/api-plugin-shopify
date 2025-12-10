const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

const registerUser = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'USER'
    }
  });
  return newUser;
};

const loginUser = async (user, password) => {
    const expirationHours = 4;
    const expirationSeconds = expirationHours * 60 * 60; // 14400 segundos
    // Usar una clave secreta del entorno, con un valor por defecto seguro (¡nunca en producción!)
    const secret = process.env.JWT_SECRET || "CLAVE_SECRETA_POR_DEFECTO_USAR_ENV"; 

    try {
        // 2. Generación del Token de Acceso
        const accessToken = jwt.sign(
            { userId: user, role: 'administrator' },
            secret,
            { expiresIn: expirationSeconds }
        );

        // 3. Generación del Refresh Token (Simulación)
        const refreshToken = jwt.sign({ userId: user, type: "refresh" }, secret, { expiresIn: '7d' });
        const refreshTokenExpiresIn = 7 * 24 * 60 * 60; // 7 días

        // 4. Estructura de la respuesta AccessToken
        const tokenData = {
            token: accessToken,
            expiraEn: expirationSeconds,
            tipoToken: "Bearer",
            actualizarToken: refreshToken,
            actualizarTokenExpiraEn: refreshTokenExpiresIn,
            nuevaLlave: `key-${user}-${Date.now()}`
        };

        // 5. Retorno Exitoso
        return {
            operacionExitosa: true,
            mensaje: "Autenticación exitosa",
            errores: [],
            resultado: tokenData
        };

    } catch (error) {
        // 6. Captura de Errores de Sistema (ej. error en jwt.sign)
        console.error("Error inesperado en loginUser:", error.message);
        return {
            operacionExitosa: false,
            mensaje: "Error interno del servidor.",
            errores: [`Fallo de sistema: ${error.message}`],
            resultado: null
        };
    }
};

module.exports = { registerUser, loginUser };