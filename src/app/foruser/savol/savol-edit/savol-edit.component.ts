import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { Subscription } from 'rxjs';
import { Savol } from 'src/app/core/savol/savol.model';
import { SavolService } from 'src/app/core/savol/savol.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-savol-edit',
  templateUrl: './savol-edit.component.html',
  styleUrls: ['./savol-edit.component.scss']
})
export class SavolEditComponent implements OnInit, OnDestroy {

  config1: AngularEditorConfig = {
    editable: true,
    sanitize: false,
    uploadUrl: ('http://localhost:8080/api/v1/files/upload-ed'),
    toolbarHiddenButtons: [
      ['link', 'unlink', 'insertImage', 'insertVideo']
    ]
  };

  private httpSubscrib: Subscription | undefined;
  savolForm!: FormGroup;
  savolId: number | undefined;

  constructor(private savolService: SavolService,
              private route: ActivatedRoute,
              private readonly dompurifySanitizer: NgDompurifySanitizer,
              private location: Location) { 
    this.savolId = route.snapshot.params['id'];
  }
  
  ngOnDestroy(): void {
    if (this.httpSubscrib) {
      this.httpSubscrib.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.savolForm = new FormGroup({
      id: new FormControl(null),
      fani: new FormControl(null, [Validators.required]),
      razdel: new FormControl(null, [Validators.required]),
      muallifi: new FormControl(null, [Validators.required]),
      activated: new FormControl(null),
      savol: new FormControl(null),
      tj: new FormControl(null),
      j1: new FormControl(null),
      j2: new FormControl(null),
      j3: new FormControl(null),
      j4: new FormControl(null),
    }); 
    if (this.savolId != 0){
      this.httpSubscrib = this.savolService.getById(this.savolId!).subscribe((savol: Savol) => {
        console.log(this.config1);
        this.updateSavolFormFromSavol(savol)
      });  
    }
 }

  saveSavol():void {
    let savol: Savol = this.savolFormToSavol();
    console.log(savol);
    this.savolService.save(savol).subscribe((sv: Savol) => this.updateSavolFormFromSavol(sv));
  }

  public checkError(controlName: string, errorName: string): boolean {
    return this.savolForm.controls[controlName].hasError(errorName);
  }

  updateSavolFormFromSavol(savol: Savol): void  {   
    this.savolForm.controls['id'].setValue(savol.id);
    this.savolForm.controls['savol'].setValue(savol.savol);
    this.savolForm.controls['tj'].setValue(savol.tj);
    this.savolForm.controls['j1'].setValue(savol.j1);
    this.savolForm.controls['j2'].setValue(savol.j2);
    this.savolForm.controls['j3'].setValue(savol.j3);
    this.savolForm.controls['j4'].setValue(savol.j4);
    this.savolForm.controls['fani'].setValue(savol.fani);
    this.savolForm.controls['razdel'].setValue(savol.razdel);
    this.savolForm.controls['activated'].setValue(savol.activated);
    this.savolForm.controls['muallifi'].setValue(savol.muallifi);
  }

  savolFormToSavol(): Savol {
    return new Savol(
      this.savolForm.controls['id'].value,
      this.savolForm.controls['savol'].value,
      this.savolForm.controls['tj'].value,
      this.savolForm.controls['j1'].value,
      this.savolForm.controls['j2'].value,
      this.savolForm.controls['j3'].value,
      this.savolForm.controls['j4'].value,
      this.savolForm.controls['fani'].value,
      this.savolForm.controls['razdel'].value,
      this.savolForm.controls['activated'].value,
      this.savolForm.controls['muallifi'].value
    )
  } 

  backClick() {
    this.location.back();
  }

  // purify(value: string): string {
  //   console.log(value);
  //   const ret = this.dompurifySanitizer.sanitize(SecurityContext.HTML, value);
  //   console.log(ret);
  //   return (!ret ? " " : ret);
  // }
}
