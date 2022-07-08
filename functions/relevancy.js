
module.exports = {
 getRelevancy: function(map, content){

    //Normalise data
    content = content.toLowerCase();

    for(var item =0; item < map.length; item++){
      
      if(content.includes(map[item].word))
        map[item].found = true;
    }

    var numFound = 0;

    map.forEach(item => {
      
      if(item.found)
        numFound += 1

    });

    var relevancy = ((numFound/map.length)*100).toFixed(0) + "%"

    return relevancy;
  }
};