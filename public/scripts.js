let ddd_origem = document.querySelector("#ddd-origem");
let ddd_destino = document.querySelector("#ddd-destino");
let plano_form = document.querySelector("#plano");
let minutos_form = document.querySelector("#minutos");

let form_calculadora = document.querySelector("#form-calculadora");

ddd_origem.addEventListener("change", (e)=>{
    /*
        0 = 011 - São Paulo
        1 = 016 - Ribeirão Preto
        2 = 017 - São José do Rio Preto
        3 = 018 - Presidente Prudente
    */
   console.log(ddd_origem.selectedIndex);
    if(ddd_origem.selectedIndex === 0){

        ddd_destino.options[0].disabled = true;

        ddd_destino.options[1].disabled = false;
        ddd_destino.options[2].disabled = false;
        ddd_destino.options[3].disabled = false;

        ddd_destino.options[1].selected = true;

    } else {
        ddd_destino.options[0].disabled = false;
        ddd_destino.options[0].selected = true;

        ddd_destino.options[1].disabled = true;
        ddd_destino.options[2].disabled = true;
        ddd_destino.options[3].disabled = true;
    }
    
});

form_calculadora.addEventListener("submit", (e)=>{

    e.preventDefault();

    let dddOrigem = ddd_origem.options[ddd_origem.selectedIndex].value;
    let dddDestino = ddd_destino.options[ddd_destino.selectedIndex].value;
    let plano = plano_form.options[plano_form.selectedIndex].value;
    let minutos = minutos_form.value;

    console.log({
        dddOrigem,
        dddDestino,
        plano,
        minutos
    });

    console.log(`/api/orapma?origem=${dddOrigem}&destino=${dddDestino}&plano=${plano}&minutos=${minutos}`);

    fetch(`/api/orapma?origem=${dddOrigem}&destino=${dddDestino}&plano=${plano}&minutos=${minutos}`).then(response =>{
        response.json().then(result =>{

            let economia = parseFloat(result.valorSemPlano.replace("R$", "")) - parseFloat(result.valorComPlano.replace("R$", ""));
            console.log(economia);
            economia = economia.toFixed(2);

            document.querySelector("#valor-plano").innerHTML = result.valorComPlano;
            document.querySelector("#valor-sem-plano").innerHTML = result.valorSemPlano;
            document.querySelector("span#plano").innerHTML = result.plano;
            document.querySelector("span#minutos").innerHTML = result.plano;

            if(economia < 0){
                document.querySelector("span#economia").innerHTML = `Sem economia`
            } else {
                document.querySelector("span#economia").innerHTML = `Economize R$ ${economia}`;
            }
            
        });
    }).catch((error)=>{
        console.log(error);
    });

    document.querySelector(".card-valores").style.opacity = "1";
});