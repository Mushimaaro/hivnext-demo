import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

interface Props {
   className?: string;
   dragClassName?: string;
   onFileAccepted: (file: File) => void;
}

function DropzoneExcel({className, dragClassName, onFileAccepted}: Props) {

   const onDrop = useCallback((acceptedFiles:File[]) => {
      if(acceptedFiles.length>0){
         onFileAccepted(acceptedFiles[0])
      }
   }, [onFileAccepted])
   const {getRootProps, getInputProps, isDragActive} = useDropzone({
      onDrop, accept:{
         'application/vnd.ms-excel': ['.xls'],
         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
      },
      multiple: false
   })

   return (
      <div {...getRootProps({
      className:isDragActive? `${className} ${dragClassName}`: className
      })}>
      <input {...getInputProps()} />
      {
         isDragActive ?
            <p>Drop the file here ...</p> :
            <p>Drag 'n' drop a file here, or click to select a file</p>
      }
      </div>
   )
}

export default DropzoneExcel