function like(name) {
    var database = firebase.database();

    database.ref(name.id).get().then((object)=>{
        var likes = object.val().likes
        likes++;
        database.ref(name.id).child("likes").set(likes)
        document.getElementById(name.id + "likes").innerHTML = likes;
    })
}