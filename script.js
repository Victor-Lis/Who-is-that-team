const input = document.querySelector("#url")

async function getPrediction() {

    if (document.querySelector("#url").value.length > 0) {

        let url = document.querySelector("#url").value

        document.querySelector(".content-box").innerHTML = `
        
        <h2 style="color: #fff; font-weight: bold;"> <strong style="color: #3EBDFF">Qual</strong> é esse <strong style="color: #3EBDFF">time</strong>? </h2>

        <div class="input-box">

            <h3 class="input-title"> Insira a URL da imagem </h3>
            <input type="url" class="input-url" id='url'>
            <button class="input-button" onclick="getPrediction()"> Enviar </button>

        </div>
        
        <div class='card'>  
        
            <h4> Carregando... </h4>

        </div>

        `

        let data = await fetch(
            "https://eastus2.api.cognitive.microsoft.com/customvision/v3.0/Prediction/296b68b1-0da2-4455-92f7-3ddcb30ab0f1/classify/iterations/Iteration5/url",
            {

                method: "POST",
                headers: {
                    "Prediction-Key": "28dba1f169e444de817ef3a80b136773",
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
                <button class="input-button" onclick="getPrediction()"> Enviar </button>
    
            </div>
            
            <div class='card'>  
            
                <h4 style='color: #fff'> <strong style='color: red'> Error</strong>.<strong style='color: red'>.</strong>. Formato Inválido </h4>
    
            </div>

            `

        }

        if (data.predictions) {

            console.log(data.predictions)
            data.predictions.map(predict => {

                let div = document.createElement("div")
                div.classList.add("card")

                let tag = document.createElement('h4')
                tag.innerText = predict.tagName

                let percent = document.createElement('h4')
                percent.innerText = Math.floor(parseFloat(`${predict.probability}`.slice(0, 4)) * 100) + "%"

                div.appendChild(tag)
                div.appendChild(percent)
                document.querySelector(".content-box").appendChild(div)

            })
        }

        document.querySelector("#url").value = ''
    }

}