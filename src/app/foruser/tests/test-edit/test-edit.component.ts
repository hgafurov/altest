import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITest, Test } from 'src/app/core/test/test.model';
import { TestService } from 'src/app/core/test/test.service';
import { SavolService } from 'src/app/core/savol/savol.service';
import { Savol } from 'src/app/core/savol/savol.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.scss']
})
export class TestEditComponent implements OnInit {
  
  currTest: Test = new Test();
  testForm!: FormGroup;
  testId: number | undefined;
  savolCount: number = 0;
  cartSavolCount: number = 0;

  saveButtonDisabled: boolean = false;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private testService: TestService,
              private savolService: SavolService,
              private router: Router,
              private snackeBar:MatSnackBar) { 
    this.testId = route.snapshot.params["id"];  
  }

  ngOnInit(): void {
    this.testForm = new FormGroup({
      id: new FormControl(null),
      nomi: new FormControl(null, [Validators.required]),
      fani: new FormControl(null, [Validators.required]),
      razdel: new FormControl(null, [Validators.required]),
      activated: new FormControl(null),
      muallifi: new FormControl(null)
    });
    if (this.testId != 0) {
      this.testService.getById(this.testId!).subscribe((test: ITest) => {
        this.currTest = test;
        this.updateTestFormFromTest(test);
        this.savolCount = this.currTest.savols?.length ? this.currTest.savols?.length : 0;
      })
    }
  }

  updateTestFormFromTest(test: ITest): void {
    this.testForm.controls["id"].setValue(test.id);
    this.testForm.controls["nomi"].setValue(test.nomi);
    this.testForm.controls["fani"].setValue(test.fani);
    this.testForm.controls["razdel"].setValue(test.razdel);
    this.testForm.controls["activated"].setValue(test.activated);
    this.testForm.controls["muallifi"].setValue(test.muallifi);
  }

  addSavol(id:number) {
    //console.log(id);
    if (!this.currTest.savols || !this.currTest.savols?.find((savol: Savol) => savol.id == id)) {
      this.savolService.getById(id).subscribe((savol: Savol) => {
        this.currTest?.savols?.push(savol);
        this.savolCount = this.currTest.savols?.length ? this.currTest.savols?.length : 0;
        this.showAddSavolSnackBar(id);
      });
    } else {
      this.showNotAddSavolSnackBar(id);
    }   
  }

  editSavol(id: number) {
    this.router.navigate(["savol/edit/" + id]);
  }

  deleteSavol(id: number) {
    if (confirm("Savol id: " + id + " ni testdan o'chirmoqchimisiz")) {
      this.currTest.savols = this.currTest.savols?.filter(savol => savol.id != id);
      this.savolCount = this.currTest.savols?.length ? this.currTest.savols?.length : 0;
    }   
  }

  saveTest() {
    this.saveButtonDisabled = true;
    this.currTest.id = this.testForm.controls["id"].value;
    this.currTest.nomi = this.testForm.controls["nomi"].value;
    this.currTest.fani = this.testForm.controls["fani"].value;
    this.currTest.razdel = this.testForm.controls["razdel"].value;
    this.currTest.activated = this.testForm.controls["activated"].value;
    this.currTest.muallifi = this.testForm.controls["muallifi"].value;
    this.testService.save(this.currTest).subscribe((test: ITest) => {
        this.currTest = test;
        this.updateTestFormFromTest(test);
        this.savolCount = this.currTest.savols?.length ? this.currTest.savols?.length : 0;
      },
      err => console.log(err),
      () => this.saveButtonDisabled = false);
  }

  showAddSavolSnackBar(savolId: number) {
    this.snackeBar.open("Savol ID: " + savolId + " testga qo'shildi.", "X", {
      duration: 2000,
      panelClass: ["snack-bar-green"],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    })
  }
  showNotAddSavolSnackBar(savolId: number) {
    this.snackeBar.open("Savol ID: " + savolId + " testda bor.", "X", {
      duration: 2000,
      panelClass: ["snack-bar-red"],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    })
  }

  backClick() {
    this.location.back();
  }

}
