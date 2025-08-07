import "../styles/ProgressBar.css"

interface Props {
   className?: string;
   textDisplay?: string;
   width: string;
   height: number;
   progress: number;
}

declare module "react" {
   interface CSSProperties {
      [varName: `--${string}`]: string | number | undefined;
   }
}

const ProgressBar = ({className, textDisplay, width, height, progress}: Props) => {
   
   return (
      <div className={className} style={{display:'flex', alignItems:'center', width:'100%'}}>
         <div className="progress-bar" data-text={textDisplay} data-percent={"0"} style={{width:`${width.includes('%')?width:`${width}px`}`, height:`${height}em`, borderRadius: `${height/2}em`, '--progress-width':progress }}></div>
         <label className="percentage-label">{progress===100?"Done":`${progress}%`}</label>
      </div>
      
   )
}

export default ProgressBar