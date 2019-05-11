import { ToastrService } from "ngx-toastr";

export function errorManager(toaster: ToastrService, err:any){
    if (err.error!=null&&err.error.error_message!=null)
        toaster.error("Response code: "+err.status,err.error.error_message, 
        {timeOut: 3000})
    else{
        if (err.status==500){
            toaster.error("Response code: "+err.status,"Fatal Error", 
        {timeOut: 3000})
        }else{
            toaster.error("Response code: "+err.status,"Error with server", 
        {timeOut: 3000})
        }
    }

}

export function successManager(toaster: ToastrService, title:string, subtitle:string){
    toaster.success(subtitle,title, 
        {timeOut: 2000})
}
