import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INatija, Natija } from 'src/app/core/natija/natija.model';
import { NatijaService } from 'src/app/core/natija/natija.service';
import { IRndTest, RndTest } from 'src/app/core/test/rnd-test.model';
import { TestService } from 'src/app/core/test/test.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreg } from 'src/app/services/user-storeg';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {

  testId: number;
  currTest: RndTest = null!;
  tjCount: number = 0;
  tover: boolean = false;
  savCount: number | undefined;
  currUser!: UserStoreg;

  //@ViewChild("natija")
  //natija: ElementRef | undefined;

  constructor(private route: ActivatedRoute,
              private testService: TestService,
              private authService: AuthService,
              private natijaService: NatijaService
            ) {
    this.testId = route.snapshot.params["id"];
    this.authService.user.subscribe(us => {
      this.currUser = us;
    });
  }

  ngOnInit(): void { 
    if (this.testId != 0) {
      this.testService.getRndTest(this.testId!).subscribe((test: IRndTest) => {
        this.currTest = test;
        this.savCount = test.savols?.length;
      });
    }
  }

  testOver(el: HTMLElement) {
    this.tjCount = 0;
    this.currTest.savols?.forEach(savol => {
      if (savol.tj == savol.sj) {
        this.tjCount++;
      }
    })
    this.tover = true;
    el.scrollIntoView({block: "center", behavior: "smooth" });
    let natija: Natija = new Natija(null, this.currUser.username, this.currTest.id, this.savCount, this.tjCount);
    this.natijaService.save(natija).subscribe((nat: INatija) => console.log(nat));
  }

}
