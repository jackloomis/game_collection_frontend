let games = [];
const selectGame = document.querySelector("#id");

fetch("https://game-collection-backend-arno.onrender.com/api/v1/game_collection")
    .then(res => res.json())
    .then(data => {
        games = data;
        // Convert system ID to system name for UX purposes
        const systems = {
            1: "PC",
            2: "Xbox Series X/S",
            3: "PlayStation 5",
            4: "Nintendo Switch 2",
            5: "Xbox One",
            6: "PlayStation 4",
            7: "Nintendo Switch",
            8: "Xbox 360",
            9: "PlayStation 3",
            10: "Nintendo Wii",
            11: "Nintendo 3DS",
            12: "Nintendo DS"
        };
        // Populate dropdown with games and include system to handle same game on different systems
        games.forEach(game => {
            const option = document.createElement("option");
            option.value = game.id;
            option.textContent = `${game.title} - ${systems[game.system_id]}`;
            selectGame.appendChild(option);
        });
    })
.catch(error => console.log(error));


// Update other fields with selected game's current information
selectGame.addEventListener("change", () => {
    const selected_id = selectGame.value;
    const game = games.find(game => game.id == selected_id);

    if (selected_id == "") {
        return;
    }

    document.querySelector("#title").value = game.title;
    document.querySelector("#genre").value = game.genre || "";
    document.querySelector("#system_id").value = game.system_id;
    document.querySelector("#status_id").value = game.status_id;
    document.querySelector("#rating").value = game.rating || "";
});


const formEl = document.querySelector(".form");

formEl.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);

    if(data.id == "" || data.id < 1 || data.title == "" || data.system_id == "" || data.status_id == "") {
        $.toaster({priority : "danger", title : "Error", message: "Something went wrong :("});
    }
    else {
        fetch("https://game-collection-backend-arno.onrender.com/api/v1/game_collection/id/" + data.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
          .then(data => {
            console.log(data);
            $.toaster({priority : "success", title : "Game Modify", message: "Game details successfully modified!"});
        })
        .catch(error => console.log(error));
    }
});