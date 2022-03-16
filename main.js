function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded)
  synth = window.speechSynthesis
}

function draw() {
  image(video, 0, 0, 300, 300)
  classifier.classify(video, gotResult)

}



function modelLoaded() {
  console.log('Model Loaded!');
}

var previous_result = ""


function gotResult(error, results) {
  if (error) {
    console.log(error)


  } else {
    if ((results[0].confidence > 0.5) && (previous_result != results[0].label)) {
      console.log(results)
      document.getElementById("result").innerHTML = results[0].label
      document.getElementById("percent").innerHTML = (results[0].confidence.toFixed(2)) * 100 +"%";
      utterThis = new SpeechSynthesisUtterance(results[0].label)
      synth.speak(utterThis)
      previous_result = results[0].label
    }

  }

}