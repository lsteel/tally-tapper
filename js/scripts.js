$(document).ready(function() {
    
    $(function() {
        FastClick.attach(document.body);
    });
    
    document.ontouchstart = function(e){ 
        e.preventDefault(); 
    }
    
    var html = $('html'),
        body = $('body'),
        htmlBody = $('html,body'),
        containerFluid = $('.container-fluid'),
        tallyTotalTxt = $('.tallyTotalTxt'),
        editScreen = $('.editScreen'),
        numEdit = $('.numEdit'),
        tallyTotal = 0,
        icon = $('.icon'),
        plusBtn = $('.plusBtn'),
        minusBtn = $('.minusBtn'),
        editBtn = $('.editBtn'),
        submitEdit = $('.submitEdit'),
        cancelEdit = $('.cancelEdit'),
        restartBtn = $('.restartBtn'),
        submitEdit = $('.submitEdit'),
        cancelEdit = $('.cancelEdit'),
        alertMsg = $('.alert'),
        standalone = window.navigator.standalone,
        kbWrapper = $('.kbWrapper'),
        key = $('.key'),
        keyOne = $('.keyOne'),
        keyTwo = $('.keyTwo'),
        keyThree = $('.keyThree'),
        keyFour = $('.keyFour'),
        keyFive = $('.keyFive'),
        keySix = $('.keySix'),
        keySeven = $('.keySeven'),
        keyEight = $('.keyEight'),
        keyNine = $('.keyNine'),
        keyZero = $('.keyZero'),
        keyCancel = $('.keyCancel'),
        keyOK = $('.keyOK'),
        keyErase = $('.keyErase'),
        clickable = true;
    
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
        if (clickable) {increaseTally()}
    });
    
    minusBtn.click(function() {
        if (clickable) {decreaseTally()}
    });
    
    restartBtn.click(function() {
        if (clickable) {restartTally()}
    });
    
    editBtn.click(function() {
        if (clickable) {
            showKB();
        }
    });
    
    key.click(function() {enterNum($(this))});
    
    keyErase.click(function() {
        eraseNumber();
    });
    
    keyOK.click(function() {
        hideKB();
        setNumber();
    });
    
    keyCancel.click(function() {
        hideKB();
        setText();
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
    
    function showKB() {
        clickable = !clickable;
        tallyTotalTxt.html('<span class="enteredNumber"></span><span id="typed-cursor" class="blinking cursor">_</span>');
        $('.cursor').show();
        kbWrapper.animate({
            bottom: '0%',
        }, 500, function() {
            // Animation complete.
        });
        icon.animate({
            opacity: 0,
        }, 500, function() {
            // Animation complete.
        });
    }
    
    function hideKB() {
        clickable = !clickable;
        kbWrapper.animate({
            bottom: '-75%',
        }, 500, function() {
            // Animation complete.
        });
        icon.animate({
            opacity: 1,
        }, 500, function() {
            // Animation complete.
        });
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
    
    
    function enterOne() {
        tallyTotalTxt.prepend('1');
    }
    
    function enterNum(keyNum) {
        var enteredNumber = $('.enteredNumber');
        if (enteredNumber.text().length < 3) {
            $('.enteredNumber').append(keyNum.text());
        }
        else if (enteredNumber.text().length > 2 && enteredNumber.text().length < 4) {
            $('.cursor').hide();
            $('.enteredNumber').append(keyNum.text());
        }
    }
    
    function eraseNumber() {
        $('.cursor').show();
        var enteredNumber = $('.enteredNumber');
        var enteredNumberText = enteredNumber.text();
        enteredNumber.text(enteredNumberText.slice(0,-1));
    }
    
    function setNumber() {
        var enteredNumber = parseInt($('.enteredNumber').text());
        tallyTotal = enteredNumber;
        setText();
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