Staff = Backbone.View.extend({
    events: {
        'click button'  : 'fly'
    },

    initialize: function(){
        this.bindAutocomplete();
        $('.measure-item').keydown(function(event){
            if (event.which == 13){
                if (!event.target.parentNode.nextElementSibling){
                    this.addMeasure();
                    this.bindAutocomplete();
                }
            }
        });
    },

    bindAutocomplete: function(){
        $(".measure-item").autocomplete({
            source: Staff.movements
        });
    },

    addMeasure: function(){
        var template = document.getElementById('measure-cell-tmpl').innerHTML;
        var rows = document.querySelectorAll('.line');
        Array.prototype.slice.apply(rows).forEach(function(row){
            var elem = $(template)[0];
            row.appendChild(elem);
        }, this);
    },

    fly: function(){
        var tweet = this.toString();
        document.getElementById('preview').innerHTML = tweet;

        //also launch a function to calculate the output of all rows.
        //get data from it
        var flightPath = $('form').serialize();
        console.log(flightPath);

        $.post("patrick.php", flightPath, function(data,status){
            alert("Data: " + flightPath + "\nStatus: " + status);
        });
    },

    toString: function(){
        var lines = [];
        var rows = document.querySelectorAll('.line');
        Array.prototype.slice.apply(rows).forEach(function(row){
            var inputs = row.querySelectorAll('input');
            inputs = Array.prototype.slice.apply(inputs);
            var rowInfo = inputs.map(function(cell){
                var value = cell.value;

                // Drop out early if no input.
                if (!value) return '·';

                var code = Staff.dictionary[value];

                // If not recognized, return space.
                if (!code) return '·';

                return code;
            }, this).join('');

            lines.push(rowInfo);
        }, this);
        return lines.join('\n');
    },

});

Staff.dictionary = {
    "Take off" : "➚",
    "Land": "↘",
    "Up": "△",
    "Down" : "▽",
    "Forward": "↑",
    "Backward": "↓",
    "Turn left": "↰",
    "Turn right": "↱",
    "Clockwise rotation": "↻",
    "Counterclockwise rotation": "↺"
};

Staff.movements = [
    "Take off",
    "Land",
    "Up",
    "Down",
    "Forward",
    "Backward",
    "Turn left",
    "Turn right",
    "Clockwise rotation",
    "Counterclockwise rotation"
];
