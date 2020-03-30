function TvpConfigurator(selector, buttonClass, idParser){
    return new Configurator({
        observer: {
            selector: selector
        },
        button: {
            class: buttonClass,
        },
        asyncChains: {
            videos: [
                new Step({
                    urlTemplate: 'https://tvp.pl/pub/stat/videofileinfo?video_id=#videoId',
                    beforeStep: function (input) {
                        return idParser();
                    }
                }),
                new Step({
                    urlTemplate: 'https://vod.tvp.pl/sess/TVPlayer2/api.php?id=#videoId&@method=getTvpConfig' +
                        '&@callback=callback',
                    responseType: 'jsonp',
                    beforeStep: function (json) {
                        return Common.getRealVideoId(json);
                    },
                    afterStep: Common.grapTvpVideoData
                })
            ]
        }
    });
}
