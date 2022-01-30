/*

   Table Of Content

   1. Preloader
   2. Smooth Scroll
   3. Scroll Naviagation Background Change with Sticky Navigation
   4. Mobile Navigation Hide or Collapse on Click
   5. Scroll To Top
   6. Typed.js
   7. Parallax Background
   8. Portfolio Filtering
   9. Magnific Popup
  10. Testimonial Carousel/Slider
  11. Statistics Counter
  12. Google Map


*/
(function ($) {
    'use strict';

    jQuery(document).ready(function () {

        var $form = $("#mc-form");

        /* Preloader */
        $(window).on('load', function () {
            $('body').addClass('loaded');
        });


        /* Smooth Scroll */
        $('a.smoth-scroll').on("click", function (e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 50
            }, 1000);
            e.preventDefault();
        });


        /* Scroll Naviagation Background Change with Sticky Navigation */
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 100) {
                $('.header-top-area').addClass('navigation-background');
            } else {
                $('.header-top-area').removeClass('navigation-background');
            }
        });


        /* Mobile Navigation Hide or Collapse on Click */
        $(document).on('click', '.navbar-collapse.in', function (e) {
            if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                $(this).collapse('hide');
            }
        });
        $('body').scrollspy({
            target: '.navbar-collapse',
            offset: 195

        });


        /* Scroll To Top */
        $(window).scroll(function () {
            if ($(this).scrollTop() >= 500) {
                $('.scroll-to-top').fadeIn();
            } else {
                $('.scroll-to-top').fadeOut();
            }
        });
        $('.scroll-to-top').click(function () {
            $('html, body').animate({scrollTop: 0}, 800);
            return false;
        });


        /* Typed.js */
        $(window).load(function () {
            $(".typing").typed({
                strings: ["Yaşamaya Değer Yapılar..."],
                typeSpeed: 50
            });
        });


        /* Parallax Background */
        $(window).stellar({
            responsive: true,
            horizontalScrolling: false,
            hideDistantElements: false,
            horizontalOffset: 0,
            verticalOffset: 0,
        });


        /* Portfolio Filtering */
        $('.portfolio-inner').mixItUp();


        /* Magnific Popup */
        $('.portfolio-popup').magnificPopup({
            type: 'image',

            gallery: {enabled: true},
            zoom: {
                enabled: true,
                duration: 500

            },

            image: {
                markup: '<div class="mfp-figure portfolio-pop-up">' +
                '<div class="mfp-close"></div>' +
                '<div class="mfp-img"></div>' +
                '<div class="mfp-bottom-bar portfolio_title">' +
                '<div class="mfp-title"></div>' +
                '<div class="mfp-counter"></div>' +
                '</div>' +
                '</div>',

                titleSrc: function (item) {
                    return item.el.attr('title');
                }
            }


        });


        /* Testimonial Carousel/Slider */
        $(".testimonial-carousel-list").owlCarousel({
            items: 1,
            autoPlay: true,
            stopOnHover: false,
            navigation: true,
            navigationText: ["<i class='fa fa-long-arrow-left fa-2x owl-navi'></i>", "<i class='fa fa-long-arrow-right fa-2x owl-navi'></i>"],
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [980, 1],
            itemsTablet: [768, 1],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            autoHeight: true,
            pagination: false,
            transitionStyle: "backSlide"
        });


        /* Statistics Counter */
        $('.statistics').appear(function () {
            var counter = $(this).find('.statistics-count');
            var toCount = counter.data('count');

            $(counter).countTo({
                from: 0,
                to: toCount,
                speed: 5000,
                refreshInterval: 50
            })
        });


        /* Google Map */
        $('#my-address').gMap({
            zoom: 15,
            scrollwheel: true,
            maptype: 'ROADMAP',
            markers: [
                {
                    address: "Köşklü Çeşme Mah. Yeni Bağdat Cad. No:154 A Gebze/Kocaeli",
                    html: "<a href='https://www.google.com/maps/place/Köşklü+Çeşme+Mahallesi,+Yeni+Bağdat+Cd.+No:154,+41400+Gebze+Kocaeli' target='_blank'><b>Adres</b><br>Köşklü Çeşme Mah. Yeni Bağdat Cad.<br>No:154 A Gebze/Kocaeli</a>",
                    popup: true
                }
            ]
        });

        /** ----------------------------------------------------
         *   Contact Form
         *  ---------------------------------------------------- */
            // Variable to hold request
        var request;
        // Bind to the submit event of our form
        $form.submit(function (event) {
            // Abort any pending request
            if (request) {
                request.abort();
            }
            // setup some local variables
            var $form = $(this);

            // Let's select and cache all the fields
            var $inputs = $form.find("input, select, button, textarea");

            // Serialize the data in the form
            var serializedData = $form.serialize();

            // Let's disable the inputs for the duration of the Ajax request.
            // Note: we disable elements AFTER the form data has been serialized.
            // Disabled form elements will not be serialized.
            $inputs.prop("disabled", true);

            // Fire off the request to /form.php
            request = $.ajax({
                url: "../message/send.php",
                type: "post",
                data: serializedData
            });

            // Callback handler that will be called on success
            request.done(function (/*response, textStatus, jqXHR*/) {
                $('#mc-form input[type=email], #mc-form input[type=text], #mc-form textarea').val("");
                $.magnificPopup.open({
                    items: {
                        src: '#message',
                        type: 'inline'
                    }
                });
            });

            // Callback handler that will be called on failure
            request.fail(function (jqXHR, textStatus, errorThrown) {
                // Log the error to the console
                console.error(
                    "The following error occurred: " +
                    textStatus, errorThrown
                );
            });

            // Callback handler that will be called regardless
            // if the request failed or succeeded
            request.always(function () {
                // Reenable the inputs
                $inputs.prop("disabled", false);
            });

            // Prevent default posting of form
            event.preventDefault();
        });
    });
})(jQuery);
