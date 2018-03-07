var characters = ["Linda Belcher", "Goku", "Andy Dwyer", "Tyrion Lannister"];
$(document).ready(function () {
    renderButtons();
    
$("#add-character").on("click", function (event) {
    event.preventDefault();
    var gif = $("#characterInput").val().trim();
    characters.push(gif);
    renderButtons();
});

});

function displayCharacterInfo() {

    var character = $(this).attr("name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        character + "&api_key=MWtrUVRfxpGpvmxFp6ZAyveddWk8ZiJj";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        var gifDiv = $("<div>").addClass("character");
        var rating = response.Rated;

        for (var i = 0; i < 10; i++) {


            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var actualGif = $("<img>");

                actualGif.attr("src", results[i].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(actualGif);

                $("#gifs-appear-here").prepend(gifDiv);
            }
        }
    });

}

function renderButtons() {

    $("#buttons").empty();

    for (var i = 0; i < characters.length; i++) {

        var a = $("<button>");
        a.addClass("character-btn");
        a.attr("name", characters[i]);
        a.text(characters[i]);
        $("#buttons").append(a);
    }
    $(document).on("click", ".character-btn", displayCharacterInfo);
}
