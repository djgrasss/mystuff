$(document).ready(function(){
    var $item_delete_modal = $('#item_delete_modal');
    $item_delete_modal.click(function(){
        var item_id = $(this).attr('item-id');
        $.ajax({
            url: "/items/" + item_id,
            type: "post",
            dataType: "json",
            data: {
                "_method":"delete"
            }
        }).success(function(){
            $item_delete_modal.modal('hide');
            var delete_item = $(".delete-item[item-id=" + item_id + "]").closest('.item.thumbnail')
            $('#container').waterfall('removeItems', delete_item, function(){
            });
        });
    });
});
