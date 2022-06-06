<template>
   <main :class="mq.current">
      <article :class="mq.current" class="introduction">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta dolores necessitatibus facere eius placeat assumenda facilis, omnis tenetur minus. Veritatis, illo nam obcaecati aut at quae rerum mollitia architecto fuga laudantium dolores ipsum odio, nesciunt error totam? Nisi impedit sit quisquam earum deserunt, assumenda ipsam. Fugit officia, magnam, architecto ullam saepe eos sequi laudantium cupiditate itaque error maiores reprehenderit nam! Excepturi quae laudantium in corrupti impedit laboriosam nesciunt quisquam soluta expedita similique dignissimos aliquam officia itaque amet, deleniti quibusdam sapiente atque illum eos tenetur veritatis fuga molestiae earum. Dolorem ea veniam eveniet at optio quibusdam obcaecati accusantium in quaerat mollitia illum eligendi, aliquam tenetur modi, magnam commodi id laborum harum. Laborum minus suscipit tenetur totam aperiam, quos a ex nam quisquam ad illum voluptatum fugit quis perferendis! Totam minus quae nesciunt dignissimos cum accusantium, perferendis eveniet, veniam eos ducimus quos ratione ipsam atque perspiciatis eum. Deleniti reiciendis fugit, vero nostrum pariatur eaque ratione corporis ullam, iusto magnam, provident harum omnis! Minus explicabo deleniti aliquid error placeat architecto quo? Dignissimos aliquid nisi repellat reiciendis. Libero pariatur dicta asperiores quod recusandae necessitatibus est illum voluptatem itaque cumque, reprehenderit eos, omnis, accusamus fugiat! Facilis voluptatem hic quam consequuntur dolor voluptate nobis, odit iure esse reprehenderit velit maiores, laudantium quaerat numquam quasi architecto ut ullam minus voluptates possimus harum, nulla optio? Quisquam enim ab provident quibusdam facere perspiciatis, architecto nostrum, sapiente ullam impedit blanditiis minima fugiat. Ut nesciunt architecto est, tempora distinctio debitis nostrum inventore ipsum soluta, eveniet cum ipsa sed itaque voluptates. Ex sed enim inventore laudantium deleniti maxime quam veniam assumenda corporis, ipsam quis impedit nam voluptates ut repellat iure delectus dolores aliquam maiores eos voluptatum sequi non accusantium beatae. Ut illum cumque temporibus ipsam consequatur quia tenetur sapiente adipisci totam optio. Illo quod odio harum numquam aspernatur dignissimos blanditiis dolorum commodi!
      </article>
      <div class="spaceship-container" v-if="mq.desktop">
         <img class="spaceship-img" src="@/assets/spaceship.png" alt="Spaceship" >
      </div>
   </main>
</template>
<script>
export default {
   inject: ['mq']
}
</script>
<style lang="scss">
@import "@/styles/_variables.scss";


main{
   height: max-content;
   .introduction {
      margin: $margin auto;  
      z-index: 2;
      position: relative;
   }
   &.desktop{
      .introduction{
         width: 50vw;
         margin-top: $margin * 6;
      }
      .spaceship-container{
         position: relative;
         margin: $margin * 8 0;

         .spaceship-img{
            position: absolute;
            z-index: 1;
            margin-left: $margin * 3;
            bottom: $margin;
         }
      }
   }
   &.tablet{
      .introduction{
         width: 80vw;
         margin-top: $margin * 4;
      }
   }
   &.mobile{
      .introduction{
         width: 80vw;
         margin-top: $margin * 3;
      }
   }
}


</style>