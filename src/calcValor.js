const calcSemPlano = (minutos, taxa)=>{ return minutos * taxa };

const calcComPlano = (minutos, taxa, plano)=>{

    let minutosExcedentes = minutos - parseInt(plano);

    if(minutosExcedentes <= 0){
        return 0.00
    } else {
        if(plano === "30"){
            return minutosExcedentes * (taxa * 1.1);
        } else if(plano === "60"){
            return minutosExcedentes * (taxa * 1.1);

        } else if(plano === "120"){
            return minutosExcedentes * (taxa * 1.1);
        }
    }

};

const calcValores = (origem, destino, minutos, plano)=>{

    let valorSemPlano;
    let valorComPlano;
    
    if(origem === "011"){

        if(destino === "016"){ 
            valorComPlano = calcComPlano(minutos, 1.90, plano);
            valorSemPlano = calcSemPlano(minutos, 1.90);
        } else if(destino === "017"){
            valorComPlano = calcComPlano(minutos, 1.70, plano);
            valorSemPlano = calcSemPlano(minutos, 1.70);
        } else if(destino === "018"){
            valorComPlano = calcComPlano(minutos, 0.9, plano);
            valorSemPlano = calcSemPlano(minutos, 0.9);
        }

    } else if(destino === "011"){

        if(origem === "016"){
            valorComPlano = calcComPlano(minutos, 2.90, plano);
            valorSemPlano = calcSemPlano(minutos, 2.90);
        } else if(origem === "017"){
            valorComPlano = calcComPlano(minutos, 2.70, plano);
            valorSemPlano = calcSemPlano(minutos, 2.70);
        } else if(origem === "018"){
            valorComPlano = calcComPlano(minutos, 1.90, plano);
            valorSemPlano = calcSemPlano(minutos, 1.90);
        }

    }

    return {
        valorComPlano: `R$ ${valorComPlano.toFixed(2)}`,
        valorSemPlano: `R$ ${valorSemPlano.toFixed(2)}`,
        plano,
    }
};

module.exports = {
    calcValores
}