var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
//const cheerio = require('cheerio');

module.exports = {
    get : function (url)
        {
            var xhr = new XMLHttpRequest();
            var err
            var response;
            xhr.onreadystatechange = function() 
            {
                //BUG : acceptiable status codes, else filter out
                if (xhr.readyState == 4 && xhr.status == 200 ) 
                {
                    response = xhr.responseText;
                }
                else if (xhr.readyState == 4 && xhr.status == 301)
                {
                    err = `Error - Request return status: ${xhr.status}, ${url}`;
                }
                else if (xhr.readyState == 4)
                {
                    err = `An error occured: ${xhr.status}, ${url}`;
                }
            }
          
            xhr.open("GET", url, false);

            xhr.send();

            var obj;

            if(err){
                obj = { "error" : err, "url" : url }
                return obj;
            }
            else{
                obj = { "responseContent" : response }
                return obj;
            }
        }
};