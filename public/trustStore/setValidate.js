
export let isValid = {};

export function setgetValidateBrowser(query,isMozilla=false,isChrome=false,isEdge=false) {
    if (query == "set") {
        let aux = {
            isMozilla: isMozilla,
            isEdge: isEdge,
            isChrome: isChrome,
        }
        isValid = aux;
        // console.log(isValid);
    }
    else{
        return isValid;    
    }
}