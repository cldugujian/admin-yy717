window.onload = function () {


    /* 欢迎页音频自动播放 */
    (function () {

        // 微信端/QQ端自动播放
        document.addEventListener('DOMContentLoaded', function () {
            function audioAutoPlay() {
                var audio = document.getElementsByClassName('wel-audio')[0];
                audio.play();
                document.addEventListener("WeixinJSBridgeReady", function () {
                    audio.play();
                }, false);
            }
            audioAutoPlay();
        });

        // 触摸时播放
        document.addEventListener('touchstart', function () {
            function audioAutoPlay() {
                var audio = document.getElementsByClassName('wel-audio')[0];
                audio.play();
            }
            audioAutoPlay();
        });

    })();

    /*  下面是欢迎页高度 */
    (function () {

        var wel = document.getElementsByClassName("wel")[0];
        function autoAdapt() {
            wel.style.width = "100%";
            wel.style.height = innerHeight + "px";
        }
        autoAdapt();

        window.onresize = function () {
            autoAdapt();
        }

    })();


};





