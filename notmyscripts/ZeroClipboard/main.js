$(document).ready(function(){

// ПЕРВЫЙ ВАРИАНТ: Текст задается программно
var client = new ZeroClipboard($("#click-to-copy"), {
    moviePath: "ZeroClipboard.swf",
    debug: false
});

client.on("dataRequested", function(client, args) {
    client.setText("Вот и текст");
    $('#click-to-copy').hide(); // скрываем для наглядности кнопку
});


// ВТОРОЙ ВАРИАНТ: Текст берется из атрибута
var client1 = new ZeroClipboard($("#copy-button"), {
  moviePath: "ZeroClipboard.swf"
});

client1.on("load", function(client1) {
  client1.on("complete", function(client1, args) {
    $('#copy-button').hide(); // скрываем для наглядности кнопку
  });
});

// ТРЕТИЙ ВАРИАНТ: Текст берется из поля
var client2 = new ZeroClipboard($("#target-to-copy"), {
  moviePath: "ZeroClipboard.swf"
});

client2.on("load", function(client2) {
  client2.on("complete", function(client2, args) {
    $('#target-to-copy').hide(); // скрываем для наглядности кнопку
  });
});

});
