import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-hello',
  templateUrl: './guest-hello.component.html',
  styleUrls: ['./guest-hello.component.scss']
})
export class GuestHelloComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  run() {
    // if (this.authService.isAuthenticated()) {
    //   console.log('doc-list');
    //   this.router.navigate(['/doc-list']);
    // } else {
    //   console.log('login');
    //   this.router.navigate(['/login']);
    // }
  }
}
