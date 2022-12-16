import styles from '../styles/Home.module.css'
import stylesCert from '../styles/Cert.module.css'

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
function showModalCerts(e) {
    e.preventDefault();
    const myModal = document.getElementById('myModal');
    const divButton = document.getElementById("main_button_veri_modal"+e.currentTarget.myParam);
    //** mostrar modal*/
    myModal.style.display='block';
    const close_modal = document.getElementById('close_modal');
    //** */
    const url_name = divButton.firstElementChild.value;
    
    console.log("contador: " + e.currentTarget.myParam);
    console.log("valor del botoon: " + url_name);
    
    const getCerts = async (e, path) => {
    const url_Val = 'http://localhost:3000/api/getChainCerts'
    try {
        const res_Val = await fetch(url_Val ,{
            method: 'POST',
            body: url_name,
            headers: {
                Accept: 'application/json',
            },
        });
        const chain_certs = await res_Val.json();
        // console.log("certificados: ", chain_certs);
        // console.log(chain_certs.subject[0].O);
        
        for (var idx = 0; idx < chain_certs.subject.length; idx++) {
            const content_modal = document.getElementById('modal_content_cert');
            


            if (idx == 0) {
                const h2_ = document.createElement('h2');
                h2_.textContent = "End-entity Certificate"
                content_modal.appendChild(h2_);

            }else if (idx == chain_certs.subject.length - 1) {
                const h2_ = document.createElement('h2');
                h2_.textContent = "Root Certificate"
                content_modal.appendChild(h2_);
            }else{
                const h2_ = document.createElement('h2');
                h2_.textContent = "Intermediate Certificate"
                content_modal.appendChild(h2_);
            }
            
    
            const div_root = document.createElement('div');
            div_root.classList.add(stylesCert['content_cert']);

            const div1 = document.createElement('div');
            const img_ = document.createElement('img');
            img_.setAttribute("src", "/certificate.png");
            img_.classList.add(stylesCert['content_cert_imgCert']);
            div1.appendChild(img_);
            
            const div2 = document.createElement('div');
            div2.classList.add(stylesCert['content_cert_data']);
            const p1 = document.createElement('h4');
            p1.textContent = 'Subject ==> ' + chain_certs.subject[idx].CN;
            const p2 = document.createElement('h4');
            p2.textContent = 'Issuer  ==> ' + chain_certs.issuer[idx].CN;
            const p3 = document.createElement('h4');
            p3.textContent = 'Valid_from: ==> ' + chain_certs.valid_from[idx] + ' - '+'Valid_to: ' + chain_certs.valid_to[idx]; 
            const p4 = document.createElement('h4');
            p4.textContent = 'Fingerprint: ==> ' + chain_certs.fingerprint[idx];
    
            div2.appendChild(p1);
            div2.appendChild(p2);
            div2.appendChild(p3);
            div2.appendChild(p4);
    
            div_root.appendChild(div1);
            div_root.appendChild(div2);
            content_modal.appendChild(div_root);    
        }

        
    
    } catch (err) {
        console.log(err.message);
    }};

    getCerts();

    //** modal close*/
    close_modal.onclick = function() {
        myModal.style.display='none';
        const content_modal = document.getElementById('modal_content_cert');
        content_modal.innerHTML = "";
    }
}

export default function create_Div(url_name,validate,contador){
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
    // console.log(validate)
    // console.log(validate.isEdge)
    // console.log(typeof validate.isEdge)

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

    

    const button = document.createElement('div');
    button.classList.add(styles['main_button_show']);
    button.setAttribute("id", "main_button_veri_modal"+contador);
    
    const input_ = document.createElement('input');
    input_.classList.add(styles['input_value']);
    input_.setAttribute("value", url_name);
    button.appendChild(input_);
    
    const div_button = document.createElement('div');
    div_button.setAttribute("id", "circle");
    
    const a_div_button = document.createElement('a');
    a_div_button.classList.add(styles['textcolor']);
    a_div_button.textContent = "Ver";
    a_div_button.addEventListener("click", showModalCerts,false);
    a_div_button.myParam = contador;
    
    div_button.appendChild(a_div_button);
    button.appendChild(div_button);

    app.appendChild(styles_card);
    styles_card.appendChild(button);
    return true;
}