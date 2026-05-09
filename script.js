const apiKey = "34c688a1fa17e26a2a16e12f3ea9b4c3";

const newsContainer = document.getElementById("newsContainer");
const loader = document.getElementById("loader");


// FETCH NEWS
async function getNews(){

    loader.style.display = "block";
    newsContainer.innerHTML = "";

    const category =
    document.getElementById("category").value;

    const country =
    document.getElementById("country").value;

    let url =
`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;


    try{

        const response = await fetch(url);

        const data = await response.json();

        loader.style.display = "none";

        if(data.articles.length === 0){

            newsContainer.innerHTML =
            "<h2>No news found.</h2>";

            return;
        }

        data.articles.forEach(article => {

            const card = document.createElement("div");

            card.classList.add("news-card");

            card.innerHTML = `

                <img src="${
                    article.urlToImage ||
                    'https://via.placeholder.com/300'
                }">

                <div class="news-content">

                    <h2>${article.title}</h2>

                    <p>
                        ${
                            article.description ||
                            "No description available."
                        }
                    </p>

                    <a href="${article.url}"
                    target="_blank">
                    Read More
                    </a>

                </div>
            `;

            newsContainer.appendChild(card);

        });

    }catch(error){

        loader.style.display = "none";

        newsContainer.innerHTML =
        "<h2>Error loading news.</h2>";

        console.log(error);

    }
}


// SEARCH NEWS
async function searchNews(){

    const search =
    document.getElementById("searchInput").value;

    if(search === ""){
        return;
    }

    loader.style.display = "block";
    newsContainer.innerHTML = "";

    let url =
`https://newsapi.org/v2/everything?q=${search}&apiKey=${apiKey}`;


    try{

        const response = await fetch(url);

        const data = await response.json();

        loader.style.display = "none";

        data.articles.forEach(article => {

            const card = document.createElement("div");

            card.classList.add("news-card");

            card.innerHTML = `

                <img src="${
                    article.urlToImage ||
                    'https://via.placeholder.com/300'
                }">

                <div class="news-content">

                    <h2>${article.title}</h2>

                    <p>
                        ${
                            article.description ||
                            "No description available."
                        }
                    </p>

                    <a href="${article.url}"
                    target="_blank">
                    Read More
                    </a>

                </div>
            `;

            newsContainer.appendChild(card);

        });

    }catch(error){

        loader.style.display = "none";

        newsContainer.innerHTML =
        "<h2>Error searching news.</h2>";

        console.log(error);

    }
}


// LOAD DEFAULT NEWS
getNews();