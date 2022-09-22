$(document).ready(runClicker)

function runClicker() {
    /* var player = {};
    player.click_value = 1;
    player.currency = 0;
    player.stats = {
        total_clicks: 0,
    }; */
    var player = {
        click_value: 360,
        currency: 0,
        stats: {
            total_clicks: 0,
        },
    };
    console.log(player)
    var tick_speed = (1000 / 60) //60 updates every second to both the variables and the graphics
    var interval = setInterval(update, tick_speed) //once every x milliseconds, this function will be ran
    //css click functions
    $("#click").on("click", click);

    function click() {
        console.log("click");
        player.currency += player.click_value
        console.log(player.currency)
    };
    //css update functions
    function update() {
        $("#money").html("Money: " + player.currency);
    };
}