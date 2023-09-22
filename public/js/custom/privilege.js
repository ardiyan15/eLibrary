$(".privileges").on("click", function () {
  let menuIds = $("#menu_ids").val();
  if (this.checked) {
    if (menuIds == "") {
      $("#menu_ids").val($(this).val());
    } else {
      let concateMenuId = `${menuIds + "," + $(this).val()}`;
      $("#menu_ids").val(concateMenuId);
    }
  } else {
    menuIds = $("#menu_ids").val().split(",");
    let menuIdClicked = $(this).val();
    let index = menuIds.indexOf(menuIdClicked);
    if (index > -1) {
      menuIds.splice(index, 1);
      $("#menu_ids").val(menuIds);
    }
  }
});

let menuData = [];
$(".privileges:checked").each(function () {
  let menuChecked = $(this).val();

  menuData.push(menuChecked);
});
$("#menu_ids").val(menuData.toString());
// console.log(menuData.toString());
