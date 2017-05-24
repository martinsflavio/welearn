'use strict';






(() => {
  $('document').ready(() => {

    // like
    $('.like').on('click', function(e) {
      e.preventDefault();

      let userId = $(this).attr('data-userid'),
          propId = $(this).attr('data-propid');

      return request('like',userId,propId);
    });

    // dislike
    $('.dislike').on('click', function(e) {
      e.preventDefault();

      let userId = $(this).attr('data-userid'),
          propId = $(this).attr('data-propid');

      return request('dislike',userId,propId);
    });


    // request

    let request = (vote,user,prop) => {
      let url;

      url = `${window.location.origin}/user/proposal/vote/${vote}/${user}/${prop}`;

      console.log(url);
      $.post(url, (err, data) => {
        if (err) throw err;
        console.log(' vote sent');
      });
    };

  });
})();