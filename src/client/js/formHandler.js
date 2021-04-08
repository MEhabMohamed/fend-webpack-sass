function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    const formdata = new FormData();
    formdata.append("key", "1aa8f7f3a86125c2e5eb17cd5f998c2c");
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
        .then(()=>{postData('/add', {agreement: sentiment[0],confidence: sentiment[1], irony: sentiment[2], score_tag: sentiment[3], subjectivity: sentiment[4]/*name: formText, city: cityInfo[0], country: cityInfo[1]*/})})
        .then(()=>{getData('/gather')})
        } catch(error) {
          console.log('error', error)
        }
      };
      performAction();
    }

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
      document.getElementById('results').innerHTML = (`<br><em>Welcome!</em><br><strong>The following information is your text's reflection:</strong><br><strong>Agreement:</strong> ${agreement}<br><strong>Confidence:</strong> ${confidence}<br><strong>Irony:<strong> ${irony}<br><strong>Subjectivity:</strong> ${subjectivity}<br><strong>Positive/Negative Language:</strong> ${score_tag}`);
    }
    catch (error) {
      console.log("error", error);
    }
  };

export { handleSubmit }
