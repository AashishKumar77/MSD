const cheerio = require('cheerio');

module.exports = {

    getTitle: function ($){
    //Do validation to check for multiple tags
    var title;

    //check for capitals 
    if($('title').text()){
      //only get the first title
      title = $('title').contents().first().text();
    }
    else{
      //only get the first title
      title = $('Title').contents().first().text();
    }

    //remove returns, newlines, and tabs
    title = title.replace(/[\r\n\t]/g,"");
    
    //text
    return title;
  },

   getTitleMap: function (text){
    
    //Normalise text
    text = text.toLowerCase();

    var titleMap = [];

    //clean title
    var titleClean = text.replace(/[^a-zA-Z0-9'\s]/g, " ");

    //split title
    var titleArray = titleClean.split(/\s+/g);

    //find word in copy
    titleArray.forEach(element => {
      if(element !== "" & element !== " "){
        titleMap.push({word:element, found:false})
      }
    });

    //map
    return titleMap;
  },

   getDescription: function($){

    //Do validation to check for multiple tags
    var description;
    
    if($('[name=description]').attr('content')){
      //only get the first element 
      description = $('[name=description]').first().attr('content');
    }
    else{
      //only get the first element
      description = $('[name=Description]').first().attr('content');
    }
    
    //text
    return description;
  },

   getDescriptionMap: function(text){

    //Normalise text
    text = text.toLowerCase();
    
    var descriptionMap = [];

    //clean title
    var descriptionClean = text.replace(/[^a-zA-Z0-9'\s]/g, " ");

    //split title
    var descriptionArray = descriptionClean.split(/\s+/g);

    //find word in copy
    descriptionArray.forEach(element => {
      if(element !== "" & element !== " "){
        descriptionMap.push({word:element, found:false})
      }
    });

    //map
    return descriptionMap;
  },

   getBody: function($){
      var body = $('body');

      var bodyContent = body.text();

      return bodyContent;
  }

};
