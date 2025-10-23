import { Request, Response } from 'express';
import { execSync } from 'child_process';
import * as os from 'os';

// Datos simulados para Windows
const usuariosSimulados = [
    { nombre: 'root', uid: 0, gid: 0 },
    { nombre: 'administrator', uid: 500, gid: 500 },
    { nombre: 'usuario1', uid: 1000, gid: 1000 },
    { nombre: 'usuario2', uid: 1001, gid: 1000 },
    { nombre: 'test', uid: 1002, gid: 1002 },
    { nombre: 'admin', uid: 1003, gid: 1000 }
];

function esWindows() {
    return os.platform() === 'win32';
}

function obtenerUsuarioPorNombre(nombre: string) {
    return usuariosSimulados.find(u => u.nombre === nombre);
}

function obtenerUsuarioPorUid(uid: number) {
    return usuariosSimulados.find(u => u.uid === uid);
}

/**Caso 1: Servicios con tipos de datos simples */
export async function getCaso1Rcp(req: Request, res: Response) {
    try {


        const { method, params } = req.body;

        if (method === 'OBTENER_UID') {
            if (esWindows()) {
                const usuario = obtenerUsuarioPorNombre(params.nombre);
                return res.json({ result: usuario ? usuario.uid : -1 });
            } else {
                try {
                    const uid = execSync(`id -u ${params.nombre}`).toString().trim();
                    return res.json({ result: parseInt(uid) });
                } catch {
                    return res.json({ result: -1 });
                }
            }
        }

        if (method === 'OBTENER_NOMBRE') {
            if (esWindows()) {
                const usuario = obtenerUsuarioPorUid(params.uid);
                return res.json({ result: usuario ? usuario.nombre : "" });
            } else {
                try {
                    const name = execSync(`getent passwd ${params.uid} | cut -d: -f1`).toString().trim();
                    return res.json({ result: name || "" });
                } catch {
                    return res.json({ result: "" });
                }
            }
        }

        res.status(400).json({ error: "Método no soportado" });


    } catch (error1) {
        res.status(500).json({ code: 500, message: `Ocurrió un error inesperado: ` + error1 })
    }
}


/**Caso 2: Tipos de datos compuestos */
export async function getCaso2(req: Request, res: Response) {
    try {

        const { method, params } = req.body;

        if (method === 'MISMO_GID') {
            const { uid1, uid2 } = params;
            if (esWindows()) {
                const usuario1 = obtenerUsuarioPorUid(uid1);
                const usuario2 = obtenerUsuarioPorUid(uid2);
                return res.json({ result: usuario1 && usuario2 ? usuario1.gid === usuario2.gid : false });
            } else {
                try {
                    const gid1 = execSync(`getent passwd ${uid1} | cut -d: -f4`).toString().trim();
                    const gid2 = execSync(`getent passwd ${uid2} | cut -d: -f4`).toString().trim();
                    return res.json({ result: gid1 === gid2 });
                } catch {
                    return res.json({ result: false });
                }
            }
        }

        if (method === 'OBTENER_UGID') {
            if (esWindows()) {
                const usuario = obtenerUsuarioPorNombre(params.nombre);
                return res.json({ result: usuario ? { uid: usuario.uid, gid: usuario.gid } : { uid: -1, gid: -1 } });
            } else {
                try {
                    const info = execSync(`getent passwd ${params.nombre}`).toString().trim().split(':');
                    return res.json({ result: { uid: parseInt(info[2]), gid: parseInt(info[3]) } });
                } catch {
                    return res.json({ result: { uid: -1, gid: -1 } });
                }
            }
        }

        res.status(400).json({ error: "Método no soportado" });

    } catch (error1) {
        res.status(500).json({ code: 500, message: `Ocurrió un error inesperado: ` + error1 })
    }
}


/**Caso 3: Uso de tipo union (XDR) */
export async function getCaso3XDR(req: Request, res: Response) {
    try {

        const { method, params } = req.body;

        if (method === 'CONSULTAR_USUARIO') {
            const { query } = params;

            if (isNaN(query)) {
                return res.json({ result: { tipo: 'uid', valor: 1000 } });
            } else {
                return res.json({ result: { tipo: 'nombre', valor: 'fperez' } });
            }
        }

        res.status(400).json({ error: "Método no soportado" });

    } catch (error1) {
        res.status(500).json({ code: 500, message: `Ocurrió un error inesperado: ` + error1 })
    }
}


/**Caso 4: Vectores de tamaño variable */
export async function getCaso4Vectores(req: Request, res: Response) {
    try {

        const { method } = req.body;

        if (method === 'LISTAR_USUARIOS') {
            if (esWindows()) {
                const nombres = usuariosSimulados.map(u => u.nombre);
                return res.json({ result: nombres });
            } else {
                const users = execSync('cut -d: -f1 /etc/passwd').toString().trim().split('\n');
                return res.json({ result: users });
            }
        }

        res.status(400).json({ error: "Método no soportado" });

    } catch (error1) {
        res.status(500).json({ code: 500, message: `Ocurrió un error inesperado: ` + error1 })
    }
}


/**Caso 5: Manejo de errores y xdr_free */
export async function getCaso5Errores(req: Request, res: Response) {
    try {
        const { method } = req.body;
        
        if (method === 'COMANDO_VALIDO') {
            if (esWindows()) {
                res.json({ result: "Comando ejecutado correctamente en Windows" });
            } else {
                const result = execSync('echo "Comando ejecutado correctamente"');
                res.json({ result: result.toString().trim() });
            }
        } else if (method === 'COMANDO_INVALIDO') {
            if (esWindows()) {
                throw new Error("Comando no reconocido en Windows");
            } else {
                const result = execSync('comando_inexistente');
                res.json({ result: result.toString() });
            }
        } else {
            res.status(400).json({ error: "Método no soportado" });
        }

    } catch (error1) {
        console.error("Error RPC:", error1.message);
        res.status(500).json({ code: 500, message: `Ocurrió un error inesperado: ` + error1.message })
    }
}