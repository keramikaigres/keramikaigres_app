$(document).ready(function(){
    // Слайдер конфигурация
    let config = {
    autoplay: true,
    autoplayTimeout: 3000,
    loop:true,
    margin:30,
    responsiveClass:true,
    autoplayHoverPause: true,
    responsive:{
        0:{
            items:2,
            nav:true
        },
        600:{
            items:3,
            nav:true
        },
        1000:{
            items:5,
            nav:true,
            loop:true
        }
    }
    }

    let config_2 = {
            autoplay: true,
            autoplayTimeout: 3000,
            loop:true,
            margin:130,
            responsiveClass:true,
            autoplayHoverPause: true,
            navContainer: false,
            responsive:{
                0:{
                    items:1,
                    nav:true
                },
                600:{
                    items:2,
                    nav:true
                },
                1000:{
                    items:4,
                    nav:true,
                    loop:true
                }
            }
        
    }

  let owl = $('.owl-carousel-brands').owlCarousel(config)
    owl.owlCarousel()
    $('.owl-prev').click(function(){
        owl.trigger('prev.owl.carousel');
    })
    $('.owl-next').click(function(){
        owl.trigger('next.owl.carousel');
    })
    console.log()


    let owl_popular = $('.popular-carousel').owlCarousel(config_2)
    owl_popular.owlCarousel()

    $('.owl-prev-popular').click(function(){
        owl_popular.trigger('prev.owl.carousel');
    })
    
    $('.owl-next-popular').click(function(){
        owl_popular.trigger('next.owl.carousel');
    })

    // Загрузка данных ajax

  let material_checkbox = document.getElementsByName('material');
  let button_send_mat = document.getElementById('test');
  let showmore = document.getElementById('showmore');


  button_send_mat.addEventListener('click', (e) => {
      e.preventDefault();
      let arr = [];
      for(i=0; i<material_checkbox.length; i++){
          if (material_checkbox[i].checked == true){
          let user_filter = material_checkbox[i].value;
          arr.push(material_checkbox[i].value);
          } 
      }

      hello();

      function hello(){
          $.ajax({
            url: '/test',
            success: function(data){
                alert("Ура данные улетели" + JSON.stringify(data));
            }

          })
        
        
        
        
        $.ajax(
              "hppt://localhost:3000/test"
          )
          
          
      }

    })
});    
   


    // Получить следующие товары

    showmore.addEventListener('click', function(e){
        e.preventDefault();

        let display_tovar = $('.catalog-block .tovar');
        let button = $(this);

        let container = $('.catalog-block');
        let data = {"more": display_tovar.length}
        
        let postLink = '/'

        if(!showmore.hasAttribute("showmore")){
            showmore.setAttribute("found_product","");
            // data.more = display_tovar.length;
            data.action = 'more';
            // data.last = button.attr('found_product');
            // data.ismain = button.attr('data-ismain');
            console.log(data.more)
        }
        $.ajax({
            url: postLink,
            type: 'POST',
            dataType: 'json',
            data: data,
            error: function(){
                alert('error');
                button.removeClass('working')
            }

        }).done(function(datas){
            container.append(datas.html)
          let acssec_tov = datas.restovar + data.more;
          if(data.more >= acssec_tov ){
              $('#showmore').hide();
          }
        })
    })
  

// let submitform1 = $('#targetForm').submit(function(){
//     return alert("ololo");
// })
    


    
 

  
 