import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { UserProfile } from '../models/user.model';
import { dataUserProfile } from '../data/userProfile.data';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  providers: [DatePipe],
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  public formattedDate: string | null;
  public userProfile: UserProfile = {} as UserProfile;
  
  constructor(private datePipe: DatePipe, private userService: UserProfileService) {
    this.formattedDate = this.datePipe.transform(new Date(), 'MMM dd, yyyy');
    this.userService.userData$.subscribe(userData => {
      this.userProfile = userData;
    });
  }

}
