
// export default function getB(url){
//     return "onichan"
// }


//  const sslCertificate = require('get-ssl-certificate')
//  // console.log(host)
//  let getCertificate = ""
//  sslCertificate.get('node.org').then(function (certificate) {
//     console.log(certificate)
//  })

// export const getServerSideProps = async (context) => {

//     console.log(context)
//     const sslCertificate = require('get-ssl-certificate')
//     // console.log(host)
//     let getCertificate = ""
//     sslCertificate.get('node.org').then(function (certificate) {
    
//         getCertificate = certificate
//         console.log(certificate)
//         console.log(certificate.issuer)
//         console.log(certificate.valid_from)
//         console.log(certificate.valid_to)
//         console.log(certificate.pemEncoded)
//     })

//     return {
//         props: {
//             data: getCertificate,
//         },
//     }

// }

var https = require('https');

var options = {
    host: 'google.com',
    port: 443,
    method: 'GET'
};

const request = https.request(options, function(res) {
    let cert = res.connection.getPeerCertificate(true);
    let list = new Set(); 
    do {
        list.add(cert);
        console.log("subject", cert.subject);
        console.log("issuer", cert.issuer);
        console.log("valid_from", cert.valid_from);
        console.log("valid_to", cert.valid_to);
        cert = cert.issuerCertificate;
    } while (cert && typeof cert === "object" && !list.has(cert));

    res.on('data', data => {
        //console.log(data.toString('utf8'));
    });
});

request.end();