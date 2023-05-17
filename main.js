var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    // .start() is a inbuilt function to start the event//
    //the start function is a predefined of web speech API and it will comvert your speech to text//
    recognition.start();
}

//the onresult function holds all the values of speech converted to text//

recognition.onresult = function (event) {// instead of "event" inside "()" u can use any name but remember to change it from evrywhere//

    console.log(event);

    var content = event.results[0][0].transcript;
    console.log(content);

    document.getElementById("textbox").innerHTML = content;
    if (content == "take my selfie") {

        speak_pc();

    }
}

function speak_pc() {
    //This API will be used to convert text to speech.

    var synth = window.speechSynthesis;

    // speak_data = document.getElementById("textbox").value;
    speak_data = "taking selfie in 5 seconds"
    var speakThis = new SpeechSynthesisUtterance(speak_data);
    // We are using a new keyword because, for every next text, we want to convert that text to speech.

    // SpeechSynthesisUtterance - is the function of an API that will convert text to speech

    // .speak() is a predefined function which is used to make computer speak//

    synth.speak(speakThis);
    // webcam.attach() function is called, then it will ask for permission to access the webcam, and start the live view in the HTML element passed inside webcam.attach().
    Webcam.attach(camera);

    setTimeout(function () {
        take_snapshot();
        save();
    }, 5000)
}

camera = document.getElementById("camera");
// In index.html we had defined a div with id=”camera”. This div was defined for the purpose of displaying a webcam live view in it. So now the variable camera has the HTML div.

Webcam.set({
    width: 460,
    height: 350,
    image_format: "jpg",
    jpg_quality: 100,
    crop_width: 400,
    crop_height: 350
})

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        // data_uri is a predefined variable of webcam.snap which will help us to generate the preview of the image it is also the src of the image which the webcam has taken in the below code in the place of src we have used the data_uri as src//
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="' + data_uri + '">';
    });
}

function save() {
    // We are storing the anchor tag(which we created in index.html for the purpose of downloading the selfie) inside a variable. The purpose of storing the element inside a variable is, we can easily refer to the anchor tag.
    link = document.getElementById("anchor_link");
    // we will take the source of img tag created in snap function, update the href of the anchor tag with this image link. And click the anchor tag.

    image_src = document.getElementById("selfie_image").src;
    link.href = image_src;
    //The purpose of writing this code is to automatically click the anchor tag ... we want the image should get downloaded automatically, and we don’t have to click any button.
    link.click();
}