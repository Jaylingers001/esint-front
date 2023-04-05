$(function () {
    $(".openbtn1").click(function () {//ボタンがクリックされたら
        $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
        $("#g-nav1").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
    });

    $("#g-nav1 a").click(function () {//ナビゲーションのリンクがクリックされたら
        $(".openbtn1").removeClass('active');//ボタンの activeクラスを除去し
        $("#g-nav1").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
    });

    $(".button").click(function () {
        $(this).toggleClass("one");
    });

    $("dl.fs-acd").on("click", "dt", function () {
        $("dd", ".close").not($(this).next()).slideUp()
            .prev().removeClass("active");
        $(this).next().slideToggle()
            .end().toggleClass("active");
    });

    $('.tab_box .tab_btn').click(function () {
        var index = $('.tab_box .tab_btn').index(this);
        $('.tab_box .tab_btn, .tab_box .tab_panel').removeClass('active');
        $(this).addClass('active');
        $('.tab_box .tab_panel').eq(index).addClass('active');
    });

    $('.js-modal-open').on('click', function () {
        $('.js-modal').fadeIn();
        return false;
    });
    $('.js-modal-close').on('click', function () {
        $('.js-modal').fadeOut();
        return false;
    });


    $(".openbtn2").click(function () {//ボタンがクリックされたら
        $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
        $("#g-nav2").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
    });

    $("#g-nav2 a").click(function () {//ナビゲーションのリンクがクリックされたら
        $(".openbtn2").removeClass('active');//ボタンの activeクラスを除去し
        $("#g-nav2").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
    });

    // 縲�.modal_open縲阪ｒ繧ｯ繝ｪ繝�け縺励◆繧峨Δ繝ｼ繝繝ｫ縺ｨ鮟偵＞閭梧勹繧定｡ｨ遉ｺ縺吶ｋ
    $('.modal_open').click(function () {
        // 鮟偵＞閭梧勹繧鍛ody蜀�↓霑ｽ蜉�
        $('body').append('<div class="modal_bg"></div>');
        $('.modal_bg').fadeIn();

        // data-target縺ｮ蜀�ｮｹ繧棚D縺ｫ縺励※modal縺ｫ莉｣蜈･
        var modal = '#' + $(this).attr('data-target');

        // 繝｢繝ｼ繝繝ｫ繧偵え繧｣繝ｳ繝峨え縺ｮ荳ｭ螟ｮ縺ｫ驟咲ｽｮ縺吶ｋ
        function modalResize() {
            var w = $(window).width();
            var h = $(window).height();

            var x = (w - $(modal).outerWidth(true)) / 2;
            var y = (h - $(modal).outerHeight(true)) / 2;

            $(modal).css({'left': x + 'px', 'top': y + 'px'});
        }

        // modalResize繧貞ｮ溯｡�
        modalResize();

        // modal繧偵ヵ繧ｧ繝ｼ繝峨う繝ｳ縺ｧ陦ｨ遉ｺ
        $(modal).fadeIn();

        // .modal_bg縺�.modal_close繧偵け繝ｪ繝�け縺励◆繧峨Δ繝ｼ繝繝ｫ縺ｨ閭梧勹繧偵ヵ繧ｧ繝ｼ繝峨い繧ｦ繝医＆縺帙ｋ
        $('.modal_bg, .modal_close').off().click(function () {
            $('.modal_box').fadeOut();
            $('.modal_bg').fadeOut('slow', function () {
                $('.modal_bg').remove();
            });
        });

        // 繧ｦ繧｣繝ｳ繝峨え縺後Μ繧ｵ繧､繧ｺ縺輔ｌ縺溘ｉ繝｢繝ｼ繝繝ｫ縺ｮ菴咲ｽｮ繧貞�險育ｮ励☆繧�
        $(window).on('resize', function () {
            modalResize();
        });

        // .modal_switch繧呈款縺吶→繝｢繝ｼ繝繝ｫ繧貞�繧頑崛縺医ｋ
        $('.modal_switch').click(function () {

            // 謚ｼ縺輔ｌ縺�.modal_switch縺ｮ隕ｪ隕∫ｴ�縺ｮ.modal_box繧偵ヵ繧ｧ繝ｼ繝峨い繧ｦ繝医＆縺帙ｋ
            $(this).parents('.modal_box').fadeOut();

            // 謚ｼ縺輔ｌ縺�.modal_switch縺ｮdata-target縺ｮ蜀�ｮｹ繧棚D縺ｫ縺励※modal縺ｫ莉｣蜈･
            var modal = '#' + $(this).attr('data-target');

            // 繝｢繝ｼ繝繝ｫ繧偵え繧｣繝ｳ繝峨え縺ｮ荳ｭ螟ｮ縺ｫ驟咲ｽｮ縺吶ｋ
            function modalResize() {
                var w = $(window).width();
                var h = $(window).height();

                var x = (w - $(modal).outerWidth(true)) / 2;
                var y = (h - $(modal).outerHeight(true)) / 2;

                $(modal).css({'left': x + 'px', 'top': y + 'px'});
            }

            // modalResize繧貞ｮ溯｡�
            modalResize();

            $(modal).fadeIn();

            // 繧ｦ繧｣繝ｳ繝峨え縺後Μ繧ｵ繧､繧ｺ縺輔ｌ縺溘ｉ繝｢繝ｼ繝繝ｫ縺ｮ菴咲ｽｮ繧貞�險育ｮ励☆繧�
            $(window).on('resize', function () {
                modalResize();
            });

        });
    });
    $('.modal_open').click();
});