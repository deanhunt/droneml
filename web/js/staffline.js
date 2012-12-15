StaffLine = Backbone.View.extend({
    events: {
        'mousedown .measure b' : 'setCursorEvent_'
    },

    initialize: function(){

    },

    render: function(){
        // Render the first few measures.
        for (var i = 0; i < 20; i++){
            this.addMeasure();
        }

        var first = this.el.querySelector('.measure b');
        first.classList.add('cursor');
    },

    push: function(command){
        var active = this.getActive_();
        active.innerHTML = this.toCharacter_(command);

        this.incrementCursor_();
    },

    pop: function(){
        var active = this.getActive_();
        active.innerHTML = '';

        this.decrementCursor_();
    },

    advance: function(){
        this.incrementCursor_(true);
    },

    addMeasure: function(){
        var template = document.getElementById('measure-tmpl').innerHTML;
        var templateEl = $(template)[0];

        this.el.appendChild(templateEl);
        return templateEl;
    },

    getActive_: function(){
        return this.$('.cursor')[0];
    },

    toCharacter_: function(command){
        if (!command) return StaffLine.SPACER;

        var match = StaffLine.DICTIONARY[command];
        return match || StaffLine.SPACER;
    },

    setCursorEvent_: function(evt){
        var active = this.getActive_();
        active.classList.remove('cursor');

        evt.target.classList.add('cursor');
    },

    decrementCursor_: function(forcePreviousMeasure){
        var active = this.getActive_();
        var sibling = active.previousElementSibling
        if (sibling && !forcePreviousMeasure){
            active.classList.remove('cursor');
            sibling.classList.add('cursor');
        } else {
            var parentSibling = active.parentNode.previousElementSibling;
            if (parentSibling){
                var previousChildren = parentSibling.querySelectorAll('b');
                var previous = previousChildren[previousChildren.length-1];
                active.classList.remove('cursor');
                previous.classList.add('cursor');
            } else {
                // Do nothing.
            }
        }
    },

    incrementCursor_: function(forceNextMeasure){
        var active = this.getActive_();
        var sibling = active.nextElementSibling
        if (sibling && !forceNextMeasure){
            active.classList.remove('cursor');
            sibling.classList.add('cursor');
        } else {
            var parentSibling = active.parentNode.nextElementSibling;
            if (parentSibling){
                var next = parentSibling.querySelector('b');
                active.classList.remove('cursor');
                next.classList.add('cursor');
            } else {
                // Don't create additional measures.
            }
        }
    }
});

StaffLine.SPACER = '·';

StaffLine.DICTIONARY = {
    "Take off" : "➚",
    "Land": "↘",

    "up": "△",
    "down" : "▽",
    'forward': "↑",
    'backward': "↓",
    "left": "↰", // Should have a better icon, straffing.
    "right": "↱", // Should have a better icon, straffing.

    "Clockwise rotation": "↻",
    "Counterclockwise rotation": "↺"
};
