//Système de tabulation qui permet d'afficher les employees ou les équiments selon la tab
$('ul.tabs li').on("click", (event) => {
    let tab_id = $(event.currentTarget).attr('data-tab');
    if (tab_id == "tab-1") {
        employees();
    }
    else {
        equipements();
    }
    $('ul.tabs li').removeClass('current');
    $(event.currentTarget).addClass('current');
});
//Barre de recherche avec jquery
$("#search").on("keyup", (event) => {
    let value = $(event.currentTarget).val().toLowerCase();
    $("#table-body tr").filter((_index, element) => {
        $(element).toggle($(element).text().toLowerCase().indexOf(value) > -1);
        return false;
    });
});
//Permet de fermer la popup en clickant sur le bouton x
$('#popup-close').on("click", () => {
    $(".overlay").hide();
    $("#popup-back").css('visibility', 'hidden');
});
//Permet d'afficher la popup correspondante au bonton sur lequel on a cliqué
//Marche grâce à un data tag en html (ici data-ref)
$('body').on("click", ".button", (event) => {
    $("#popup-back").css('visibility', 'hidden');
    let [type, value] = $(event.target).closest('.button').data("ref").split(':');
    ;
    if (type == "email") {
        $(".overlay").css('display', 'flex');
        popupEmployee("api/v1/utilisateurs/" + value);
    }
    else if (type == "serial") {
        $(".overlay").css('display', 'flex');
        popupEquipement("api/v1/materiels/" + value);
    }
    else if (type == "inventory") {
        $(".overlay").css('display', 'flex');
        popupLinkedEquipement("api/v1/utilisateurs/" + value + "/materiels", value);
    }
});
//possiblité de faire bouger les fenetres
/*
interface JQuery {
    drags(): any;
}

$.fn.drags = function (opt) {

    opt = $.extend({ handle: "", cursor: "move" }, opt);

    if (opt.handle === "") {
        var $el = this;
    } else {
        var $el = this.find(opt.handle);
    }

    return $el.css('cursor', opt.cursor).on("mousedown", function (e) {
        if (opt.handle === "") {
            var $drag = $(this).addClass('draggable');
        } else {
            var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
        }
        var z_idx = $drag.css('z-index'),
            drg_h = $drag.outerHeight(),
            drg_w = $drag.outerWidth(),
            pos_y = $drag.offset().top + drg_h - e.pageY,
            pos_x = $drag.offset().left + drg_w - e.pageX;
        $drag.css('z-index', 1000).parents().on("mousemove", function (e) {
            $('.draggable').offset({
                top: e.pageY + pos_y - drg_h,
                left: e.pageX + pos_x - drg_w
            }).on("mouseup", function () {
                $(this).removeClass('draggable').css('z-index', z_idx);
            });
        });
        e.preventDefault(); // disable selection
    }).on("mouseup", function () {
        if (opt.handle === "") {
            $(this).removeClass('draggable');
        } else {
            $(this).removeClass('active-handle').parent().removeClass('draggable');
        }
    });

}

$('.popup').drags();*/
