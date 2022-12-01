import { setgetValidateBrowser } from '../../public/trustStore/setValidate';
import verify from '../verifyIsTrustStore';

export default async function handler(req, res) {
    
    console.log(req.body)
    var https = require('https');
    var options = {
        host: req.body,
        method: 'GET'
    };

    let list = new Set();

    const request = https.request(options, async function(res) {
        let cert = res.connection.getPeerCertificate(true);
        
        do {
            list.add(cert);
            cert = cert.issuerCertificate;
        } while (cert && typeof cert === "object" && !list.has(cert));

        for (const item of list.values()) {
            
            const objSubject = JSON.parse(JSON.stringify(item.subject))
            const objIssuer = JSON.parse(JSON.stringify(item.issuer))
            console.log("Numero de Serial: ", item.serialNumber)
            console.log("Firma Digital: ", item.fingerprint)
            console.log("Nombre(CN) del Asunto: ", objSubject.CN)
            console.log("Nombre(CN) del Emisor", objIssuer.CN)
            console.log("==========================================================================")
        }
        console.log("Trust Chain")
        const tam = list.size - 1;
        //const tam = 2
        let cont = 0;
        let rootTrust;
        for (const item of list.values()) {
            const objSubject = JSON.parse(JSON.stringify(item.subject));
            const objIssuer = JSON.parse(JSON.stringify(item.issuer));
            console.log(objSubject.CN, "=========>",objIssuer.CN);
            if (tam == cont) {
                rootTrust = item;
            }
            cont++;
        }
        //console.log(rootTrust)
        const rootIssuer = await JSON.parse(JSON.stringify(rootTrust.issuer))
        const rootNroSerial = rootTrust.serialNumber
        const rootFingerprint = rootTrust.fingerprint


        //ver si esta en el Trust Store de Mozilla
        const isMozilla = verify('MozillaRootsPEM',rootIssuer,rootNroSerial,rootFingerprint)
        const isEdge = verify('EdgeRootsPEM',rootIssuer,rootNroSerial,rootFingerprint)
        const isChrome = verify('ChromeRootsPEM',rootIssuer,rootNroSerial,rootFingerprint)
        
        console.log("\nVer si esta en los Trust Stores de Mozilla,Edge y Chrome\n")

        if (isMozilla) {
            console.log("El trust root se encuentra en los certificados del Trust Store de Mozilla")
        }else{
            console.log("No se encuentra en los certificados del Trust Store de Mozilla")
        }
        if (isEdge) {
            console.log("El trust root se encuentra en los certificados del Trust Store de Microsoft Edge")
        }else{
            console.log("No se encuentra en los certificados del Trust Store de Microsoft Edge")
        }
        if (isChrome) {
            console.log("El trust root se encuentra en los certificados del Trust Store de Google Chrome")
        }else{
            console.log("No se encuentra en los certificados del Trust Store de Google Chrome")
        }

        setgetValidateBrowser("set",isMozilla,isChrome,isEdge);
        
        list.clear();
        // res.on('data', data => {
        //     //objet = {data: data.toString('utf8')}
        //     //console.log(data.toString('utf8'));
        // });
    });
    
    request.end();
    
    res.status(200).json({ success: true })
}