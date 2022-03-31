img=""
status=""
objects= []

function preload(){
    img= loadImage('Butterfly.jpg')
}

function setup(){
    canvas= createCanvas(640, 420)
    canvas.center()

    objectDetector= ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML= "Status: Detcting Objects"
}

function modelLoaded(){
    console.log("Model is initialized!")
    status= true
    objectDetector.detect(img, gotResult)
}

function gotResult(error, results){
    if(error){
        console.log(error)
    }

    console.log(results)
    objects= results
}


function draw(){
    image(img, 0, 0, 640, 420)

  if(status != ""){
      for(i=0; i < objects.length; i++){
          document.getElementById("status").innerHTML = "Status: Objects Detected"
          fill("red")
          percent= floor(objects[i].confidence * 100)
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15 )
          noFill()
          stroke("red")
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
          document.getElementById("no_objects").innerHTML = "There CoCoSSD model has detected " + objects.length +" object"
      }
  }
}
function home(){
    window.location= "index.html";
}


/*function draw(){
    image(img, 0, 0, 640, 420)
    fill("#4B0082")
    text("Butterfly", 45, 75)
    noFill()
    stroke("#4B0082")
    rect(10, 10, 620, 400)
}*/
