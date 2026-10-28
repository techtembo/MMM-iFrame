/* global Module */

/* Magic Mirror
 * Module: iFrame
 *
 * By Ben Williams http://desertblade.com
 * MIT Licensed.
 */

Module.register("MMM-iFrame",{
		// Default module config.
		defaults: {
                                frameWidth: "300",
				width:"100%",
                                updateInterval: 0.5 * 60 * 1000,
                                url: ["http://magicmirror.builders/"],
                                scrolling: "no"
		},

        start: function () {
                self = this;
                var count = 0;
                if (this.config.url.length > 0 && this.config.updateInterval > 0) {
                      setInterval( function () { 
                         self.updateDom(1000);
                         console.log('update' + count++)
                         }, this.config.updateInterval);
                }
	},
  getRandomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
resume: function() {
   console.log("Resuming");
   return this.getDom();
},
        getStyles: function() {
                return [
                        "MMM-iFrame.css",
                ];
        },

        // Override dom generator.
        getDom: function() {
                var w = parseInt(this.config.width, 10) || 480;
                var h = parseInt(this.config.height, 10) || 270;
                var frameW = parseInt(this.config.frameWidth, 10) || w;
                var aspectRatioPadding = ((h / w) * 100).toFixed(2);

                var wrapper = document.createElement("div");
                wrapper.className = "mmm-iframe";
                wrapper.style.width = `${frameW}px`;

                var html = `
                        <div class="mmm-iframe-wrapper" style="position: relative; width: 100%; padding-top: ${aspectRatioPadding}%; overflow: hidden;">
                                <iframe
                                        src="${this.config.url[this.getRandomInt(0, this.config.url.length)]}"
                                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                                        scrolling="${this.config.scrolling}"
                                        allowfullscreen="true"
                                ></iframe>
                        </div>
                `;

                wrapper.insertAdjacentHTML("afterbegin", html);

                return wrapper;
        }

});
