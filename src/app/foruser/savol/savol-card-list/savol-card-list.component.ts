import { Location } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SecurityContext, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SavolService } from 'src/app/core/savol/savol.service';
import { SavolCartService } from 'src/app/services/savol.cart.service';
import { SavolDataSource } from '../savol.data.source';

@Component({
  selector: 'app-savol-card-list',
  templateUrl: './savol-card-list.component.html',
  styleUrls: ['./savol-card-list.component.scss']
})
export class SavolCardListComponent implements OnInit, AfterViewInit {

  dataSource!: SavolDataSource;
  public savollar!: Observable<any>;
  filterCurrentUserSavols: boolean = false;
  filterFani: string = "";
  filterRazdel: string = "";

  @Input()
  mode: string | undefined;

  @Output()
  onToggle = new EventEmitter();
  
  @Output()
  onAddSavolToTest = new EventEmitter<number>();

  @ViewChild(MatPaginator) 
  paginator: MatPaginator | undefined;
  
  constructor(private savolService: SavolService,
              private readonly dompurifySanitizer: NgDompurifySanitizer,
              private router: Router) { }


  ngOnInit(): void {
    this.dataSource = new SavolDataSource(this.savolService);
    this.dataSource.loadSavols(this.filterCurrentUserSavols, this.filterFani,this.filterRazdel,0,5);
    this.savollar = this.dataSource.connect();
  }
  
  ngAfterViewInit(): void {
    this.paginator?.page.pipe(map(() => this.loadPage())).subscribe();
  }

  onChangeCheckBox(e: any) {
    this.loadPage();
  }

  loadPage() {
    this.dataSource.loadSavols(this.filterCurrentUserSavols, this.filterFani, this.filterRazdel, this.paginator?.pageIndex!, this.paginator?.pageSize!)
  }
  
  editSavol(id: number) {
    this.router.navigate(["savol/edit/" + id]);
  }

  addSavolToTest(id: number) {
    this.onAddSavolToTest.emit(id);
  }

  toggle() {
    this.onToggle.emit();
  }

  purify(value: string): string {
    console.log(value);
    const ret = this.dompurifySanitizer.sanitize(SecurityContext.HTML, value);
    console.log(ret);
    return (!ret ? " " : ret);
  }

}
