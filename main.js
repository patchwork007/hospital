(function ($) {
    "use strict";
    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);


var subBtn = document.querySelector('#news-form');
var newsVal = document.querySelectorAll('#news-form input');
subBtn.addEventListener("submit", function(e){
    e.preventDefault();
    let news_checkList =true;		
        for(var i=0; i< newsVal.length; i++){
            var child = newsVal[i];
                if(child.value==""){
                    news_checkList=false;
                    child.focus();						
                    return;
                }
                else{
                    news_checkList=true;
                }	
        }		
        if(news_checkList==true){
            news_Stability(news_checkList);
        }			
});

newsVal.forEach((criteria,index)=> {
    criteria.addEventListener("input", function(){
        let criteriaValue = criteria.value;
        if(this.name === "mail"){
            this.value = criteriaValue.replace(/[^a-zA-Z0-9._@]/, '');
        }
        else if(this.name === "number"){
            this.value = criteriaValue.replace(/[^0-9]/, '');
        }
        else{
            this.value = criteriaValue.replace(/[^a-zA-Z ]$/, '');
        }
    });
});


function news_Stability(news_checkList) {
	if(news_checkList == true){
        $.ajax({
        method:"POST",
        url: "/mailer/mail.php",
        data:{
			ns_mail : ns_mail.value,
            ns_msg : ns_msg.value,
            ns_num : ns_num.value
		},
        success: function(data){
            alert("Your Feedback is submitted Successfully.")
            if(data ==="usr-Y"){
                $("body").append("<div class='news-med-popup'><img src='/img/news-popup.png'><span id='newspop-cls' title='Close'></span></div>");
                $("body").addClass("pops");
                $('#newspop-cls').click(function() {
                    location.reload();
                });
            }
		}
	});
	}
}

/*loader*/

let stateCheck = setInterval(() => {
if (document.readyState === 'complete') {
    clearInterval(stateCheck);
    // document ready
}
}, 100);


// get location
setTimeout(function(){
    $("body").addClass("bdy-fro");
    $(".svm-loader").addClass("unset-loader");
},2000)






