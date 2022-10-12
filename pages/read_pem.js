// import { promises as fs } from 'fs'
// import path from 'path'
// // export default function readPem(){
// //     // Importing crypto module
// //     const X509Certificate = require('crypto-js')

// //     // import * as fs from 'fs';
// //     // import X509Certificate from 'crypto'
// //     // Importing fs module
// //     const fs = require('fs')

// //     // getting object of a PEM encoded X509 Certificate.
// //     const x509 = new X509Certificate(fs.readFileSync('./public/trustStore/test.pem'));

// //     // getting subject included in this certificate.
// //     // by using x509.subject function
// //     const value = x509.subject

// //     return value;
// //     // display the result
// //     //console.log("subject :- " + value)
// // }

// function readPem({props}) {
//     console.log("nada onichan:", props);
//     return (
//        <div>${props.value}</div>
//     );
// }

// export const getStaticProps = async () => {
//     const postsDirectory = path.join(process.cwd(),'public', 'trustStore','test.pem')
//     const filenames = await fs.readdir(postsDirectory)
//     const value = filenames.json();
//     console.log(value);
//     return {
//         props: {
//           value: value,
//         },
//     }
// };

// export default readPem