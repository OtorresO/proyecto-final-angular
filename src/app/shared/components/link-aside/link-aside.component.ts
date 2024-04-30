import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-link-aside',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './link-aside.component.html',
  styleUrl: './link-aside.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LinkAsideComponent {
  
  @Input() path: string='';
  @Input() text: string='';






}
