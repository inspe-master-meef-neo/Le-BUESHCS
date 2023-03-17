/* Direct access and scrolling */

$(document).ready(function () {
  // Function to update the address bar URL when a card is clicked
  function updateUrl(id) {
    if (history.pushState) {
      let url = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.pushState({ path: url }, "", url + "#" + encodeURIComponent(id));
    }
  }

  // Function to scroll the element into view and open the card
  function openCardAndScrollToView(cardHeader) {
    // Open the card
    let cardCollapse = $(cardHeader).next(".collapse");
    $(cardCollapse).collapse("show");

    // Scroll the card into view
    setTimeout(() => {
      cardHeader.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  }

  // Update URL and open the card when it's clicked
  $(".card-header").click(function () {
    let cardId = $(this).attr("id");
    updateUrl(cardId);
    openCardAndScrollToView(this);
  });

  // Check if there's a hash in the URL and open the corresponding card
  function openCardFromUrlHash() {
    if (window.location.hash) {
      let hash = decodeURIComponent(window.location.hash.substring(1));
      let cardHeader = document.getElementById(hash);

      if (cardHeader) {
        // If the card is inside a nested accordion, open the parent card first
        let parentCardHeaders = $(cardHeader).parents(".card").parents(".collapse").siblings(".card-header");
        if (parentCardHeaders.length) {
          parentCardHeaders.each((_, parentCardHeader) => {
            openCardAndScrollToView(parentCardHeader);
          });
        }

        // Open the card and scroll to view
        openCardAndScrollToView(cardHeader);
      }
    }
  }

  openCardFromUrlHash();
});

/* Enable popovers everywhere */

$(function () {
  $('[data-toggle="popover"]').popover()
})

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
    resetSearch();
  });

  // Search button
  $('#search-btn .search-icon').click(function() {
    $('#search-input').focus();
  });

  // Search input
  $('#search-input').on('keyup', function(event) {
    var searchText = $(this).val().toLowerCase();

    // Show or hide the close button
    if (searchText.length > 0) {
      $("#search-btn .close-icon").fadeIn();
      $("#search-btn .search-icon").fadeOut();
    } else {
      $("#search-btn .close-icon").fadeOut();
      $("#search-btn .search-icon").fadeIn();
    }

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
      resetSearch();
    }
  });

  // Reset search on ESC key
  $(document).keyup(function(event) {
    if (event.keyCode === 27) {
      resetSearch();
    }
  });

  // Function to reset the search
  function resetSearch() {
    // Reset search input
    $('#search-input').val('');

    // Remove highlight from all card headers
    $('.card-header').removeClass('search-highlight');

    // Show all cards
    $('.card').show();

    // Collapse all cards
    $('.card .collapse').collapse('hide');

    // Hide the close button
    $("#search-btn .close-icon").fadeOut();
    $("#search-btn .search-icon").fadeIn();

    // Blur the input
    $('#search-input').blur();
  }
});
