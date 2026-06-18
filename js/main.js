$(function () {
    /*=================================================
    ハンバーガ―メニュー
    ===================================================*/
    $(".hamburger").on("click", function () {
        $("header").toggleClass("open");
    });

    $("nav a").on("click", function () {
        $("header").toggleClass("open");
    });

    /*=================================================
    スムーススクロール
    ===================================================*/
    $('a[href^="#"]').on("click", function () {
        let href = $(this).attr("href");
        let target = $(href === "#" || href === "" ? "html" : href);

        if (!target.length) return false;

        let headerHeight = $("header").outerHeight() || 0;
        let position = target.offset().top - headerHeight;

        $("html, body").animate({ scrollTop: position }, 800, "swing");
        return false;
    });

    /*=================================================
    トップに戻る
    ===================================================*/
    let pagetop = $(".to-top");

    if (pagetop.length) {
        pagetop.hide();

        $(window).on("scroll", function () {
            if ($(this).scrollTop() > 700) {
                pagetop.fadeIn();
            } else {
                pagetop.fadeOut();
            }
        });

        pagetop.on("click", function () {
            $("body,html").animate({ scrollTop: 0 }, 500);
            return false;
        });
    }

    /*=================================================
    スクロール時フェード表示
    ===================================================*/
    $(window).on("scroll.sectionTitleFade", function () {
        let scroll = $(this).scrollTop();
        let windowHeight = $(this).height();

        $(".section-title").each(function () {
            let target = $(this).offset().top;

            if (scroll > target - windowHeight + 150) {
                $(this).addClass("visible");
            }
        });
    });

    /*=================================================
    slick
    ===================================================*/
    if ($(".slide-items").length) {
        $(".slide-items").slick({
            arrows: true,
            prevArrow: '<button class="slide-arrow prev-arrow" type="button"></button>',
            nextArrow: '<button class="slide-arrow next-arrow" type="button"></button>'
        });
    }

    /*=================================================
    左から表示
    ===================================================*/
    $(window).on("scroll.leftAnimation", function () {
        const scroll = $(this).scrollTop();
        const windowHeight = $(this).height();

        $(".left").each(function (index) {
            const target = $(this).offset().top;
            const $el = $(this);

            if (scroll > target - windowHeight + 150) {
                if (!$el.data("shown")) {
                    $el.data("shown", true);

                    setTimeout(() => {
                        $el.addClass("slide-left");
                    }, index * 100);
                }
            }
        });
    });

    /*=================================================
    バルーン表示
    ===================================================*/
    $(window).on("scroll.balloonAnimation", function () {
        const scroll = $(this).scrollTop();
        const windowHeight = $(this).height();

        $(".section-title, .balloon").each(function () {
            const target = $(this).offset().top;

            if (scroll > target - windowHeight + 150) {
                if ($(this).hasClass("balloon") && !$(this).hasClass("balloon-active")) {
                    $(this).addClass("balloon-active");
                }
            }
        });
    });

    $(window).trigger("scroll");

    /*=================================================
    NEWSフィルター
    ===================================================*/
    $(".filter-btn").on("click", function () {
        const $btn = $(this);
        const filter = $btn.data("filter");

        $(".filter-btn").removeClass("active");
        $btn.addClass("active");

        $(".news-item-page").each(function () {
            const $item = $(this);
            const category = $item.data("category");

            if (filter === "all" || filter === category) {
                $item.stop(true, true).fadeIn(300);
            } else {
                $item.stop(true, true).fadeOut(200);
            }
        });
    });
});


/*=================================================
メンバーQ&A
===================================================*/
const memberQuestions = document.querySelectorAll(".member-qa .q");

if (memberQuestions.length) {
    memberQuestions.forEach(q => {
        q.addEventListener("click", () => {
            const item = q.parentElement;

            document.querySelectorAll(".member-qa .qa-item").forEach(el => {
                if (el !== item) {
                    el.classList.remove("active");
                }
            });

            item.classList.toggle("active");
        });
    });
}


/*=================================================
フォーム送信
===================================================*/
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("送信されました（デモ）");
    });
}