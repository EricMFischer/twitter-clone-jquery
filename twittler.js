/*
1) Append a tweet container
2) Create button that refreshes tweets
3) Allow user to click on a username and see their timeline
4) Make product attractive
*/

$(document).ready(function(){
  var $body = $('body');
  var current = streams.home;
  var visitor = 'anonymous';
  $body.append('<div class="tweetcontainer"></div>');
  $tweetcontainer = $('.tweetcontainer');

  $('.refresh').click(function() {
    displayTweets(current);
  });


  // Show the user new tweets
  function displayTweets(stream) {
    $('.tweetcontainer').empty();
    var index = current.length - 1;
    while(index >= 0){
      var tweet = current[index];
      var $tweet = $('<div class="tweet"></div>');
      var dateMoment = moment(tweet.created_at);
      // Adds tweet with timestamp
      $tweet.html('<div class="tweetusername">@' + tweet.user + '</div><div class="date">'+ dateMoment.format("M/DD/YY") + '</div><div class="timesince">' + dateMoment.fromNow() + '</div><div class="tweetmessage"> ' + tweet.message + '</div>');
      $tweet.appendTo($tweetcontainer);
      index -= 1;
    }

    // Event listener that allows us to click on a username and see their timeline
    $('.tweetusername').click(function(){
      var username = $(this).text();
      $tweetcontainer.empty();
      // reset current to display only one user's tweets
      current = streams.users[username];
      displayTweets(current);
    });
  }
  displayTweets(streams.home);

  // Event listener to bring back the main stream
  $('.header').click(function(){
    $tweetcontainer.empty();
    // reset current to display main stream
    current = streams.home;
    displayTweets(current);
  });

});