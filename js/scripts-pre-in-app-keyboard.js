$(document).ready(function() {
    
    $(function() {
        FastClick.attach(document.body);
    });
    
    var html = $('html'),
        body = $('body'),
        htmlBody = $('html,body'),
        containerFluid = $('.container-fluid'),
        tallyTotalTxt = $('.tallyTotalTxt'),
        editScreen = $('.editScreen'),
        numEdit = $('.numEdit'),
        tallyTotal = 0,
        plusBtn = $('.plusBtn'),
        minusBtn = $('.minusBtn'),
        editBtn = $('.editBtn'),
        submitEdit = $('.submitEdit'),
        cancelEdit = $('.cancelEdit'),
        restartBtn = $('.restartBtn'),
        submitEdit = $('.submitEdit'),
        cancelEdit = $('.cancelEdit'),
        alertMsg = $('.alert'),
        standalone = window.navigator.standalone;
    
    alertMsg.each(function() {
        $(this).hide();
    });
    
    if (localStorage.getItem("tallyTotalStored") === null) {
        //console.log('no locally stored dbs found, default db used');
        console.log(parseFloat(JSON.stringify(localStorage).length / 1024).toFixed(2) + " KBs of Local Storage Used");
        tallyTotalTxt.text('000' + tallyTotal);
    }
    
    else {
        var retrievedTallyTotal = localStorage.getItem('tallyTotalStored');
        tallyTotal = retrievedTallyTotal;
        //console.log('local storage retrieved!');
        setText();
        console.log(parseFloat(JSON.stringify(localStorage).length / 1024).toFixed(2) + " KBs of Local Storage Used");
    }
    
    if (navigator.userAgent.match(/(ip(hone|od|ad))/i) && standalone) {
        html.css({'padding-top' : '22px'});
        body.css({'height' : $(window).height() - 22});
    }
    
    else {
        body.css({'height' : $(window).height()});
    }
    
    containerFluid.css({'min-height' : body.height()});
    
    plusBtn.click(function() {
        increaseTally();
    });
    
    minusBtn.click(function() {
        decreaseTally();
    });
    
    restartBtn.click(function() {
        restartTally();
    });
    
    editBtn.click(function() {
        editTally();
    });
    
    cancelEdit.click(function() {
        cancelNumEdit();
    });
    
    submitEdit.click(function() {
        submitNumEdit();
    });
    
    function increaseTally() {
        tallyTotal++;
        setText();
    }
    
    function decreaseTally() {
        if (tallyTotal > 0) {
            tallyTotal--;
            setText();
        }
        else {}
    }
    
    function restartTally() {
        tallyTotal = 0;
        setText();
    }
    
    function editTally() {
        tallyTotalTxt.css({'display' : 'none'});
        editScreen.css({'display' : 'block'});
        numEdit.focus();
    }
    
    numEdit.keypress(function(e) {
        if(e.which == 13) {
            submitNumEdit();
        }
    });
    
    function submitNumEdit() {
        tempNum = parseInt(numEdit.val());
        if (tempNum > 9999 || isNaN(tempNum)) {
            alertMsg.hide();
            alertMsg.fadeIn();
            setTimeout(function() {
                alertMsg.fadeOut();
            }, 5000);
        }
        else {
            alertMsg.hide();
            tallyTotal = tempNum;
            setText();
        }
        
        numEdit.val('');
        numEdit.blur();
        tallyTotalTxt.css({'display' : 'block'});
        editScreen.css({'display' : 'none'});
    }
    
    function cancelNumEdit() {
        numEdit.val('');
        tallyTotalTxt.css({'display' : 'block'});
        editScreen.css({'display' : 'none'});
    }
    
    function setText() {
        if (tallyTotal < 10) {
            tallyTotalTxt.text('000' + tallyTotal);
        }
        else if (tallyTotal < 100) {
            tallyTotalTxt.text('00' + tallyTotal);
        }
        else if (tallyTotal < 1000) {
            tallyTotalTxt.text('0' + tallyTotal);
        }
        else if (tallyTotal < 10000) {
            tallyTotalTxt.text(tallyTotal);
        }
        else if (tallyTotal > 9999) {
            tallyTotal = 0;
            tallyTotalTxt.text('000' + tallyTotal);
        }
        setLocalStorage();
    }
    
    function setLocalStorage() {
        localStorage.setItem('tallyTotalStored', tallyTotal);
    }
    

    
    
    
    $(document).attr('unselectable','on').css({
        '-moz-user-select':'-moz-none',
        '-moz-user-select':'none',
        '-o-user-select':'none',
        '-khtml-user-select':'none', /* you could also put this in a class */
        '-webkit-user-select':'none',/* and add the CSS class here instead */
        '-ms-user-select':'none',
        'user-select':'none'
    }).bind('selectstart', function(){ return false; });
});