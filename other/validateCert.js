import path from 'path'
import fs from 'fs'
import {X509Certificate} from 'crypto'


const ValidateCert = () => {
  return (
    <div>
      hola
    </div>
  );
}

export const getStaticProps = async () => {
    const sslCertificate = require('get-ssl-certificate')
    sslCertificate.get('nodejs.org').then(function (certificate) {
      console.log(certificate)
      console.log(certificate.issuer)
      console.log(certificate.valid_from)
      console.log(certificate.valid_to)
      console.log(certificate.pemEncoded)
      // -----BEGIN CERTIFICATE-----
      // ...
      // -----END CERTIFICATE-----
    });

    const postsDirectory = path.join(process.cwd(),'public', 'trustStore', 'cert.pem')
    let filenames = await fs.readFileSync(postsDirectory)

    const x509list = new X509Certificate(filenames)
    console.log(x509list)
    
    return {
      props: {
          data: "hola"
      },
  }

}

export default ValidateCert;