Joystick = Backbone.View.extend({
    events: {
        'keydown'   : 'keydownEvent_',
        'mousedown' : 'addEvent_'
    },

    initialize: function(options){
        options = options || {};

        this.staff_ = options.staff;
    },

    render: function(){

    },

    add: function(command){
        var control = this.$('aside[data-command="' + command + '"]')[0];
        if (!control) return;

        control.classList.add('highlight');
        setTimeout(function(){
            control.classList.remove('highlight');
        }, 200);

        this.staff_.push(command);
    },

    addEvent_: function(evt){
        var command = evt.target.dataset.command;
        this.add(command);
    },

    keydownEvent_: function(evt){
        switch (evt.which){
            case 38: // Up.
                if (evt.shiftKey){
                    evt.preventDefault();
                    this.add('up');
                    break;
                } else {
                    evt.preventDefault();
                    this.add('forward');
                    break;
                }
            case 40: // Down.
                if (evt.shiftKey){
                    evt.preventDefault();
                    this.add('down');
                    break;
                } else {
                    evt.preventDefault();
                    this.add('backward');
                    break;
                }
            case 37: // Left.
                evt.preventDefault();
                this.add('left');
                break;
            case 39: // Right.
                evt.preventDefault();
                this.add('right');
                break;

            case 8: // Backspace.
                evt.preventDefault();
                this.staff_.pop();
                break;
            case 13: // Enter.
                evt.preventDefault();
                this.staff_.advance();
                break;
        }
    }
});