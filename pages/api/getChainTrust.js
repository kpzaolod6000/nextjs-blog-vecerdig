import fs from 'fs'
import path from 'path'

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
        const tam = list.size - 1
        //const tam = 2
        let cont = 0
        let rootTrust;
        var certs = {
            subject: [],
            issuer:[],
            valid_from:[],
            valid_to:[],
            fingerprint:[]

         };


        for (const item of list.values()) {
            const objSubject = JSON.parse(JSON.stringify(item.subject))
            const objIssuer = JSON.parse(JSON.stringify(item.issuer))
            const objvalid_from = JSON.parse(JSON.stringify(item.valid_from))
            const objvalid_to = JSON.parse(JSON.stringify(item.valid_to))
            const objfingerprint = JSON.parse(JSON.stringify(item.fingerprint))
            console.log(objSubject.CN, "=========>",objIssuer.CN)
            if (tam == cont) {
                rootTrust = item
            }
            certs.subject.push(objSubject);
            certs.issuer.push(objIssuer);
            certs.valid_from.push(objvalid_from);
            certs.valid_to.push(objvalid_to);
            certs.fingerprint.push(objfingerprint);
            cont++
        }
        //console.log(rootTrust)
        const rootIssuer = await JSON.parse(JSON.stringify(rootTrust.issuer))
        const rootNroSerial = rootTrust.serialNumber
        const rootFingerprint = rootTrust.fingerprint


        //ver si esta en el Trust Store de Mozilla
        const isMozilla = verify('MozillaRootsPEM.json',rootIssuer,rootNroSerial,rootFingerprint)
        const isEdge = verify('EdgeRootsPEM.json',rootIssuer,rootNroSerial,rootFingerprint)
        const isChrome = verify('ChromeRootsPEM.json',rootIssuer,rootNroSerial,rootFingerprint)
        
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

        const trustDirectory = await path.join(process.cwd(),'pages', 'data','validate.json' )
        const certsDirectory = await path.join(process.cwd(),'pages', 'resources',req.body+'.json' )
        const isvalid = {
            isMozilla: isMozilla,
            isEdge: isEdge,
            isChrome: isChrome,
        }
        fs.writeFileSync(trustDirectory, JSON.stringify(isvalid))
        fs.writeFileSync(certsDirectory, JSON.stringify(certs));

        list.clear();
        // res.on('data', data => {
        //     //objet = {data: data.toString('utf8')}
        //     //console.log(data.toString('utf8'));
        // });
    });
    
    request.end();
    
    res.status(200).json({ success: true })
}