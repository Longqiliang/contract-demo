export default {
  data() {
    return {
      winWidth: 0,
      winHeight: 0,
      offsetX: 15,
      offsetTop: 54,
      offsetBottom: 50,
      touch: {
        moveX: 0,
        moveY: 0,
        posX: 0,
        posY: 0,
        touching: false,
        bound: {}
      }
    };
  },
  computed: {
    translateStyle() {
      const style = {};
      style.webkitTransform = `translate(
        ${this.touch.moveX}px,
        ${this.touch.moveY}px)`;
      style.transform = `translate(
        ${this.touch.moveX}px,
        ${this.touch.moveY}px,
        0)`;
      return style;
    }
  },
  mounted() {
    const ele = this.$refs['addBtn'];
    const _this = this;
    const win = window;
    this.winWidth = win.innerWidth;
    this.winHeight = win.innerHeight;
    // ele.style.visibility = 'visible';
    _this.touch.bound = ele.getBoundingClientRect();
    ele.addEventListener('touchstart', function(event) {
      const events = event.touches[0] || event;
      _this.touch.posX = events.clientX;
      _this.touch.posY = events.clientY;
      _this.touch.touching = true;
    });
    document.addEventListener(
      'touchmove',
      function(event) {
        if (_this.touch.touching !== true) {
          return;
        }
        event.preventDefault();
        const events = event.touches[0] || event;
        let nowX = events.clientX;
        let nowY = events.clientY;
        let distanceX = nowX - _this.touch.bound.left,
          distanceY = nowY - _this.touch.bound.top,
          moveX = distanceX - _this.touch.bound.width / 2,
          moveY = distanceY - _this.touch.bound.height / 2,
          maxX = _this.winWidth - _this.touch.bound.right - _this.offsetX,
          maxY =
            _this.winHeight - _this.touch.bound.bottom - _this.offsetBottom,
          minX = -_this.touch.bound.left + _this.offsetX,
          minY = -_this.touch.bound.top + _this.offsetTop;
        if (moveX < minX) {
          moveX = minX;
        }

        if (moveX > maxX) {
          moveX = maxX;
        }

        if (moveY < minY) {
          moveY = minY;
        }

        if (moveY > maxY) {
          moveY = maxY;
        }

        _this.touch.moveX = moveX;
        _this.touch.moveY = moveY;
      },
      {
        passive: false
      }
    );
    document.addEventListener('touchend', function() {
      if (_this.touch.touching === false) {
        return;
      }
      _this.touch.touching = false;
    });
  }
};
