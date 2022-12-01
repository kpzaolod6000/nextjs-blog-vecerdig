import isTrustRoots from '../public/trustStore/trusModel'

export default function verify(dataJson,rootIssuer,rootNroSerial,rootFingerprint) {

    const jsonObject = isTrustRoots(dataJson);
    
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