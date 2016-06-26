/**
 * Created by vamsi on 6/25/2016.
 */
jQuery(document).ready(function () {



    var htm;
    var link;
    function generate_url() {
        var tags = jQuery('#input').val();
        link = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
        var key = "b349d94ae45a2fec62d5f95b01bded94";
        var extra = "url_m";
        var format = "json";

        link = link+'&api_key='+key+'&tags='+tags+'&extras='+extra+'&format='+format+"&nojsoncallback=1";
        console.log(link);
    }


    jQuery('.btn').on('click',function () {
        console.log("inside click")
        generate_url();


        jQuery.ajax({
            type:"GET",
            url: link,

            success: function (data) {
                console.log("inside success"+data);
                var image_src = [];
                var programmes = data.photos.photo;
                for(i=0;i<6;i++){
                    image_src.push(data.photos.photo[i].url_m);
                    console.log(image_src[i])
                }
                var temp = "slide"+1;
                console.log(temp);
                //$('.'"slide"+1'').attr('src', image_src[1]) ;
                console.log(image_src.toString());

                $('.slide').each(function (index, value) {
                    console.log(index);
                    $(this).attr('src',image_src[index])
                })

                $('#slide_cont').show();

            },
            error: function (exception) {
                console.log(link)
                console.log("inside error")
                console.log(exception)
            }}
        )
    });

    $('#input').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('.btn').click();//Trigger search button click event
        }
    });

    var width = 600;
    var animationSpeed = 1000;
    var pause = 3000;
    var currentSlide = 1;

    //cache DOM elements
    var $slider = $('#slider');
    var $slideContainer = $('.slides', $slider);
    var $slides = $('.slide_li', $slider);

    var interval;

    function startSlider() {
        interval = setInterval(function() {
            $slideContainer.animate({'margin-left': '-='+width}, animationSpeed, function() {
                if (++currentSlide === $slides.length) {
                    currentSlide = 1;
                    $slideContainer.css('margin-left', 0);
                }
            });
        }, pause);
    }
    function pauseSlider() {
        clearInterval(interval);
    }

    $slideContainer
        .on('mouseenter', pauseSlider)
        .on('mouseleave', startSlider);

    startSlider();


});
