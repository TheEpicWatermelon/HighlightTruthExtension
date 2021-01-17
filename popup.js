let getText = document.getElementById('button-2');
let resultText = document.getElementById('resultText');

getText.onclick = async function(element) {
    var textMsg = "asdsa";
    resultText.innerHTML = "Searching..."
    await chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
      chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
      }, async function(selection) {
        //resultText.innerHTML="Searching....";
        console.log(selection);
        let temp = {
            "q": selection[0]
        };
        try {
            console.log(JSON.stringify(temp));
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://fake-news-htn.herokuapp.com/postText", false);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(temp));
            let msg = await JSON.parse(xhr.response);
            console.log(msg.value);
            console.log(msg);
            if (msg.value == 0) {
                textMsg = "This is Very Likely False";
            } else if (msg.value == 1) {
                textMsg = "This is Likely False";
            } else if (msg.value == 2) {
                textMsg = "This claim is Disputed";
            } else if (msg.value == 3) {
                textMsg = "This is Likely True";
            } else if (msg.value == 4) {
                textMsg = "This is Very Likely True";
            } else {
                textMsg = msg.value;
            }

            //var msg = await fetch('https://fake-news-htn.herokuapp.com/postText').then(r => r.text()).then(result => {})
            //console.log(msg);

            resultText.innerHTML = textMsg;
        } catch (err) {
            msg = "Error - Please Try Again";
            console.log(err);
        }
      });
    });
}