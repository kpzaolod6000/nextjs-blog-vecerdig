import styles from '../styles/Home.module.css'

function createSpan(elementDiv,validate){

    for (let index = 0; index < 3; index++) {
        if (index == 0) {
            const spanmicro = document.createElement('span')
            spanmicro.classList.add(styles['search__results__browsers__dot__white'])    
            elementDiv.appendChild(spanmicro)
            
        }else{
            if (validate){
                const spanmicro = document.createElement('span')
                spanmicro.classList.add(styles['search__results__browsers__dot__white'])
                elementDiv.appendChild(spanmicro)

                const spanmicro2 = document.createElement('span')
                spanmicro2.classList.add(styles['search__results__browsers__dot_success'])
                elementDiv.appendChild(spanmicro2)
                index++
            }
            else{
                const spanmicro = document.createElement('span')
                spanmicro.classList.add(styles['search__results__browsers__dot_warning'])
                elementDiv.appendChild(spanmicro)

                const spanmicro2 = document.createElement('span')
                spanmicro2.classList.add(styles['search__results__browsers__dot__white'])
                elementDiv.appendChild(spanmicro2)
                index++
            }
        }
    }
}

export default function create_Div(url_name,validate){
    //const app = document.getElementById('trust_content');
    
    const app = document.getElementById('trust_content');
    const styles_card = document.createElement('div');
    styles_card.classList.add(styles['card'])

    const listItem = document.createElement('div')
    listItem.classList.add(styles['card_url'])

    const urlname = document.createElement('p')
    urlname.textContent = `${url_name}`
    urlname.classList.add(styles['style_p'])
    listItem.appendChild(urlname)
    
    const navegadores = document.createElement('div')
    navegadores.classList.add(styles['search__results__browsers'])
    
    // //microsft edge
    console.log(validate)
    console.log(validate.isEdge)
    console.log(typeof validate.isEdge)

    const micro = document.createElement('div')
    const urlmicro = document.createElement('p')
    urlmicro.textContent = 'Microsoft Edge' 

    micro.appendChild(urlmicro)
    createSpan(micro,validate.isEdge)

    //// google Chrome
    const google = document.createElement('div')
    const urlgoogle = document.createElement('p')
    urlgoogle.textContent = 'Google Chrome'

    google.appendChild(urlgoogle)
    createSpan(google,validate.isChrome)



    const firefox = document.createElement('div')
    const urlfirefox = document.createElement('p')
    urlfirefox.textContent = 'Mozilla Firefox' 

    firefox.appendChild(urlfirefox)
    createSpan(firefox,validate.isMozilla)


    navegadores.appendChild(micro)
    navegadores.appendChild(google)
    navegadores.appendChild(firefox)

    styles_card.appendChild(listItem)
    styles_card.appendChild(navegadores)

    app.appendChild(styles_card)
    return true;
}