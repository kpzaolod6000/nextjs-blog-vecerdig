const ingreso_url = document.getElementById('ingreso_url');
const verificar = document.getElementById('verificar');
let urls = []
verificar.addEventListener('click',()=>{
    if (ingreso_url.value.length > 0){
        let urlfind = urls.find(url => url == ingreso_url.value)
        
        if (!urlfind){
            
            urls.push(ingreso_url.value)
            const results = document.createElement('div')
            results.classList.add('results')
        
            const search_results = document.getElementById('search_results');
            const listItem = document.createElement('div')
            listItem.classList.add('seracl__results__urls')
            
            const urlname = document.createElement('p')
            urlname.textContent = `${ingreso_url.value}`
            listItem.appendChild(urlname)
        
            const navegadores = document.createElement('div')
            navegadores.classList.add('serach__results__browsers')
        
            
            const micro = document.createElement('div')
            const urlmicro = document.createElement('p')
            urlmicro.textContent = 'Microsoft Edge' 
            const spanmicro = document.createElement('span')
            spanmicro.classList.add('serach__results__browsers__dot')
        
            micro.appendChild(urlmicro)
            micro.appendChild(spanmicro)
            micro.appendChild(spanmicro.cloneNode(true))
            micro.appendChild(spanmicro.cloneNode(true))
        
        
            const google = document.createElement('div')
            const urlgoogle = document.createElement('p')
            urlgoogle.textContent = 'Google Chrome' 
            const spangoogle = document.createElement('span')
            spangoogle.classList.add('serach__results__browsers__dot')
        
            google.appendChild(urlgoogle)
            google.appendChild(spangoogle)
            google.appendChild(spangoogle.cloneNode(true))
            google.appendChild(spangoogle.cloneNode(true))
        
            const firefox = document.createElement('div')
            const urlfirefox = document.createElement('p')
            urlfirefox.textContent = 'Mozilla Firefox' 
            const spanfirefox = document.createElement('span')
            spanfirefox.classList.add('serach__results__browsers__dot')
        
            firefox.appendChild(urlfirefox)
            firefox.appendChild(spanfirefox)
            firefox.appendChild(spanfirefox.cloneNode(true))
            firefox.appendChild(spanfirefox.cloneNode(true))
        
            navegadores.appendChild(micro)
            navegadores.appendChild(google)
            navegadores.appendChild(firefox)
        
            results.appendChild(listItem)
            results.appendChild(navegadores)
        
            search_results.appendChild(results)
        }
    }
})
