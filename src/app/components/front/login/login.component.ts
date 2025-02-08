import { Component, Injectable } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { UserLogin } from 'src/app/models/user-login.model';
import { UserService } from 'src/app/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription, combineLatest,tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {trigger,state,style,animate,transition, keyframes} from '@angular/animations';
import { GlobalService } from 'src/app/services/global.service';
import { EnService } from 'src/app/services/i18n/en.service';
import { HtService } from 'src/app/services/i18n/ht.service';
import { FrService } from 'src/app/services/i18n/fr.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  /*
  animations:[
   
   state('open', style({
      height: '200px',
      opacity: 1,
      backgroundColor: 'yellow'
    })),
    
    state('closed', style({
      height: '100px',
      opacity: 0.8,
      backgroundColor: 'blue'
    })),
    transition('open => closed', [
      animate('1s')
    ]),
    
   
     trigger('fade',[
         transition('void=>*',[
            style({color: 'yellow', opacity:0}),
            //animate(200, style({color:'red', opacity:1, transform:'scale(0.85)'})),
            //animate(1000)
            animate("5s", keyframes([
               style({ backgroundColor: "red", offset: 0 }),
               style({ backgroundColor: "blue", offset: 0.2 }),
               style({ backgroundColor: "orange", offset: 0.3 }),
               style({ backgroundColor: "black", offset: 1 })
             ]))
         ])
     ])
  ]
*/
  
})

export class LoginComponent {
   showSpinner = new BehaviorSubject<boolean>(true);
   username : string="";
   password : string="";
   login : string="";
   info : string="";
   con: string="";
    with: string="";
    forgot:string="";
    new:string="";
   
   userApiMessage$?: Observable<string>;
   routeMessage$? : Observable<string> ;
   testLogin : Subscription | undefined;
   boolShowSpinner$=this.userService.boolSpinner$.asObservable();
   
    
  loginForm = new FormGroup({
      username : new FormControl("",[
         Validators.required,
         Validators.pattern('^[^0-9][a-zA-Z0-9]+$')
      ]),
      password : new FormControl("",[
        Validators.required,
        Validators.pattern('^[A-Z][a-zA-Z0-9@#!$]*$')
      ])
  })

  constructor(private router: Router,
    private userService : UserService,
    private translate : TranslateService,
    private route : ActivatedRoute,
    private snackBar : MatSnackBar,
    private gs: GlobalService,
    private enService: EnService,
    private frService: FrService,
    private htService: HtService
) { }

  ngOnInit(): void {
    //console.log("La langue: ", this.gs.getGlobalVariable().subscribe())
    this.variableI18n();
    this.userApiMessage$ = this.userService.message$;
    this.routeMessage$ = this.userService.routeMessage$;
   
     //this.route.data.subscribe(data=> console.warn("message: "+data["message"]))
    
      this.routeMessage$.subscribe(
         data => {
            if(data != "")
            {
               this.snackBar.open(data, 'dismiss', {
                  duration: 3000,
                  panelClass: ['blue-snackbar'],
                  verticalPosition :'top'
                });
            }
            
         } 
      );
     this.initState();
  }

  variableI18n(){
   this.gs.globalVariable$.subscribe(
      val=>{
          if(val=="en"){
            this.enService.getData().subscribe(response => {
                this.username = response.username;
                this.password=response.password;
                this.login=response.login;
                this.info=response.info;
                this.con=response.con;
                this.with=response.with;
                this.new=response.new;
                this.forgot=response.forgot;
             });
          }else if(val=="fr"){
            this.frService.getData().subscribe(response2 => {
                this.username = response2.username;
                this.password=response2.password;
                this.login=response2.login;
                this.info=response2.info;
                this.con=response2.con;
                this.with=response2.with;
                this.new=response2.new;
                this.forgot=response2.forgot;
             });
          }if(val=="ht"){
            this.htService.getData().subscribe(response3 => {
                this.username = response3.username;
                this.password=response3.password;
                this.login=response3.login;
                this.info=response3.info;
                this.con=response3.con;
                this.with=response3.with;
                this.new=response3.new;
                this.forgot=response3.forgot;
             });
          }
      }
    )
  }

  ngOnDestroy(){
      this.testLogin?.unsubscribe();
  }

   public Login(): void
   {  
        this.showSpinner.next(true);
        const userLogin : UserLogin = new UserLogin();
        userLogin.username = this.loginForm.value.username ?? "";
        userLogin.password = this.loginForm.value.password ?? "";
        
        if(userLogin.username !="" && userLogin.password!="")
        {
           this.showSpinner.next(false);
           this.userService.postLogin(userLogin).subscribe();
        }
        else
        {
            this.showSpinner.next(false);
            this.userApiMessage$?.subscribe({ 
              
                next : ()=>{
                    "Les champs sont obligatoires"
                }
             });
        } 
      
      //this.router.navigate(['/home']);
   }
 
   //test traduction
   public traductionExemple()
   {
      this.translate.get("exemple", {nom : this.loginForm.value.username}).subscribe((textAEcrire: string)=>{
          //console.log(textAEcrire);
      });
   }
   
   initState(){
       this.testLogin = combineLatest([this.userService.isLoggedIn, this.userService.isError]).pipe(
           tap(async([login, error])=>{
              // console.log("Spinner", spinner);
              //console.log("login", error);
               if(login==true && error==false){
                  this.router.navigate(['/home']);
               }
               else if(login=false && error==false)
               {
                  console.log("it's false");
                  
               }
               else if(login==false && error ==true)
               {
               }
               else {
                  
               }
           })
       ).subscribe();
   }
}
