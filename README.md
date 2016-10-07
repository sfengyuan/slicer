# Slicer is a image slider based on Jquery

# install
`bower install unsj-slicer`
or

download or clone this repo and link the `slicer.js`, `main.css` and `normalize.css`

# Usage

HTML structure
```
<div class="slicer">
  <ul class="sl-wrapper">
    <li class="sl-item"><a><img src="img/dunes.jpg"/></a></li>
    <li class="sl-item"><a><img src="img/lions.jpg"/></a></li>
    <li class="sl-item"><a><img src="img/sunset.jpg"/></a></li>
  </ul>
</div>
```

active the plugin
```
<script>
  $('.slicer').slicer()
</script>
```

# Options
```
<script>
  $('.slicer').slicer({
    autoplay: true,
    loop: true,
    // 1: slide to right, -1: slide to left
    dir: 1,
    // whether to show the prev and next button
    prevNext: true,
    // whether to show the page button
    bullets: true,
    // slide speed
    speed: 300,
    // time per image display
    duration: 2000,
    })
</script>
```

# License

The MIT License (MIT)

Copyright (c) 2015 unsj

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
