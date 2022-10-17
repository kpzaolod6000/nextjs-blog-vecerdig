import fs from 'fs'
import path from 'path'

export default function verify(dataJson,rootIssuer,rootNroSerial,rootFingerprint) {
    const jsonDirectory = path.join(process.cwd(),'pages', 'data',dataJson)
    const file = fs.readFileSync(jsonDirectory)
    const jsonObject = JSON.parse(file);

    let isStore = false
    jsonObject.map((cert) =>{
        if(rootIssuer.CN == cert.issuer && rootNroSerial == cert.nmSerial && rootFingerprint == cert.certSha){
            // console.log("Numero de Serial(Root): ", cert.nmSerial)
            // console.log("Firma Digital(Root): ", cert.certSha)
            // console.log("Nombre(CN) del Emisor(Root): ", cert.issuer)
            isStore = true
        }
    })
    return isStore
}