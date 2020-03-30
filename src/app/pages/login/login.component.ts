import { Component, OnInit } from '@angular/core';
import { FrApiService } from 'src/app/services/fr-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  name: string;
  password: string;
  userMessage: string;
  loginlogoimg: string = 'assets/logo/LOGO.png'
  
  ngOnInit(){
  }
  
  constructor(private apiService: FrApiService) {
  }

  isGoodToRegister = () => {
    return false
    // initial state is always active to promote click
    //return this.name !== '' && this.password !=='';
  }

  onClickLogin(){
    
    if (!this.name){
      this.userMessage = 'Please fill name';
    } else if(!this.password){
      this.userMessage = 'Please enter password'
    }else{
      console.log('Else..' + this.name + this.password)
      this.apiService.login(this.name, this.password).subscribe(
        (data)=>{
          console.log(data)
        }
      )
    }
  }
  
  

  
}
