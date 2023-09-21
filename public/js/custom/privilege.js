$(".privileges").on('click', function(){
    let menuIds = $('#menu_ids').val()
    if(this.checked) {
        if(menuIds == "") {
            $("#menu_ids").val($(this).val())
        } else {
            let concateMenuId = `${menuIds + ',' + $(this).val()}`
            $("#menu_ids").val(concateMenuId)
            console.log('concate')
        }
    } else {
        console.log('kurang')
        menuIds = $("#menu_ids").val().split(",")
        let menuIdClicked = $(this).val()
        let index = menuIds.indexOf(menuIdClicked)
        if(index > -1) {
            menuIds.splice(index, 1)
            $("#menu_ids").val(menuIds)
        }
        // console.log(menuIdClicked)
        console.log(menuIds)
    }
})