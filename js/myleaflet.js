
// var map;
var L;
var document;

// Available tracks:
/*
var treks =
    [
      {
        "title": "Colle Val d'Elsa - Costeggiando l'Elsa da Gracciano a Ponte di Spugna",
        "trackfile": "tracks/20181021_Elsa_da_Gracciano_a_Ponte_di_Spugna.gpx"
      },
      {
        "title": "Colle val d'Elsa - Costeggiando l'Elsa da Ponte di Spugna a Gracciano",
        "trackfile": "tracks/20181021_Elsa_da_Ponte_di_Spugna_a_Gracciano.gpx"
      },
      {
        "title": "Sesto Fiorentino - Monte Morello, sgambata sopra Colonnata",
        "trackfile": "tracks/20181020_morello_basso_lato_colonnata.gpx"
      },
      {
        "title": "Sesto Fiorentino - Monte Morello, Sgambata sopra le Cappelle",
        "trackfile": "tracks/20181007_SgambataMonteMorelloVicinoCasa.gpx"
      },
      {
        "title": "Abetone - Alpe Tre Potenze",
        "trackfile": "tracks/20180909_LeRegine_LagoNero_AlpeTrePotenze_Abetone.gpx"
      },
      {
        "title": "Da Valnontey al Rifugio Sella passando per i capanni dell'Herbetet",
        "trackfile": "tracks/20180820_Valnontey_CapanniHerbetet_RifSella.gpx"
      },
      {
        "title": "Dal Rifugio Sella alla Valsavarenche (Col Lauson).gpx",
        "trackfile": "tracks/20180821_RifSella_ColLauson_Valsavarenche.gpx"
      },
      {
        "title": "Da Pont al Rifugio Savoia",
        "trackfile": "tracks/20180822_Pont_RifSavoia.gpx"
      },
      {
        "title": "Giro sopra il Rifugio Savoia: laghi e Col Leynir",
        "trackfile": "tracks/20180823_RifSavoia_Laghi_ColLeynir.gpx"
      },
      {
        "title": "Dal Rifugio Savoia a Ceresole Reale passando per il Colle della Terra",
        "trackfile": "tracks/20180824_RifSavoia_ColleDellaTerra_RifMila.gpx"
      },
      {
        "title": "Islanda - Passeggiata nel Landmannalaugar con salita al Blahnukur",
        "trackfile": "tracks/20180701_Landmannalaugar_Blahnukur.gpx"
      },
      {
        "title": "Islanda - Breve passeggiata nel Thorsmork",
        "trackfile": "tracks/20180702_Thorsmork.gpx"
      },
      {
        "title": "Islanda - Passeggiata sopra Skogafoss",
        "trackfile": "tracks/20180703_Skogafoss.gpx"
      },
      {
        "title": "Islanda - Il relitto aereo presso la spiaggia di Vik",
        "trackfile": "tracks/20180703_VikRelittoAereo.gpx"
      },
      {
        "title": "Islanda - Skaftafell, anello St. Kristine",
        "trackfile": "tracks/20180705_SkaftafellAnelloStKristine.gpx"
      },
      {
        "title": "Islanda - Le cascate di Hengifoss",
        "trackfile": "tracks/20180707_CascataHengifoss.gpx"
      },
      {
        "title": "Islanda - Asbyrgi",
        "trackfile": "tracks/20180709_Asbyrgi.gpx"
      },
      {
        "title": "Islanda - Vesturdalur e salita al Raudholar",
        "trackfile": "tracks/20180709_Vesturdalur_Raudholar.gpx"
      }
    ];
*/

var trackfile = 'tracks/20181021_Elsa_da_Gracciano_a_Ponte_di_Spugna.gpx';

// -----------------------------------------------------------------------------
function getRadioVal(form, name) {
  'use strict';
  var radios, val, i, len;
  
  radios = form.elements[name];

  for (i = 0, len = radios.length; i < len; i = i + 1) {
    if (radios[i].checked === true) {
      val = radios[i].value;
      break;
    }
  }
  return val;
}

// ----------------------------------------------------------------------------
function clearLayers(map) {
  'use strict';
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });
}

// ----------------------------------------------------------------------------
function forYouMapsLayer() {
  'use strict';
  return L.tileLayer('https://tileserver.4umaps.com/{z}/{x}/{y}.png',
    {
      maxZoom: 17,
      attribution: 'Map data: &copy; <a href="https://www.4umaps.com/">4UMaps</a>'
    });
}

// ----------------------------------------------------------------------------
function openTopoMapLayer() {
  'use strict';
  return L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 17,
      attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
}

// ----------------------------------------------------------------------------
function thunderForestLandscapeLayer() {
  'use strict';
  return L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}',  {
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    apikey: 'e9fb11ac45734d7f9475e22de47d93e7',
    maxZoom: 22
  });
}

// ----------------------------------------------------------------------------
function mapBoxLayer() {
  'use strict';

  var mpKey, mpUrl, mpAttrib;
  
  // save my MapBox key
  mpKey = 'pk.eyJ1Ijoicm9kbWNiYW4iLCJhIjoiY2ptNHQ2c3N1MGducTNxbzRydGUwZzdtMSJ9.jILIRcBlfcJTPZztynaKwQ';
  mpUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mpKey;

  mpAttrib = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>';

  return new L.tileLayer(mpUrl,
    {
      attribution: mpAttrib,
      id: 'mapbox.streets'
    }
                        );
}

// ----------------------------------------------------------------------------
function showSelectedBaseMap(map, basemap) {
  'use strict';
  clearLayers(map);

  switch (basemap) {
  case 'fum':
    // 4Umaps
    map.addLayer(forYouMapsLayer());
    break;
  case 'otm':
    // Open topo map
    map.addLayer(openTopoMapLayer());
    break;
  case 'tf':
    // Thunderforest landscape
    map.addLayer(thunderForestLandscapeLayer());
    break;
  case 'mb':
    // Mapbox
    map.addLayer(mapBoxLayer());
    break;
  default:
    // impossible... Uses Mapbox
    map.addLayer(mapBoxLayer());
    break;
  }
}

// ----------------------------------------------------------------------------
function distanceToString(dist, useKm) {
  
  'use strict';
  var retStr, n_km, n_m;

  // distance is in meters
  if (useKm) {
    n_km = Math.floor(dist / 1000);
    n_m = Math.round(dist % 1000);
    if (n_km > 0) {
      retStr = n_km + ' Km ' + n_m + 'm';
    }
    else {
      retStr = n_m + ' m';
    }
  }
  else {
    retStr = Math.round(dist) + ' m';
  }
  return retStr
}

// ----------------------------------------------------------------------------
function timemsToString(timems, printms) {
  
  'use strict'
  var h, m, s, ms, retStr = '';
  
  s = Math.floor(timems / 1000);
  ms = Math.round(timems % 1000);
  
  h = Math.floor(s / 3600);
  s = s % 3600;
  m = Math.floor(s / 60);
  s = s & 60;
  if (h > 0) {
    retStr = h + ' h ';
  }
  if (m > 0) {
    retStr += m + ' m ';
  }
  if (s > 0) {
    retStr += s + ' s ';
  }
  if (printms && (ms > 0)) {
    retStr += ms + ' ms';
  }
  
  return retStr;
}

// ----------------------------------------------------------------------------
function printTrackInfo(gpx) {
  
  'use strict';
  document.getElementById('md_trackname').textContent = 'Nome della traccia: ' + 
    gpx.get_name();

  document.getElementById('md_totdistance').textContent = 'Distanza totale: ' +
    distanceToString(gpx.get_distance(), true);
  
  document.getElementById('md_starttime').textContent = 'Orario di inizio: ' + 
    gpx.get_start_time();
  document.getElementById('md_endtime').textContent = 'Orario di fine: ' + 
    gpx.get_end_time();
  document.getElementById('md_movingtime').textContent = 'Tempo in movimento: ' + 
    timemsToString(gpx.get_moving_time(), false);
  document.getElementById('md_totaltime').textContent = 'Tempo totale: ' + 
    timemsToString(gpx.get_total_time(), false);
  document.getElementById('md_movingpace').textContent = 'Ritmo medio in movimento: ' + 
    timemsToString(gpx.get_moving_pace(), false);
  document.getElementById('md_movingspeed').textContent = 'Velocità media in movimento: ' + 
    gpx.get_moving_speed().toFixed(2) + ' Km/h';
  document.getElementById('md_totalspeed').textContent = 'Velocità media: ' + 
    gpx.get_total_speed().toFixed(2) + ' Km/h';
  document.getElementById('md_elevmin').textContent = 'Elevazione minima: ' +
    distanceToString(gpx.get_elevation_min(), false) + ' s.l.m.';
  document.getElementById('md_elevmax').textContent = 'Elevazione massima: ' + 
    distanceToString(gpx.get_elevation_max(), false) + ' s.l.m.';
  document.getElementById('md_elevgain').textContent = 'Dislivello in salita: ' + 
    distanceToString(gpx.get_elevation_gain(), false);
  document.getElementById('md_elevloss').textContent = 'Dislivello in discesa: ' + 
    distanceToString(gpx.get_elevation_loss(), false);
}

// ----------------------------------------------------------------------------
function showTrack(map, track) {
  'use strict';
  var gpx = track;
  new L.GPX(gpx, {
    async: true,
    marker_options: {
      startIconUrl: 'imgs/pin-icon-start.png',
      endIconUrl: 'imgs/pin-icon-end.png',
      shadowUrl: 'imgs/pin-shadow.png'
    },
    polyline_options: {
      color: 'purple',
      opacity: 0.75,
      weight: 3,
      lineCap: 'round'
    }
  }).on('loaded', function (e) {
    var gpx = e.target;
    map.fitBounds(gpx.getBounds());

    printTrackInfo(gpx);
    
  }).addTo(map);
}

// ----------------------------------------------------------------------------
function showLayers(map, basemap, track) {
  'use strict';
  console.log('showLayers called!');
  showSelectedBaseMap(map, basemap);
  showTrack(map, track);
}

// ----------------------------------------------------------------------------
function redrawMap(map, mapform, ddown, trackfile) {
  'use strict';
  console.log('redrawMap called!');
  showLayers(map, getRadioVal(mapform, 'basemap'), trackfile);
}

//-----------------------------------------------------------------------------
function domap() {
  'use strict';
  var mymap, mapform, ddown, basemapRadios, i, len;
  mymap = new L.map('mapid');
  mymap.scrollWheelZoom.disable();

  mapform = document.getElementById('mapLayerChooserForm');
  ddown = document.getElementById('track-chooser-dropdown');

  // assign onclick function to radio button used
  // to select basemap
  //basemapRadios = mapform.elements['basemap'];
  basemapRadios = mapform.elements.basemap;

  for (i = 0, len = basemapRadios.length; i < len; i = i + 1) {
    basemapRadios[i].addEventListener("click", function () {
      console.log('radio clicked');
      redrawMap(mymap, mapform, ddown, trackfile);
    }, false);
  }

  redrawMap(mymap, mapform, ddown, trackfile);
}

