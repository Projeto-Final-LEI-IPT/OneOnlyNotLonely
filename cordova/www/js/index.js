var container = document.getElementById('container');

var app={
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

    },
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    
        var onSuccess = function(position){
            var topo = document.getElementById("topo");
            var body = document.body;
            var mapa = document.getElementById("mapid");
            var btn = document.getElementById("btMapa")

            var mymap = L.map('mapid').setView([39.60360511, -8.40795278], 16);

            function onOnline() {
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                tileSize: 512,
                zoomOffset: -1
            }).addTo(mapa);
            }
                onOnline();

            //vai buscar a posição inicial quando inicia a app
            navigator.geolocation.getCurrentPosition(function (location) {
                var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
            });
            mymap.on('locationfound', onLocationFound);

            

            mapa.locate({setView: true, maxZoom: 16});

            btn.onclick = mostraMapa =>{
                topo.classList.add('hidden');
                btn.classList.add('hidden');
                mapa.classList.remove('hidden');
            }
            
        }
        var onError = function (error) {
            str = 'code: ' + error.code + '\n' +
            'message: ' + error.message + '\n';
            if (error.code == 3) { // no gps
                str = "Sem sinal de GPS.";
                onSuccess();
            } 
            alert(str);
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 10000, enableHighAccuracy: true });
    },
    
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
    }
}
app.initialize();

/*

export default withAuthenticationRequired(Mapa)

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}*/
