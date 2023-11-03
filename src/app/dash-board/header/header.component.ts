import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(
    private router: Router,
    private authManager: AuthManager,
  ) { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  onDoctorClick() {
    console.log("Hi");

    this.router.navigate(['./app-dash-board/app-doctor-details']);
  }

  onPationClick() {
    this.router.navigate(['./app-dash-board/app-patient-details']);
  }
  onpcPationClick() {
    this.router.navigate(['./app-dash-board/app-pc-patient-details']);
  }
  
  onTreatmentClick() {
    this.router.navigate(['./app-dash-board/app-master-treatment']);
  }
  onDiagnosisClick() {
    this.router.navigate(['./app-dash-board/app-master-diagnosis']);
  }

  onProfileClick(){
    this.router.navigate(['./app-dash-board/app-profile']);
  }
  ondepartment(){
    this.router.navigate(['./app-dash-board/app-department-parent']);
  }

  Logout(){
    this.authManager.logout("");
  }
}
