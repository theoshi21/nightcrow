
var dia2Crow = [0,0,0,0,0,0];
var val = [0,0,0,0,0,0];
var dia2PHP = [0,0,0,0,0,0];

function calculate(){
    var crow = parseFloat(document.getElementById("crow_price").value) || 0.75;
    var curr_dia = parseFloat(document.getElementById("curr_dia").value) || 1;
    diaToCrow()
    percentVal()
    diaToPHP(crow, curr_dia);
    createTable()
}

function diaToCrow(){
    for(i = 0; i < 6; i++){
        marketid = "market"+i;
        crowid = "crow_equiv"+i;

        marketval = parseFloat(document.getElementById(marketid).value) || 0;
        crowval = parseFloat(document.getElementById(crowid).value) || 0;
        
        if (crowval === 0){
            dia2Crow[i] = 0;
        } else{
            dia2Crow[i] = (i === 0 || i === 5) ? (marketval*10 / crowval).toFixed(2) :dia2Crow[i] = (marketval / crowval).toFixed(2);
        }
    }
}

function percentVal(){
    for(i = 0; i < 6; i++){
        if(dia2Crow[i] === 0){
            val[i] = 0;
        }
        else {
            val[i] = (84 / dia2Crow[i] * 100).toFixed(2);
        }
    }
}

function diaToPHP(crow, curr_dia){
    console.log(`currentDia: ${curr_dia}`)
    for(i = 0; i < 6; i++){
        console.log(`${i}: ${dia2Crow[i]}`)
        dia2PHP[i] = (((crow / dia2Crow[i]) * 55) * curr_dia).toFixed(2);

        console.log(`${i}: ${dia2PHP[i]}`)
        if(dia2PHP[i] == Infinity) dia2PHP[i] = 0;
    }
}



function createTable(){
    let disp = "<tr> <td class='type'> DIA → CROW </td>";
    const classes = ["morion", "feather", "tear", "gear", "hsoa", "papyrus"]; 

    for(i = 0; i < 6; i++){
        disp += "<td class='" + classes[i] + "'> <p id='dcrow"+i+"'>"+dia2Crow[i]+"</p> </td>";
    }

    disp += "</tr> <tr> <td class='type'> % VALUE OF DIA </td>";
    for(i = 0; i < 6; i++){
        disp += "<td class='" + classes[i] + "'> <p id='val"+i+"'>"+val[i]+"%</p> </td>";
    }

    disp += "</tr> <tr> <td class='type'> DIA → PHP </td>";
    for(i = 0; i < 6; i++){
        disp += "<td class='" + classes[i] + "'> <p id='diaphp"+i+"'>₱"+dia2PHP[i]+"</p> </td>";
    }

    disp += "</tr>";
    document.getElementById("computedVal").innerHTML = disp;
}