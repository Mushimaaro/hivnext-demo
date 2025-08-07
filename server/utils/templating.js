function modifyTemplate (templateString, data) {
   return templateString.replace(/{(\w*)}/g, function(m,key){
      return data.hasOwnProperty(key) ? data[key] : "";
   })
}

export default modifyTemplate;