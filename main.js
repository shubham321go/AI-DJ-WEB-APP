song1 = "";
song2="";

function preload() {
    song1 = loadSound("Avengers Suite (Theme).mp3");
    song2 = loadSound("Spider-Man Homecoming Soundtrack - Spider-Man Theme.mp3");
}

song1_status="";
song2_status="";

scoreLeftWrist=0;
scoreRightWrist=0;

rightWristX=0;
rightWristY=0;

leftWristX=0;
leftWristY=0;

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is Initialized");
}
function gotPoses(results)
{             
    if(results.length > 0)
    {              
    console.log(results)


    rightWristX =results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + "rightWristX" + rightWristX);
    scoreRightWrist= results[0].pose.keypoints[10];

    leftWristX =results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + "leftristX" + leftWristX);
    scoreLeftWrist= results[0].pose.keypoints[9];
}
}
function draw()
{
    image( video, 0 , 0, 600, 500)

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY,20);
        song2.stop();
        song1.play()
        song1.setVolume(1);
        song1.rate(1);
        document.getElementById("song_name").innerHTML = "Avengers theme"
         
    }
    if (scoreLeftWrist > 0)
    {
        circle(leftWristX, leftWristY,20);
        song1.stop();
        song2.play();
        song2.setVolume(1);
        song2.rate(1);
        document.getElementById("song_name").innerHTML = "Spider-Man theme"
    }

}

