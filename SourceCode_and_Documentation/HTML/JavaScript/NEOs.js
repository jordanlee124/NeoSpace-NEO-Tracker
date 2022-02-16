var current = new Date();
var day = current.getDate();
var month = current.getMonth()+1;
var year = current.getFullYear();

var neo;
var neos;
var cursors;

//Reformat day, month and year into required string
function format_date(day, month, year) {

    if (month < 10) {
        month = "0" + month
    }
    if (day < 10) {
        day = "0" + day
    }
    return year + "-" + month + "-" + day;
}

var date = format_date(day, month, year);
var end = format_date(day, month, year);

var game = new Phaser.Game($(window).width(), $(window).height(), Phaser.CANVAS, 'phaser-example', {preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('space', 'JavaScript/images/background.png');
    game.load.image('neo', 'JavaScript/images/asteroid.png');
}

function dateInput(start, end) {
    var startDate = document.getElementById(start).value;  
    var endDate = document.getElementById(end).value;  

    clear_scene(neos);
    
    get_API_data(startDate, endDate);
}

function idInput() {
    var id = {
        "health": document.getElementById("search-name").value,  
    }
    clear_scene(neos);
    neoClicked(id);
}

function sentryInput() {
    clear_scene(neos);

    var sentry = document.getElementById("sentry").checked;   
    
    //Get API data
    var request = new XMLHttpRequest()
    var url = "https://api.nasa.gov/neo/rest/v1/feed?" + `start_date=${date}&end_date=${date}&detailed=true` + "&api_key=MAMaTZmFmZig0RBXtv8MbOb1eRJSBS8R9Ev8LjvX" 
    request.open('GET', url, true)
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        
        var sentryList = new Array();
        var i = 0;
        for (const obj of data.near_earth_objects[date]) {
            if (obj["is_sentry_object"] == sentry) {
                sentryList[i] = obj;
                i += 1;
            }
        }
        var x = (game.width/(i+1));
        neos = game.add.group();
        
        neos.createMultiple((i+1), "neo")
        get_positions(sentryList, neos, x, x);
    }

    request.send()
}

function hazardInput() {
    clear_scene(neos);

    var hazard = document.getElementById("hazardous").checked;   
    
    //Get API data
    var request = new XMLHttpRequest()
    var url = "https://api.nasa.gov/neo/rest/v1/feed?" + `start_date=${date}&detailed=true` + "&api_key=MAMaTZmFmZig0RBXtv8MbOb1eRJSBS8R9Ev8LjvX" 
    request.open('GET', url, true)
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        var size = data["near_earth_objects"][date].length
        
        var hazardList = new Array();
        var i = 0;
        for (const obj of data.near_earth_objects[date]) {
            if (obj["is_potentially_hazardous_asteroid"] == hazard) {
                hazardList[i] = obj;
                i += 1;
            }
        }
        var x = (game.width/(i+1));
        neos = game.add.group();
        
        neos.createMultiple((i+1), "neo")
        get_positions(hazardList, neos, x);
    }

    request.send()
}

function orbitBodyInput() {
    clear_scene(neos);

    var body = document.getElementById("orbit-body").value;   
    
    //Get API data
    var request = new XMLHttpRequest()
    var url = "https://api.nasa.gov/neo/rest/v1/feed?" + `start_date=${date}&detailed=true` + "&api_key=MAMaTZmFmZig0RBXtv8MbOb1eRJSBS8R9Ev8LjvX" 
    request.open('GET', url, true)
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        
        var bodyList = new Array();
        var i = 0;
        for (const obj of data.near_earth_objects[date]) {
            if (obj["close_approach_data"][0]["orbiting_body"] == body) {
                bodyList[i] = obj;
                i += 1;
            }
        }
        var x = (game.width/(i+1));
        neos = game.add.group();
        
        neos.createMultiple((i+1), "neo")
        get_positions(bodyList, neos, x);
    }

    request.send()
}

function create() {
    //  This will run in Canvas mode
    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;
    game.physics.enable(game.camera, Phaser.Physics.ARCADE);

    game.world.setBounds(0, 0, game.width, 5000);

    //  A spacey background
    game.add.tileSprite(0, 0, game.width, 5000, 'space');

    game.camera.y = 5000;

    get_API_data(date, end);

    // Game input
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

}

function get_API_data(date, end) {
    var request = new XMLHttpRequest()
    var url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${end}&detailed=true&api_key=MAMaTZmFmZig0RBXtv8MbOb1eRJSBS8R9Ev8LjvX`
    request.open('GET', url, true)
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        var totalLen = 0;

        Object.keys(data.near_earth_objects).forEach(function(key) {
            totalLen += data.near_earth_objects[key].length;
        });

        var x = (game.width/totalLen)
        neos = game.add.group();
        
        neos.createMultiple(totalLen, "neo")
        var ammount = x;
        Object.keys(data.near_earth_objects).forEach(function(key) {
            x = get_positions(data.near_earth_objects[key], neos, x, key, ammount);
        });
    }

    request.send()
}

function get_positions(givenList, neos, x, key, ammount) {

    for (const obj of givenList) {
        neo = neos.getFirstExists(false)
        if (neo) {
            neo.anchor.x = 0.5
            neo.anchor.y = 0.5
            neo.height = 30 + (obj["estimated_diameter"]["meters"]["estimated_diameter_min"] + obj["estimated_diameter"]["meters"]["estimated_diameter_max"])/8;
            neo.width = 30 + (obj["estimated_diameter"]["meters"]["estimated_diameter_min"] + obj["estimated_diameter"]["meters"]["estimated_diameter_max"])/8;
            neo.rotation = Math.random()*15;
            neo.reset(x, 4600/*height*/ - 22*obj["close_approach_data"][0]["miss_distance"]["lunar"], obj["id"]);
            neo.inputEnabled = true;
            neo.events.onInputDown.add(neoClicked, {param1: neo, param2: key});
            neo.events.onInputOver.add(neoHover, neo);
            neo.events.onInputOut.add(neoUnHover, neo);
        }
        x += ammount;
    }
    return x;
}
var earth = 40;
function update() {
    if (game.input.mousePointer.isDown) {
        game.camera.x -= game.input.speed.x
        game.camera.y -= game.input.speed.y
        if (earth >= 40) {
            earth += game.input.speed.y
            document.getElementById("earth").setAttribute("style" , "transform:translate(0, "+ (650 +earth) +"px)");
        } else {
            earth =41;
        }
    }
}

function render() {
}

function neoClicked() {
    var id = this.param1
    var date = this.param2
    
    openRight();
    
    var request = new XMLHttpRequest()
    var url = "https://api.nasa.gov/neo/rest/v1/neo/" + id["health"] + "?" + "&api_key=MAMaTZmFmZig0RBXtv8MbOb1eRJSBS8R9Ev8LjvX" 
    request.open('GET', url, true)
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        
        /*Get the current date from close approac data*/
        var caddate = 0;
        var lastCAD = data["close_approach_data"].length - 1;
        for (var i=0; i <= lastCAD; i++) {
            if (data["close_approach_data"][i]["close_approach_date"] == date) {
                caddate = i;
            }
        }

        /*General NEO DATA*/
        var NEOsize = (data["estimated_diameter"]["meters"]["estimated_diameter_min"] + data["estimated_diameter"]["meters"]["estimated_diameter_max"])/2
        var roundedSize = Math.round(NEOsize * 10) / 10;
        var roundedDist = Math.round(data["close_approach_data"][0]["miss_distance"]["kilometers"] * 10) / 10
        var roundedVelo = Math.round(data["close_approach_data"][0]["relative_velocity"]["kilometers_per_second"] * 10) / 10
        var roundedOrbit = Math.round(data["orbital_data"]["orbital_period"] * 10) / 10

        document.getElementById('neoTitle').innerHTML = data["designation"];
        document.getElementById('neoName').innerHTML = `Name: ${data['designation']}`;
        document.getElementById('neoId').innerHTML = `Id: ${data['id']}`;
        document.getElementById('neoSize').innerHTML = `Approximate Diameter (m): ${roundedSize}`;
        document.getElementById('neoAbsMag').innerHTML = `Absolute Magnitude: ${data['absolute_magnitude_h']}`;
        document.getElementById('neoHazard').innerHTML = `Hazardous: ${data['is_potentially_hazardous_asteroid']}`;
        document.getElementById('neoSentry').innerHTML = `Sentry: ${data['is_sentry_object']}`;
        
        /*ORBIT DATA*/
        document.getElementById('orbitalId').innerHTML = `Orbit Id: ${data["orbital_data"]["orbit_id"]}`;
        document.getElementById('orbitClass').innerHTML = `Type of Orbit: ${data["orbital_data"]["orbit_class"]["orbit_class_type"]}`;
        document.getElementById('orbitDesc').innerHTML = `Description of Orbit: ${data["orbital_data"]["orbit_class"]["orbit_class_description"]}`;
        document.getElementById('firstObserved').innerHTML = `First Observed: ${data["orbital_data"]["first_observation_date"]}`;
        document.getElementById('lastObserved').innerHTML = `Last Observed: ${data["orbital_data"]["last_observation_date"]}`;
        document.getElementById('orbitalPeriod').innerHTML = `Period of Orbit: ${roundedOrbit}`;
        
        /*Close Approach DATA*/
        document.getElementById('currApproach').innerHTML = `Nearest Close Approach: ${data["close_approach_data"][caddate]["close_approach_date_full"]}`;
        document.getElementById('firstApproach').innerHTML = `First Close Approach: ${data["close_approach_data"][0]["close_approach_date"]}`;
        document.getElementById('lastApproach').innerHTML = `Latest Predicted Approach: ${data["close_approach_data"][lastCAD]["close_approach_date"]}`;
        document.getElementById('missDistance').innerHTML = `Miss Distance (km): ${roundedDist}`;
        document.getElementById('orbitingBody').innerHTML = `Orbiting Body: ${data["close_approach_data"][caddate]["orbiting_body"]}`;
        document.getElementById('relVelocity').innerHTML = `Relative Velocity(km/s): ${roundedVelo}`;
    }

    request.send()
}

function pic_of_day() {
    document.location = "picOfDay.html"
}

function neoHover(id) {
    id.height -= 10;
    id.width -= 10;
}

function neoUnHover(id) {
    id.height += 10;
    id.width += 10;
}

function clear_scene(neos) {
    neos.children.forEach(function(child) {
        neos.destroy(child);
    }, neos);
}
