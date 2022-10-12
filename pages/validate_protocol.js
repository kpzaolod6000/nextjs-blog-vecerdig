export default function getB(url){
    let obUrl = new URL(url);    
    console.log(obUrl.protocol); // https:
    console.log(obUrl.host);     // javascript.info
    console.log(obUrl.pathname); // /url
    return obUrl;

}


// url = "https://www.google.co.uk:55699/search?q=http%3A%2F%2F&oq=http%3A%2F%2F&aqs=chrome..69i57j69i60l3j69i65l2.2342j0j4&sourceid=chrome&ie=UTF-8"

