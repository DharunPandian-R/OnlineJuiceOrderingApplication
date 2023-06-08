import { FormGroup } from "@angular/forms";

export function ConfirmedValidator(controlName:any,matchingControlName:any){
  return(formgroup:FormGroup)=>{
    const npassword=formgroup.controls[controlName];
    const cpassword=formgroup.controls[matchingControlName];
    if(npassword.value!==cpassword.value){
      cpassword.setErrors({confirmedValidator:true})
    }
    else{
      cpassword.setErrors(null);
    }
  }
}
export function ConfirmedValidator1(controlName:any,matchingControlName:any){
  return(formgroup:FormGroup)=>{
    const setpassword=formgroup.controls[controlName];
    const cpassword=formgroup.controls[matchingControlName];
    if(setpassword.value!==cpassword.value){
      cpassword.setErrors({confirmedValidator:true})
    }
    else{
      cpassword.setErrors(null);
    }
  }
}
