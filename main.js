song = "";
rightWristX = "";
rightWristY = "";
leftWristX = "";
leftWristY = "";
scoreLeftWrist = 0;

function preload(){
    song = loadSound("Vaaste.mp3");
}
function setup(){
    canvas = createCanvas(400,400);
    canvas.position(575,200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelloaded);
    poseNet.on('pose',gotposes);
}
function draw(){
    image(video,0,0,400,400);

    fill("#ff0000");
    stroke("#ff0000");
    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        number = Number(leftWristY);
        noEdit1 = floor(number);
        Volume = noEdit1/500;
        document.getElementById("volume").innerHTML = "The volume is "+Volume;
        song.setVolume(Volume);
    }
}
function playSong(){
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}
function modelloaded(){
    console.log("Model is loaded");
}
function gotposes(results){
    if(results.length > 0){
        console.log(results);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("X of Right Wrist is "+rightWristX);
        console.log("Y of Right Wrist is "+rightWristY);
        console.log("X of Left Wrist is "+leftWristX);
        console.log("Y of Left Wrist is "+leftWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score of Left Wrist is "+scoreLeftWrist);
    }
}
