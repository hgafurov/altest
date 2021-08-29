import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { TestService } from 'src/app/core/test/test.service';
import { TestDataSource } from '../test.data.source';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nomi', 'fani', 'razdel', 'action'];
  dataSource!: TestDataSource;

  filterTestNomi: string = "";
  filterFani: string = "";
  filterRazdel: string = ""; 
  
  @ViewChild(MatPaginator) 
  paginator: MatPaginator | undefined;
  
  constructor(private testService: TestService,
              private router: Router) { }
  
  ngOnInit(): void {
    this.dataSource = new TestDataSource(this.testService);
    this.dataSource.loadTests(false, "", "", "", 0, 5);
  }
  
  ngAfterViewInit(): void {
    this.paginator?.page.pipe(map(() => this.loadPage())).subscribe();
  }

  loadPage() {
    this.dataSource.loadTests(false, this.filterTestNomi, this.filterFani, this.filterRazdel, this.paginator?.pageIndex!, this.paginator?.pageSize!)
  }

  doTesting(id: number) {
    this.router.navigate(["/test/testing/" + id]);
  }
}
