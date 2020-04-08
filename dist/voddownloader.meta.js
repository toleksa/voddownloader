// ==UserScript==
// @name           Skrypt umożliwiający pobieranie materiałów ze znanych serwisów VOD.
// @version        6.14.1
// @updateURL      https://raw.githubusercontent.com/zacny/voddownloader/master/dist/voddownloader.meta.js
// @downloadURL    https://raw.githubusercontent.com/zacny/voddownloader/master/dist/voddownloader.user.js
// @description    Skrypt służący do pobierania materiałów ze znanych serwisów VOD.
//                 Działa poprawnie tylko z rozszerzeniem Tampermonkey.
//                 Cześć kodu pochodzi z:
//                 miniskrypt.blogspot.com,
//                 miniskrypt.hubaiitv.pl
// @author         Przmus, zacny
// @namespace      http://www.ipla.tv/
// @source         https://github.com/zacny/voddownloader
// @include        /^https://(vod|cyfrowa)\.tvp\.pl/video/.*$/
// @include        /^https?://.*\.tvp.(pl|info)/sess/TVPlayer2/embed.*$/
// @include        /^https?://.*\.tvp\.pl/\d{6,}/.*$/
// @include        https://www.tvpparlament.pl/sess/*
// @include        https://www.ipla.tv/*
// @include        https://player.pl/*
// @include        https://*.cda.pl/*
// @include        https://vod.pl/*
// @include        https://redir.atmcdn.pl/*
// @include        https://*.redcdn.pl/file/o2/redefine/partner/*
// @include        https://partner.ipla.tv/embed/*
// @include        https://wideo.wp.pl/*
// @include        https://ninateka.pl/*
// @include        https://www.arte.tv/*/videos/*
// @include        https://pulsembed.eu/*
// @include        https://tv-trwam.pl/local-vods/*
// @exclude        http://www.tvp.pl/sess/*
// @exclude        /^https?://(bialystok|gorzow|krakow|olsztyn|rzeszow|wroclaw|bydgoszcz|katowice|lublin|opole|szczecin|gdansk|kielce|lodz|poznan|warszawa)\.tvp.\pl/.*$/
// @exclude        https://www.cda.pl/iframe/*
// @grant          GM_getResourceText
// @grant          GM_xmlhttpRequest
// @grant          GM_download
// @grant          GM_setClipboard
// @grant          GM_info
// @connect        tvp.pl
// @connect        getmedia.redefine.pl
// @connect        distro.redefine.pl
// @connect        player-api.dreamlab.pl
// @connect        api.arte.tv
// @connect        b2c.redefine.pl
// @connect        player.pl
// @connect        api-trwam.app.insysgo.pl
// @run-at         document-end
// @require        https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require        https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js
// @require        https://cdnjs.cloudflare.com/ajax/libs/platform/1.3.5/platform.min.js
// @require        https://gitcdn.xyz/cdn/zacny/voddownloader/4b17a120f521eaddf476d6e8fe3be152d506f244/lib/js/mdb-with-waves-patch.js
// @require        https://gitcdn.xyz/cdn/kapetan/jquery-observe/ca67b735bb3ae8d678d1843384ebbe7c02466c61/jquery-observe.js
// @resource       buttons_css https://raw.githubusercontent.com/zacny/voddownloader/master/lib/css/voddownloader-buttons.css
// @resource       content_css https://raw.githubusercontent.com/zacny/voddownloader/master/lib/css/voddownloader-content.css
// ==/UserScript==

