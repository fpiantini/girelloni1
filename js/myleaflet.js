// ------------------------------------------------------
var L, document, window;
// ------------------------------------------------------

var my_Leaflet = (function () {
  'use strict';

  var treks,
    getQueryVariable,
    getTrackIdFromURL,
    updatePageWithTrackInfo,
    getRadioVal,
    clearLayers,
    forYouMapsLayer,
    openTopoMapLayer,
    thunderForestLandscapeLayer,
    mapBoxLayer,
    showSelectedBaseMap,
    distanceToString,
    timemsToString,
    printTrackInfo,
    showTrack,
    showLayers,
    redrawMap;

  // Available tracks:
  treks =
  [
      {
        "title": "Costeggiando l'Elsa",
        "description": "Colle Val d'Elsa: Costeggiando l'Elsa da Ponte di Spugna a Gracciano",
        "trackfile": "tracks/20181021_Elsa_da_Ponte_di_Spugna_a_Gracciano.gpx",
        "nation": "Italia",
        "region": "Toscana",
        "area": "Chianti"
      },
      {
        "title": "Alpe Tre Potenze",
        "description": "Da Le Regine all'Abetone passando per la valle del Sestaione, il lago nero, l'Alpe Tre Potenze, Monte Gomito e il Selletta",
        "trackfile": "tracks/20180909_LeRegine_LagoNero_AlpeTrePotenze_Abetone.gpx",
        "nation": "Italia",
        "region": "Toscana",
        "area": "Abetone"
      },
      {
        "title": "Periplo di Monte Morello",
        "description": "Da Sesto Fiorentino a Legri passando per le tre punte di Monte Morello",
        "trackfile": "tracks/20180603_periplo_monte_morello.gpx",
        "nation": "Italia",
        "region": "Toscana",
        "area": "Monte Morello"
      },
      {
        "title": "Monte Morello, sgambata sopra Colonnata",
        "description": "Sesto Fiorentino - Monte Morello, sgambata sopra Colonnata toccando il Viottolone Ginori, passando per il Cipressaio, la Fonte Giallina (con il Presepe), la Torre di Carmignanello e le Cave",
        "trackfile": "tracks/20181020_morello_basso_lato_colonnata.gpx",
        "nation": "Italia",
        "region": "Toscana",
        "area": "Monte Morello"
      },
      {
        "title": "Monte Morello, Sgambata sopra le Cappelle",
        "description": "Sesto Fiorentino - Monte Morello, semplice itinerario sopra le Cappelle avvicinandosi a Poggio Bati",
        "trackfile": "tracks/20181007_SgambataMonteMorelloVicinoCasa.gpx",
        "nation": "Italia",
        "region": "Toscana",
        "area": "Monte Morello"
      },
      {
        "title": "Cinque escursioni sul Gran Paradiso",
        "description": "Valle d'Aosta, Gran Paradiso - Da Valnontey a Ceresole Reale (5 giorni)",
        "trackfile": "tracks/201808_GranParadiso.gpx",
        "nation": "Italia",
        "region": "Val d'Aosta",
        "area": "Gran Paradiso"
      },
      {
        "title": "Valnontey - Rifugio Sella",
        "description": "Valle d'Aosta, Gran Paradiso - Da Valnontey al Rifugio Sella passando per i capanni dell'Herbetet",
        "trackfile": "tracks/20180820_Valnontey_CapanniHerbetet_RifSella.gpx",
        "nation": "Italia",
        "region": "Val d'Aosta",
        "area": "Valnontey"
      },
      {
        "title": "Il Col Loson",
        "description": "Valle d'Aosta, Gran Paradiso - Dal Rifugio Sella alla Valsavarenche superando il Col Lauson",
        "trackfile": "tracks/20180821_RifSella_ColLauson_Valsavarenche.gpx",
        "nation": "Italia",
        "region": "Val d'Aosta",
        "area": "Valsavarenche"
      },
      {
        "title": "Da Pont al Rifugio Savoia",
        "description": "Valle d'Aosta, Gran Paradiso - da Pont (Valsavarenche) al Rifugio Savoia (Colli del Nivolet)",
        "trackfile": "tracks/20180822_Pont_RifSavoia.gpx",
        "nation": "Italia",
        "region": "Val d'Aosta",
        "area": "Valsavarenche"
      },
      {
        "title": "Il Col Leynir",
        "description": "Gran Paradiso, tra la Val d'Aosta e il Piemonte - Giro sopra il Rifugio Savoia: laghi e Col Leynir",
        "trackfile": "tracks/20180823_RifSavoia_Laghi_ColLeynir.gpx",
        "nation": "Italia",
        "region": "Val d'Aosta",
        "area": "Nivolet"
      },
      {
        "title": "Dal Rifugio Savoia a Ceresole Reale",
        "description": "Gran Paradiso, Piemonte - Dal Rifugio Savoia a Ceresole Reale passando per il Colle della Terra e il lago Lillet",
        "trackfile": "tracks/20180824_RifSavoia_ColleDellaTerra_RifMila.gpx",
        "nation": "Italia",
        "region": "Piemonte",
        "area": "Nivolet"
      },
      {
        "title": "Escursione nel Landmannalaugar",
        "description": "Escursione dal campo base del Landmannalaugar con salita al Blahnukur",
        "trackfile": "tracks/20180701_Landmannalaugar_Blahnukur.gpx",
        "nation": "Islanda",
        "region": "Landmannalaugar",
        "area": "Landmannalaugar"
      },
      {
        "title": "Escursione nella regione del Thorsmork",
        "description": "Breve passeggiata nel Thorsmork partendo da Basar",
        "trackfile": "tracks/20180702_Thorsmork.gpx",
        "nation": "Islanda",
        "region": "Thorsmork",
        "area": "Thorsmork"
      },
      {
        "title": "Passeggiata sopra Skogafoss",
        "description": "Islanda - Passeggiata sopra Skogafoss nella parte iniziale del trekking Skógar-Þórsmörk",
        "trackfile": "tracks/20180703_Skogafoss.gpx",
        "nation": "Islanda",
        "region": "South Islanda",
        "area": "Skogafoss"
      },
      {
        "title": "Relitto aereo vicino Vik",
        "description": "Il relitto aereo presso la spiaggia di Vik",
        "trackfile": "tracks/20180703_VikRelittoAereo.gpx",
        "nation": "Islanda",
        "region": "South Islanda",
        "area": "Vik"
      },
      {
        "title": "Passeggiata nello Skaftafell",
        "description": "Skaftafell, anello verso il Kristinatindar",
        "trackfile": "tracks/20180705_SkaftafellAnelloStKristine.gpx",
        "nation": "Islanda",
        "region": "South Islanda",
        "area": "Skaftafell"
      },
      {
        "title": "Le cascate di Hengifoss",
        "description": "Le cascate di Hengifoss",
        "trackfile": "tracks/20180707_CascataHengifoss.gpx",
        "nation": "Islanda",
        "region": "East Islanda",
        "area": "Hallormsstadhur"
      },
      {
        "title": "I canyon di Asbyrgi",
        "description": "Asbyrgi, lo zoccolo del cavallo di Odino visto dall'alto",
        "trackfile": "tracks/20180709_Asbyrgi.gpx",
        "nation": "Islanda",
        "region": "North East Islanda",
        "area": "Asbyrgi"
      },
      {
        "title": "Escursione nel Vesturdalur",
        "description": "Vesturdalur: salita al Raudholar e ritorno",
        "trackfile": "tracks/20180709_Vesturdalur_Raudholar.gpx",
        "nation": "Islanda",
        "region": "North East Islanda",
        "area": "Vesturdalur"
      },
      {
        "title": "800 gradini e Calvana sud",
        "description": "Sulla Calvana sopra Prato. 800 gradini più una facile escursione con vista sulla piana, Prato e Firenze",
        "trackfile": "tracks/20190101_800gradini_calvana.gpx",
        "nation": "Italia",
        "region": "Toscana",
        "area": "Calvana"
      },
      {
        "title": "Monte Morello, Circuito ad anello tra il Gualdo e le tre punte",
        "description": "Escursione sul Morello con salita sulla prima punta e discesa dal Rompistinchi",
        "trackfile": "tracks/20190103_Gualdo_cornacchiaccia.gpx",
        "nation": "Italia",
        "region": "Toscana",
        "area": "Monte Morello"
      },
      {
        "title": "Monte Gennaro e Volmiano",
        "description": "Anello sopra Legri: monte Gennaro e Volmiano",
        "trackfile": "tracks/20190106_Legri_MonteGennaro_Volmiano.gpx",
        "nation": "Italia",
        "region": "Toscana",
        "area": "Monte Morello"
      },
      {
        "title": "Escursione sulla Calvana",
        "description": "Un'escursione sul lato ovest della Calvana",
        "trackfile": "tracks/20190120_Calvana.gpx",
        "nation": "Italia",
        "region": "Toscana",
        "area": "Monte Morello"
      },
      {
        "title": "Nei dintorni di Radda in Chianti",
        "description": "Un'escursione nel Chianti nei dintorni di Radda in Chianti",
        "trackfile": "tracks/20190224_Chianti_vicino_radda.gpx",
        "nation": "Italia",
        "region": "Toscana",
        "area": "Chianti"
      },
      {
        "title": "Artimino",
        "description": "Un'escursione nei dintorni di Artimino",
        "trackfile": "tracks/20190303_Artimino.gpx",
        "nation": "Italia",
        "region": "Toscana",
        "area": "Prato"
      },
      {
        "title": "Putizze di Sasso Pisano",
        "description": "Un'escursione nell'area geotermica di Sasso Pisano e Monterotondo Marittimo",
        "trackfile": "tracks/20190310_PutizzeDiSassoPisano.gpx",
        "nation": "Italia",
        "region": "Toscana",
        "area": "Colline metallifere"
      },
      {
        "title": "Escursione su Monte Morello basso",
        "description": "Una sgambata sulla parte bassa di Monte Morello con partenza e ritorno a Sesto Fiorentino",
        "trackfile": "tracks/20190315_Morello.gpx",
        "nation": "Italia",
        "region": "Toscana",
        "area": "Monte Morello"
      },
      {
        "title": "Isola d'Elba: da Zanca a Pomonte",
        "description": "Impegnativa passeggiata all'isola d'Elba: da Zanca a Pomonte passando per Marciana e Monte Capanne",
        "trackfile": "tracks/20170903_Zanca_Marciana_MonteCapanne_Pomonte.gpx",
        "nation": "Italia",
        "region": "Toscana",
        "area": "Isola d'Elba"
      },
      {
        "title": "Sul monte Falterona",
        "description": "Escursione sul monte Falterona dalla fonte del Borbotto, con passaggio sul monte Falco, lago degli Idoli e Capo d'Arno",
        "trackfile": "tracks/20190324_Falterona.gpx",
        "nation": "Italia",
        "region": "Toscana",
        "area": "Parco Foreste Casentinesi, monte Falterona e Campigna"
      },
    ];

  // --------------------------------------------------------------------------
  getQueryVariable = function (variable) {
    var query, vars, i, pair;

    query = window.location.search.substring(1);
    vars = query.split("&");

    for (i = 0; i < vars.length; i += 1) {
      pair = vars[i].split("=");
      if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
  };

  // --------------------------------------------------------------------------
  getTrackIdFromURL = function () {
    var id, tid;

    tid = 0;

    // extract the id from URL
    id = getQueryVariable('id');
    if (id !== false) {
      tid = parseInt(id, 10);
    }
    if (tid <= 0 || tid > treks.length) {
      tid = 1;
    }

    return tid;
  };

  // --------------------------------------------------------------------------
  updatePageWithTrackInfo = function (tid) {

    document.getElementById('header').innerHTML =
      '<h1><a href="../index.html">Girelloni.net /</a> ' +
      treks[tid - 1].title + '</h1>';

    document.getElementById('description').textContent =
      treks[tid - 1].description;
  };

  // --------------------------------------------------------------------------
  getRadioVal = function (form, name) {
    var radios, val, i, len;

    radios = form.elements[name];

    for (i = 0, len = radios.length; i < len; i = i + 1) {
      if (radios[i].checked === true) {
        val = radios[i].value;
        break;
      }
    }
    return val;
  };

  // -------------------------------------------------------------------------
  clearLayers = function (map) {
    map.eachLayer(function (layer) {
      map.removeLayer(layer);
    });
  };

  // -------------------------------------------------------------------------
  forYouMapsLayer = function (L) {
    return L.tileLayer('https://tileserver.4umaps.com/{z}/{x}/{y}.png',
      {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a   href="https://www.4umaps.com/">4UMaps</a>'
      });
  };

  // -------------------------------------------------------------------------
  openTopoMapLayer = function (L) {
    return L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      });
  };

  // -------------------------------------------------------------------------
  thunderForestLandscapeLayer = function (L) {
    return L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}',  {
      attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      apikey: 'e9fb11ac45734d7f9475e22de47d93e7',
      maxZoom: 22
    });
  };

  // -------------------------------------------------------------------------
  mapBoxLayer = function (L) {

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
      });
  };

  // -------------------------------------------------------------------------
  showSelectedBaseMap = function (L, map, basemap) {
    clearLayers(map);

    switch (basemap) {
    case 'fum':
      // 4Umaps
      map.addLayer(forYouMapsLayer(L));
      break;
    case 'otm':
      // Open topo map
      map.addLayer(openTopoMapLayer(L));
      break;
    case 'tf':
        // Thunderforest landscape
      map.addLayer(thunderForestLandscapeLayer(L));
      break;
    case 'mb':
      // Mapbox
      map.addLayer(mapBoxLayer(L));
      break;
    default:
      // impossible... Uses Mapbox
      map.addLayer(mapBoxLayer(L));
      break;
    }
  };

  // -------------------------------------------------------------------------
  distanceToString = function (dist, useKm) {
    var retStr, n_km, n_m;

    // distance is in meters
    if (useKm) {
      n_km = Math.floor(dist / 1000);
      n_m = Math.round(dist % 1000);
      if (n_km > 0) {
        retStr = n_km + ' Km ' + n_m + 'm';
      } else {
        retStr = n_m + ' m';
      }
    } else {
      retStr = Math.round(dist) + ' m';
    }
    return retStr;
  };

  // -------------------------------------------------------------------------
  timemsToString = function (timems, printms) {

    var h, m, s, ms, retStr = '';

    s = Math.floor(timems / 1000);
    ms = Math.round(timems % 1000);

    h = Math.floor(s / 3600);
    s = s % 3600;
    m = Math.floor(s / 60);
    s = s % 60;
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
  };

  // -------------------------------------------------------------------------
  printTrackInfo = function (gpx) {

    /* document.getElementById('md_trackname').textContent =
      'Nome della traccia: ' + gpx.get_name(); */

    document.getElementById('md_totdistance').textContent =
      'Distanza totale: ' + distanceToString(gpx.get_distance(), true);

    document.getElementById('md_starttime').textContent =
      'Orario di inizio: ' + gpx.get_start_time();
    document.getElementById('md_endtime').textContent =
      'Orario di fine: ' + gpx.get_end_time();
    document.getElementById('md_movingtime').textContent =
      'Tempo in movimento: ' + timemsToString(gpx.get_moving_time(), false);
    document.getElementById('md_totaltime').textContent =
      'Tempo totale: ' + timemsToString(gpx.get_total_time(), false);
    document.getElementById('md_movingpace').textContent =
      'Ritmo medio in movimento: ' +
      timemsToString(gpx.get_moving_pace(), false);
    document.getElementById('md_movingspeed').textContent =
      'Velocità media in movimento: ' +
      gpx.get_moving_speed().toFixed(2) + ' Km/h';
    document.getElementById('md_totalspeed').textContent =
      'Velocità media: ' + gpx.get_total_speed().toFixed(2) + ' Km/h';
    document.getElementById('md_elevmin').textContent =
      'Elevazione minima: ' +
      distanceToString(gpx.get_elevation_min(), false) + ' s.l.m.';
    document.getElementById('md_elevmax').textContent =
      'Elevazione massima: ' +
      distanceToString(gpx.get_elevation_max(), false) + ' s.l.m.';
    document.getElementById('md_elevgain').textContent =
      'Dislivello in salita: ' +
      distanceToString(gpx.get_elevation_gain(), false);
    document.getElementById('md_elevloss').textContent =
      'Dislivello in discesa: ' +
      distanceToString(gpx.get_elevation_loss(), false);
  };

  // -------------------------------------------------------------------------
  showTrack = function (L, map, track) {
    var gpx = track;
    new L.GPX(gpx, {
      async: true,
      marker_options: {
        startIconUrl: 'imgs/pin-icon-start.png',
        endIconUrl: 'imgs/pin-icon-end.png',
        shadowUrl: 'imgs/pin-shadow.png'
      },
      polyline_options: {
        color: 'darkred',
        opacity: 0.75,
        weight: 3,
        lineCap: 'round'
      }
    }).on('loaded', function (e) {
      var gpx = e.target;
      map.fitBounds(gpx.getBounds());

      printTrackInfo(gpx);

    }).addTo(map);
  };

  // -------------------------------------------------------------------------
  showLayers = function (L, map, basemap, track) {
    showSelectedBaseMap(L, map, basemap);
    showTrack(L, map, track);
  };

  // -------------------------------------------------------------------------
  redrawMap = function (L, map, mapform, tfile) {
    showLayers(L, map, getRadioVal(mapform, 'basemap'), tfile);
  };

  //--------------------------------------------------------------------------
  // PUBLIC INTERFACE
  return {
    renderTreksByRegion: function (nation, region, domElem)  {

      let divClass = 'divlight';
      treks.forEach((trek, ndx) => {

        if (trek.nation === nation && trek.region === region) {
          const htmlToAdd = `
            <div class="${divClass}">
              <p class="inevidence">
                <a href="./treks/trek.html?id=${ndx+1}">${trek.title}</a>
              </p>
            </div>`;
            domElem.insertAdjacentHTML('beforeend', htmlToAdd);
            if (divClass === 'divlight') {
              divClass = 'divdark';
            } else {
              divClass = 'divlight';
            }
        }
      });
    },

    renderTreksByNationAndNotInRegion: function (nation, region, domElem) {

      let divClass = 'divlight';
      treks.forEach((trek, ndx) => {

        if (trek.nation === nation && trek.region !== region) {
          const htmlToAdd = `
            <div class="${divClass}">
              <p class="inevidence">
                <a href="./treks/trek.html?id=${ndx+1}">${trek.region} - ${trek.title}</a>
              </p>
            </div>`;
            domElem.insertAdjacentHTML('beforeend', htmlToAdd);
            if (divClass === 'divlight') {
              divClass = 'divdark';
            } else {
              divClass = 'divlight';
            }
        }
      });
    },

    renderTreksByNotInNation: function (nation, domElem) {

      let divClass = 'divlight';
      treks.forEach((trek, ndx) => {

        if (trek.nation !== nation) {
          const htmlToAdd = `
            <div class="${divClass}">
              <p class="inevidence">
                <a href="./treks/trek.html?id=${ndx+1}">${trek.nation} - ${trek.title}</a>
              </p>
            </div>`;
            domElem.insertAdjacentHTML('beforeend', htmlToAdd);
            if (divClass === 'divlight') {
              divClass = 'divdark';
            } else {
              divClass = 'divlight';
            }
        }
      });
    },

    domap: function (L) {
      var mymap, mapform, tid, tfile;

      tid = getTrackIdFromURL();
      tfile = treks[tid - 1].trackfile;

      updatePageWithTrackInfo(tid);

      mymap = new L.map('mapid');
      mymap.scrollWheelZoom.disable();

      mapform = document.getElementById('mapLayerChooserForm');

      // assign onclick function to radio button used
      // to select basemap
      //basemapRadios = mapform.elements['basemap'];
      //basemapRadios = mapform.elements.basemap;

      document.getElementById('layer-chooser-radios').
        addEventListener('click', function (event) {
          if (event.target.type === 'radio') {
            redrawMap(L, mymap, mapform, tfile);
          }
        }, false);

      redrawMap(L, mymap, mapform, tfile);
    }
  };

}());

if (document.getElementById('mapbox')) {
  my_Leaflet.domap(L);
} else if (document.getElementById('toscana_treks')) {
  my_Leaflet.renderTreksByRegion('Italia', 'Toscana', document.getElementById('toscana_treks'));
  const footer = `
    <div class="footer" id="footer">
      <p>Una creazione del team Girelloni.net (info at girelloni dot net)</p>
    </div>`;
  document.getElementById('toscana_treks').insertAdjacentHTML('beforeend', footer);
} else if (document.getElementById('italia_treks')) {
  my_Leaflet.renderTreksByNationAndNotInRegion('Italia', 'Toscana', document.getElementById('italia_treks'));
  const footer = `
    <div class="footer" id="footer">
      <p>Una creazione del team Girelloni.net (info at girelloni dot net)</p>
    </div>`;
  document.getElementById('italia_treks').insertAdjacentHTML('beforeend', footer);
} else  if (document.getElementById('world_treks')) {
  my_Leaflet.renderTreksByNotInNation('Italia', document.getElementById('world_treks'));
  const footer = `
    <div class="footer" id="footer">
      <p>Una creazione del team Girelloni.net (info at girelloni dot net)</p>
    </div>`;
  document.getElementById('world_treks').insertAdjacentHTML('beforeend', footer);
}

