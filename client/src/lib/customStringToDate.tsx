function customStringToDate(dateString: string) {
   const dateArray = dateString.split('/')
   let dateData: Array<number> = [];
   for(let i = 0; i< dateArray.length; i++){
      dateData.push(parseInt(dateArray[i]))
   }

   return new Date(dateData[2], dateData[1] - 1, dateData[0]);
}

export default customStringToDate;