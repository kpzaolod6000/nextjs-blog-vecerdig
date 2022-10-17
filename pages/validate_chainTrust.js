
export default async function validateChainTrust(host){

    const url_ = 'http://localhost:3000/api/getChainTrust'
    try {
        const response = await fetch(url_ ,{
            method: 'POST',
            body: host,
            headers: {
            Accept: 'application/json',
            },
    });
    
    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Verificacion de confianza: ', JSON.stringify(result, null, 4));

    } catch (err) {
        console.log(err.message);
    }
      return 0;
}
