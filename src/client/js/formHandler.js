function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    /*fetch('http://localhost:8080/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })*/
    const performAction = async() => {
        const name = document.getElementById('name').value;
        const cityInfo = await getInfo();
        try {getInfo()
        .then(()=>{postData('/add', {name: name, city: cityInfo[0], country: cityInfo[1]})})
        .then(()=>{getData('/gather')})
        } catch(error) {
          console.log('error', error)
        }
      };
      performAction();
}
const getInfo = async () => { // add your own key after "key=" to active, get it free from https://api.ipinfodb.com
    const res = await fetch('https://api.ipinfodb.com/v3/ip-city/?key=1758a53a2bdb70a26a0166581f51ae76d2a527fd75ddf1a2379abf1357ca70cd&format=json')
      try {
          const data = await res.json();
          const cityName = data.cityName;
          const countryName = data.countryName;
          console.log(data);
          return [cityName, countryName];
        } catch(error) {
        console.log('error', error);
      }
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
      const name = data.name.toUpperCase();
      const city = data.city;
      const country = data.country;
      document.getElementById('results').textContent = (`Welcome ${name} from ${city}, ${country}!`);
    }
    catch (error) {
      console.log("error", error);
    }
  };
export { handleSubmit }
