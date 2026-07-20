(function(){
  var el = document.getElementById('psbMap');
  if(!el || typeof L === 'undefined') return;
  // [name, lat, lng, url, type]  type: m = member/prep, s = senior/associate
  var S = [
    ["Aldro School",51.19,-0.65,"https://www.aldro.org/","m"],
    ["Amesbury",51.11,-0.74,"https://www.amesburyschool.co.uk/","m"],
    ["Ashford School",51.15,0.87,"https://www.ashfordschool.co.uk/","m"],
    ["Banstead",51.32,-0.2,"https://www.bansteadprep.com/","m"],
    ["The Beacon",51.68,-0.62,"https://www.beaconschool.co.uk/","m"],
    ["Bishopsgate",51.43,-0.57,"https://www.bishopsgateschool.com/","m"],
    ["Castle Court",50.78,-2.02,"https://www.castlecourt.com/","m"],
    ["Coworth Flexlands",51.36,-0.6,"https://www.coworthflexlands.co.uk/","m"],
    ["Downe House",51.44,-1.28,"https://www.downehouse.net/","s"],
    ["Edgeborough",51.16,-0.79,"https://www.edgeborough.co.uk/","m"],
    ["Embley School",50.99,-1.52,"https://embley.org.uk/prep-school","m"],
    ["Eton College",51.49,-0.61,"https://www.etoncollege.com/","s"],
    ["Feltonfleet",51.33,-0.41,"https://www.feltonfleet.co.uk/","m"],
    ["Finton House",51.44,-0.16,"https://www.fintonhouse.org.uk/","m"],
    ["The Gregg Prep",50.93,-1.36,"https://www.thegreggprep.org/","m"],
    ["Haileybury Malta",35.93,14.48,"https://www.haileybury.com/","m"],
    ["King's House, Richmond",51.46,-0.3,"https://kingshouseschool.org/","m"],
    ["Millfield Prep",51.15,-2.71,"https://www.millfieldschool.com/prep-7-13","m"],
    ["New College School",51.75,-1.25,"https://www.newcollegeschool.org/","m"],
    ["The Oratory",51.53,-1.1,"https://www.oratory.co.uk/","s"],
    ["The Prebendal School",50.84,-0.78,"https://www.prebendalschool.org.uk/","m"],
    ["Somerhill",51.19,0.29,"https://www.somerhill.org/","m"],
    ["St Andrew's",51.48,-1.09,"https://www.standrewsberkshire.co.uk/","m"],
    ["St Columba's",51.75,-0.34,"https://stcolumbascollege.org/","m"],
    ["St Edmund's",51.11,-0.74,"https://www.saintedmunds.co.uk/","m"],
    ["St George's, Windsor",51.48,-0.6,"https://www.stgwindsor.org/","m"],
    ["St Ives, Haslemere",51.09,-0.71,"https://www.stiveshaslemere.com/","m"],
    ["St Neot's",51.34,-0.87,"https://www.stneotsprep.co.uk/","m"],
    ["Strathallan",56.33,-3.52,"https://www.strathallan.co.uk/","m"],
    ["Town Close Prep",52.62,1.29,"https://www.townclose.com/","m"],
    ["Tranby School",53.72,-0.44,"https://www.tranby.org.uk/prep-school","m"],
    ["Twickenham Prep",51.42,-0.36,"https://twickenhamprep.org.uk/","m"],
    ["Twyford School",51.03,-1.3,"https://www.twyfordschool.com/","m"],
    ["Walhampton",50.76,-1.52,"https://www.walhampton.com/","m"],
    ["West Hill Park",50.85,-1.24,"https://www.westhillpark.com/","m"]
  ];
  var map = L.map('psbMap', {scrollWheelZoom:false});
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:18, attribution:'&copy; OpenStreetMap'}).addTo(map);
  var pts = [];
  S.forEach(function(d){
    var senior = d[4] === 's';
    var label = senior ? 'Senior / associate' : 'Member (prep) school';
    if (d[0].indexOf('Haileybury') !== -1) label = 'Prep &amp; SDF school';
    var m = L.circleMarker([d[1], d[2]], {radius: senior?8:7, color:'#fff', weight:2, fillColor: senior?'#E9B93A':'#2E7FBB', fillOpacity:1}).addTo(map);
    m.bindPopup('<div class="map-pop"><b>'+d[0]+'</b><span class="r">'+label+'</span><br><a href="'+d[3]+'" target="_blank" rel="noopener">Visit website ↗</a></div>');
    m.on('mouseover', function(){ this.openPopup(); });
    pts.push([d[1], d[2]]);
  });
  map.fitBounds(pts, {padding:[40,40]});
})();
