function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let name = document.getElementById('name').value;
    let formText = document.getElementById('form').value;
    Client.checkForName(name);

    console.log("::: Form Submitted :::");
    const formdata = new FormData();
    formdata.append("key", process.env.API_key);
    formdata.append("txt", formText);
    formdata.append("lang", "en");  // 2-letter code, like en es fr ...
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    const getInfo = async () => { 
        const res = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
          try {
              const data = await res.json();
              const agreement = data.agreement;
              const confidence = data.confidence;
              const irony = data.irony;
              const score_tag = data.score_tag;
              const subjectivity = data.subjectivity;
              console.log(data);
              return [agreement, confidence, irony, score_tag, subjectivity]
            } catch(error) {
            console.log('error', error);
          }
      };
    const performAction = async() => {
        const sentiment = await getInfo();
        try {getInfo()
        .then(()=>{postData('/add', {agreement: sentiment[0],confidence: sentiment[1], irony: sentiment[2], score_tag: sentiment[3], subjectivity: sentiment[4], name: name})})
        .then(()=>{getData('/gather')})
        } catch(error) {
          console.log('error', error)
        }
      };
      let digits = /(\d{1})/;
      if (formText.match(digits) || name.match(digits)){
        alert("Invalid input!, only text accepted");
      }else{
      performAction();
      document.getElementById('form').scrollIntoView();
    };
    };

  const postData = async (url='' , data = {}) =>{
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
        try {
          const newData = await response.json();
          return newData;
        } catch(error) {
          console.log("error", error);
        }
    };
  const getData = async (url) => {
    const respond = await fetch(url);
    try {
      const data = await respond.json();
      const agreement = data.agreement;
      const confidence = data.confidence;
      const irony = data.irony;
      const score_tag = data.score_tag;
      const subjectivity = data.subjectivity;
      const myName = data.name.slice(0,1).toUpperCase() + data.name.slice(1);
      document.getElementById('results').innerHTML = 
      (`<br>Welcome ${myName}!<br>The following information is your text's reflection:<br><br>Agreement: ${agreement}<br>Confidence: ${confidence}<br>Irony: ${irony}<br>Subjectivity: ${subjectivity}<br>Positive/Negative Language: ${score_tag}`);
    }
    catch (error) {
      console.log("error", error);
    }
  };

export { handleSubmit }