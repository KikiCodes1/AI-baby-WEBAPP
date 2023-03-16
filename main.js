sound = "";
status = "";
objects = [];

function preload(){
    sound = loadSound('miley_cyrus_flowers.mp3');
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start(){
    
    oD = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Object Detected!";
}

function modelLoaded(){
    console.log("Model has been Loaded!")
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log("error");
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status !=""){
        r = random(255);
        g = random(255);
        b = random(255);
        oD.detect(video, gotResult);
        for( i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Detecting Object";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+objects.length;

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill()
            stroke(r, g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == 'person'){
                sound.stop();
                document.getElementById("status2").innerHTML = "Status : Baby found";
            }
            else{
                sound.play();
                document.getElementById("status2").innerHTML = "Status : Baby not found";
            }
            if(objects.length == 0){
                sound.play();
                document.getElementById("status2").innerHTML = "Status : Baby not found";
            }
        }
    }

}