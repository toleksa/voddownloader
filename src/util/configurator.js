function Configurator(properties){
    var service = {
        observer: {
            anchor: undefined,
            mode: 'added',
            selector: undefined,
            get: function(){
                return $(service.observer.selector);
            },
            exist: function(){
                return $(service.observer.selector).length > 0;
            }
        },
        button: {
            id: 'direct-download',
            style: '',
            class: '',
            click: function(){
                var chainNames = service.chainSelector();
                Executor.chain(service, {
                    stepIndex: 0,
                    chainIndex: 0,
                    retries: 0,
                    chainNames: chainNames
                });
            }
        },
        cardsData: {
            title: '',
            cards: {
                videos: {
                    icon: 'fa-video', label: 'Video', collapse: true, items: [],
                    info: [
                        {name: 'video', desc: 'video'},
                        {name: 'audio', desc: 'audio'},
                        {name: 'language', desc: 'wersja językowa'}
                    ],
                    actions: [
                        {label: 'Pobierz', icon: 'fa-download'},
                        {label: 'Kopiuj', icon: 'fa-clone'},
                        {label: 'Otwórz', icon: 'fa-film'}
                    ]
                },
                subtitles: {
                    icon: 'fa-file-alt', label: 'Napisy', collapse: false, items: [],
                    info: [
                        {name: 'description', desc: 'opis'},
                        {name: 'format', desc: 'format'},
                    ],
                    actions: [
                        {label: 'Pobierz', icon: 'fa-download'}
                    ]
                }
            }
        },
        chains: {
            videos: []
        },
        chainSelector: function(){
            return ['videos'];
        },
        formatter: function(data){
            data.cards['videos'].items.sort(function (a, b) {
                return a.index - b.index;
            });
            data.cards['subtitles'].items.sort(function (a, b) {
                return ('' + a.format).localeCompare(b.format);
            });
        },
        aggregate: function(data){
            var aggregatedData = {};
            $.extend(true, aggregatedData, service.cardsData);
            var chains = service.chainSelector();
            chains.forEach(function(chain){
                var extend = data[chain][data[chain].length - 1].after;
                $.extend(true, aggregatedData, extend);
            });
            return aggregatedData;
        },
        onDone: function(data, w) {
            var aggregatedData = service.aggregate(data);
            service.formatter(aggregatedData);
            DomTamper.createDocument(aggregatedData, w);
        }
    };

    return $.extend(true, service, properties);
}
