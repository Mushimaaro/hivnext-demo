import "../styles/uploadPage.css"
import { useEffect, useState } from "react"
import * as XLSX from 'xlsx'
import DropzoneExcel from "../components/Dropzone"
import ProgressBar from "../components/ProgressBar"
import { RiCloseLine } from "react-icons/ri";
import formatBytes from "../lib/FormatBytes";
import customStringToDate from "../lib/customStringToDate";
import type { ClientModel } from "../models/ClientModel"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { toast } from "sonner"

interface DuplicateICTypes {
  ic_passport: string;
  row: Array<number>;
}

function UploadPage() {
   const [uploadFile, setUploadedFile] = useState<File|null>(null)
   const [progress, setProgress] = useState(0);
   const [trigger, setTrigger] =useState(false)
   const privateAxios = useAxiosPrivate();

   useEffect(()=>{

      return () => setTrigger(false)
   },[progress, trigger])

   const handleAcceptedFile = (file:File) => {
      setUploadedFile(null)
      const info = document.querySelector('.uploaded-file-details .bar')
      if(uploadFile){
         setUploadedFile(file)
         info?.classList.remove('show')
         fadeOutInfo()
         setTimeout(()=>{
            fadeInInfo()
         },300)
      }else{
         setUploadedFile(file)
         info?.classList.remove('show')
         fadeInInfo()
      }
   }

   const fadeInInfo = () => {
      const info = document.querySelector('.uploaded-file-details')
      info?.classList.add('open')
   }

   const fadeOutInfo = () => {
      const info = document.querySelector('.uploaded-file-details')
      info?.classList.remove('open')
   }

   const closeInfo = () => {
      fadeOutInfo()
      setProgress(0)
      setUploadedFile(null)
      const info = document.querySelector('.uploaded-file-details .bar')
      info?.classList.remove('show')
   }

   const processExcelData = () => {
      if(uploadFile === null) return;
      setProgress(0)

      const info = document.querySelector('.uploaded-file-details .bar')
      info?.classList.add('show')

      const read = excelReader()
      if (!read){
         setProgress(0)
         setTrigger(true)
      }

      

   }

   function formatTo12DigitIC(number:number) {
      let numString = String(number);
      const zerosNeeded = 12 - numString.length;

      if (zerosNeeded > 0) {
         numString = '0'.repeat(zerosNeeded) + numString;
      }

      return numString;
   }

   const excelReader = () => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
         try {
            if(e.target && e.target.result){
               const arrayBuffer = e.target.result as ArrayBuffer;
               const workbook = XLSX.read(arrayBuffer, { type: 'array', cellText: false, cellDates: true, });
               const sheetName = workbook.SheetNames[0];
               const worksheet = workbook.Sheets[sheetName];
               const jsonData = XLSX.utils.sheet_to_json(worksheet, {raw: false, dateNF:'dd/mm/yyyy', rawNumbers: true})
               
               //store ic/passport temporarily
               let icTempStorage: Array<string> = []
               jsonData.forEach((row: any) => {
                  for (const key in row){
                     if(key === "IC_PASSPORT_NO"){
                        icTempStorage.push(formatTo12DigitIC(row[key]))
                     }
                  }
               })

               //checking for duplicate ic/passport and save its location
               let foundDuplicates: Array<DuplicateICTypes> = [];
               for(let i = 0; i< icTempStorage.length; i++){
                  let temp: DuplicateICTypes = {ic_passport: "", row: []}
                  const sliceIC = icTempStorage.slice(i+1,icTempStorage.length)
                  if(sliceIC.includes(icTempStorage[i])){
                     temp.ic_passport = icTempStorage[i];
                     for(let j = 0, k = i+1; j< sliceIC.length; j++, k++){
                        if(sliceIC[j] === icTempStorage[i]){
                           temp.row.push(k+2)
                        }
                     }
                  }
                  if(temp.ic_passport !== "")
                     foundDuplicates.push(temp)
               }

               if(foundDuplicates.length>0)
                  throw new Error(`Found duplicate IC/passport at these location: ${JSON.stringify(foundDuplicates)}`)
               
               setProgress(10);

               // store excel data to its proper value
               let tempData:any = [];
               let tempprogress = 0;
               jsonData.forEach((row: any, index: number) => { 
                  let data: any = {}
                  for (const key in row) {
                     if(key === "IC_PASSPORT_NO" || key === "OUTREACH_MODE" || key === "KEY_POPULATION" || key === "VOLUNTEER_EMAIL"){
                        if(row[key] === ""){
                           throw new Error(`Field '${key}' at index ${index+1} cannot be empty.`)
                        }
                     }
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
                           }else if(key === "IC_PASSPORT_NO"){
                              data[uppercaseKey] = formatTo12DigitIC(row[key])
                           }else{
                              data[uppercaseKey] = row[key]
                           }
                        }
                     }
                  }
                  tempData.push(data);
                  tempprogress = tempprogress + 1;
                  const prog = Math.ceil(40 * (tempprogress/jsonData.length));
                  setProgress(prog+10)
               });
               setTrigger(true)
               const upload = uploadDataToDB(tempData)
               if(!upload)
                  return false
               return true
            }
         } catch (error:any) {
            toast.error(error.message)
            return false
         }
      }
      if(uploadFile){
         reader.readAsArrayBuffer(uploadFile)
         return reader.onabort;
      }
   }

   const uploadDataToDB = async (Data: ClientModel) => {
      try {
         if(Data){
            await privateAxios.post("/client/create-all", {clientsData: Data}, {
               onUploadProgress: (progressEvent) => {
                  if(progressEvent.total){
                     const percentageCompleted = Math.ceil((progressEvent.loaded * 50)/progressEvent.total)
                     setProgress(50+percentageCompleted)
                  }
               }
            })
         }
      } catch (error:any) {
         toast.error(error.response.data.message)
         setProgress(50)
         return false
      }finally{
         setTrigger(true)
         return true
      }
   }

   return (
      <main className="main">
         <h1>Upload</h1>
         <div className="upload-container">
            <DropzoneExcel className="dropzone-container" dragClassName="drag-color" onFileAccepted={handleAcceptedFile}/>
            <p>Supported formats: XLS, XLSX</p>
            <div className="uploaded-file-details">
               <div className="excel-icon">
                  <img src="/src/assets/msExcelIcon.svg" alt="excel icon" />
               </div>
               <div className="info">
                  <span>{uploadFile?.name}</span>
                  <p>{uploadFile?.size !== undefined?formatBytes(uploadFile?.size):""}</p>
                  <RiCloseLine className="close" onClick={closeInfo}/>
               </div>
               <ProgressBar width="100%" height={1} progress={progress} className="bar"/>
               <div className="upload-button">
                  <button onClick={processExcelData}>Upload</button>
               </div>
               
            </div>
         </div>
         
      </main>
   )
}

export default UploadPage