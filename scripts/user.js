window.onload = function () {

    // banner图
    (function () {

        function bannerAdapt() {

            // 获取banner元素
            var banner = $(".banner");
            // 获取图片元素
            var bannerImg = banner.children("img");
            // 获取介绍
            var bannerInfo = $(".banner-info");
            // 获取介绍的高度
            var bannerInfoHeight = bannerInfo.height();

            // 设置banner宽高,宽高适应屏幕
            banner.css({
                width : "100%",
                height : innerHeight
            });

            // 判断图片高度与屏幕高度，如果图片高，则宽度100%，高自动，反之，宽度自动，高度100%
            if( bannerImg.height() > innerHeight  ){
                bannerImg.css({
                    width : "100%",
                    height : "auto"
                })
            }else{
                bannerImg.css({
                    width : "auto",
                    height : innerHeight
                });
                // 获取图片宽度
                var bannerImgWidth = bannerImg.width();
                // 图片居中
                bannerImg.css({
                    marginLeft : -(bannerImgWidth-innerWidth)/2
                });
            }

            bannerInfo.css({
                marginTop : -( bannerInfoHeight  )/2
            })

        }

        bannerAdapt();

        // 改变窗口大小时触发
        $(window).resize(function () {
            bannerAdapt();
        });

    })();

    // 首页-游戏资讯
    (function () {

        // 轮滑的图片区域
        var newsMain = $(".news-main");
        var newsList = $(".news-list");
        newsMain.css({
            width : ( newsList.width() + 45*2 )*newsList.length
        });

        // 轮滑的信息区域
        var newsInfo = $(".news-info");
        var newsInfoList = $(".news-info-list");
        newsInfo.css({
            width : newsInfoList.width()*newsInfoList.length
        });

        // 背景图片的高度
        var news = $(".news");
        var newBg = $(".news-bg");
        newBg.css({
            height : news.height() + 200
        });

        // 将游戏资讯中的图片存储起来
        var newsSource = [];
        for( var i=0; i<newsList.length; i++ ){
            newsSource.push( newsList.eq(i).find("img").attr("src") )
        }

        // 获取左箭头
        var arrowLeft = $(".news-arrow-left");
        // 获取右箭头
        var arrowRight = $(".news-arrow-right");
        // 设定初始值
        var num = 0;

        function newsChange() {
            // 图片轮播
            newsMain.stop(true,false).animate({marginLeft : - ( newsList.width() + 45*2 ) * num},500);
            // 信息轮播
            newsInfo.stop(true,false).animate({marginLeft : - newsInfoList.width() * ( num+1 )},500);
            // 图片选中状态
            newsList.eq(num+1).addClass("news-list-active").siblings().removeClass("news-list-active");
            // 背景切换
            newBg.find("img").attr("src", newsSource[ num+1 ] );
        }

        // 初始化
        newsChange();

        // 点击左箭头
        arrowLeft.click(function () {
            if( num > -1 ){
                num --;
            }
            newsChange();
        });

        // 点击右箭头
        arrowRight.click(function () {
            if( num < newsList.length - 2 ){
                num ++;
            }
            newsChange();
        });

    })();

    /* 内页-游戏资讯 */
    (function () {

        function newsDetailHeight() {

            var newsDetailTitle1 = $(".news-mod-1 .news-detail-title");

            newsDetailTitle1.css({
                width : innerWidth/2 - innerWidth*0.16
            });

            var newsThumb = document.getElementsByClassName("news-thumb");
            for( var i=0; i<newsThumb.length; i++ ){
                $(".news-detail-frame").eq(i).css({
                    height : $(".news-thumb").eq(i).height()
                });
            }

        }
        newsDetailHeight();
        $(window).resize(function () {
            newsDetailHeight();
        });

    })();

    /* 播放音乐 */
    (function () {

        var musicTrigger = $(".music-play");
        musicTrigger.click(function () {
            // 获取当前对象
            var This = $(this);
            var ThisAudio = This.parent().siblings("audio");

            // 所有音乐去除自定义class
            $("audio").removeClass("current-audio");
            // 当前音乐添加自定义class
            ThisAudio.addClass("current-audio");
            // 所有播放按钮去除自定义class
            $(".music-play").removeClass("current-music");
            // 当前播放按钮添加自定义class
            This.addClass("current-music");

            // 暂停其他所有音乐
            $("audio:not(.current-audio)").trigger("pause");
            // 初始化其他播放按钮
            $(".music-play:not(.current-music)").removeClass("music-play-active");
            // 判断当前音乐是否在播放
            if( This.hasClass("music-play-active") ){
                This
                    .removeClass("music-play-active")
                    .parent().siblings("audio").trigger("pause");
            }else{
                This
                    .addClass("music-play-active")
                    .parent().siblings("audio").trigger("play");
            }

        });
        musicTrigger.hover(function () {
            var This = $(this);
            This.animate({ opacity : 1 },500)
        },function () {
            var This = $(this);
            This.animate({ opacity : 0.6 },500)
        });


        // 获取主题曲播放按钮
        var themeTrigger = document.getElementsByClassName("theme-trigger")[0];
        // 获取按钮内的span
        var themeText = document.getElementsByClassName("theme-text")[0];
        // 点击按钮时
        if( themeTrigger ){
            themeTrigger.onclick = function(){
                // 获取主题曲
                var theme = document.getElementsByClassName("theme")[0];
                // 判断是否正在播放
                if( theme.paused ){
                    // 播放音乐
                    theme.play();
                    // 改变文本值
                    themeTrigger.innerText = "正在播放";
                    // 三个点轮换
                    themeTextChange();
                }else{
                    // 清除定时器
                    clearInterval( themeText.timer );
                    // 暂停音乐
                    theme.pause();
                    // 改变文本值
                    themeTrigger.innerText = "播放主题曲";
                    // 三个点隐藏
                    themeText.innerText = "";
                }
            };
        }

        function themeTextChange() {
            themeText.timer = setInterval(function () {
                themeText.innerText = themeText.innerText === "..." ? "." : themeText.innerText + ".";
            },300)
        }

    })();

};