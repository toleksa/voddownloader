var DomTamper = (function(DomTamper){

    DomTamper.injectStyle = function(w, name){
        var head = $(w.document.head);
        if(!head.find('style[name="' + name + '"]').length){
            var styleElement = $('<style>').attr('type', 'text/css')
                .attr('name', name).text((GM_getResourceText(name)));
            head.append(styleElement);
        }
    };

    var prepareContent = function(w){
        DomTamper.injectStyle(w, 'css');
        return $('<div>').addClass('download_content');
    };

    DomTamper.handleError = function(exception, w){
        if(w === undefined){
            w = window.open();
        }
        DomTamper.injectStyle(w, 'css');
        var messageDiv = $('<div>').addClass('error_message').text(exception.message);
        var stack = new Error().stack;
        stack.replace(/\n/g, '<br/>');
        var par = $('<p>').append(messageDiv);
        if(exception.description !== undefined){
            var detailsDiv = $('<div>').text(exception.description);
            par.append(detailsDiv);
        }
        $(w.document.body).replaceWith(prepareContent(w).append(par));
    };

    DomTamper.createButton = function(properties){
        properties.wrapper.get().find('#'+properties.button.id).remove();
        var button = $('<input>').attr('id', properties.button.id).attr('type', 'button')
            .attr('style', properties.button.style).attr('value', 'Pobierz video').addClass(properties.button.class);
        button.bind('click', properties.button.click);
        properties.wrapper.get().append(button);
    };

    var clearPreviousClick = function(body){
        body.find('[id^=contentPar] > input').each(function(event){
            $(this).removeClass('link_copy_click');
        });
        $('#copyTitle', body).removeClass('title_copy_click');
    };

    var videoLinkCopyButtonClick = function(body, par){
        clearPreviousClick(body);

        Tool.copyToClipboard(par.find("a").text());
        par.find("input").addClass('link_copy_click');
    };

    var titleCopyButtonClick = function(body){
        clearPreviousClick(body);

        Tool.copyToClipboard($('#title', body).text());
        $('#copyTitle', body).addClass('title_copy_click');
    };

    var prepareContentActions = function(w, content){
        var body = $(w.document.body);
        body.replaceWith(content);

        $(w.document).ready(function() {
            body.find('[id^=contentPar]').each(function(event){
                var par = $(this);
                $(this).find("input").click(function(event){
                    videoLinkCopyButtonClick(body, par);
                });
            });
            $('#copyTitle', body).click(function(){
                titleCopyButtonClick(body);
            })
        });
    };

    DomTamper.createLoader = function(w){
        var body = $(w.document.body);
        var content = prepareContent(w);
        var message = $('<div>').addClass('loader_message').text('Trwa przetwarzanie');
        var img = $('<img>').addClass('loader_image').attr('src', GM_getResourceURL('loader'));
        var div = $('<div>').addClass('loader').append(message).append(img);
        content.addClass('loader_content').append(div);
        body.append(content);
    };

    DomTamper.createDocument = function(data, w){
        Tool.numberModeSort(data.formats);

        var content = prepareContent(w);
        var titlePar = $('<p>');
        $('<span>').text('Tytuł: ').appendTo(titlePar);
        $('<span>').attr('id', 'title').text(data.title).appendTo(titlePar);
        $('<input>').attr('id', 'copyTitle').attr('value', 'Kopiuj tytuł').attr('type', 'button')
            .addClass('title_copy_button').appendTo(titlePar);
        titlePar.appendTo(content);
        $.each(data.formats, function( index, value ) {
            var par = $('<p>').attr('id', 'contentPar'+ index).text('Bitrate: ' + value.bitrate);
            if(value.quality !== undefined){
                par.append(", Jakość: " + value.quality);
            }
            par.append('<br/>').append('Link do materiału:');
            $('<input>').attr('value', 'Kopiuj').attr('type', 'button')
                .addClass('link_copy_button').appendTo(par);
            par.append('<br/>');
            var link = $('<a>').attr('target', '_blank').attr('href', value.url).text(value.url);
            index === 0 ? link.addClass('best_quility_link_color') : link.addClass('link_color');
            link.appendTo(par);
            par.appendTo(content);
        });

        prepareContentActions(w, content);
    };

    return DomTamper;
}(DomTamper || {}));
