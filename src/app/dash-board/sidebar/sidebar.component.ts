import { Component, OnInit } from '@angular/core';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user?: User001mb | any;
  constructor(
    private authManger: AuthManager,
  ) { }

  ngOnInit(): void {
    this.user = this.authManger.getcurrentUser;
  }

}
