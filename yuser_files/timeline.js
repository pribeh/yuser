function VerticalTimeline( element ) {
   this.element = element;
   this.blocks = this.element.getElementsByClassName("js-cd-block");
   this.images = this.element.getElementsByClassName("js-cd-img");
   this.contents = this.element.getElementsByClassName("js-cd-content");
   // ...
};

VerticalTimeline.prototype.showBlocks = function() {
   var self = this;
   for( var i = 0; i < this.blocks.length; i++) {
      (function(i){
         if( self.contents[i].classList.contains("cd-is-hidden") && self.blocks[i].getBoundingClientRect().top <= window.innerHeight*self.offset ) {
            // add bounce-in animation
            self.images[i].classList.add("cd-timeline__img--bounce-in");
            self.contents[i].classList.add("cd-timeline__content--bounce-in");
            self.images[i].classList.remove("cd-is-hidden");
            self.contents[i].classList.remove("cd-is-hidden");
         }
      })(i);
   }
};
