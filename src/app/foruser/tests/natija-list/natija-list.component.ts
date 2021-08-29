import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { NatijaService } from 'src/app/core/natija/natija.service';
import { NatijaDataSource } from '../natija.data.source';

@Component({
  selector: 'app-natija-list',
  templateUrl: './natija-list.component.html',
  styleUrls: ['./natija-list.component.scss']
})
export class NatijaListComponent implements OnInit, AfterViewInit  {

  filterTestNomi: string = "";
  filterFani: string = "";

  displayedColumns: string[] = ['nomi', 'fani', 'natija'];
  dataSource!: NatijaDataSource;

  @ViewChild(MatPaginator) 
  paginator: MatPaginator | undefined;
  
  constructor(private natijaService: NatijaService) { }

  ngOnInit(): void {
    this.dataSource = new NatijaDataSource(this.natijaService);
    this.dataSource.loadNatija(true, 0, 10);
  }

  ngAfterViewInit(): void {
    this.paginator?.page.pipe(map(() => this.loadPage())).subscribe();
  }  

  loadPage() {
    this.dataSource.loadNatija(true, this.paginator?.pageIndex!, this.paginator?.pageSize!)
  }
}
