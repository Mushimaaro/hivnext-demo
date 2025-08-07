import * as XLSX from 'xlsx'
import customStringToDate from '../lib/customStringToDate';

export const excelReader = (uploadedFile: File) => {

   const reader = new FileReader();
   reader.onload = (e: ProgressEvent<FileReader>) => {
      if(e.target && e.target.result){
         const arrayBuffer = e.target.result as ArrayBuffer;
         const workbook = XLSX.read(arrayBuffer, { type: 'array', cellText: false, cellDates: true});
         const sheetName = workbook.SheetNames[0];
         const worksheet = workbook.Sheets[sheetName];
         const jsonData = XLSX.utils.sheet_to_json(worksheet, {raw: false, dateNF:'dd/mm/yyyy'})
         
         let tempData:any = [];
         jsonData.forEach((row: any, index: number) => { 
            let data: any = {}
            for (const key in row) {
               if (Object.prototype.hasOwnProperty.call(row, key)) {
                  if (key !== 'NAME' && key !== 'MYSJ_ID' && key !== 'AGE' && key !== 'DATE_OF_BIRTH' && key !== 'GENDER' && key !== 'ADDRESS' && key !== 'TYPE_OF_IC_PASSPORT_NO'){
                     const uppercaseKey = key.toUpperCase()
                     
                     if(key === "SPECIAL_CAT_POP" || key === "COMOROBIDITY"){
                        if(row[key].toUpperCase() === "NA")
                           data[uppercaseKey] = false;
                     }else if(key === "COMMUNITY_SERVICE_KDK_IF_PWUD" || key === "RISK_BEHAVIOUR" || key === "COMMODITIES" || key === "HIV_SCREENING" || key === "CONFIRMATORY_TEST" || key === "REFERRAL_FOR_PREP" || key === "SYP_SCREENING" || key === "SYP_CONFIRMATORY_TEST" || key === "HEP_C_SCREENING" || key === "HEP_C_CONFIRMATORY_TEST"){
                        if(row[key].toUpperCase() === "YES")
                           data[uppercaseKey] = true;
                        if(row[key].toUpperCase() === "NO")
                           data[uppercaseKey] = false;
                     }else if(key === "RISK_BEHAVIOUR_OPTION" || key === "OPTIONS_FOR_CONFIRMATORY_TEST"){
                        data[uppercaseKey] = row[key].split(',');
                     }else if(key === "CONDOM" || key === "LUBS" || key === "NEEDLE_GIVEN" || key === "NEEDLE_COLLECTED" || key === "SYRINGE_GIVEN" || key === "SYRINGE_GIVEN"){
                        data[uppercaseKey] = parseInt(row[key]);
                     }else if(key === "SCREENING_DATE"){
                        data[uppercaseKey] = customStringToDate(String(row[key]))
                     }else{
                        data[uppercaseKey] = row[key]
                     }
                  }
               }
            }
            tempData.push(data)
         });
         console.log(tempData);


      }
   }
   reader.readAsArrayBuffer(uploadedFile)
}