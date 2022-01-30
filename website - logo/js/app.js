$(function () {
  leftbar();
  leftbarToggle();
});

$(window).scroll(function () {
  stickyFuncbar();
});

$(window).resize(function () {
  setTimeout(function () {
    leftbarToggle();
  }, 100);
});

var leftbar = function () {
  $(".leftbar-toggle").click(function (e) {
    e.preventDefault();
    var $body = $("body");
    var $leftbar = $(".leftbar");

    if (Modernizr.mq("screen and (max-width:1280px)") && $body.hasClass("leftbar-collapsed"))
      return false;

    if (!$body.hasClass("leftbar-collapsed")) {
      $body.addClass("leftbar-collapsed");
      $leftbar.removeAttr("style");
    }
    else {
      $leftbar.css("width", "220px");
      $body.addClass("leftbar-expanding");
      $body.removeClass("leftbar-collapsed");
      setTimeout(function () {
        $body.removeClass("leftbar-expanding");
      }, 100);
    }
  });
};

var leftbarToggle = function () {
  if (Modernizr.mq("screen and (max-width:1280px)")) {

    if (!$("body").hasClass("leftbar-collapsed")) {
      $(".leftbar-toggle").trigger("click");
    }

  } else {

    if ($("body").hasClass("leftbar-collapsed")) {
      $(".leftbar-toggle").trigger("click");
    }

  }
};

var stickyFuncbar = function () {
  var $funcbar = $(".funcbar");
  var scroll = $(window).scrollTop();

  if ($funcbar.length) {
    if (scroll > 0)
      $funcbar.addClass("collapsed");
    else
      $funcbar.removeClass("collapsed");
  }
};
