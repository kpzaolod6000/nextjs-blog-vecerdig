// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  
  const sslCertificate = require('get-ssl-certificate')

  // console.log(host)
  const getCertificate = sslCertificate.get(req.body).then(certificate => {
    res.status(200).json({ data:  certificate})      
      //console.log(certificate.issuer.CN)
  })

  console.log("devolveindo" +  getCertificate)
}
