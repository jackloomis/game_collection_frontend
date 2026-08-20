const API_URL = "https://game-collection-backend-arno.onrender.com/api/v1/game_collection";

fetch(API_URL)
.then(response => response.json())
.then(data => {
    const formattedData = data.map(game => [
        game.id,
        game.title,
        game.genre,
        game.system_id,
        game.status_id,
        game.rating
    ]);

    new gridjs.Grid({
        columns: ["ID", "Title", "Genre", "System ID", "Status ID", "Rating"],
        data: formattedData,
        search: true, 
        sort: true,
        pagination: {
            enabled: true,
            limit: 5
        },
        resizable: true,
        style: {
            table: {
                border: "1px solid #ccc"
            },
            th: {
                "background-color": "#f4f4f4",
                "text-align": "left"
            },
            td: {
                "padding": "8px",
                "border-bottom": "1px solid #ddd"
            }
        }
        
    }).render(document.getElementById("grid-container"));
})
.catch(error => console.error("Error fetching data", error));