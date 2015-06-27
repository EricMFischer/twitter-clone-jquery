/*
1) Append a tweet container
2) Create button that refreshes tweets
3) Allow user to click on a username and see their timeline
4) Make product attractive
*/

$(document).ready(function() {
  var $body = $('body');
  var visitor = 'anonymous';
  var current = streams.home;
  var $tweetcontainer = $('<div class="tweetcontainer"></div>');
  $body.append($tweetcontainer);

  function displayTweets() {
    $tweetcontainer.empty();
    var index = current.length - 1;
    while(index >= 0) {
      var tweet = current[index];
      var $tweet = $('<div class="tweet"></div>');
      var date = moment(tweet.created_at);
      $tweet.html('<div class="username">@' + tweet.user + '</div><div class="date">'+ date.format("M/DD/YY") + '</div><div class="timeago">' + date.fromNow() + '</div><div class="tweetmessage"> ' + tweet.message + '</div>');
      $tweet.appendTo($tweetcontainer);
      index -= 1;
    }
  }
  displayTweets(streams.home);

  $('.refresh').click(function() {
    $tweetcontainer.empty();
    current = streams.home;
    displayTweets(current);
  });

  $('.username').click(function() {
    var username = $(this).text().substring(1);
    $tweetcontainer.empty();
    current = streams.users[username];
    displayTweets(current);
  });

  $('.sendtweet').on('click', function() {
    var message = $('.newtweettext').val();
    writeTweet(message);
    displayTweets(streams.home);
  });

  $('.tweet').submit(function(event) {
    var message = $('.newtweettext').val();
    writeTweet(message);
    displayTweets(streams.home);
    return false;
  });

});
