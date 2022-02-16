var current = new Date();
var date = current.getFullYear() + "-" + (current.getMonth()+1) + "-" + (current.getDate());

var request = new XMLHttpRequest()
var url = "https://api.nasa.gov/neo/rest/v1/neo/browse?" + "&api_key=UTqFSTxLDgCaDehRmpx56I0q0NV03tDqELijXeZL" 
request.open('GET', url, true)
request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    data["near_earth_objects"].forEach( obj => {
        var fulldiv = document.createElement("div")
        fulldiv.setAttribute("style", "border-top: 1px solid #000;border-bottom: 1px solid #000;")

        var explanation = document.createElement('p')
        explanation.setAttribute("style", "display:inline-block; width: 30%");
        explanation.innerHTML =  "<h1>"+obj['name'] + "</h1>"+ "<p> Id: "+ obj["id"]+ "</p><p>Approximate Diameter (m): "+ Math.round(obj["estimated_diameter"]["meters"]["estimated_diameter_max"])+"</p><p>"+"Absolute Magnitude: "+obj["absolute_magnitude_h"]+"</p>"+ " <p> Hazerdous: " + obj["is_potentially_hazardous_asteroid"] + "</p><p> Sentry: " + obj["is_sentry_object"] + "</p>" 
        
        var explanation1 = document.createElement('p')
        explanation1.setAttribute("style", "display:inline-block; width: 50%;margin-right:30%");
        explanation1.innerHTML = "<h1> Close Approaches </h1>"

        //APPROACH data in dropdown
        var values = obj["close_approach_data"];
        
        var select = document.createElement("div");
        select.setAttribute("style", "height:180px;overflow:scroll; overflow-x:hidden")
        select.name = "approach_data";
        select.id = "approach_data"

        for (const val of values) {
            var option = document.createElement("p");
            option.setAttribute("style", "border-top: 1px solid #000;border-bottom: 1px solid #000;");
            option.innerHTML = "<b>Approach Date:</b><p> " + val["close_approach_date"] + " </p><b>Miss Distance:</b><p> " + val["miss_distance"]["kilometers"] + " km</p>";
            select.appendChild(option);
        }
        
        var label = document.createElement("h1");
        label.innerHTML = "Close approach data: "
        label.htmlFor = "approach_data";

        var text = fulldiv.appendChild(explanation)
        var text1 = fulldiv.appendChild(explanation1)
        text1.append(select)
        text.style.margin = 64;
        text.style.whiteSpace = "pre-line";
        text1.style.margin = 0;
        text1.style.whiteSpace = "pre-line";

        document.getElementById('background_square').appendChild(fulldiv)
    } )
    
}

request.send()