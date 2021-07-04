$(document).ready(function () {
  var quizData = [];

  function renderque(data) {
    var section = $("<section>");
    var que = $("<h3>").html(data.question).addClass("que-wrapper");
    section.append(que);

    for (var i = 0; i < data.options.length; i++) {
      var opt = $("<label>").addClass("opt-wrapper");
      var rad = $("<input>")
        .attr("type", "radio")
        .attr("name", "q" + data.id)
        .attr("value", Number(i + 1))
        .attr("required", "true")
        .attr("id", "q" + data.id + "-" + Number(i + 1));
      var optName = $("<span>").html(data.options[i]);

      opt.append(rad, optName);
      section.append(opt);
    }

    var line = $("<div>");
    line.addClass("line");
    section.append(line);

    $("#quiz-wrapper").append(section);
  }

  $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", function (response) {
    quizData = response;
    for (var i = 0; i < response.length; i++) {
      renderque(response[i]);
    }

    var btnWrapper = $("<div>").addClass("btn-wrapper");
    var submit = $("<input>").attr("type", "submit").addClass("submit");
    btnWrapper.append(submit);
    $("#quiz-wrapper").append(btnWrapper);

    $("#quiz-wrapper").submit(function (o) {
      o.preventDefault();

      var result = {};
      var radioButtons = $(".opt-wrapper input");
      for (i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
          result[radioButtons[i].name] = radioButtons[i].value;
        }
      }
      var score = 0;
      for (i = 0; i < quizData.length; i++) {
        var tick = $("<i>").addClass("fas fa-check").attr("id", "tick");
        var cross = $("<i>").addClass("fas fa-times").attr("id", "cross");
        var key = "q" + quizData[i].id;
        var selector = "#" + (key + "-" + result[key]) + "+ span";
        if (result[key] == quizData[i].answer) {
          score++;
          console.log($(selector).parent());
          $(selector).parent().append(tick);
        } else {
          var correctOptionSelector = "#" + (key + "-" + quizData[i].answer) + "+ span";
          $(correctOptionSelector).parent().append(tick);
          $(selector).parent().append(cross);
        }
        console.log(tick);
      }
      $("#final-score").html(score);
    });
  });
});
