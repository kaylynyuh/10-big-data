(function(module) {
  var zip = {};
  neighborhoodTotals = {};
  zip.topFive = [];

  getData = function() {
    function justTheGoodProps(obj) {
      return {
        //obj literal//
        zipCode: obj.properites.zip,
        neighborhood: !!obj.properties.neighborhood ? obj.properties.neighborhood.split(', ')[0] : null, //do we have an address? if not set the value to null//
        address: !!obj.properties.address ? obj.properties.address : null,
        coordinates: { //new obj in coordinates property (which is in an array in JSON file)//
          //below we are simply specifying that lng is to be the first coordinate//
          lat: obj.geometry.coordinates[1],
          lng: obj.geometry.coordinates[0]
        }
      };
    }//now that we have our data...//
    $.getJSON('/data/manhattan.json', function(data) {
      data.features.map(justTheGoodProps)
      .forEach(buildZipsDictionary);
    });
  };

  function buildZipsDictionary (zipObj) {
    curNeighborhood = zipObj.neighborhood;
    neighborhoodTotals[curNeighborhood] ?
      neighborhoodTotals[curNeighborhood] ++ :
      neighborhoodTotals[curNeighborhood] = 1;
  }

  function generateTopFive (obj) {
    for (neighborhood in obj) {
      zip.topFive.push ({//passing in an obj literal//
        neighborhood: neighborhood,
        totalZips: obj[neighborhood]
      });
    }
  }

  getData();
  module.zip = zip;
})(window);
