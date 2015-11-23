$(function() {
  var url = window.location.toString();

  // social buttons
  $('.fb-share').on('click', function(e) {
    e.preventDefault();

    window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url),
                "share", "width=600, height=400, scrollbars=no");
    ga('send', 'social', 'facebook', 'share', url);
  });

  $('.twitter-share').on('click', function(e) {
    e.preventDefault();
		var tweet = $(this).data('tweet') || '';

    window.open("https://twitter.com/intent/tweet?" +
                "text=" + encodeURIComponent(tweet) +
                "&url=" + encodeURIComponent(url) +
                "&via=" + encodeURIComponent('Code4SA'),
                "share", "width=364, height=250, scrollbars=no");
    ga('send', 'social', 'twitter', 'share', url);
  });
});
