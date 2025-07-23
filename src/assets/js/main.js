'use strict';
(function ($) {
    const config = {
        init() {
            this.navbarCollapse();
            this.scrollToTop();
            this.fixedHeader();
            this.backgroundImage();
            this.activeMenuClass($("ul.sidebar-menu-list"));
            this.togglePassword();
            this.activeSelect2();
            this.activeRangeSlider();
            this.testimonialSlider();
            this.activeOdometer();
            this.sectionSubheadingBg();

            //! Project Owner Preference
            this.hideNavbar();
            this.sidebarDropdown();
            this.userDropdown();
            this.sidebarOverlay();

        },

        navbarCollapse() {
            function hideNavbarCollapse() {
                new bootstrap.Collapse($('.navbar-collapse')[0]).hide();
                $('.navbar-collapse').trigger('hide.bs.collapse');
            }

            $('.navbar-collapse').on({
                'show.bs.collapse': function () {
                    $('body').addClass('scroll-hide');
                    $('.body-overlay').addClass('show').on('click', hideNavbarCollapse);
                },
                'hide.bs.collapse': function () {
                    $('body').removeClass('scroll-hide');
                    $('.body-overlay').removeClass('show').unbind('click', hideNavbarCollapse);
                },
            });

        },

        fixedHeader() {
            $(window).on("scroll", function () {
                if ($(window).scrollTop() >= 300) {
                    $(".header").addClass("fixed-header");
                } else {
                    $(".header").removeClass("fixed-header");
                }
            });
        },

        scrollToTop() {
            const btn = $(".scroll-top");
            $(window).on("scroll", function () {
                if ($(window).scrollTop() >= 300) {
                    btn.addClass("show");
                } else {
                    btn.removeClass("show");
                }
            });

            btn.on("click", function (e) {
                e.preventDefault();
                $("html, body").animate({ scrollTop: 0 }, "300");
            });
        },

        backgroundImage() {
            $(".bg-img").css("background-image", function () {
                return `url(${$(this).data("background-image")})`;
            });

        },
        activeMenuClass(selector) {
            if (!$(selector).length) return;

            let fileName = window.location.pathname.split("/").reverse()[0];
            selector.find("li").each(function () {
                let anchor = $(this).find("a");
                if ($(anchor).attr("href") == fileName) {
                    $(this).addClass("active");
                }
            });
            // if any li has active element add class
            selector.children("li").each(function () {
                if ($(this).find(".active").length) {
                    $(this).addClass("active");
                }
            });
            // if no file name return
            if ("" == fileName) {
                selector.find("li").eq(0).addClass("active");
            }
        },
        togglePassword() {
            $(".toggle-password").on("click", function () {
                $(this).toggleClass("fa-eye");
                var input = $($(this).attr("id"));
                if (input.attr("type") == "password") {
                    input.attr("type", "text");
                } else {
                    input.attr("type", "password");
                }
            });
        },

        activeSelect2() {
            $(".form--select2").each((index, select) => {
                console.log("message", $(select));

                $(select)
                    .wrap('<div class="custom--select2"></div>')
                    .select2({
                        dropdownParent: $(select).closest(".custom--select2"),
                    });
            });

            $(".select2-tag").each((index, select) => {
                $(select)
                    .wrap('<div class="custom--select2"></div>')
                    .select2({
                        dropdownParent: $(select).closest(".custom--select2"),
                    });
            });
        },

        activeRangeSlider() {
            if ($('input[type="range"]').length) {
                $('input[type="range"]').each(function () {
                    $(this).rangeslider({
                        polyfill: false,

                        onSlide: function (position, value) {
                            $(this.$element)
                                .siblings(".price-value")
                                .find(".text")
                                .text(value);
                            $(this.$element).siblings('[type="hidden"]').val(value);
                            $("#earning-amount").text(value * 20 * 30);
                        },
                    });
                });
            }

            // Update earning amount when range slider changes
            $('input[type="range"]').on("change", calculateEarning);

            function calculateEarning() {
                const sellPrice = $('input[name="sell-price"]').val();
                const dailySales = $('input[name="daily-sales"]').val();
                const earningAmount = sellPrice * dailySales * 30;
                $("#earning-amount").text(earningAmount);
            }
        },

        testimonialSlider() {
            const sliderConfig = {
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 2000,
                speed: 1500,
                dots: true,
                pauseOnHover: true,
                arrows: false,
                prevArrow:
                    '<button type="button" class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
                nextArrow:
                    '<button type="button" class="slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
            };
            $('.testimonial-slider').slick({
                ...sliderConfig,
                slidesToShow: 3,
                dots: true,
                speed: 500,

                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                        },
                    },
                ],
            });
        },

        activeOdometer() {
            $(".counterup-item").each(function () {
                $(this).isInViewport(function (status) {
                    if (status === "entered") {
                        for (
                            var i = 0;
                            i < document.querySelectorAll(".odometer").length;
                            i++
                        ) {
                            var el = document.querySelectorAll(".odometer")[i];
                            el.innerHTML = el.getAttribute("data-odometer-final");
                        }
                    }
                });
            });
        },

        hideNavbar() {
            $('.sidebar-menu__close, .sidebar-overlay').on('click', function () {
                $('.sidebar-menu').removeClass('show-sidebar');
                $('.sidebar-overlay').removeClass('show');
            });
        },

        sidebarDropdown() {
            $('.has-dropdown > a').click(function () {
                $('.sidebar-submenu').slideUp(200);
                if ($(this).parent().hasClass('active')) {
                    $('.has-dropdown').removeClass('active');
                    $(this).parent().removeClass('active');
                } else {
                    $('.has-dropdown').removeClass('active');
                    $(this).next('.sidebar-submenu').slideDown(200);
                    $(this).parent().addClass('active');
                }
            });
        },
        userDropdown() {
            $('.user-info__button').on('click', function () {
                $('.user-info-dropdown').toggleClass('show');
            });
            $('.user-info__button').attr('tabindex', -1).focus();

            $('.user-info__button').on('focusout', function () {
                $('.user-info-dropdown').removeClass('show');
            });

        },
        sidebarOverlay() {
            $('.navigation-bar').on('click', function () {
                $('.sidebar-menu').addClass('show-sidebar');
                $('.sidebar-overlay').addClass('show');
            });
        },
        sectionSubheadingBg() {
            $("[data-bg*='#']").each(function () {
                const bg = $(this).data('bg');
                if (bg) {
                    $(this).css('--data-bg', bg);
                }
            });

        },
    }

    $(document).ready(function () {
        // Active all function
        config.init()
        // Preloader always in bottom
        $(window).on('load', () => $('.preloader').fadeOut());
    })
})(jQuery);






