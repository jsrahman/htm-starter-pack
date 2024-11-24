'use strict';
(function ($) {
    // ==========================================
    //      Start Document Ready function
    // ==========================================
    $(document).ready(function () {
        // ============== Header Hide Click On Body Js Start ========
        $('.header-button').on('click', function () {
            $('.body-overlay').toggleClass('show');
        });
        $('.body-overlay').on('click', function () {
            $('.header-button').trigger('click');
            $(this).removeClass('show');
        });
        // =============== Header Hide Click On Body Js End =========

        //============================ Scroll To Top Icon Js Start =========
        (function () {
            const btn = $('.scroll-top');
            $(window).on('scroll', function () {
                if ($(window).scrollTop() >= 300) {
                    $('.header').addClass('fixed-header');
                } else {
                    $('.header').removeClass('fixed-header');
                }
            });

            btn.on('click', function (e) {
                e.preventDefault();
                $('html, body').animate({ scrollTop: 0 }, '300');
            });

        })()
        // ========================== Header Hide Scroll Bar Js Start =====================
        $('.navbar-toggler.header-button').on('click', function () {
            $('body').toggleClass('scroll-hide-sm');
        });
        $('.body-overlay').on('click', function () {
            $('body').removeClass('scroll-hide-sm');
        });
        // ========================== Header Hide Scroll Bar Js End =====================

        // ========================== Small Device Header Menu On Click Dropdown menu collapse Stop Js Start =====================
        $('.dropdown-item').on('click', function () {
            $(this).closest('.dropdown-menu').addClass('d-block');
        });
        // ========================== Small Device Header Menu On Click Dropdown menu collapse Stop Js End =====================

        // ========================== Add Attribute For Bg Image Js Start =====================
        $('.bg-img').css('background-image', function () {
            return `url(${$(this).data('background-image')})`;
        });
        // ========================== Add Attribute For Bg Image Js End =====================

        // ========================== add active class to ul>li top Active current page Js Start =====================
        function dynamicActiveMenuClass(selector) {
            if (!($(selector).length)) return;

            let fileName = window.location.pathname.split('/').reverse()[0];
            selector.find('li').each(function () {
                let anchor = $(this).find('a');
                if ($(anchor).attr('href') == fileName) {
                    $(this).addClass('active');
                }
            });
            // if any li has active element add class
            selector.children('li').each(function () {
                if ($(this).find('.active').length) {
                    $(this).addClass('active');
                }
            });
            // if no file name return
            if ('' == fileName) {
                selector.find('li').eq(0).addClass('active');
            }
        }
        dynamicActiveMenuClass($('ul.sidebar-menu-list'));

        // ========================== add active class to ul>li top Active current page Js End =====================

        // ================== Password Show Hide Js Start ==========
        $('.toggle-password').on('click', function () {
            $(this).toggleClass('fa-eye');
            var input = $($(this).attr('id'));
            if (input.attr('type') == 'password') {
                input.attr('type', 'text');
            } else {
                input.attr('type', 'password');
            }
        });
        // =============== Password Show Hide Js End =================

        // ================== Sidebar Menu Js Start ===============
        // Sidebar Dropdown Menu Start
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
        // Sidebar Dropdown Menu End
        // Sidebar Icon & Overlay js
        $('.navigation-bar').on('click', function () {
            $('.sidebar-menu').addClass('show-sidebar');
            $('.sidebar-overlay').addClass('show');
        });
        $('.sidebar-menu__close, .sidebar-overlay').on('click', function () {
            $('.sidebar-menu').removeClass('show-sidebar');
            $('.sidebar-overlay').removeClass('show');
        });
        // Sidebar Icon & Overlay js
        // ===================== Sidebar Menu Js End =================

        // ==================== Dashboard User Profile Dropdown Start ==================
        $('.user-info__button').on('click', function () {
            $('.user-info-dropdown').toggleClass('show');
        });
        $('.user-info__button').attr('tabindex', -1).focus();

        $('.user-info__button').on('focusout', function () {
            $('.user-info-dropdown').removeClass('show');
        });
        // ==================== Dashboard User Profile Dropdown End ==================

        //Plugin Customization Start
        // ========================= Select2 Js Start ==============
        (function () {
            $('.select2').each((index, select) => {
                $(select).wrap('<div class="select2-wrapper"></div>').select2({
                    dropdownParent: $(select).closest('.select2-wrapper')
                });
            });
        })()
            // ========================= Select2 Js End ==============

            // ========================= Slick Slider Js Start ==============
            (function () {
                const sliderConfig = {
                    slidesToScroll: 1,
                    autoplay: false,
                    autoplaySpeed: 2000,
                    speed: 1500,
                    dots: true,
                    pauseOnHover: true,
                    arrows: false,
                    prevArrow:
                        '<button type="button" class="slick-prev"><i class="fas fa-long-arrow-alt-left"></i></button>',
                    nextArrow:
                        '<button type="button" class="slick-next"><i class="fas fa-long-arrow-alt-right"></i></button>',
                };

                $('.testimonial-slider').slick({
                    ...sliderConfig,
                    slidesToShow: 3,
                    responsive: [
                        {
                            breakpoint: 1199,
                            settings: {
                                arrows: false,
                                slidesToShow: 2,
                                dots: true,
                            },
                        },
                        {
                            breakpoint: 991,
                            settings: {
                                arrows: false,
                                slidesToShow: 2,
                            },
                        },
                        {
                            breakpoint: 464,
                            settings: {
                                arrows: false,
                                slidesToShow: 1,
                            },
                        },
                    ],
                });
            })()
        // ========================= Slick Slider Js End ===================


        // ========================= Odometer Counter Up Js End ==========
        $('.counterup-item').each(function () {
            $(this).isInViewport(function (status) {
                if (status === 'entered') {
                    for (
                        var i = 0;
                        i < document.querySelectorAll('.odometer').length;
                        i++
                    ) {
                        var el = document.querySelectorAll('.odometer')[i];
                        el.innerHTML = el.getAttribute('data-odometer-final');
                    }
                }
            });
        });

        // ========================= Odometer Up Counter Js End =====================
    });

    // ==========================================
    //      End Document Ready function
    // ==========================================

    // ========================= Preloader Js Start =====================
    $(window).on('load', function () {
        $('.preloader').fadeOut();
    });
    // ========================= Preloader Js End=====================
})(jQuery);








