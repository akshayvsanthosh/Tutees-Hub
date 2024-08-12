import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() dataFromParent:boolean=true
  constructor(private router:Router){}


  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl("")
  }
}
