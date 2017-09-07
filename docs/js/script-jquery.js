$(document).ready(function () {
    $('#renameBtn').on('click', function () {
        $("#todo-rename-div").toggle("slide", {
            direction: 'right'
        }, 200);
    });
    $('#addBtn').on('click', function () {
        $("#itemDiv").toggle("slide", {
            direction: 'right'
        }, 200);
    });
    $('#todo-rename-btn').on('click', function () {
        var name = $('#todo-rename-input').val();
        if (name !== '' && name != " ") {
            $('#todo-header').text(name);
        }
        $('#todo-rename-div').toggle("slide", {
            direction: 'right'
        }, 400);
    });
    $('#todo-rename-input').on('keypress', function (e) {
        var name = $('#todo-rename-input').val();
        if (e.which == 13) {
            if (name !== '' && name !== " ") {
                $('#todo-header').text($('#todo-rename-input').val());
            }
            $('#todo-rename-div').toggle("slide", {
                direction: 'right'
            }, 400);
            return false;
        }
    });
    $('#notepad-rename-btn').on('click', function () {
        var name = $('#notepad-rename-input').val();
        if (name !== '' && name !== " ") {
            $('#notepad-header').text(name);
        }
        //$('#noteDiv').toggle("slide",{direction: 'right'}, 400);;
    });
    $('#notepad-rename-input').on('keypress', function (e) {
        if (e.which == 13) {
            var name = $('#notepad-rename-input').val();
            if (name !== '' && name !== " ") {
                $('#notepad-header').text(name);

            }
            var emp = "";
            $('#notepad-rename-input').attr("value", emp);
            //$('#noteDiv').toggle("slide",{direction: 'right'}, 400);;
            return false;
        }
    });
    $('#addInput').on('keypress', function (e) {
        if (e.which == 13) {
            var data = $('#addInput').val();
            if (data !== '' && data !== " ") {
                var string = "<li class=\"\"><p class=\"item\"> " + "<input type=\"checkbox\" value=\"\" name=\"check\" class=\"check-box\">" + "<label class=\"check-label\"> " + data + "</label></p></li>";
                $('#todo-list').append(string);
            }
            $('#itemDiv').hide();
            return false;
        }
    });
    $('#deleteBtn').on('click', function () {
        $('ul li').has('input[name="check"]:checked').remove();
    });
    $('.navbar-toggle').on('click', function () {
        $('.change, .original').toggleClass('change original');
    });
});
