import { useState , useEffect } from 'react'
import Head from 'next/head'
import $ from "jquery"
import Image from 'next/image'
import Link from "next/link";
//import Router, { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'
import stylesModal from '../styles/Modal.module.css'

import validate_url from './validate_url'
import validate_protocol from './validate_protocol'
import validate_TC from './validate_chainTrust'
import create_Div from './createDivTrust'
import create_Div2 from './createDivTrus2'

const listUrl = [];
let cont = 0;

export default function Home() {

  //const [data, setData] = useState({data: []});
  const [isLoading, setIsLoading] = useState(false);
  let [isExist, setExist]  = useState(false);

  const handleClickRemove = (e,id) => {
    e.preventDefault()

    if(isExist){
      let element = document.getElementById(id);
      //element.remove();
      element.innerHTML = "";
      setExist(false)
      console.log("ELIMINADO")
    }
  }

  const handleClickTxt = async (nameURL) => {

    if (listUrl.indexOf(nameURL) < 0) {
      listUrl.push(nameURL);
      const isLink = validate_url(nameURL);
      
      console.log(isLink);
      if (nameURL == ""){
        alert('Rellene el campo');
      }
      else if (isLink) {
        const showProtocol = validate_protocol(nameURL);
        if (showProtocol.protocol == 'https:') {

          setIsLoading(true);
          const url_ = `http://localhost:3000/api/getCERT`

          try {
            const response = await fetch(url_ ,{
              method: 'POST',
              body: showProtocol.host,
              headers: {
                Accept: 'application/json',
              },
            });
      
            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
      
            const result = await response.json();
            console.log('result is: ', JSON.stringify(result, null, 4));
      
            const alertPlaceholder = document.getElementById('AlertExito')  
            const alert = (message, type) => {
              const wrapper = document.createElement('div')
              wrapper.innerHTML = [
                `<div id = "alertsucces" class="alert alert-${type} alert-dismissible" role="alert">`,
                '<div>',
                '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-circle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Success:">',
                '  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>',
                '</svg>',
                `   ${message}</div>`,
                '   <button id = "buttonalert" type="button" class="btn-close" data-coreui-dismiss="alert" aria-label="Close"></button>',
                '</div>'
              ].join('')
            
              alertPlaceholder.append(wrapper)
            }
        
            if (result){
              alert('Certificado Adquirido', 'success')
              await validate_TC(showProtocol.host)
              
              setTimeout(async () => {
                const url_Val = 'http://localhost:3000/api/getValidates'
                try {
                  const res_Val = await fetch(url_Val ,{
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                    },
                  });
                  const validate = await res_Val.json();
                  cont++;
                  create_Div(showProtocol.host,validate,cont) // crea los span 

                  setExist(true)
                  

                } catch (err) {
                  console.log(err.message);
                }}, 2500);
            }
            else alert('No existe el certificado', 'warning')
            
            var $btnAction = $("#buttonalert");

            $btnAction.on("click", function() {
              $("#alertsucces").remove();
              
            });
            //setData(result);

          } catch (err) {
            console.log(err.message);
          } finally {
            setIsLoading(false);
          }
          //Router.push('/validateCert')
          

        }else{
          alert('Protocolo inseguro: ', showProtocol.protocol );
          create_Div2(showProtocol.host)
        }
        
      }else{
        alert('El dato ingresado no corresponde a una URL');
      }
    }else{
        alert('La Url ya fue solicitada');
    }
  };

  const handleClick = async (e, path) => {
    e.preventDefault()
    if (path === "/verificar") {
      const nameURL = document.querySelector('#linkUrl').value

      if (listUrl.indexOf(nameURL) < 0) {
        listUrl.push(nameURL);
        const isLink = validate_url(nameURL);
        
        console.log(isLink);
        if (nameURL == ""){
          alert('Rellene el campo');
        }
        else if (isLink) {
          const showProtocol = validate_protocol(nameURL);
          if (showProtocol.protocol == 'https:') {

            setIsLoading(true);
            const url_ = `http://localhost:3000/api/getCERT`

            try {
              const response = await fetch(url_ ,{
                method: 'POST',
                body: showProtocol.host,
                headers: {
                  Accept: 'application/json',
                },
              });
        
              if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
              }
        
              const result = await response.json();
              console.log('result is: ', JSON.stringify(result, null, 4));
        
              const alertPlaceholder = document.getElementById('AlertExito')  
              const alert = (message, type) => {
                const wrapper = document.createElement('div')
                wrapper.innerHTML = [
                  `<div id = "alertsucces" class="alert alert-${type} alert-dismissible" role="alert">`,
                  '<div>',
                  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-circle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Success:">',
                  '  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>',
                  '</svg>',
                  `   ${message}</div>`,
                  '   <button id = "buttonalert" type="button" class="btn-close" data-coreui-dismiss="alert" aria-label="Close"></button>',
                  '</div>'
                ].join('')
              
                alertPlaceholder.append(wrapper)
              }
          
              if (result){
                alert('Certificado Adquirido', 'success')
                await validate_TC(showProtocol.host)
                
                setTimeout(async () => {
                  const url_Val = 'http://localhost:3000/api/getValidates'
                  try {
                    const res_Val = await fetch(url_Val ,{
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                      },
                    });
                    const validate = await res_Val.json();
                    cont++;
                    create_Div(showProtocol.host,validate,cont) // crea los span 

                    setExist(true)
                    

                  } catch (err) {
                    console.log(err.message);
                  }}, 2500);
              }
              else alert('No existe el certificado', 'warning')
              
              var $btnAction = $("#buttonalert");

              $btnAction.on("click", function() {
                $("#alertsucces").remove();
                
              });
              //setData(result);

            } catch (err) {
              console.log(err.message);
            } finally {
              setIsLoading(false);
            }
            //Router.push('/validateCert')
            

          }else{
            alert('Protocolo inseguro: ', showProtocol.protocol );
            create_Div2(showProtocol.host)
          }
          
        }else{
          alert('El dato ingresado no corresponde a una URL');
        }
      }else{
          alert('La Url ya fue solicitada');
      }
     
    }else if (path === "/Archivos"){
      console.log("Archivos")
      const input_file = document.getElementById('input-file-txt');
      input_file.click();
       
      input_file.addEventListener("change",handleFiles,false);
    
      function handleFiles() {
        const fileList = this.files;
        const numFIles = fileList.length;
        const extPermit = /(.txt)$/i;

        for (let index = 0; index < numFIles; index++) {
          const file_ = fileList[index];
          if (extPermit.exec(file_.name)) {  
            // console.log(file_.name);
            // console.log(file_.type);

            if (this.files && this.files[0]) {
              
              let visor = new FileReader();
              visor.onload = async function(e) {
                const txtFile = e.target.result;
                console.log("resultados",txtFile)

                txtFile.toString().split(/\n/).forEach(function(name_url_txt){
                  // do something here with each line
                  setTimeout(() => {handleClickTxt(name_url_txt);}, 2000);
                  console.log("url: ", name_url_txt);
                  });
              }
              visor.readAsText(this.files[0]);
            }
          }else{
            alert("no es un archivo .txt")
          }
        }
      }

      // try {
      //   const response = await fetch("./public/exampleTxt.txt").then(function(res){
      //                   return res.text();
      //             }).then(function (data) {
      //               console.log(data);
      //             })  
      // } catch (error) {
      //   console.log(error)
      // }
      
    }
  };

  return (
      
      <div className={styles.container}>
        <Head>
         <title>Verify your Certification Digital Free</title>
         <meta name="description" content="Generated by create next app" />
         <link rel="icon" href="/favicon.ico" />
        </Head>
        <div id="AlertExito"></div>

        <main className={styles.main}>
          <h2 className={styles.title}>
            Digital Certicates Trust Verifer
          </h2>
          
          <div>
            <form className={styles.main_form}>
              <div className={styles.main_form_inputs}>
                <input className={styles.controls} type="url" name="linkUrl" id="linkUrl" placeholder="[ ingresar URL a verificar ]"></input>

                <div className={styles.main_button} id="main_button_veri">
                  <div id="circle"></div>
                  <Link href="">
                    <a onClick={(e) => handleClick(e, "/verificar")}  className={styles.textcolor}>Verificar</a>
                  </Link>
                  {/* <a href="#">Verificar</a> */}
                </div>

                <div className={styles.main_button} id="main_button_veri">
                  <div id="circle"></div>
                  <Link href="/">
                    {/* <button></button> */}
                    <a onClick={(e) => handleClick(e, "/Archivos")} className={styles.textcolor} >Archivos</a>
                  </Link>
                </div>
                <input type="file" id="input-file-txt" hidden multiple/>
              </div>
              
            </form>
          </div>

    
          <div id = "trust_content"></div>
          <div id="myModal" className={stylesModal.modalContainer}>
            <div className={stylesModal.modal_content}> 
              <span className={stylesModal.close} id = "close_modal">X</span>
              <h1 className={stylesModal.title} >Certificados</h1>
              <p>Caracteristicas de las cadenas de certificados</p>
              <div id = "modal_content_cert"></div>
            </div>

          </div>

          <div className={styles.main_button} id="main_button_veri">
            <div id="circle"></div>
            <Link href="/">
              <a onClick={(e) => handleClickRemove(e, "trust_content")} className={styles.textcolor} >Limpiar Todo</a>
            </Link>
          </div>
          {/* <div className={styles.button_clear}>
            <button type="button" class="button-clear__all">
              Limpiar todo
            </button>
          </div> */}

        </main>


        <footer className={styles.footer}>
          <Link
                href={{
                pathname: "/generateTable",
                query: {
                  id: 1,
                  contentPEM: "MozillaRootsPEM"
              }
          }}
          >
            <a className = {styles.text_link} >
              Ver Mozila Trust Store
              <span className={styles.logo}>
                <Image src="/firefox.svg" alt="Vercel Logo" width={30} height={20} />
              </span>
              </a>
          </Link>

          <Link
                href={{
                pathname: "/generateTable",
                query: {
                  id: 2,
                  contentPEM: "EdgeRootsPEM"
              }
          }}
          >
            <a className = {styles.text_link} >
              Ver Microsft Trust Store
              <span className={styles.logo}>
                <Image src="/edge.png" alt="Vercel Logo" width={30} height={20} />
              </span>
              </a>
          </Link>
          
          <Link
                href={{
                pathname: "/generateTable",
                query: {
                  id: 3,
                  contentPEM: "ChromeRootsPEM"
              }
          }}
          >
            <a className = {styles.text_link} >
              Ver Google Truste Store
              <span className={styles.logo}>
                <Image src="/chrome.svg" alt="Vercel Logo" width={30} height={20} />
              </span>
              </a>
          </Link>

        </footer>
        </div>
        
  )
}
