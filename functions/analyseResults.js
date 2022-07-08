
const cheerio = require('cheerio');
var extractContent = require('./extractContent');
var relevancy = require('./relevancy')

module.exports = {

 analyse: function(content){

    //make sure content exists
    if(content)
    {
        $ = cheerio.load(content, { normalizeWhitespace: false});

        var obj = {};

        //Check to make sure title exist 
        var title = extractContent.getTitle($);
        if(title){
          var titleLen = title.length;
          var titleMap = extractContent.getTitleMap(title);

          obj.title = title;
          obj.titleLen = titleLen;
          
        }
        else{
          obj.titleError = "## Title does not exist ##";
        }
        
        //Check to make sure description exist 
        var description = extractContent.getDescription($);
        if(description){
          var descriptionLen = description.length;
          var descriptionMap = extractContent.getDescriptionMap(description);
          obj.description = description;
          obj.descriptionLen = descriptionLen;
        }else{
          obj.descriptionError = "## Description does not exist ##";
        }
        
        //Only get relevancy if title or description exists
        if(title && description)
        {
          var body = extractContent.getBody($);
  
          var titleRelevancy = relevancy.getRelevancy(titleMap, body);
  
          var descriptionRelevancy = relevancy.getRelevancy(descriptionMap, body);
          
          obj.titleMap = titleMap;
          obj.titleRelevancy = titleRelevancy;
          obj.descriptionMap = descriptionMap;
          obj.descriptionRelevancy = descriptionRelevancy;
        }
        else if (title){
          var body = extractContent.getBody($);
          var titleRelevancy = relevancy.getRelevancy(titleMap, body);
          obj.titleMap = titleMap;
          obj.titleRelevancy = titleRelevancy;
        }
        else if (description){
          var body = extractContent.getBody($);
  
          var descriptionRelevancy = relevancy.getRelevancy(descriptionMap, body);
          obj.descriptionMap = descriptionMap;
          obj.descriptionRelevancy = descriptionRelevancy;
        }
        
        return obj
    }
    else{

      var obj= {
        "error": ` Error - Request return no content : ${content}`
      }
      
      return obj
    }
  }
};