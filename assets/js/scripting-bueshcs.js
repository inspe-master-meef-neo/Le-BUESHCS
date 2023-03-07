/* Custom Copy Code Blocks */

$(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightElement(block);
  });

  $('.copy-btn').on('click', function() {
    var code = $(this).closest('.code-block').find('code').text();
    var temp = $('<textarea>');
    $('body').append(temp);
    temp.val(code).select();
    document.execCommand('copy');
    temp.remove();
    var tooltip = $(this).tooltip();
    var btnIcon = $(this).find('i');
    tooltip.attr('data-original-title', 'Copied!').tooltip('show');
    $(this).addClass('bg-success');
    btnIcon.removeClass('far fa-copy').addClass('fas fa-check');
    $(this).attr('data-copied', true);
    setTimeout(function() {
      tooltip.attr('data-original-title', 'Copy to clipboard').tooltip('hide');
      $(this).removeClass('bg-success');
      btnIcon.removeClass('fas fa-check').addClass('far fa-copy');
      $('.copy-btn').attr('data-copied', false);
    }.bind(this), 2000);
  });

  $('[data-toggle="tooltip"]').tooltip();
});

/* Progression scrollbar */

$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  var height = $(document).height() - $(window).height();
  var progress = Math.round((scroll / height) * 100);

  $(".progress-percent").html(progress + "%");
  var circle = document.querySelector('.progress-ring__circle');
  var circumference = circle.getTotalLength();
  var offset = circumference - progress / 100 * circumference;
  circle.style.strokeDashoffset = offset;

  if (progress >= 100) {
    $(".progress-ring").addClass("progress-complete");
  } else {
    $(".progress-ring").removeClass("progress-complete");
  }
});

/* Back to top for the Klickers Krew */

$(document).ready(function(){
  $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
        $('#back-to-top').fadeIn();
      } else {
        $('#back-to-top').fadeOut();
      }
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 400);
      return false;
    });
});

/* Search */

$(document).ready(function() {
  // Autofocus on search input on page load
  $('#search-input').focus();

  // Reset button
  $('#search-btn .close-icon').click(function() {
    // Reset search input
    $('#search-input').val('');

    // Remove highlight from all card headers
    $('.card-header').removeClass('search-highlight');

    // Show all cards
    $('.card').show();

    // Collapse all cards
    $('.card .collapse').collapse('hide');
  });

  // Search input
  $('#search-input').on('keyup', function() {
    var searchText = $(this).val().toLowerCase();

    if (searchText.length > 0) {
      // Highlight matching card headers
      $('.card-header').each(function() {
        var cardHeaderText = $(this).find('button').text().toLowerCase();

        if (cardHeaderText.indexOf(searchText) !== -1) {
          $(this).addClass('search-highlight');
        } else {
          $(this).removeClass('search-highlight');
        }
      });

      // Show only matching cards
      $('.card').each(function() {
        var cardHeaderText = $(this).find('.card-header button').text().toLowerCase();

        if (cardHeaderText.indexOf(searchText) !== -1) {
          $(this).show();

          // Expand the card
          $(this).find('.collapse').collapse('show');

          // Expand all parent cards
          $(this).parents('.card').each(function() {
            $(this).find('.collapse').collapse('show');
          });
        } else {
          $(this).hide();
        }
      });
    } else {
      // Reset search
      $('#search-btn .close-icon').click();
    }
  });
});


// $(document).ready(function() {
//   $('#search-input').on('input', function() {
//     var searchText = $(this).val().toUpperCase();
//     if (searchText.length > 0) {
//       $('.card-header').addClass('d-none');
//       $('.card-header').each(function() {
//         var accordionBtnText = $(this).find('.btn-link').text().toUpperCase();
//         if (accordionBtnText.indexOf(searchText) !== -1) {
//           $(this).removeClass('d-none');
//           var regex = new RegExp(searchText, 'gi');
//           var highlightedText = accordionBtnText.replace(regex, '<mark>$&</mark>');
//           $(this).find('.btn-link').html(highlightedText);
//           $(this).parents('.collapse').collapse('show');
//         }
//       });
//       $('.card').each(function() {
//         var visibleHeaders = $(this).find('.card-header:not(.d-none)').length;
//         if (visibleHeaders === 0) {
//           $(this).addClass('d-none');
//         } else {
//           $(this).removeClass('d-none');
//         }
//       });
//       $('.search-container').addClass('show-icons');
//     } else {
//       $('.card-header').removeClass('d-none');
//       $('.card-header .btn-link').each(function() {
//         $(this).html($(this).text());
//       });
//       $('.card').removeClass('d-none');
//       $('.search-container').removeClass('show-icons');
//     }
//   });

//   $('#search-btn').on('click', function() {
//     if ($('#search-input').val().length > 0) {
//       $('#search-input').val('');
//       $('#search-input').trigger('input');
//     } else {
//       $('.card-header').removeClass('d-none');
//       $('.card-header .btn-link').each(function() {
//         $(this).html($(this).text());
//       });
//       $('.card').removeClass('d-none');
//       $('.search-container').removeClass('show-icons');
//     }
//   });
// });