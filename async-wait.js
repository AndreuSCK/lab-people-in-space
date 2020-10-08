// ASYNC - AWAIT

// Iteración 1

// Definimos dos variables para utilizar los endpoints de cada API

const astroUrl = "http://api.open-notify.org/astros.json";
const wikiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/";
const getProfiles = async () => {
  // Aquí escribiremos la función que hará las llamadas a las API
  // let loadedProfiles = []
  const astroResponse = await fetch(astroUrl)
  const astroPost = await astroResponse.json()


  const responseWiki = astroPost.people.map(async element => {
    const wikiUrlMap = await fetch(`${wikiUrl}${element.name}`);
    const wikiData = await wikiUrlMap.json();
    wikiData.craft = element.craft;
    return wikiData
  })


  return Promise.all(responseWiki)
}
// Iteración 2
const generateHTML = async (props) => {
  const idTable = document.querySelector("#people");
  const fragment = document.createDocumentFragment()
  console.log(props)
  // let infoAstronaut = props[0]
  let peopleFragment = props.map(async (ele) => {
    console.log(ele)
    let section = document.createElement("section");
    section.innerHTML =
      `
        <span> ${ele.craft} </span>
        <h2> ${ele.displaytitle} </h2>
        <img src=${ele.thumbnail.source} />
        <p> ${ele.description} </p>
        <p> ${ele.extract}</p>
    `
    idTable.appendChild(section)
  })

  // idTable.appendChild(peopleFragment)
}


const init = (async () => {
  let profiles = await getProfiles()
  generateHTML(profiles)
})

// Iteración 3

// Aquí escribiremos el addEventListener que 'escuchará' a nuestro botón
