
jQuery.fn.getTemplate = function() {
    source = $(this).html(); 
    return Handlebars.compile(source);
};

jQuery.fn.serializeFormJSON = function() {

    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

jQuery.fn.dropWaterfall = function() {
    $(this).waterfall('pause', function () {
        $(this).off("waterfall");
    });
};

jQuery.fn.listData = function(data){
    var ele = $('ul')
    $.each(data, function(index, value){
        html.append($('li').text(value));
    })
    $(this).html(ele);
}
