const url = `https://api.imgur.com/3/image`;

const urlCustomVisionAI = `******`
const predictionKey = '******'
const apiKey = "******";

const input = document.querySelector("#url")

const setPage = (type) => {

    if(type == "URL"){

        document.querySelector("#nav-URL").style.color = "#297ca9"
        document.querySelector("#nav-Upload").style.color = "#3EBDFF"

        document.querySelector(".content-box").innerHTML = `
        
        <h2 style="color: #fff; font-weight: bold;"> <strong style="color: #3EBDFF">Qual</strong> é esse <strong style="color: #3EBDFF">time</strong>? </h2>

        <div class="input-box">

            <h3 class="input-title"> Insira a URL da imagem </h3>
            <input type="url" class="input-url" id='url'>
            <img src="" id="img" style="width: 100%; border-radius: 10px; margin: 05px 0;">
            <button class="input-button" onclick="getPrediction()"> Enviar </button>

        </div>

        `

    }else{

        document.querySelector("#nav-URL").style.color = "#3EBDFF"
        document.querySelector("#nav-Upload").style.color = "#297ca9"

        document.querySelector(".content-box").innerHTML = `
        
        <h2 style="color: #fff; font-weight: bold;"> <strong style="color: #3EBDFF">Qual</strong> é esse <strong style="color: #3EBDFF">time</strong>? </h2>

        <div class="input-box">

            <input class='input-url' style="background-color: #fff; margin: 05px 0" type="file" id="image">
            <img src="" id="img" style="width: 100%; border-radius: 10px; margin: 05px 0;">
            <button class="input-button" onclick="uploadImage()">Upload</button>

        </div>

        `

    }

}


const setImg = () => {

    let url = document.querySelector("#url").value
    document.querySelector("#img").src = url

}


async function getPrediction() {
    
    if (document.querySelector("#url").value.length > 0) {

        let url = document.querySelector("#url").value

        document.querySelector(".content-box").innerHTML = `
        
        <h2 style="color: #fff; font-weight: bold;"> <strong style="color: #3EBDFF">Qual</strong> é esse <strong style="color: #3EBDFF">time</strong>? </h2>

        <div class="input-box">

            <h3 class="input-title"> Insira a URL da imagem </h3>
            <input type="url" class="input-url" id='url'>
            <img src="${url}" id="img" style="width: 100%; border-radius: 10px; margin: 05px 0;">
            <button class="input-button" onclick="getPrediction()"> Enviar </button>

        </div>
        
        <div class='card'>  
        
            <h4> Carregando... </h4>

        </div>

        `

        let data = await fetch(
            urlCustomVisionAI,
            {

                method: "POST",
                headers: {
                    "Prediction-Key": predictionKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    url,

                }),

            }
        ).then(res =>

            res.json()

        ).catch(err => {

            document.querySelector(".content-box").innerHTML = `
        
            <h2 style="color: #fff; font-weight: bold;"> <strong style="color: #3EBDFF">Qual</strong> é esse <strong style="color: #3EBDFF">time</strong>? </h2>

            <div class="input-box">
    
                <h3 class="input-title"> Insira a URL da imagem </h3>
                <input type="url" class="input-url" id='url'>
                <img src="" id="img" style="width: 100%; border-radius: 10px; margin: 05px 0;">
                <button class="input-button" onclick="getPrediction()"> Enviar </button>
    
            </div>
            
            <div class='card'>  
            
                <h4 style='color: #fff'> <strong style='color: red'> Error</strong>.<strong style='color: red'>.</strong>. Formato Inválido </h4>
    
            </div>
    
            `

        })

        if(data.code == "BadRequestImageUrl"){

            document.querySelector(".content-box").innerHTML = `
            
            <h2 style="color: #fff; font-weight: bold;"> <strong style="color: #3EBDFF">Qual</strong> é esse <strong style="color: #3EBDFF">time</strong>? </h2>

            <div class="input-box">
    
                <h3 class="input-title"> Insira a URL da imagem </h3>
                <input type="url" class="input-url" id='url'>
                <img src="" id="img" style="width: 100%; border-radius: 10px; margin: 05px 0;">
                <button class="input-button" onclick="getPrediction()"> Enviar </button>
    
            </div>
            
            <div class='card'>  
            
                <h4 style='color: #fff'> <strong style='color: red'> Error</strong>.<strong style='color: red'>.</strong>. Formato Inválido </h4>
    
            </div>

            `

        }

        if (data.predictions) {

            document.querySelector(".content-box").innerHTML = `
            
            <h2 style="color: #fff; font-weight: bold;"> <strong style="color: #3EBDFF">Qual</strong> é esse <strong style="color: #3EBDFF">time</strong>? </h2>

            <div class="input-box">
    
                <h3 class="input-title"> Insira a URL da imagem </h3>
                <input type="url" class="input-url" id='url'>
                <img src="${url}" id="img" style="width: 100%; border-radius: 10px; margin: 05px 0;">
                <button class="input-button" onclick="getPrediction()"> Enviar </button>
    
            </div>

            `

            // console.log(data.predictions)
            data.predictions.map(predict => {

                let div = document.createElement("div")
                div.classList.add("card")

                let tag = document.createElement('h4')
                tag.innerText = predict.tagName

                let percent = document.createElement('h4')
                percent.innerText = Math.floor(parseFloat(`${predict.probability}`.slice(0, 4)) * 100) > 100? "0%": Math.floor(parseFloat(`${predict.probability}`.slice(0, 4)) * 100)+"%"

                div.appendChild(tag)
                div.appendChild(percent)
                document.querySelector(".content-box").appendChild(div)

            })
        }

        document.querySelector("#url").value = ''
    }

}


const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", document.querySelector("#image").files[0]);
    
    // Faça a solicitação HTTP
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", `Client-ID ${apiKey}`);
    xhr.send(formData);

    // Processe a resposta
    xhr.onload = async function () {

        document.querySelector(".content-box").innerHTML = `
            
        <h2 style="color: #fff; font-weight: bold;"> <strong style="color: #3EBDFF">Qual</strong> é esse <strong style="color: #3EBDFF">time</strong>? </h2>

        <div class="input-box">

            <input class='input-url' style="background-color: #fff; margin: 05px 0" type="file" id="image">
            <img src="" id="img" style="width: 100%; border-radius: 10px; margin: 5px 0;">
            <button class="input-button" onclick="uploadImage()">Upload</button>

        </div>
        
        <div class='card'>  
        
            <h4> Carregando... </h4>

        </div>

        `
        
        if (xhr.status === 200) {
            // Obtenha o link para a imagem
            const link = JSON.parse(xhr.responseText).data.link;
            const img = link
            let data = await fetch(
                urlCustomVisionAI,
                {
    
                    method: "POST",
                    headers: {
                        "Prediction-Key": predictionKey,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
    
                        url: link,
    
                    }),
    
                }
            ).then(res =>
    
                res.json()
    
            ).catch(err => {

                document.querySelector(".content-box").innerHTML = `
            
                <h2 style="color: #fff; font-weight: bold;"> <strong style="color: #3EBDFF">Qual</strong> é esse <strong style="color: #3EBDFF">time</strong>? </h2>
    
                <div class="input-box">

                    <input class='input-url' style="background-color: #fff; margin: 05px 0" type="file" id="image">
                    <img src="" id="img" style="width: 100%; border-radius: 10px; margin: 5px 0;">
                    <button class="input-button" onclick="uploadImage()">Upload</button>
    
                </div>
                
                <div class='card'>  
                
                    <h4 style='color: #fff'> <strong style='color: red'> Error</strong>.<strong style='color: red'>.</strong>. Formato Inválido </h4>
        
                </div>
        
                `
    
            })

            if(data.code == "BadRequestImageUrl"){
                
                document.querySelector(".content-box").innerHTML = `
                
                <h2 style="color: #fff; font-weight: bold;"> <strong style="color: #3EBDFF">Qual</strong> é esse <strong style="color: #3EBDFF">time</strong>? </h2>
    
                <div class="input-box">

                    <input class='input-url' style="background-color: #fff; margin: 05px 0" type="file" id="image">
                    <img src="" id="img" style="width: 100%; border-radius: 10px; margin: 5px 0;">
                    <button class="input-button" onclick="uploadImage()">Upload</button>
    
                </div>
                
                <div class='card'>  
                
                    <h4 style='color: #fff'> <strong style='color: red'> Error</strong>.<strong style='color: red'>.</strong>. Formato Inválido </h4>
        
                </div>
    
                `
    
            }

            if (data.predictions) {

                console.log(img)
                document.querySelector(".content-box").innerHTML = `
                
                <h2 style="color: #fff; font-weight: bold;"> <strong style="color: #3EBDFF">Qual</strong> é esse <strong style="color: #3EBDFF">time</strong>? </h2>
    
                <div class="input-box">

                    <input class='input-url' style="background-color: #fff; margin: 05px 0" type="file" id="image">
                    <img src="" id="img" style="width: 100%; border-radius: 10px; margin: 5px 0;">
                    <button class="input-button" onclick="uploadImage()">Upload</button>
    
                </div>
    
                `
    
                // console.log(data.predictions)
                data.predictions.map(predict => {
    
                    let div = document.createElement("div")
                    div.classList.add("card")
    
                    let tag = document.createElement('h4')
                    tag.innerText = predict.tagName
    
                    let percent = document.createElement('h4')
                    percent.innerText = Math.floor(parseFloat(`${predict.probability}`.slice(0, 4)) * 100) > 100? "0%": Math.floor(parseFloat(`${predict.probability}`.slice(0, 4)) * 100)+"%"
    
                    div.appendChild(tag)
                    div.appendChild(percent)
                    document.querySelector(".content-box").appendChild(div)
    
                })
            }

        } else {
            // Erro ao fazer upload da imagem
            console.log("Erro ao fazer upload da imagem: " + xhr.status);
        }
    };

}
