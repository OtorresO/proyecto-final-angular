import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfile } from '../models/user.model';
import { dataUserProfile } from '../data/userProfile.data';
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private userProfileDataSubject = new BehaviorSubject<UserProfile>({} as UserProfile);
  userData$ = this.userProfileDataSubject.asObservable();

  constructor() {
    this.fetchUserData();
  }

  private fetchUserData() {
    
    this.userProfileDataSubject.next(dataUserProfile);
  }
}
