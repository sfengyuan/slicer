;
+function($, window){
  var pluginName = 'slicer'
  var defaults = {
    autoplay: true,
    loop: true,
    dir: 1,
    prevNext: true,
    bullets: true,
    speed: 300,
    duration: 2000,
  }

  function Plugin( ele, options ){
    this.ele = ele
    this.options = $.extend({}, defaults, options)
    this.info = {
      //  index of current slide
      current: 0,
      // total number of slides
      counts:0,
      // width of single slide
      width:0,
      // total width of slides
      totalWidth:0,
      autoPlayId: null,
    }
    this.init()
  }

  $.extend(Plugin.prototype, {
    init: function(){
      this.cacheEle()
      this.cloneItems()
      this.getProps()
      this.setProps()

      if(this.options.prevNext){
        this.prevNext()
      }

      if(this.options.bullets){
        this.bullets()
      }

      this.resetSlide()

      if(this.options.autoplay){
        this.autoPlay()
      }


    },

    cacheEle: function(){
      this.$slider = $(this.ele)
      this.$wrapper = this.$slider.find('.sl-wrapper')
      this.$items = this.$wrapper.find('.sl-item')
    },

    cloneItems: function(){
      this.$items.filter(':last').clone().prependTo(this.$wrapper)
      this.$items.filter(':first').clone().appendTo(this.$wrapper)
      this.$items = this.$wrapper.find('.sl-item')
    },

    getProps: function(){
      this.info.counts = this.$items.length
      this.info.width = 100 / this.info.counts
      this.info.totalWidth = this.info.counts * 100
    },

    setProps: function(){
      this.$wrapper.css({
        width: this.info.totalWidth + '%'
      })

      this.$items.css({
        width: this.info.width + '%'
      })
    },

    resetSlide: function(){
      this.setCurrent(1)
      this.jumpTo(1)
    },

    autoPlay: function(){

      var self = this
        this.info.autoPlayId = window.setTimeout(function(){
          self.play.call(self, self.options.dir)
        }, this.options.duration)
    },

    play: function(dir){

      if(this.options.dir === 1){
        this.playRight()
      } else if(this.options.dir === -1){
        this.playLeft()
      }

    },

    playRight: function(){
      var i = this.info.current + 1
      if(i == this.info.counts - 1){
        this.setCurrent(1)
        this.ForwardThenJumpAndReAutoPlay()
      } else {
        this.setCurrent(i)
        this.forward()
        this.reAutoPlay()
      }
    },

    playLeft: function(){
      var i = this.info.current-1
      if(i == 0){
        this.setCurrent( this.info.counts - 2 )
        this.BackwardThenJumpAndReAutoPlay()
      } else {
        this.setCurrent(i)
        this.backward()
        this.reAutoPlay()
      }
    },

    ForwardThenJumpAndReAutoPlay: function(){
      var self = this
      this.forward(function(){
        self.jumpToStart.call(self)
        self.reAutoPlay()
      })
    },
    BackwardThenJumpAndReAutoPlay: function(){
      var self = this
      this.backward(function(){
        self.jumpToEnd.call(self)
        self.reAutoPlay()
      })
    },

    jumpToStart: function(){
      this.stopAutoPlay()
      this.jumpTo(1)
    },
    jumpToEnd: function(){
      this.stopAutoPlay()
      this.jumpTo(this.info.counts - 2)
    },

    reAutoPlay: function(){
      if(this.info.current < this.info.counts - 2 || this.options.loop){
        this.autoPlay()
      }
    },

    stopAutoPlay: function(){
      this.$wrapper.stop(true, true)
      window.clearTimeout(this.info.autoPlayId)

    },

    setCurrent: function(i){
      this.info.current = i
      this.$slider.find('.sl-bullets li').css({
        backgroundColor: '#333'
      }).eq(i - 1).css({
        backgroundColor: '#fff'
      })
    },

    jumpTo: function(i){
      this.$wrapper.css({
        right: (i * 100).toString() + '%'
      })
    },

    forward: function(callback){
      this.switchSlide(this.info.current + 1, {speed: this.options.speed}, callback)
    },
    backward: function(callback){
      this.switchSlide(this.info.current -1,{speed: this.options.speed},callback )
    },

    switchTo: function(i){
      var self = this
      this.stopAutoPlay()
      this.switchSlide(i,{}, function(){
        self.reAutoPlay.call(self)
      })
      this.setCurrent(i)
    },

    switchSlide: function(i, anm, callback){
      var i = (typeof i === 'undefined') ? 1 :i
      var options = anm || {}
      var speed = (typeof options.speed === 'undefined') ? 300 : options.speed

      var dest = (parseInt(i) - this.info.current) * 100

      if(dest > 0){
        dest = '+=' + dest + '%'
      } else {
        dest = '-=' + (-dest) + '%'
      }

      if(typeof callback == 'function'){
        this.$wrapper.animate({right: dest}, speed,'swing', callback)
      }else {
        this.$wrapper.animate({right: dest}, speed,'swing')
      }
    },

    prevNext: function(){
      if(this.$slider.find('.sl-controls').length == 0){
        this.addControls()
      }
    },

    addControls: function(){
      var self = this

      $('<div class="sl-controls"><span class="prev fa fa-angle-left fa-2x"></span><span class="next fa fa-angle-right fa-2x"></span></div>')
        .find('span').css({
          display:'block',
          position: 'absolute',
          border:'none',
          backgroundColor:'#333',
          color:'#999',
          padding:'5px',
          opacity:'0.5',
          cursor:'pointer'
        })
        .end()
        .find('.prev').css({
          left:'0',
          top: '43%'
        })
        .on('click', function(){
          if(self.info.clickTimer){
            window.clearTimeout(self.info.clickTimer)
          }

          self.info.clickTimer = window.setTimeout(function(){
            self.prevEvent.call(self)
          }, 50)
        })
        .end()
        .find('.next').css({
          right:'0',
          top: '43%'
        })
        .on('click', function(){
          if(self.info.clickTimer){
            window.clearTimeout(self.info.clickTimer)
          }

          self.info.clickTimer = window.setTimeout(function(){
            self.nextEvent.call(self)
          }, 50)
        })
        .end()
        .appendTo(this.$slider)
        var slider_h = this.$slider.height()
        var button_h = this.$slider.find('.sl-controls .prev').height()

        var _t = (slider_h - button_h) / 2 / button_h * 100
        this.$slider.find('sl-controls span').css({
          top: _t + '%'
        })
    },

    prevEvent: function(){
      console.log('click')
      this.stopAutoPlay()
      this.playLeft()
    },
    nextEvent: function(){
      console.log('click')
      this.stopAutoPlay()
      this.playRight()
    },



    bullets: function(){
      if(this.$slider.find('.sl-bullets').length == 0){
        this.addBullets()
      }
    },

    addBullets: function(){
      this.info.bulletsTimer = null
      var self = this
      var $bullets = $('<ul class="sl-bullets"></ul>')

      $bullets.css({
        position: 'absolute',
        left: '40%',
        top: '90%'
      })

      for(var i = 1; i <= this.info.counts-2; i++){
        $('<li></li>').css({
          float:'left',
          width: '12px',
          height: '12px',
          borderRadius: '9999px',
          marginRight: '15px',
          cursor: 'pointer',
          backgroundColor: '#ddd',
          opacity:'0.5'
        })
        .attr('sl-bullet-number',i)
        .appendTo($bullets)
      }
      $bullets.on('click','li', function(e){
        if(self.info.clickTimer){
          window.clearTimeout(self.info.clickTimer)
        }
        self.info.clickTimer = window.setTimeout(function(){
          self.bulletEvent.call(self,e)
        },50)
      })
      .appendTo(this.$slider)
      this.$bullets = this.$slider.find('.sl-bullets')
      var slider_w = this.$slider.width()
      var bullets_w =  this.$bullets.width()
      var _p = (slider_w  - bullets_w) / 2 / slider_w * 100
      this.$bullets.css({
        left: _p + '%'
      })
    },

    bulletEvent: function(e){
      console.log('click bullet')
      var i = parseInt($(e.target).attr('sl-bullet-number'))
      this.switchTo(i)
    }

  })

  $.fn[pluginName] = function(options){
    return this.each(function(){
      if(!$.data(this, 'plugin_' + pluginName)){
        $.data(this, 'plugin_' + pluginName,
            new Plugin(this, options))
      }
    })
  }
}(jQuery, window);
