$("#submitButton").on("click", function(e) {
  e.preventDefault();
  var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + $("#searchQuery").val() + "&format=json&callback=?";
  $("#searchQuery").val("");

  $.getJSON(url, function(response) {
    $("#queryResults").html("");

    var title, description, pageid,
        results = response.query.pages,
        page = "https://en.wikipedia.org/?curid=";

    for (var prop in results) {
      title = results[prop].title;
      description = results[prop].extract;
      pageid = results[prop].pageid;

      $("#queryResults").append("<a href='" + page + pageid + "' target='_blank'><div class='link'><h3>" + title + "</h3><p>" + description + "</p></div></a>");
    }
  });
});

$("#searchQuery").keyup(function(e) {
  if (e.which === 13) {
    $("#submitButton").click();
  }
});
