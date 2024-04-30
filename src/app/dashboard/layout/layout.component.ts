import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoutComponent } from '../../auth/logout/logout.component';
import { LinkAsideComponent } from '../../shared/components/link-aside/link-aside.component';
import { UserProfile } from '../models/user.model';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LogoutComponent, LinkAsideComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  public isCollapsed: boolean = false;
  public userProfile: UserProfile = {} as UserProfile;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed
  }

  constructor(private userService: UserProfileService) {
    this.userService.userData$.subscribe(userData => {
      this.userProfile = userData;
    });
  }



}
