var rover;

function id_get(clicked) {
    if (clicked == "curiosity-tab") {
        rover = "curiosity";
    } else if (clicked == "spirit-tab") {
        rover = "spirit";
    } else if (clicked == "opportunity-tab") {
        rover = "opportunity";
    }
    console.log(rover);
} 

//curiosity
var request = new XMLHttpRequest()
var url = "https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=OLUtrfN9TgqbiLm6fBw5L0ZTcogGMlroMTUhdd8G"

request.open('GET', url, true)
request.onload = function () {
    for (const camera of ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM", "PANCAM", "MINITES"]){
        var data = JSON.parse(this.response)
        var date = data["photo_manifest"]["max_date"]
        var request = new XMLHttpRequest()
        var url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?camera='+ camera +'&'+ "earth_date=" + date + "&api_key=OLUtrfN9TgqbiLm6fBw5L0ZTcogGMlroMTUhdd8G";
        request.open('GET', url, true)
        request.onload = function () {
            var i = 0;
            var data = JSON.parse(this.response)
            if (data["photos"].length != 0) {
                document.getElementById("curiosity").innerHTML += '<div style="display: inline-block; width: 300px; height: 300px; margin: 0px 64px 64px 64px; transform: translate(0,64px);" id="'+camera+'carouselExampleControls" class="'+camera+'carousel slide" data-ride="carousel"> <div id="carousel-inner" class="carousel-inner"></div></div>' 
                for (const element of data["photos"]) {
                    i++;
                    var data_to_add = document.createElement("div")
                    data_to_add.setAttribute("class", "img_p")
                
                    var img_to_add = document.createElement("img")
                    img_to_add.setAttribute("src", element["img_src"])
                    img_to_add.setAttribute("style", "margin: 10px 64px")
                    img_to_add.style.height = '300px';
                    img_to_add.style.width = '300px';
                    data_to_add.append(img_to_add)
                    
                    var text_to_add = document.createElement("p")
                    text_to_add.setAttribute("style", "margin: 10px 64px")
                    text_to_add.style.width = '300px';
                    text_to_add.innerHTML = "camera: " + element["camera"]["full_name"] + "  Date: " + element["earth_date"]
                    data_to_add.append(text_to_add)
                
                    //document.getElementById("curiosity").appendChild(data_to_add)
                    if (i==1) {
                        document.getElementById(camera+"carouselExampleControls").firstElementChild.innerHTML += '<div style="width: 300px; height: 300px;" class="carousel-item active"><img class="d-block w-100" src="'+ element["img_src"] +'" alt="'+i+' slide"><div class="carousel-caption d-none d-md-block">'+ "Id: " + element["id"] + " Date: "+ element["earth_date"]+ " Sol: "+ element["sol"] +'</div></div>'
                    } else {
                        document.getElementById(camera+"carouselExampleControls").firstElementChild.innerHTML += '<div style="width: 300px; height: 300px;" class="carousel-item"><img class="d-block w-100" src="'+ element["img_src"] +'" alt="'+i+' slide"><div class="carousel-caption d-none d-md-block">'+ "Id: " + element["id"] + " Date: "+ element["earth_date"]+ " Sol: "+ element["sol"] +'</div></div>'
                    }            
                    document.getElementById(camera+"carouselExampleControls").innerHTML += '  <a class="carousel-control-prev"; onclick="'+camera+'prev()"; href="#'+camera+'carouselExampleControls" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next"; onclick='+camera+'next(); href="#'+camera+'carouselExampleControls" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>'
                }
            }
        }
        request.send()
    }
}

request.send()

function earthDateInput() {
    var earthDate = document.getElementById("EarthDate").value;
    
    //get images for each camera
    for (const camera of ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM", "PANCAM", "MINITES"]){
        if (document.getElementById(camera+"carouselExampleControls") != null) {
            document.getElementById(camera+"carouselExampleControls").remove();
        }

        var request = new XMLHttpRequest()
        var url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/'+ rover +'/photos?camera='+ camera +'&'+ "earth_date=" + earthDate + "&api_key=OLUtrfN9TgqbiLm6fBw5L0ZTcogGMlroMTUhdd8G";
        request.open('GET', url, true)
        
        request.onload = function () {
            var data = JSON.parse(this.response)
            console.log(camera);
            console.log(data["photos"].length);
            console.log(data["photos"]);
            var i = 0;
            var data = JSON.parse(this.response)
            if (data["photos"].length != 0) {
                document.getElementById(rover).innerHTML += '<div style="display: inline-block; width: 300px; height: 300px; margin:0px 64px 64px 64px; transform: translate(0,64px);" id="'+camera+'carouselExampleControls" class="'+camera+'carousel slide" data-ride="carousel"> <div id="carousel-inner" class="carousel-inner"></div></div>' 
                for (const element of data["photos"]) {
                    i++;
                    var data_to_add = document.createElement("div")
                    data_to_add.setAttribute("class", "img_p")
                
                    var img_to_add = document.createElement("img")
                    img_to_add.setAttribute("src", element["img_src"])
                    img_to_add.setAttribute("style", "margin: 10px 64px")
                    img_to_add.style.height = '300px';
                    img_to_add.style.width = '300px';
                    data_to_add.append(img_to_add)
                    
                    var text_to_add = document.createElement("p")
                    text_to_add.setAttribute("style", "margin: 10px 64px")
                    text_to_add.style.width = '300px';
                    text_to_add.innerHTML = "camera: " + element["camera"]["full_name"] + "  Date: " + element["earth_date"]
                    data_to_add.append(text_to_add)
                
                    //document.getElementById("curiosity").appendChild(data_to_add)
                    if (i==1) {
                        document.getElementById(camera+"carouselExampleControls").firstElementChild.innerHTML += '<div style="width: 300px; height: 300px;" class="carousel-item active"><img class="d-block w-100" src="'+ element["img_src"] +'" alt="'+i+' slide"><div class="carousel-caption d-none d-md-block">'+ "Id: " + element["id"] + " Date: "+ element["earth_date"]+ " Sol: "+ element["sol"] +'</div></div>'
                    } else {
                        document.getElementById(camera+"carouselExampleControls").firstElementChild.innerHTML += '<div style="width: 300px; height: 300px;" class="carousel-item"><img class="d-block w-100" src="'+ element["img_src"] +'" alt="'+i+' slide"><div class="carousel-caption d-none d-md-block">'+ "Id: " + element["id"] + " Date: "+ element["earth_date"]+ " Sol: "+ element["sol"] +'</div></div>'
                    }            
                }
                document.getElementById(camera+"carouselExampleControls").innerHTML += '  <a class="carousel-control-prev"; onclick="'+camera+'prev()"; href="#'+camera+'carouselExampleControls" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next"; onclick='+camera+'next(); href="#'+camera+'carouselExampleControls" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>'
            }
        }
        request.send()
    }

}

function solInput() {
    var sol = document.getElementById("mars-days").value;

    //get images for each camera
    for (const camera of ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM", "PANCAM", "MINITES"]){
        if (document.getElementById(camera+"carouselExampleControls") != null) {
            document.getElementById(camera+"carouselExampleControls").remove();
        }
        var request = new XMLHttpRequest()
        var url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=OLUtrfN9TgqbiLm6fBw5L0ZTcogGMlroMTUhdd8G`;
        request.open('GET', url, true)
        
        request.onload = function () {
            var data = JSON.parse(this.response)
            document.getElementById(rover).innerHTML += '<div style="display: inline-block; width: 300px; height: 300px; margin:0px 64px 64px 64px; transform: translate(0,64px);" id="'+camera+'carouselExampleControls" class="'+camera+'carousel slide" data-ride="carousel"> <div id="carousel-inner" class="carousel-inner"></div></div>' 
            
            var i = 0;
            var data = JSON.parse(this.response)
            for (const element of data["photos"]) {
                groupPhotos(element, i, camera);
            }
            document.getElementById(camera+"carouselExampleControls").innerHTML += '  <a class="carousel-control-prev"; onclick="'+camera+'prev()"; href="#'+camera+'carouselExampleControls" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next"; onclick='+camera+'next(); href="#'+camera+'carouselExampleControls" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>'
        }
        request.send()
    }
}


function camInput() {
    for (const camera of ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM", "PANCAM", "MINITES"]){
        if (document.getElementById(camera+"carouselExampleControls") != null) {
            document.getElementById(camera+"carouselExampleControls").remove();
        }
    }
    var camDate = document.getElementById("camDate").value;
    var camera = document.getElementById("marsCam").value;
    
    //get images for camera
    var request = new XMLHttpRequest()
    var url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${camDate}&camera=${camera}&api_key=OLUtrfN9TgqbiLm6fBw5L0ZTcogGMlroMTUhdd8G`;
    request.open('GET', url, true)
    
    request.onload = function () {
        var data = JSON.parse(this.response)
        document.getElementById(rover).innerHTML += '<div style="display: inline-block; width: 300px; height: 300px; margin:0px 64px 64px 64px; transform: translate(0,64px);" id="'+camera+'carouselExampleControls" class="'+camera+'carousel slide" data-ride="carousel"> <div id="carousel-inner" class="carousel-inner"></div></div>' 
        
        var i = 0;
        var data = JSON.parse(this.response)
        for (const element of data["photos"]) {
            i++;
            var data_to_add = document.createElement("div")
            data_to_add.setAttribute("class", "img_p")
        
            var img_to_add = document.createElement("img")
            img_to_add.setAttribute("src", element["img_src"])
            img_to_add.setAttribute("style", "margin: 10px 64px")
            img_to_add.style.height = '300px';
            img_to_add.style.width = '300px';
            data_to_add.append(img_to_add)
            
            var text_to_add = document.createElement("p")
            text_to_add.setAttribute("style", "margin: 10px 64px")
            text_to_add.style.width = '300px';
            text_to_add.innerHTML = "camera: " + element["camera"]["full_name"] + "  Date: " + element["earth_date"]
            data_to_add.append(text_to_add)
        
            //document.getElementById("curiosity").appendChild(data_to_add)
            if (i==1) {
                document.getElementById(camera+"carouselExampleControls").firstElementChild.innerHTML += '<div style="width: 300px; height: 300px;" class="carousel-item active"><img class="d-block w-100" src="'+ element["img_src"] +'" alt="'+i+' slide"><div class="carousel-caption d-none d-md-block">'+ "Id: " + element["id"] + " Date: "+ element["earth_date"]+ " Sol: "+ element["sol"] +'</div></div>'
            } else {
                document.getElementById(camera+"carouselExampleControls").firstElementChild.innerHTML += '<div style="width: 300px; height: 300px;" class="carousel-item"><img class="d-block w-100" src="'+ element["img_src"] +'" alt="'+i+' slide"><div class="carousel-caption d-none d-md-block">'+ "Id: " + element["id"] + " Date: "+ element["earth_date"]+ " Sol: "+ element["sol"] +'</div></div>'
            }            }
        document.getElementById(camera+"carouselExampleControls").innerHTML += '  <a class="carousel-control-prev"; onclick="'+camera+'prev()"; href="#'+camera+'carouselExampleControls" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next"; onclick='+camera+'next(); href="#'+camera+'carouselExampleControls" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>'
    }
    request.send()
}

function FHAZnext(){
    $('.FHAZcarousel').carousel('next')
}

function FHAZprev(){
    $('.FHAZcarousel').carousel('prev')
}

function RHAZnext(){
    $('.RHAZcarousel').carousel('next')
}

function RHAZprev(){
    $('.RHAZcarousel').carousel('prev')
}
function MASTnext(){
    $('.MASTcarousel').carousel('next')
}

function MASTprev(){
    $('.MASTcarousel').carousel('prev')
}

function CHEMCAMnext(){
    $('.CHEMCAMcarousel').carousel('next')
}

function CHEMCAMprev(){
    $('.CHEMCAMcarousel').carousel('prev')
}
function MAHLInext(){
    $('.MAHLIcarousel').carousel('next')
}

function MAHLIprev(){
    $('.MAHLIcarousel').carousel('prev')
}

function MARDInext(){
    $('.MARDIcarousel').carousel('next')
}

function MARDIprev(){
    $('.MARDIcarousel').carousel('prev')
}
function NAVCAMnext(){
    $('.NAVCAMcarousel').carousel('next')
}

function NAVCAMprev(){
    $('.NAVCAMcarousel').carousel('prev')
}
function PANCAMnext(){
    $('.PANCAMcarousel').carousel('next')
}

function PANCAMprev(){
    $('.PANCAMcarousel').carousel('prev')
}

function MINITESnext(){
    $('.MINITEScarousel').carousel('next')
}

function MINITESprev(){
    $('.MINITEScarousel').carousel('prev')
}
"NAVCAM", "PANCAM", "MINITES"

//spirit
var request = new XMLHttpRequest()
var url = "https://api.nasa.gov/mars-photos/api/v1/manifests/spirit?api_key=OLUtrfN9TgqbiLm6fBw5L0ZTcogGMlroMTUhdd8G"

request.open('GET', url, true)
request.onload = function () {
    for (const camera of ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM", "PANCAM", "MINITES"]){
        var data = JSON.parse(this.response)
        var date = data["photo_manifest"]["max_date"]
        var request = new XMLHttpRequest()
        var url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?camera='+ camera + '&' + "earth_date=" + date + "&api_key=OLUtrfN9TgqbiLm6fBw5L0ZTcogGMlroMTUhdd8G";
        request.open('GET', url, true)
        request.onload = function () {
            var i = 0;
            var data = JSON.parse(this.response)
            if (data["photos"].length != 0) {
                document.getElementById("spirit").innerHTML += '<div style="display: inline-block; width: 300px; height: 300px; margin: 0px 64px 64px 64px; transform: translate(0,64px);" id="'+camera+'carouselExampleControls" class="'+camera+'carousel slide" data-ride="carousel"> <div id="carousel-inner" class="carousel-inner"></div></div>' 
                for (const element of data["photos"]) {
                    i++;
                    var data_to_add = document.createElement("div")
                    data_to_add.setAttribute("class", "img_p")
        
                    var img_to_add = document.createElement("img")
                    img_to_add.setAttribute("src", element["img_src"])
                    img_to_add.setAttribute("style", "margin: 10px 64px")
                    img_to_add.style.height = '300px';
                    img_to_add.style.width = '300px';
                    data_to_add.append(img_to_add)
        
                    var text_to_add = document.createElement("p")
                    text_to_add.setAttribute("style", "margin: 10px 64px")
                    text_to_add.style.width = '300px';
                    text_to_add.innerHTML = "camera: " + element["camera"]["full_name"] + "  Date: " + element["earth_date"]
                    data_to_add.append(text_to_add)
        
                    //document.getElementById("spirit").appendChild(data_to_add)
                    if (i==1) {
                        document.getElementById(camera+"carouselExampleControls").firstElementChild.innerHTML += '<div style="width: 300px; height: 300px;" class="carousel-item active"><img class="d-block w-100" src="'+ element["img_src"] +'" alt="'+i+' slide"><div class="carousel-caption d-none d-md-block">'+ "Id: " + element["id"] + " Date: "+ element["earth_date"]+ " Sol: "+ element["sol"] +'</div></div>'
                    } else {
                        document.getElementById(camera+"carouselExampleControls").firstElementChild.innerHTML += '<div style="width: 300px; height: 300px;" class="carousel-item"><img class="d-block w-100" src="'+ element["img_src"] +'" alt="'+i+' slide"><div class="carousel-caption d-none d-md-block">'+ "Id: " + element["id"] + " Date: "+ element["earth_date"]+ " Sol: "+ element["sol"] +'</div></div>'
                    } 
                    document.getElementById(camera+"carouselExampleControls").innerHTML += '  <a class="carousel-control-prev"; onclick="'+camera+'prev()"; href="#'+camera+'carouselExampleControls" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next"; onclick='+camera+'next(); href="#'+camera+'carouselExampleControls" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>'
                }
            }
        }
        request.send()
    }
}

request.send()


//opportunity
var request = new XMLHttpRequest()
var url = "https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity?api_key=OLUtrfN9TgqbiLm6fBw5L0ZTcogGMlroMTUhdd8G"

request.open('GET', url, true)
request.onload = function () {
    for (const camera of ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM", "PANCAM", "MINITES"]){      
        var data = JSON.parse(this.response)
        var date = data["photo_manifest"]["max_date"]
        var request = new XMLHttpRequest()
        var url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?camera=' +camera+ '&' +"earth_date=" + date + "&api_key=OLUtrfN9TgqbiLm6fBw5L0ZTcogGMlroMTUhdd8G";
        request.open('GET', url, true)
        request.onload = function () {
            var i = 0;
            var data = JSON.parse(this.response)
            if (data["photos"].length != 0) {
                document.getElementById("opportunity").innerHTML += '<div style="display: inline-block; width: 300px; height: 300px; margin: 0px 64px 64px 64px; transform: translate(0,64px);" id="'+camera+'carouselExampleControls" class="'+camera+'carousel slide" data-ride="carousel"> <div id="carousel-inner" class="carousel-inner"></div></div>' 
                for (const element of data["photos"]) {
                    i++;
                    var data_to_add = document.createElement("div")
                    data_to_add.setAttribute("class", "img_p")
        
                    var img_to_add = document.createElement("img")
                    img_to_add.setAttribute("src", element["img_src"])
                    img_to_add.setAttribute("style", "margin: 10px 64px")
                    img_to_add.style.height = '300px';
                    img_to_add.style.width = '300px';
                    data_to_add.append(img_to_add)
                    
                    var text_to_add = document.createElement("p")
                    text_to_add.setAttribute("style", "margin: 10px 64px")
                    text_to_add.style.width = '300px';
                    text_to_add.innerHTML = "camera: " + element["camera"]["full_name"] + "  Date: " + element["earth_date"]
                    data_to_add.append(text_to_add)
                    console.log(element)
        
                    //document.getElementById("opportunity").appendChild(data_to_add)
                    if (i==1) {
                        document.getElementById(camera+"carouselExampleControls").firstElementChild.innerHTML += '<div style="width: 300px; height: 300px;" class="carousel-item active"><img class="d-block w-100" src="'+ element["img_src"] +'" alt="'+i+' slide"><div class="carousel-caption d-none d-md-block">'+ "Id: " + element["id"] + " Date: "+ element["earth_date"]+ " Sol: "+ element["sol"] +'</div></div>'
                    } else {
                        document.getElementById(camera+"carouselExampleControls").firstElementChild.innerHTML += '<div style="width: 300px; height: 300px;" class="carousel-item"><img class="d-block w-100" src="'+ element["img_src"] +'" alt="'+i+' slide"><div class="carousel-caption d-none d-md-block">'+ "Id: " + element["id"] + " Date: "+ element["earth_date"]+ " Sol: "+ element["sol"] +'</div></div>'
                    } 
                    document.getElementById(camera+"carouselExampleControls").innerHTML += '  <a class="carousel-control-prev"; onclick="'+camera+'prev()"; href="#'+camera+'carouselExampleControls" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next"; onclick='+camera+'next(); href="#'+camera+'carouselExampleControls" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>'
                }
            }
        }
        request.send()
    }
}

request.send()