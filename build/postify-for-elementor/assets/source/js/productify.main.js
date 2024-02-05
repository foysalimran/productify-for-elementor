jQuery(document).ready(function ($) {
    "use strict";
    var pdt_myScript = function () {
      if ($(".ta-container").length > 0) {
        $(".ta-container").each(function () {
          var pdt_container = $(this),
            pdt_container_id = pdt_container.attr("id"),
            pdt_Wrapper_ID = "#" + pdt_container_id,
            pc_sid = $(pdt_Wrapper_ID).data("sid"), // The Shortcode ID.
            pdtCarousel = $("#" + pdt_container_id + " .ta-pdt-carousel"),
            pdtAccordion = $("#" + pdt_container_id + " .ta-collapse"),
            pdtfilter = $("#" + pdt_container_id + ".pdt-filter-wrapper"),
            ajaxurl = sppdt.ajaxurl,
            nonce = sppdt.nonce,
            pdtCarouselDir = pdtCarousel.attr("dir"),
            pdtSwiper,
            pdtCarouselData = pdtCarousel.data("carousel");
         
          if (pdtCarousel.length > 0) {
            var mobile_land = parseInt(
                pdtCarouselData.responsive.mobile_landscape
              ),
              tablet_size = parseInt(pdtCarouselData.responsive.tablet),
              desktop_size = parseInt(pdtCarouselData.responsive.desktop),
              lg_desktop_size = parseInt(pdtCarouselData.responsive.lg_desktop);
          }
  
          // Carousel Init function.
          function pdt_carousel_init() {
            // Carousel ticker mode.
            if (pdtCarouselData.mode == "ticker") {
              var item = pdtCarousel.find(".swiper-wrapper .swiper-slide").length;
              pdtSwiper = pdtCarousel.find(".swiper-wrapper").bxSlider({
                mode: "horizontal",
                moveSlides: 1,
                slideMargin: pdtCarouselData.spaceBetween,
                infiniteLoop: pdtCarouselData.loop,
                slideWidth: pdtCarouselData.ticker_width,
                minSlides: pdtCarouselData.slidesPerView.mobile,
                maxSlides: pdtCarouselData.slidesPerView.lg_desktop,
                speed: pdtCarouselData.ticker_speed * item,
                ticker: true,
                tickerHover: pdtCarouselData.stop_onHover,
                autoDirection: pdtCarouselDir,
              });
            }
  
            // Carousel Swiper for Standard & Center mode.
            if (
              pdtCarouselData.mode == "standard" ||
              pdtCarouselData.mode == "center"
            ) {
              if (
                pdtCarouselData.effect == "fade" ||
                pdtCarouselData.effect == "cube" ||
                pdtCarouselData.effect == "flip"
              ) {
                if ($(window).width() > lg_desktop_size) {
                  slidePerView = pdtCarouselData.slidesPerView.lg_desktop;
                } else if ($(window).width() > desktop_size) {
                  slidePerView = pdtCarouselData.slidesPerView.desktop;
                } else if ($(window).width() > tablet_size) {
                  slidePerView = pdtCarouselData.slidesPerView.tablet;
                } else if ($(window).width() > 0) {
                  slidePerView = pdtCarouselData.slidesPerView.mobile_landscape;
                }
                $(
                  pdt_Wrapper_ID +
                    " .ta-pdt-carousel .swiper-wrapper > .ta-productify-pro-item"
                )
                  .css("width", 100 / slidePerView + "%")
                  .removeClass("swiper-slide");
                var fade_items = $(
                  pdt_Wrapper_ID +
                    " .ta-pdt-carousel .swiper-wrapper > .ta-productify-pro-item"
                );
                var style =
                  pdtCarouselDir == "rtl" ? "marginLeft" : "marginRight";
                for (var i = 0; i < fade_items.length; i += slidePerView) {
                  fade_items
                    .slice(i, i + slidePerView)
                    .wrapAll('<div class="swiper-slide"></div>');
                  fade_items.eq(i - 1).css(style, 0);
                }
                pdtSwiper = new Swiper(
                  "#" + pdt_container_id + " .ta-pdt-carousel",
                  {
                    speed: pdtCarouselData.speed,
                    slidesPerView: 1,
                    spaceBetween: pdtCarouselData.spaceBetween,
                    loop:
                      pdtCarouselData.slidesRow.lg_desktop > "1" ||
                      pdtCarouselData.slidesRow.desktop > "1" ||
                      pdtCarouselData.slidesRow.tablet > "1" ||
                      pdtCarouselData.slidesRow.mobile_landscape > "1" ||
                      pdtCarouselData.slidesRow.mobile > "1"
                        ? false
                        : pdtCarouselData.loop,
                    effect: pdtCarouselData.effect,
                    slidesPerGroup: pdtCarouselData.slideToScroll.mobile,
                    preloadImages: false,
                    observer: true,
                    runCallbacksOnInit: false,
                    initialSlide: 0,
                    slidesPerColumn: pdtCarouselData.slidesRow.mobile,
                    slidesPerColumnFill: "row",
                    autoHeight:
                      pdtCarouselData.slidesRow.lg_desktop > "1" ||
                      pdtCarouselData.slidesRow.desktop > "1" ||
                      pdtCarouselData.slidesRow.tablet > "1" ||
                      pdtCarouselData.slidesRow.mobile_landscape > "1" ||
                      pdtCarouselData.slidesRow.mobile > "1"
                        ? false
                        : pdtCarouselData.autoHeight,
                    simulateTouch: pdtCarouselData.simulateTouch,
                    allowTouchMove: pdtCarouselData.allowTouchMove,
                    mousewheel: pdtCarouselData.slider_mouse_wheel,
                    centeredSlides: pdtCarouselData.center_mode,
                    lazy: pdtCarouselData.lazy,
                    pagination:
                      pdtCarouselData.pagination == true
                        ? {
                            el: ".swiper-pagination",
                            clickable: true,
                            dynamicBullets: pdtCarouselData.dynamicBullets,
                            renderBullet: function (index, className) {
                              if (pdtCarouselData.bullet_types == "number") {
                                return (
                                  '<span class="' +
                                  className +
                                  '">' +
                                  (index + 1) +
                                  "</span>"
                                );
                              } else {
                                return '<span class="' + className + '"></span>';
                              }
                            },
                          }
                        : false,
                    autoplay: {
                      delay: pdtCarouselData.autoplay_speed,
                    },
                    navigation:
                      pdtCarouselData.navigation == true
                        ? {
                            nextEl: ".pdt-button-next",
                            prevEl: ".pdt-button-prev",
                          }
                        : false,
                    fadeEffect: {
                      crossFade: true,
                    },
                    ally: {
                      enabled: pdtCarouselData.enabled,
                      prevSlideMessage: pdtCarouselData.prevSlideMessage,
                      nextSlideMessage: pdtCarouselData.nextSlideMessage,
                      firstSlideMessage: pdtCarouselData.firstSlideMessage,
                      lastSlideMessage: pdtCarouselData.lastSlideMessage,
                      paginationBulletMessage:
                        pdtCarouselData.paginationBulletMessage,
                    },
                    keyboard: {
                      enabled: pdtCarouselData.keyboard === "true" ? true : false,
                    },
                  }
                );
              } else {
                pdtSwiper = new Swiper(
                  "#" + pdt_container_id + " .ta-pdt-carousel",
                  {
                    speed: pdtCarouselData.speed,
                    slidesPerView: pdtCarouselData.slidesPerView.mobile,
                    spaceBetween: pdtCarouselData.spaceBetween,
                    loop:
                      pdtCarouselData.slidesRow.lg_desktop > "1" ||
                      pdtCarouselData.slidesRow.desktop > "1" ||
                      pdtCarouselData.slidesRow.tablet > "1" ||
                      pdtCarouselData.slidesRow.mobile_landscape > "1" ||
                      pdtCarouselData.slidesRow.mobile > "1"
                        ? false
                        : pdtCarouselData.loop,
                    effect: pdtCarouselData.effect,
                    slidesPerGroup: pdtCarouselData.slideToScroll.mobile,
                    preloadImages: false,
                    observer: true,
                    runCallbacksOnInit: false,
                    initialSlide: 0,
                    slidesPerColumn: pdtCarouselData.slidesRow.mobile,
                    slidesPerColumnFill: "row",
                    autoHeight:
                      pdtCarouselData.slidesRow.lg_desktop > "1" ||
                      pdtCarouselData.slidesRow.desktop > "1" ||
                      pdtCarouselData.slidesRow.tablet > "1" ||
                      pdtCarouselData.slidesRow.mobile_landscape > "1" ||
                      pdtCarouselData.slidesRow.mobile > "1"
                        ? false
                        : pdtCarouselData.autoHeight,
                    simulateTouch: pdtCarouselData.simulateTouch,
                    allowTouchMove: pdtCarouselData.allowTouchMove,
                    mousewheel: pdtCarouselData.slider_mouse_wheel,
                    centeredSlides: pdtCarouselData.center_mode,
                    lazy: pdtCarouselData.lazy,
                    pagination:
                      pdtCarouselData.pagination == true
                        ? {
                            el: ".swiper-pagination",
                            clickable: true,
                            dynamicBullets: pdtCarouselData.dynamicBullets,
                            renderBullet: function (index, className) {
                              if (pdtCarouselData.bullet_types == "number") {
                                return (
                                  '<span class="' +
                                  className +
                                  '">' +
                                  (index + 1) +
                                  "</span>"
                                );
                              } else {
                                return '<span class="' + className + '"></span>';
                              }
                            },
                          }
                        : false,
                    autoplay: {
                      delay: pdtCarouselData.autoplay_speed,
                    },
                    navigation:
                      pdtCarouselData.navigation == true
                        ? {
                            nextEl: ".pdt-button-next",
                            prevEl: ".pdt-button-prev",
                          }
                        : false,
                    breakpoints: {
                      [mobile_land]: {
                        slidesPerView:
                          pdtCarouselData.slidesPerView.mobile_landscape,
                        slidesPerGroup:
                          pdtCarouselData.slideToScroll.mobile_landscape,
                        slidesPerColumn:
                          pdtCarouselData.slidesRow.mobile_landscape,
                        navigation:
                          pdtCarouselData.navigation_mobile == true
                            ? {
                                nextEl: ".pdt-button-next",
                                prevEl: ".pdt-button-prev",
                              }
                            : false,
                        pagination:
                          pdtCarouselData.pagination_mobile == true
                            ? {
                                el: ".swiper-pagination",
                                clickable: true,
                                dynamicBullets: pdtCarouselData.dynamicBullets,
                                renderBullet: function (index, className) {
                                  if (pdtCarouselData.bullet_types == "number") {
                                    return (
                                      '<span class="' +
                                      className +
                                      '">' +
                                      (index + 1) +
                                      "</span>"
                                    );
                                  } else {
                                    return (
                                      '<span class="' + className + '"></span>'
                                    );
                                  }
                                },
                              }
                            : false,
                      },
                      [tablet_size]: {
                        slidesPerView: pdtCarouselData.slidesPerView.tablet,
                        slidesPerGroup: pdtCarouselData.slideToScroll.tablet,
                        slidesPerColumn: pdtCarouselData.slidesRow.tablet,
                      },
                      [desktop_size]: {
                        slidesPerView: pdtCarouselData.slidesPerView.desktop,
                        slidesPerGroup: pdtCarouselData.slideToScroll.desktop,
                        slidesPerColumn: pdtCarouselData.slidesRow.desktop,
                      },
                      [lg_desktop_size]: {
                        slidesPerView: pdtCarouselData.slidesPerView.lg_desktop,
                        slidesPerGroup: pdtCarouselData.slideToScroll.lg_desktop,
                        slidesPerColumn: pdtCarouselData.slidesRow.lg_desktop,
                      },
                    },
                    fadeEffect: {
                      crossFade: true,
                    },
                    ally: {
                      enabled: pdtCarouselData.enabled,
                      prevSlideMessage: pdtCarouselData.prevSlideMessage,
                      nextSlideMessage: pdtCarouselData.nextSlideMessage,
                      firstSlideMessage: pdtCarouselData.firstSlideMessage,
                      lastSlideMessage: pdtCarouselData.lastSlideMessage,
                      paginationBulletMessage:
                        pdtCarouselData.paginationBulletMessage,
                    },
                    keyboard: {
                      enabled: pdtCarouselData.keyboard === "true" ? true : false,
                    },
                  }
                );
              }
              if (pdtCarouselData.autoplay === false) {
                pdtSwiper.autoplay.stop();
              }
              if (pdtCarouselData.stop_onHover && pdtCarouselData.autoplay) {
                $(pdtCarousel).on({
                  mouseenter: function () {
                    pdtSwiper.autoplay.stop();
                  },
                  mouseleave: function () {
                    pdtSwiper.autoplay.start();
                  },
                });
              }
              $(window).on("resize", function () {
                pdtSwiper.update();
              });
              $(window).trigger("resize");
            }
          }
          if (pdtCarousel.length > 0) {
            pdt_carousel_init();
          }
          $(
            ".ta-overlay.ta-pdt-post,.ta-content-box.ta-pdt-post",
            pdt_Wrapper_ID
          ).on("mouseover", function () {
            $(this)
              .find(".productify__item__content.animated:not(.pdt_hover)")
              .addClass("pdt_hover");
          });
  
          
          /**
           *  Isotope Filter layout.
           */
          if (pdtfilter.length > 0) {
            if (pdtfilter.data("grid") == "masonry") {
              var layoutMode = "masonry";
            } else {
              var layoutMode = "fitRows";
            }
            var $grid = $(".grid", pdt_Wrapper_ID).isotope({
              itemSelector: ".item",
              //layoutMode: 'fitRows'
              layoutMode: layoutMode,
            });
            $grid.imagesLoaded().progress(function () {
              $grid.isotope("layout");
            });
  
            // This function added for pdt-Lazyload.
            function pdt_lazyload() {
              $is_find = $(".ta-pdt-post-thumb-area img").hasClass(
                "pdt-lazyload"
              );
              if ($is_find) {
                $("img.pdt-lazyload")
                  .pdt_lazyload({ effect: "fadeIn", effectTime: 2000 })
                  .removeClass("pdt-lazyload")
                  .addClass("pdt-lazyloaded");
              }
              $grid.isotope("layout");
            }
  
            // Store filter for each group.
            var filters = {};
            $(".pdt-shuffle-filter .taxonomy-group", pdt_Wrapper_ID).on(
              "change",
              function (event) {
                var $select = $(event.target);
                // get group key
                var filterGroup = $select.attr("data-filter-group");
                // set filter for group
                filters[filterGroup] = event.target.value;
                // combine filters
                var filterValue = concatValues(filters);
                // set filter for Isotope
                $grid.isotope({ filter: filterValue });
                $grid.on("layoutComplete", function () {
                  $(window).trigger("scroll");
                });
              }
            );
  
            $(".pdt-shuffle-filter", pdt_Wrapper_ID).on(
              "click",
              ".pdt-button",
              function (event) {
                var $button = $(event.currentTarget);
                // get group key
                var $taxonomyGroup = $button.parents(".taxonomy-group");
                var filterGroup = $taxonomyGroup.attr("data-filter-group");
                // taxonomy = $taxonomyGroup.attr('data-filter-group');
                // set filter for group
                filters[filterGroup] = $button.attr("data-filter");
                //  term_id = $button.attr('data-termid');
                // combine filters
                var filterValue = concatValues(filters);
                // set filter for Isotope
                $grid.isotope({ filter: filterValue });
                $grid.on("layoutComplete", function () {
                  $(window).trigger("scroll");
                });
              }
            );
            // Change is-active class on buttons.
            $(".taxonomy-group", pdt_Wrapper_ID).each(function (
              i,
              taxonomyGroup
            ) {
              var $taxonomyGroup = $(taxonomyGroup);
              var $find_active_button = $taxonomyGroup.find(".is-active");
              if ($find_active_button.length == 0) {
                $taxonomyGroup
                  .find("button:nth-child(1)")
                  .addClass("is-active")
                  .click();
              }
              $taxonomyGroup.on("click", "button", function (event) {
                $taxonomyGroup.find(".is-active").removeClass("is-active");
                var $button = $(event.currentTarget);
                $button.addClass("is-active");
              });
            });
            // Flatten object by concatenation values.
            function concatValues(obj) {
              var value = "";
              for (var prop in obj) {
                value += obj[prop];
              }
              return value;
            }
          }
  
          function pdt_item_same_height() {
            var maxHeight = 0;
            $(pdt_Wrapper_ID + ".pdt_same_height .item").each(function () {
              if ($(this).find(".ta-pdt-post").height() > maxHeight) {
                maxHeight = $(this).find(".ta-pdt-post").height();
              }
            });
            $(pdt_Wrapper_ID + ".pdt_same_height .ta-pdt-post").height(maxHeight);
          }
          if (
            $(pdt_Wrapper_ID + ".pdt_same_height").hasClass("pdt-filter-wrapper")
          ) {
            pdt_item_same_height();
          }
  
          // Ajax Action for Live filter.
          var keyword = "",
            orderby = "",
            taxonomy = "",
            order = "",
            term_id = "",
            page = "",
            spsp_lang = $(pdt_Wrapper_ID).data("lang");
            var author_id = "",
            custom_field_key = "",
            custom_field_value = "",
            pdt_hash_url = Array(),
            pdt_last_filter = "",
            custom_fields_array = Array(),
            is_pagination_url_change = true;
          function pdt_ajax_action(selected_term_list = null) {
            jQuery.ajax({
              url: ajaxurl,
              type: "POST",
              data: {
                action: "pdt_product_order",
                id: pc_sid,
                lang: spsp_lang,
                order: order,
                keyword: keyword,
                orderby: orderby,
                taxonomy: taxonomy,
                term_id: term_id,
                author_id: author_id,
                nonce: nonce,
                term_list: selected_term_list,
                custom_fields_array: custom_fields_array,
              },
              success: function (data) {
                var $data = $(data);
                var $newElements = $data;
  
                if ($(pdt_Wrapper_ID).hasClass("pdt-masonry")) {
                  var $product_wrapper = $(".ta-row", pdt_Wrapper_ID);
                  $product_wrapper.masonry("destroy");
                  $product_wrapper.html($newElements).imagesLoaded(function () {
                    $product_wrapper.masonry();
                  });
                } else if ($(pdt_Wrapper_ID).hasClass("pdt-filter-wrapper")) {
                  $(
                    ".ta-row, .pdt-timeline-grid, .ta-collapse, .table-responsive tbody",
                    pdt_Wrapper_ID
                  ).html($newElements);
                  $grid
                    .append($newElements)
                    .isotope("appended", $newElements)
                    .imagesLoaded(function () {
                      $grid.isotope("layout");
                    });
                  pdt_item_same_height();
                } else if (pdtCarousel.length > 0) {
                  if (pdtCarouselData.mode == "ticker") {
                    pdtSwiper.destroySlider();
                    $(".swiper-wrapper", pdt_Wrapper_ID).html($newElements);
                    pdt_carousel_init();
                    pdtSwiper.reloadSlider();
                  } else {
                    pdtSwiper.destroy(true, true);
                    $(".swiper-wrapper", pdt_Wrapper_ID).html($newElements);
                    pdt_carousel_init();
                  }
                } else {
                  var $newElements = $data.css({
                    opacity: 0,
                  });
                  $(
                    ".ta-row, .pdt-timeline-grid, .ta-collapse, .table-responsive tbody",
                    pdt_Wrapper_ID
                  ).html($newElements);
                  if (pdtAccordion.length > 0) {
                    pdtAccordion.accordion("refresh");
                    if (accordion_mode === "multi-open") {
                      pdtAccordion
                        .find(".pdt-collapse-header")
                        .next()
                        .slideDown();
                      pdtAccordion
                        .find(".pdt-collapse-header .fa")
                        .removeClass("fa-plus")
                        .addClass("fa-minus");
                    }
                  }
                  var $newElements = $data.css({
                    opacity: 1,
                  });
                }
                pdt_lazyload();
              },
            });
          }
  
          // Pagination.
          function pdt_pagination_action(selected_term_list = null) {
            var LoadMoreText = $(".ta-pdt-pagination-data", pdt_Wrapper_ID).data(
              "loadmoretext"
            );
            var EndingMessage = $(".ta-pdt-pagination-data", pdt_Wrapper_ID).data(
              "endingtext"
            );
            jQuery.ajax({
              url: ajaxurl,
              type: "POST",
              data: {
                action: "post_pagination_bar_mobile",
                id: pc_sid,
                order: order,
                lang: spsp_lang,
                keyword: keyword,
                orderby: orderby,
                taxonomy: taxonomy,
                author_id: author_id,
                term_id: term_id,
                page: page,
                nonce: nonce,
                term_list: selected_term_list,
                custom_fields_array: custom_fields_array,
              },
              success: function (data) {
                var $data = $(data);
                var $newElements = $data;
                $(
                  ".pdt-post-pagination.pdt-on-mobile:not(.no_ajax)",
                  pdt_Wrapper_ID
                ).html($newElements);
                if (
                  Pagination_Type == "infinite_scroll" ||
                  Pagination_Type == "ajax_load_more"
                ) {
                  $(".pdt-load-more", pdt_Wrapper_ID)
                    .removeClass("finished")
                    .removeClass("pdt-hide")
                    .html(
                      '<button pdt-processing="0">' + LoadMoreText + "</button>"
                    );
                  if (!$(".pdt-post-pagination a", pdt_Wrapper_ID).length) {
                    $(".pdt-load-more", pdt_Wrapper_ID)
                      .show()
                      .html(EndingMessage);
                  }
                }
                if (Pagination_Type == "infinite_scroll") {
                  $(".pdt-load-more", pdt_Wrapper_ID).addClass("pdt-hide");
                }
              },
            });
            jQuery.ajax({
              url: ajaxurl,
              type: "POST",
              data: {
                action: "post_pagination_bar",
                id: pc_sid,
                order: order,
                lang: spsp_lang,
                keyword: keyword,
                orderby: orderby,
                taxonomy: taxonomy,
                author_id: author_id,
                term_id: term_id,
                page: page,
                nonce: nonce,
                term_list: selected_term_list,
                custom_fields_array: custom_fields_array,
              },
              success: function (data) {
                var $data = $(data);
                var $newElements = $data;
                $(
                  ".pdt-post-pagination.pdt-on-desktop:not(.no_ajax)",
                  pdt_Wrapper_ID
                ).html($newElements);
                if (
                  Pagination_Type == "infinite_scroll" ||
                  Pagination_Type == "ajax_load_more"
                ) {
                  $(".pdt-load-more", pdt_Wrapper_ID)
                    .removeClass("finished")
                    .removeClass("pdt-hide")
                    .html(
                      '<button pdt-processing="0">' + LoadMoreText + "</button>"
                    );
                }
                if (Pagination_Type == "infinite_scroll") {
                  $(".pdt-load-more", pdt_Wrapper_ID).addClass("pdt-hide");
                }
                if (!$(".pdt-post-pagination a", pdt_Wrapper_ID).length) {
                  $(".pdt-load-more", pdt_Wrapper_ID).show().html(EndingMessage);
                }
                pdt_lazyload();
              },
            });
          }
          // Live filter button reset on ajax call.
          function pdt_live_filter_reset(selected_term_list = null) {
            jQuery.ajax({
              url: ajaxurl,
              type: "POST",
              data: {
                action: "pdt_live_filter_reset",
                id: pc_sid,
                order: order,
                lang: spsp_lang,
                keyword: keyword,
                orderby: orderby,
                taxonomy: taxonomy,
                term_id: term_id,
                author_id: author_id,
                nonce: nonce,
                term_list: selected_term_list,
                last_filter: pdt_last_filter,
                custom_fields_array: custom_fields_array,
              },
              success: function (data) {
                var $data = $(data);
                var $newElements = $data.animate({
                  opacity: 0.5,
                });
                $(".pdt-filter-bar", pdt_Wrapper_ID).html($newElements);
                custom_field_filter_slider();
                $newElements.animate({
                  opacity: 1,
                });
              },
            });
          }
          // Update Hash url array.
          function pdt_hash_update_arr(pdt_filter_keyword, filter_arr, key) {
            if (pdt_hash_url.length > 0) {
              pdt_hash_url.forEach(function (row) {
                if ($.inArray(pdt_filter_keyword, row.pdt_filter_keyword)) {
                  row[key] = pdt_filter_keyword;
                } else {
                  pdt_hash_url.push(filter_arr);
                }
              });
            } else {
              pdt_hash_url.push(filter_arr);
            }
            return pdt_hash_url;
          }
          // On normal pagination go to current shortcode.
          var url_hash = window.location.search;
          if (url_hash.indexOf("paged") >= 0) {
            var s_id = /paged(\d+)/.exec(url_hash)[1];
            var spscurrent_id = document.getElementById("pdt_wrapper-" + s_id);
            spscurrent_id.scrollIntoView();
          }
          // Update url.
          var selected_term_list = Array();
          function pdt_update_url() {
            var p_search = window.location.search;
            if (p_search.indexOf("page_id") >= 0) {
              var pdt_page = /page_id\=(\d+)/.exec(p_search)[1];
              var pdt_url = "?page_id=" + pdt_page + "&";
            } else {
              var pdt_url = "&";
            }
            if (pdt_hash_url.length > 0) {
              $.map(pdt_hash_url, function (value, index) {
                $.map(value, function (value2, index2) {
                  if (
                    value2 == "all" ||
                    value2 == "none" ||
                    value2 == "" ||
                    value2 == "page"
                  ) {
                    pdt_url += "";
                  } else {
                    pdt_url += "pdt_" + index2 + "=" + value2 + "&";
                  }
                });
              });
            }
            if (selected_term_list.length > 0) {
              var term_total_length = selected_term_list.length;
              $.map(selected_term_list, function (value, index) {
                if (value.term_id == "all" || value.term_id == "") {
                  pdt_url += "";
                } else {
                  if (index == term_total_length - 1) {
                    pdt_url += "tx_" + value.taxonomy + "=" + value.term_id + "";
                  } else {
                    pdt_url += "tx_" + value.taxonomy + "=" + value.term_id + "&";
                  }
                }
              });
            }
            if (custom_fields_array.length > 0) {
              var meta_field_total_length = custom_fields_array.length;
              $.map(custom_fields_array, function (value, index) {
                //  if (index == meta_field_total_length - 1) {
                pdt_url +=
                  "cf" +
                  value.custom_field_key +
                  "=" +
                  value.custom_field_value +
                  "&";
                // }
              });
            }
            if (pdt_hash_url.length < 0 || selected_term_list.length < 0) {
              pdt_url = "";
            }
            if (pdt_url.length > 1) {
              var slf = "";
              if (pdt_last_filter.length > 0) {
                var slf = "&slf=" + pdt_last_filter;
              }
  
              pdt_url = "?sps=" + pc_sid + slf + pdt_url;
              history.pushState(null, null, encodeURI(pdt_url));
            } else {
              var uri = window.location.toString();
              if (uri.indexOf("?") > 0) {
                var clean_uri = uri.substring(0, uri.indexOf("?"));
                window.history.replaceState({}, document.title, clean_uri);
              }
            }
          }
  
          function custom_field_filter_slider() {
            $(pdt_Wrapper_ID + " .pdt-custom-field-filter-slider").each(
              function () {
                var _that = $(this);
                var _input = _that.find(".pdt-input");
                var custom_field_key = _input.attr("name");
                var _min = _input.data("min");
                var _crmin = _input.data("crmin");
                var _crmax = _input.data("crmax");
                var _max = _input.data("max");
                _that.find(".pdt-slider").slider({
                  range: true,
                  min: _crmin,
                  max: _crmax,
                  values: [_min, _max],
                  slide: function (event, ui) {
                    _input.val(ui.values[0] + " - " + ui.values[1]);
                  },
                  stop: function (event, ui) {
                    _input.data("max", ui.values[1]);
  
                    custom_field_value = ui.values[0] + " " + ui.values[1];
                    custom_fields_array.push({
                      custom_field_key,
                      custom_field_value,
                    });
                    custom_fields_array.map(function (person) {
                      if (person.custom_field_key === custom_field_key) {
                        person.custom_field_value = custom_field_value;
                      }
                    });
                    custom_fields_array = $.grep(
                      custom_fields_array,
                      function (e, i) {
                        return e.custom_field_value.length;
                      }
                    );
                    custom_fields_array = custom_fields_array
                      .map(JSON.stringify)
                      .reverse() // convert to JSON string the array content, then reverse it (to check from end to beginning)
                      .filter(function (item, index, arr) {
                        return arr.indexOf(item, index + 1) === -1;
                      }) // check if there is any occurrence of the item in whole array
                      .reverse()
                      .map(JSON.parse);
                    pdt_update_url();
                    pdt_last_filter = custom_field_key;
                    pdt_ajax_action(selected_term_list);
                    pdt_live_filter_reset(selected_term_list);
                  },
                });
              }
            );
          }
          custom_field_filter_slider();
          // Ajax post search.
          $("input.pdt-search-field", pdt_Wrapper_ID).on("keyup", function () {
            var that = $(this);
            keyword = that.val();
            pdt_last_filter = "keyword";
            var pdt_search_arr = { keyword, keyword };
            pdt_live_filter_reset(selected_term_list);
            pdt_hash_update_arr(keyword, pdt_search_arr, "keyword");
            pdt_update_url();
            pdt_ajax_action(selected_term_list);
            pdt_pagination_action();
            is_pagination_url_change = false;
            pdt_hash_update_arr("page", { page: "" }, "page");
            pdt_update_url();
          });
  
          // Post order by.
          $(".pdt-order-by", pdt_Wrapper_ID).on("change", function () {
            var that;
            $(this)
              .find("option:selected, input:radio:checked")
              .each(function () {
                that = $(this);
                orderby = that.val();
              });
            var orerbyarr = { orderby, orderby };
            pdt_hash_update_arr(orderby, orerbyarr, "orderby");
            pdt_update_url();
            pdt_ajax_action();
            pdt_pagination_action();
            pdt_hash_update_arr("page", { page: "" }, "page");
            pdt_update_url();
          });
  
          function pdt_filter_push(myarr, item) {
            var found = false;
            var i = 0;
            while (i < myarr.length) {
              if (myarr[i] === item) {
                // Do the logic (delete or replace)
                found = true;
                break;
              }
              i++;
            }
            // Add the item
            if (!found) myarr.push(item);
            return myarr;
          }
  
          // Pre Filter Init.
          var tax_list = Array();
          $(".pdt-filter-by", pdt_Wrapper_ID)
            .find("option:selected, input:radio:checked")
            .each(function () {
              term_id = $(this).val();
              taxonomy = $(this).data("taxonomy");
              var selected_tax_length = selected_term_list.length;
              if (selected_tax_length > 0) {
                var selected_tax =
                  selected_term_list[selected_tax_length - 1]["taxonomy"];
                selected_term_list.map(function (person) {
                  if (person.taxonomy === taxonomy) {
                    person.term_id = term_id;
                  }
                });
                // if ($.inArray(taxonomy, tax_list) == -1) {
                selected_term_list.push({
                  taxonomy,
                  term_id,
                });
                //  }
                if (
                  selected_term_list[selected_tax_length - 1]["term_id"] ==
                    "all" &&
                  selected_tax === taxonomy
                ) {
                  tax_list = tax_list.filter(function (val) {
                    return val !== taxonomy;
                  });
                } else {
                  tax_list = pdt_filter_push(tax_list, taxonomy);
                }
                selected_term_list = $.grep(selected_term_list, function (e, i) {
                  return e.term_id != "all";
                });
              } else {
                selected_term_list.push({
                  taxonomy,
                  term_id,
                });
                selected_term_list = $.grep(selected_term_list, function (e, i) {
                  return e.term_id != "all";
                });
                tax_list = Array(taxonomy);
              }
            });
          $(".pdt-author-filter", pdt_Wrapper_ID)
            .find("option:selected, input:radio:checked")
            .each(function () {
              that = $(this);
              author_id = that.val();
            });
          $(".pdt-order", pdt_Wrapper_ID)
            .find("option:selected, input:radio:checked")
            .each(function () {
              that = $(this);
              order = $(this).val();
            });
          $(".pdt-order-by", pdt_Wrapper_ID)
            .find("option:selected, input:radio:checked")
            .each(function () {
              that = $(this);
              orderby = that.val();
            });
          $("input.pdt-search-field", pdt_Wrapper_ID).each(function () {
            var that = $(this);
            keyword = that.val();
          });
          $(".pdt-filter-by-checkbox", pdt_Wrapper_ID).each(function () {
            var current_tax = $(this).data("taxonomy");
            var term_ids = "";
            $(this)
              .find("input[name='" + current_tax + "']:checkbox:checked")
              .each(function () {
                term_ids += $(this).val() + ",";
                taxonomy = $(this).data("taxonomy");
              });
            term_id = term_ids.replace(/,(?=\s*$)/, "");
            selected_term_list.map(function (person) {
              if (person.taxonomy === current_tax) {
                person.term_id = term_id;
              }
            });
            selected_term_list.push({
              taxonomy,
              term_id,
            });
          });
          selected_term_list = $.grep(selected_term_list, function (e, i) {
            return e.term_id.length;
          });
          // Custom field filter.
          $(".pdt-custom-field-filter", pdt_Wrapper_ID).each(function () {
            $(this)
              .find("option:selected, input:radio:checked")
              .each(function () {
                custom_field_key = $(this).attr("name");
                custom_field_value = $(this).val();
                custom_fields_array.map(function (person) {
                  if (person.custom_field_key === custom_field_key) {
                    person.custom_field_value = custom_field_value;
                  }
                });
                custom_fields_array.push({
                  custom_field_key,
                  custom_field_value,
                });
              });
          });
          selected_term_list = selected_term_list
            .map(JSON.stringify)
            .reverse() // convert to JSON string the array content, then reverse it (to check from end to beginning)
            .filter(function (item, index, arr) {
              return arr.indexOf(item, index + 1) === -1;
            }) // check if there is any occurence of the item in whole array
            .reverse()
            .map(JSON.parse);
          // Filter by checkbox.
          $(pdt_Wrapper_ID).on("change", ".pdt-filter-by-checkbox", function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(".pdt-filter-by-checkbox", pdt_Wrapper_ID).each(function () {
              var current_tax = $(this).data("taxonomy");
              var term_ids = "";
              $(this)
                .find("input[name='" + current_tax + "']:checkbox:checked")
                .each(function () {
                  term_ids += $(this).val() + ",";
                  taxonomy = $(this).data("taxonomy");
                });
              term_id = term_ids.replace(/,(?=\s*$)/, "");
              selected_term_list.map(function (person) {
                if (person.taxonomy === current_tax) {
                  person.term_id = term_id;
                }
              });
              selected_term_list.push({
                taxonomy,
                term_id,
              });
            });
            selected_term_list = $.grep(selected_term_list, function (e, i) {
              return e.term_id.length;
            });
            selected_term_list = selected_term_list
              .map(JSON.stringify)
              .reverse() // convert to JSON string the array content, then reverse it (to check from end to beginning)
              .filter(function (item, index, arr) {
                return arr.indexOf(item, index + 1) === -1;
              }) // check if there is any occurence of the item in whole array
              .reverse()
              .map(JSON.parse);
            var term_ids = "";
            $(this)
              .find("input:checkbox:checked")
              .each(function () {
                term_ids += $(this).val() + ",";
                taxonomy = $(this).data("taxonomy");
              });
            taxonomy = $(this).data("taxonomy");
            term_id = term_ids.replace(/,(?=\s*$)/, "");
            if (term_id.length > 0) {
              pdt_last_filter = taxonomy;
            } else {
              pdt_last_filter = pdt_last_filter;
            }
            pdt_hash_update_arr("page", { page: "" }, "page");
            pdt_update_url();
            pdt_live_filter_reset(selected_term_list);
            pdt_ajax_action(selected_term_list);
            pdt_pagination_action(selected_term_list);
          });
  
          // Filter by custom field.
          $(pdt_Wrapper_ID).on(
            "change",
            ".pdt-custom-field-filter",
            function (e) {
              e.stopPropagation();
              e.preventDefault();
              $(".pdt-custom-field-filter", pdt_Wrapper_ID).each(function () {
                $(this)
                  .find("option:selected, input:radio:checked")
                  .each(function () {
                    custom_field_key = $(this).attr("name");
                    custom_field_value = $(this).val();
                    custom_fields_array.map(function (person) {
                      if (person.custom_field_key === custom_field_key) {
                        person.custom_field_value = custom_field_value;
                      }
                    });
                    custom_fields_array.push({
                      custom_field_key,
                      custom_field_value,
                    });
                  });
              });
              pdt_last_filter = $(this)
                .find("option:selected, input:radio:checked")
                .attr("name");
              custom_fields_array = $.grep(custom_fields_array, function (e, i) {
                return e.custom_field_value != "all";
              });
              custom_fields_array = custom_fields_array
                .map(JSON.stringify)
                .reverse() // convert to JSON string the array content, then reverse it (to check from end to beginning)
                .filter(function (item, index, arr) {
                  return arr.indexOf(item, index + 1) === -1;
                }) // check if there is any occurence of the item in whole array
                .reverse()
                .map(JSON.parse);
              pdt_ajax_action(selected_term_list);
              pdt_pagination_action(selected_term_list);
              pdt_live_filter_reset(selected_term_list);
              pdt_update_url();
            }
          );
          // Filter by checkbox custom field.
          $(pdt_Wrapper_ID).on(
            "change",
            ".pdt-custom-field-filter-checkbox",
            function (e) {
              e.stopPropagation();
              e.preventDefault();
              $(".pdt-custom-field-filter-checkbox", pdt_Wrapper_ID).each(
                function () {
                  var custom_field_key = $(this)
                    .find("input:checkbox")
                    .attr("name");
                  var custom_field_value = "";
                  $(this)
                    .find(
                      "input[name='" + custom_field_key + "']:checkbox:checked"
                    )
                    .each(function () {
                      custom_field_key = $(this).attr("name");
                      custom_field_value += $(this).val() + ",";
                    });
                  custom_field_value = custom_field_value.replace(
                    /,(?=\s*$)/,
                    ""
                  );
                  custom_fields_array.push({
                    custom_field_key,
                    custom_field_value,
                  });
                  custom_fields_array.map(function (person) {
                    if (person.custom_field_key === custom_field_key) {
                      person.custom_field_value = custom_field_value;
                    }
                  });
                  custom_fields_array = $.grep(
                    custom_fields_array,
                    function (e, i) {
                      return e.custom_field_value.length;
                    }
                  );
                }
              );
              pdt_last_filter = $(this)
                .find("input:checkbox:checked")
                .attr("name");
              custom_fields_array = custom_fields_array
                .map(JSON.stringify)
                .reverse() // convert to JSON string the array content, then reverse it (to check from end to beginning)
                .filter(function (item, index, arr) {
                  return arr.indexOf(item, index + 1) === -1;
                }) // check if there is any occurrence of the item in whole array
                .reverse()
                .map(JSON.parse);
              pdt_ajax_action(selected_term_list);
              pdt_pagination_action(selected_term_list);
              pdt_live_filter_reset(selected_term_list);
              pdt_update_url();
            }
          );
          // Filter by taxonomy.
          $(pdt_Wrapper_ID).on("change", ".pdt-filter-by", function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(this)
              .find("option:selected, input:radio:checked")
              .each(function () {
                term_id = $(this).val();
                taxonomy = $(this).data("taxonomy");
                var selected_tax_length = selected_term_list.length;
                if (selected_tax_length > 0) {
                  var selected_tax =
                    selected_term_list[selected_tax_length - 1]["taxonomy"];
                  selected_term_list.map(function (person) {
                    if (person.taxonomy === taxonomy) {
                      person.term_id = term_id;
                    }
                  });
                  // if ($.inArray(taxonomy, tax_list) == -1) {
                  selected_term_list.push({
                    taxonomy,
                    term_id,
                  });
                  //  }
                  if (
                    selected_term_list[selected_tax_length - 1]["term_id"] ==
                      "all" &&
                    selected_tax === taxonomy
                  ) {
                    tax_list = tax_list.filter(function (val) {
                      return val !== taxonomy;
                    });
                  } else {
                    tax_list = pdt_filter_push(tax_list, taxonomy);
                  }
                  selected_term_list = $.grep(
                    selected_term_list,
                    function (e, i) {
                      return e.term_id != "all";
                    }
                  );
                } else {
                  selected_term_list.push({
                    taxonomy,
                    term_id,
                  });
                  tax_list = Array(taxonomy);
                }
              });
            if (term_id == "all") {
              pdt_last_filter = pdt_last_filter;
            } else {
              pdt_last_filter = taxonomy;
            }
            selected_term_list = selected_term_list
              .map(JSON.stringify)
              .reverse()
              .filter(function (item, index, selected_term_list) {
                return selected_term_list.indexOf(item, index + 1) === -1;
              })
              .reverse()
              .map(JSON.parse);
            pdt_hash_update_arr("page", { page: "" }, "page");
            pdt_update_url();
            // if ($('.pdt-filter-by', pdt_Wrapper_ID).length > 1) {
            pdt_live_filter_reset(selected_term_list);
            //}
            pdt_ajax_action(selected_term_list);
            pdt_pagination_action(selected_term_list);
          });
          // Author filter.
          $(pdt_Wrapper_ID).on("change", ".pdt-author-filter", function (e) {
            var that;
            $(this)
              .find("option:selected, input:radio:checked")
              .each(function () {
                that = $(this);
                author_id = that.val();
              });
            var author_arr = { author_id, author_id };
            if (author_id == "all") {
              pdt_last_filter = pdt_last_filter;
            } else {
              pdt_last_filter = "author_id";
            }
            pdt_hash_update_arr(author_id, author_arr, "author_id");
            pdt_update_url();
            pdt_live_filter_reset(selected_term_list);
            pdt_ajax_action();
            pdt_pagination_action();
          });
  
          // Post order asc/dsc.
          $(pdt_Wrapper_ID).on("change", ".pdt-order", function (e) {
            var that;
            $(this)
              .find("option:selected, input:radio:checked")
              .each(function () {
                that = $(this);
                order = $(this).val();
              });
            var order_arr = { order, order };
            pdt_hash_update_arr(order, order_arr, "order");
            pdt_update_url();
            pdt_ajax_action();
            pdt_pagination_action();
            pdt_hash_update_arr("page", { page: "" }, "page");
            pdt_update_url();
          });
          /**
           * Grid masonry.
           */
          if ($(pdt_Wrapper_ID).hasClass("pdt-masonry")) {
            var $product_wrapper = $(".ta-row", pdt_Wrapper_ID);
            $product_wrapper.imagesLoaded(function () {
              $product_wrapper.masonry(/* {
                  itemSelector: 'div[class*=ta-col-]',
                  //fitWidth: true,
                  percentPosition: true
                } */);
            });
          }
  
          /**
           * The Pagination effects.
           *
           * The effects for pagination to work for both mobile and other screens.
           */
          var Pagination_Type = $(pdt_Wrapper_ID).data("pagination");
          if ($(window).width() <= 480) {
            var Pagination_Type = $(pdt_Wrapper_ID).data("pagination_mobile");
          }
          // Ajax number pagination
          if (Pagination_Type == "ajax_pagination") {
            $(pdt_Wrapper_ID).on("click", ".pdt-post-pagination a", function (e) {
              e.preventDefault();
              var that = $(this);
              var totalPage = $(
                  ".pdt-post-pagination.pdt-on-desktop a:not(.pdt_next, .pdt_prev)",
                  pdt_Wrapper_ID
                ).length,
                currentPage = parseInt(
                  $(
                    ".pdt-post-pagination.pdt-on-desktop .active:not(.pdt_next, .pdt_prev)",
                    pdt_Wrapper_ID
                  ).data("page")
                );
              if ($(window).width() <= 480) {
                var totalPage = $(
                    ".pdt-post-pagination.pdt-on-mobile a:not(.pdt_next, .pdt_prev)",
                    pdt_Wrapper_ID
                  ).length,
                  currentPage = parseInt(
                    $(
                      ".pdt-post-pagination.pdt-on-mobile .active:not(.pdt_next, .pdt_prev)",
                      pdt_Wrapper_ID
                    ).data("page")
                  );
              }
              page = parseInt(that.data("page"));
              if (that.hasClass("pdt_next")) {
                if (totalPage > currentPage) {
                  var page = currentPage + 1;
                } else {
                  return;
                }
              }
              if (that.hasClass("pdt_prev")) {
                if (currentPage > 1) {
                  var page = currentPage - 1;
                } else {
                  return;
                }
              }
              var pdt_paged = { page, page };
              $.ajax({
                url: ajaxurl,
                type: "post",
                data: {
                  page: page,
                  id: pc_sid,
                  action: "post_grid_ajax",
                  order: order,
                  lang: spsp_lang,
                  keyword: keyword,
                  orderby: orderby,
                  taxonomy: taxonomy,
                  term_id: term_id,
                  author_id: author_id,
                  term_list: selected_term_list,
                  custom_fields_array: custom_fields_array,
                  nonce: nonce,
                },
                error: function (response) {
                },
                success: function (response) {
                  var $data = $(response);
                  var $newElements = $data;
                  if ($(pdt_Wrapper_ID).hasClass("pdt-masonry")) {
                    var $product_wrapper = $(".ta-row", pdt_Wrapper_ID);
                    $product_wrapper.masonry("destroy");
                    $product_wrapper.html($newElements).imagesLoaded(function () {
                      $product_wrapper.masonry();
                    });
                  } else if ($(pdt_Wrapper_ID).hasClass("pdt-filter-wrapper")) {
                    $grid
                      .html($newElements)
                      .isotope("appended", $newElements)
                      .imagesLoaded(function () {
                        $grid.isotope("layout");
                      });
                    pdt_item_same_height();
                  } else {
                    $(
                      ".ta-row, .pdt-timeline-grid, .ta-collapse, .table-responsive tbody",
                      pdt_Wrapper_ID
                    ).html($newElements);
                    if (pdtAccordion.length > 0) {
                      pdtAccordion.accordion("refresh");
                      if (accordion_mode === "multi-open") {
                        pdtAccordion
                          .find(".pdt-collapse-header")
                          .next()
                          .slideDown();
                        pdtAccordion
                          .find(".pdt-collapse-header .fa")
                          .removeClass("fa-plus")
                          .addClass("fa-minus");
                      }
                    }
                    var $newElements = $data.css({
                      opacity: 1,
                    });
                  }
                  $(".page-numbers", pdt_Wrapper_ID).removeClass("active");
                  $(".page-numbers", pdt_Wrapper_ID).each(function () {
                    // if (parseInt($('.pdt-post-pagination a').data('page')) === page) {
                    $(
                      ".pdt-post-pagination a[data-page=" + page + "]",
                      pdt_Wrapper_ID
                    ).addClass("active");
                    // }
                  });
                  $(".pdt_next", pdt_Wrapper_ID).removeClass("active");
                  $(".pdt_prev", pdt_Wrapper_ID).removeClass("active");
                  $(".pdt-post-pagination a.active", pdt_Wrapper_ID).each(
                    function () {
                      if (parseInt($(this).data("page")) === totalPage) {
                        $(".pdt_next", pdt_Wrapper_ID).addClass("active");
                      }
                      if (parseInt($(this).data("page")) === 1) {
                        $(".pdt_prev", pdt_Wrapper_ID).addClass("active");
                      }
                    }
                  );
                  if (pdtAccordion.length > 0) {
                    pdtAccordion.accordion("refresh");
                    if (accordion_mode === "multi-open") {
                      pdtAccordion
                        .find(".pdt-collapse-header")
                        .next()
                        .slideDown();
                      pdtAccordion
                        .find(".pdt-collapse-header .fa")
                        .removeClass("fa-plus")
                        .addClass("fa-minus");
                    }
                  }
                  $newElements.animate({
                    opacity: 1,
                  });
                  pdt_lazyload();
                  // Ajax Number pagination go to current shortcode top.
                  var url_hash = window.location.search;
                  if (url_hash.indexOf("pdt_page") >= 0) {
                    var current_screen_id =
                      document.querySelector(pdt_Wrapper_ID);
                    current_screen_id.scrollIntoView();
                  }
                },
              });
              pdt_hash_update_arr(page, pdt_paged, "page");
              pdt_update_url();
            });
          }
  
          /**
           * Ajax load on click and Infinite scroll.
           */
          if (
            Pagination_Type == "infinite_scroll" ||
            Pagination_Type == "ajax_load_more"
          ) {
            $(pdt_Wrapper_ID).each(function () {
              var EndingMessage = $(this)
                .find(".ta-pdt-pagination-data")
                .data("endingtext");
              var LoadMoreText = $(this)
                .find(".ta-pdt-pagination-data")
                .data("loadmoretext");
              if (
                !$(this)
                  .find(".pdt-load-more")
                  .hasClass("pdt-load-more-initialize")
              ) {
                if ($(".pdt-post-pagination a", pdt_Wrapper_ID).length) {
                  $(".pdt-post-pagination", pdt_Wrapper_ID)
                    .eq(0)
                    .before(
                      '<div class="pdt-load-more"><button pdt-processing="0">' +
                        LoadMoreText +
                        "</button></div>"
                    );
                }
                if (Pagination_Type == "infinite_scroll") {
                  $(".pdt-load-more", pdt_Wrapper_ID).addClass("pdt-hide");
                }
                $(".pdt-post-pagination", pdt_Wrapper_ID).addClass("pdt-hide");
                $(".ta-row div[class*=ta-col-]", pdt_Wrapper_ID).addClass(
                  "pdt-added"
                );
                $(this)
                  .find(".pdt-load-more")
                  .addClass("pdt-load-more-initialize");
                $(this).on("click", ".pdt-load-more button", function (e) {
                  e.preventDefault();
                  if (
                    $(
                      ".pdt-post-pagination a.active:not(.pdt_next, .pdt_prev)",
                      pdt_Wrapper_ID
                    ).length
                  ) {
                    $(".pdt-load-more button").attr("pdt-processing", 1);
                    var current_page = parseInt(
                      $(
                        ".pdt-post-pagination a.active:not(.pdt_next, .pdt_prev)",
                        pdt_Wrapper_ID
                      ).data("page")
                    );
                    current_page = current_page + 1;
                    $(".pdt-load-more", pdt_Wrapper_ID).hide();
                    $(".pdt-post-pagination", pdt_Wrapper_ID)
                      .eq(0)
                      .before(
                        '<div class="pdt-infinite-scroll-loader"><svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#444"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /> <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /> </circle> <circle cx="22" cy="22" r="1"> <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /> <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/></circle></g></svg></div>'
                      );
                    var totalPage = $(
                      ".pdt-post-pagination.pdt-on-desktop.infinite_scroll a:not(.pdt_next, .pdt_prev), .pdt-post-pagination.pdt-on-desktop.ajax_load_more a:not(.pdt_next, .pdt_prev)",
                      pdt_Wrapper_ID
                    ).length;
                    if ($(window).width() <= 480) {
                      var totalPage = $(
                        ".pdt-post-pagination.pdt-on-mobile.infinite_scroll a:not(.pdt_next, .pdt_prev), .pdt-post-pagination.ajax_load_more.pdt-on-mobile  a:not(.pdt_next, .pdt_prev)",
                        pdt_Wrapper_ID
                      ).length;
                    }
                    page = current_page;
                    $.ajax({
                      url: ajaxurl,
                      type: "post",
                      data: {
                        page: page,
                        id: pc_sid,
                        action: "post_grid_ajax",
                        order: order,
                        lang: spsp_lang,
                        keyword: keyword,
                        orderby: orderby,
                        taxonomy: taxonomy,
                        term_id: term_id,
                        author_id: author_id,
                        term_list: selected_term_list,
                        custom_fields_array: custom_fields_array,
                        nonce: nonce,
                      },
                      error: function (response) {
                      },
                      success: function (response) {
                        var $data = $(response);
                        var $newElements = $data;
                        if ($(pdt_Wrapper_ID).hasClass("pdt-masonry")) {
                          var $product_wrapper = $(".ta-row", pdt_Wrapper_ID);
                          $product_wrapper.masonry("destroy");
                          $product_wrapper
                            .append($newElements)
                            .imagesLoaded(function () {
                              $product_wrapper.masonry();
                            });
                        } else if (
                          $(pdt_Wrapper_ID).hasClass("pdt-filter-wrapper")
                        ) {
                          $grid
                            .append($newElements)
                            .isotope("appended", $newElements)
                            .imagesLoaded(function () {
                              $grid.isotope("layout");
                            });
                          pdt_item_same_height();
                        } else {
                          var $newElements = $data.css({
                            opacity: 0,
                          });
                          $(
                            ".ta-row, .pdt-timeline-grid, .ta-collapse, .table-responsive tbody",
                            pdt_Wrapper_ID
                          ).append($newElements);
                          if (pdtAccordion.length > 0) {
                            pdtAccordion.accordion("refresh");
                            if (accordion_mode === "multi-open") {
                              pdtAccordion
                                .find(".pdt-collapse-header")
                                .next()
                                .slideDown();
                              pdtAccordion
                                .find(".pdt-collapse-header .fa")
                                .removeClass("fa-plus")
                                .addClass("fa-minus");
                            }
                          }
                          var $newElements = $data.css({
                            opacity: 1,
                          });
                        }
                        $(".page-numbers", pdt_Wrapper_ID).removeClass("active");
                        $(".page-numbers", pdt_Wrapper_ID).each(function () {
                          $(
                            ".pdt-post-pagination a[data-page=" + page + "]",
                            pdt_Wrapper_ID
                          ).addClass("active");
                        });
                        $(".pdt-infinite-scroll-loader", pdt_Wrapper_ID).remove();
                        if (Pagination_Type == "ajax_load_more") {
                          $(".pdt-load-more").show();
                        }
                        $(".pdt-load-more button").attr("pdt-processing", 0);
                        $(".ta-row div[class*=ta-col-]", pdt_Wrapper_ID)
                          .not(".pdt-added")
                          .addClass("animated pdtFadeIn")
                          .one("webkitAnimationEnd animationEnd", function () {
                            $(this)
                              .removeClass("animated pdtFadeIn")
                              .addClass("pdt-added");
                          });
                        if (totalPage == current_page) {
                          $(".pdt-load-more", pdt_Wrapper_ID)
                            .addClass("finished")
                            .removeClass("pdt-hide");
                          $(".pdt-load-more", pdt_Wrapper_ID)
                            .show()
                            .html(EndingMessage);
                        }
                        pdt_lazyload();
                      },
                    });
                  } else {
                    $(".pdt-load-more", pdt_Wrapper_ID)
                      .addClass("finished")
                      .removeClass("pdt-hide");
                    $(".pdt-load-more", pdt_Wrapper_ID)
                      .show()
                      .html(EndingMessage);
                  }
                });
              }
              if (Pagination_Type == "infinite_scroll") {
                var bufferBefore = Math.abs(20);
                $(window).scroll(function () {
                  if (
                    $(
                      ".ta-row, .ta-collapse, .pdt-timeline-grid, .table-responsive tbody",
                      pdt_Wrapper_ID
                    ).length
                  ) {
                    var TopAndContent =
                      $(
                        ".ta-row, .ta-collapse, .pdt-timeline-grid, .table-responsive tbody",
                        pdt_Wrapper_ID
                      ).offset().top +
                      $(
                        ".ta-row, .ta-collapse, .pdt-timeline-grid, .table-responsive tbody",
                        pdt_Wrapper_ID
                      ).outerHeight();
                    var areaLeft = TopAndContent - $(window).scrollTop();
                    if (areaLeft - bufferBefore < $(window).height()) {
                      if (
                        $(".pdt-load-more button", pdt_Wrapper_ID).attr(
                          "pdt-processing"
                        ) == 0
                      ) {
                        $(".pdt-load-more button", pdt_Wrapper_ID).trigger(
                          "click"
                        );
                      }
                    }
                  }
                });
              }
            });
          }
  
          /* This code added for divi-builder ticker mode compatibility. */
          if (pdtCarousel.length > 0 && pdtCarouselData.mode == "ticker") {
            $(".ta-pdt-carousel img").removeAttr("loading");
            $(window).on("load", function () {
              $(".ta-pdt-carousel").each(function () {
                var thisdfd = $(this);
                var thisCSS = thisdfd.attr("style");
                $(this).removeAttr("style");
                setTimeout(function () {
                  thisdfd.attr("style", thisCSS);
                }, 0);
              });
            });
          }
  
          /* Preloader js */
          $(document).ready(function () {
            $(".pdt-preloader", pdt_Wrapper_ID).css({
              backgroundImage: "none",
              visibility: "hidden",
            });
          });
          // This function added for pdt-Lazyload.
          function pdt_lazyload() {
            var $is_find = $(".productify__item--thumbnail img").hasClass(
              "pdt-lazyload"
            );
            if ($is_find) {
              $("img.pdt-lazyload")
                .pdt_lazyload({ effect: "fadeIn", effectTime: 2000 })
                .removeClass("pdt-lazyload")
                .addClass("pdt-lazyloaded");
            }
            // pdt_item_same_height();
          }
          pdt_lazyload();
        });
      }
    };
    pdt_myScript();
  });