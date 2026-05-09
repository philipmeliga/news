const apiKey = "34c688a1fa17e26a2a16e12f3ea9b4c3";

const newsContainer = document.getElementById("newsContainer");
const loader = document.getElementById("loader");

async function getNews(){

    loader.style.display = "block";
    newsContainer.innerHTML = "";

    const category =
    document.getElementById("category").value;

    const country =
    document.getElementById("country").value;

    let url =
`https://gnews.io/api/v4/{endpoint}?{parameters}&apikey=apiKey}`;

    try{

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);

        loader.style.display = "none";

        // CHECK FOR API ERROR
        if(data.status !== "ok"){

            newsContainer.innerHTML =
            `<h2>${data.message}</h2>`;

            return;
        }

        // CHECK EMPTY ARTICLES
        if(!data.articles || data.articles.length === 0){

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
        `<h2>${error.message}</h2>`;

        console.log(error);

    }
}

getNews();