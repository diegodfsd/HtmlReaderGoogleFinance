var quotes = (function($){
    var $grid = $("#quotes");

    var update = function(quote, callback){
        $.get('/update', { q : quote }, callback);
    };

    var addRow = function(quote){
        var $tbody, $tr;
        $tbody = $grid.children('tbody');
        $tr = $('<tr/>');

        $td0 = $('<td/>');
        $td1 = $('<td/>');
        $td2 = $('<td/>');

        $tr.append($td0, $td1, $td2);
        $tbody.append($tr);

        fillRoow($tr, quote);
    };

    var fillRoow = function($tr, quote){
        $tr.find("td:eq(0)").html(quote.name + '[' + quote.nick + ']');
        $tr.find("td:eq(1)").html(quote.prb);
        $tr.find("td:eq(2)").html(quote.price).toggleClass("high", quote.price.match(/\-/) === null).toggleClass("low", !(quote.price.match(/\-/)===null));
    };

    return {
        add: function(quote){
            update(quote, function(jsonQuote){
                addRow(jsonQuote);
            });
        },
        update_all: function(){
            $('tbody>tr', $grid).each(function(){
                var $tr = $(this)
                   ,$td = $('td:first', $tr)
                   ,pattern_quote = /\[([\w|\W|]+)\]/g
                   ,quote = pattern_quote.exec($td.html())[1];

                update(quote, function(json){
                    fillRoow($tr, json);
                });
            });
        }
    }
})(jQuery);

var timer = (function(){
    var exec = function(callback, interval){
        var _this = this;
        setTimeout(function(){
            callback();
            exec.call(_this, callback, interval);
        }, interval);
    };

    return function(callback, interval){
        exec(callback, interval);
    }
})();

$(document).ready(function(){
    $("#add").click(function(){
        quotes.add($("#q").val());
    });

    timer(quotes.update_all, 20000);
});