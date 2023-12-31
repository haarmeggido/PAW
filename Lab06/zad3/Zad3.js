let cities;

fetch('city.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        if(Array.isArray(data)) cities = data;
        else if (typeof data === 'object') cities = Object.keys(data).map(key => data[key]);

        var el1 = document.getElementById("el1");
        var el2 = document.getElementById("el2");
        var el3 = document.getElementById("el3");
        var el4 = document.getElementById("el4");
        var el5 = document.getElementById("el5");
        var el6 = document.getElementById("el6");
        var el7 = document.getElementById("el7");
        
        var malopolskaCities = [];
        var aCities = [];
        let cities4 = cities.slice();
        var citiesOver80k = [];
        var citiesBelow80k = [];
        var citiesOver80kcount = 0;
        var citiesBelow80kcount = 0;
        var citiesForPArea = [];
        var areAllOver5000 = false;
        var pomorskieOver5000count = 0;

        for (var i = 0; i < cities.length; i++){
            // 1
            if(cities[i]["province"]==="małopolskie"){
                malopolskaCities.push(` ${cities[i]["name"]}`)
            }
            // 2
            let a_count = 0;
            for(var j = 0; j < cities.length; j++)
                if(cities[i]["name"][j] === 'a') a_count++;
            if (a_count === 2) aCities.push(` ${cities[i]["name"]}`);
            // 4
            if(cities4[i]["people"] > 100000){
                cities4[i]["name"] += " city";
                el4.textContent += cities4[i]["name"] + " ";
            }
            // 5
            if(cities[i]["people"] > 80000){
                citiesOver80k.push(` ${cities[i]["name"]}`)
            }
            if(cities[i]["people"] < 80000){
                citiesBelow80k.push(` ${cities[i]["name"]}`)
            }
            if(cities[i]["people"] > 80000) citiesOver80kcount++;
            else citiesBelow80kcount++;
            //6
            if(cities[i]["name"][0].toUpperCase() === 'P') citiesForPArea.push(cities[i]["area"]);
            //7
            if(cities[i]["province"]==="pomorskie"){
                if(cities[i]["people"] > 5000) pomorskieOver5000count++;
                else areAllOver5000 = false;
            }
        }

        let sum = citiesForPArea.reduce((a, b) => a + b, 0);
        let mean = (sum / citiesForPArea.length).toFixed(3);

        el1.textContent = malopolskaCities;
        el2.textContent = aCities;
        el3.textContent = cities.sort(sort3)[4]["name"];
        el5.textContent = (citiesOver80kcount > citiesBelow80kcount ? "Więcej jest miast ponad 80 000 mieszkańców" : "Więcej jest miast poniżej 80 000 mieszkańców" + ` ${citiesBelow80kcount} vs ${citiesOver80kcount}`);
        el6.textContent = mean;
        el7.textContent = areAllOver5000 ? "Wszystkie są powyżej 5000 mieszkańców i jest ich " : "Nie wszystkie są powyżej 5000 mieszkańców, ma ich jedyne "
        el7.textContent += pomorskieOver5000count;
    })

function sort3(row1, row2){
    const v1 = row1["density"];
    const v2 = row2["density"];

    if (v1 > v2) return -1;
    else if (v1 < v2) return 1;
    else return 0;
}