
# Who's that team?

Esse é o meu primeiro projeto utilizando a API da Azure ML, plataforma na qual tive a oportunidade de aprender um pouco sobre IAs.



## Desafios

Acredito que meus principais desafios nesse projeto foram envolvendo envio e recebimento de dados da web.




## Aprendizados

Por final aprendi algumas coisas interessantes como: 



#### Fazer uma requisição HTTP usando fetch com um método != de GET

```javascript
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
)
```

#### Trabalhar com FormData()
Nunca havia trabalhado com dados no formato FormData(), foi minha primeira vez nesse projeto.


```javascript
const formData = new FormData();
formData.append("image", document.querySelector("#image").files[0]);
```

#### Trabalhar com XMLHttpRequest()
Também nunca havia trabalhado com FormDataXMLHttpRequest(), então foi minha primeira vez.

```javascript
const xhr = new XMLHttpRequest();

xhr.open("POST", url);
xhr.setRequestHeader("Authorization", `Client-ID ${apiKey}`);
xhr.send(formData);

xhr.onload = async function () {...}
```
## Autores

- [@Victor-Lis](https://github.com/Victor-Lis)

