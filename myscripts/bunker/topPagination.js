    if ($(".page_navi").length === 1) {
        var navi = $('.page_navi').clone();
        $(".main > form > table").before(navi);
    }
