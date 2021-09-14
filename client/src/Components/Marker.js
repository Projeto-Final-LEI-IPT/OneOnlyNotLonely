import L from 'leaflet';
import boxIcon from '../img/box.png'
import oldIcon from '../img/place.png'

const iconBox = new L.Icon({
  iconUrl: boxIcon ,
  iconSize: new L.Point(40, 30),
  iconAnchor: [0,0],
  popupAnchor: [20 ,0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  className: 'leaflet-div-icon'
});


const iconOldOne = new L.icon({
  iconUrl: oldIcon,
   iconSize: new L.Point(35, 40),
  iconAnchor: [16,10],
  popupAnchor: [0,0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  className: 'leaflet-div-icon'
})

export { iconBox, iconOldOne };