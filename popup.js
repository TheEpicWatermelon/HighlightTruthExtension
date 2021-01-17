let getText = document.getElementById('getText');
let resultText = document.getElementById('resultText');

getText.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
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
            var msg = await xhr.response;
            console.log(msg);
            var res = msg.value;
            if (res == 0) {
                resultText.innerHTML= "This is 0";
            } else if (res == 1) {
                resultText.innerHTML= "This is 1";
            } else if (res == 2) {
                resultText.innerHTML= "This is 2";
            } else if (res == 3) {
                resultText.innerHTML= "This is 3";
            } else if (res == 4) {
                resultText.innerHTML= "This is 4";
            }

            //var msg = await fetch('https://fake-news-htn.herokuapp.com/postText').then(r => r.text()).then(result => {})
            //console.log(msg);
        } catch (err) {
            console.log(err);
        }
      });
    });
}