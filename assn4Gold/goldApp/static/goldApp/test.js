
var priceMostRecent;
var val;

getMostRecentClosingGoldPrice();
document.body.setAttribute("style", "background-color: gold;");

function doAllTheStuff(){
    console.log("THIS IS IT ",priceMostRecent);
    inputValInLb = document.getElementById("userInput").value;

    console.log("you got into the getURL info function");
    const url = `http://127.0.0.1:8000/unitconv/convert?from=lb&to=t_oz&value=${inputValInLb}&type=mass`
    fetch(url) 
        .then(r=> r.json())
        .then(json=> {
            console.log("JASON FOR API",json);
            val = json.value
            console.log(val);
            resultWorth = val * priceMostRecent;
            var resultDiv = document.createElement("div");
            var resultP = document.createElement("p");
            // if (resultDiv.innerHTML !== ''){
            //     document.body.remove(resultP);
            // }
            // resultP.textContent = `You are worth  ${resultWorth} in gold!`;
            // resultP.innerHTML = `You are worth  ${resultWorth} in gold!`;
            // document.body.appendChild(resultP);
            // document.body.appendChild(resultP);
            var para = document.getElementById("resultP");
            para.innerHTML = `You are worth  ${resultWorth} in gold!`;
            return val;
        })
    console.log("VALLLLLL",val);

}
async function getMostRecentClosingGoldPrice() {
    var endDate = new Date()
    console.log("todays date: ", endDate)
    var startDate = new Date();
    startDate.setDate(endDate.getDate()-5);
    console.log("5 days ago was: ", startDate);

    var startFormatted = startDate.getFullYear() + "-" + startDate.getMonth() + "-" + startDate.getDate();
    var endFormatted = endDate.getFullYear() + "-" + endDate.getMonth() + "-" + endDate.getDate();
    console.log("startFormatted: ", startFormatted, "endFormatted: ", endFormatted);
    const url = `https://www.quandl.com/api/v3/datasets/LBMA/GOLD/data.json?&start_date=${startFormatted}&end_date=${endFormatted}&order=asc&api_key=VtzP3-_G38fVBwSAL9rS&column=1`;
    fetch(url)
        .then(r => r.json())
        .then(json => {
            console.log("THE JASON price from Quandl " + json.dataset_data.data[0][1]);
            priceMostRecent = json.dataset_data.data[0][1];
            console.log("priceMostRecent:", priceMostRecent);
            return priceMostRecent;
        }); 
}

var remove = function() {
    console.log(document.querySelector('#target'));
    var target = document.querySelector('#target');
    if (target.hasChildNodes()) {
        target.firstChild.remove();
    }
}



