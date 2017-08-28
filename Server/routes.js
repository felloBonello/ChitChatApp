/**
 * Created by jwb19 on 2017-04-04.
 */
var userNames = (function (){
    var names = {};
    var colorVals = [];

    var claim = function (name) {
        if (!name || names[name]) {
            return false;
        } else {
            names[name] = getRandomColor();
            return names[name];
        }
    };

    var getRandomColor = function () {
        var cont = true;
        var val = 0;

        while(cont)
        {
            val = Math.random() * 360;
            cont = false;
            for (var c in colorVals)
                if(Math.abs(val - colorVals[c]) < 20)
                    cont = true;
        }

        var color = "hsl(" + val + ", 100%, 75%)";
        colorVals.push(val);
        return color;
    }

    // serialize claimed names as an array
    var get = function () {
        var res = [];
        for (name in names) {
            res.push({name: name, color: names[name]});
        }

        return res;
    };

    var free = function (name) {
        if (names[name]) {
            var color = names[name].substring(1, names[name].indexOf(","));
            colorVals.splice(colorVals.indexOf(color), 1);
            delete names[name];
        }
    };

    return {
        claim: claim,
        free: free,
        get: get,
        getRandomColor: getRandomColor
    };
}());


// export function for listening to the socket
module.exports = function (socket) {
    console.log('new connection established')
    var color;
    var username;


    socket.emit('init',
        {
            users: userNames.get(),
            color: '#FFFFFF'
        })


    socket.on('user.join', function(data, fn){
        var result = userNames.claim(data.name)
        if (result) {
            username = data.name;
            color =  result//userNames.getRandomColor();
            var d = new Date();
            socket.broadcast.emit('user.join',
                {
                    user: data.name,
                    time: d.toTimeString().substring(0, 8),
                    color: '#7E7E7E',
                    userColor: color
                })

            socket.emit('init',
                {
                    users: userNames.get(),
                    color: color
                })

            fn(true)
        }
        else {
            fn(false)
        }
    })

    socket.on('send.message', (data) => {
        socket.broadcast.emit('send.message',
            {
                user: data.user,
                text: data.text,
                time: data.time,
                color: color
            }
        )
    })

    socket.on('user.typed', () => {
        socket.broadcast.emit('user.typed',
            {
                user: username
            }
        )
    })

    socket.on('disconnect', () => {
        var d = new Date();
        socket.broadcast.emit('user.left',
            {
                user: username,
                time: d.toTimeString().substring(0, 8),
                color: '#7E7E7E'
            }
        )
        userNames.free(username);
    })
};