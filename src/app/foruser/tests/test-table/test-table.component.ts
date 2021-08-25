import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ITest, Test } from 'src/app/core/test/test.model';
import { TestService } from 'src/app/core/test/test.service';
import { TestDataSource } from '../test.data.source';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', 
      animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TestTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'nomi', 'fani', 'razdel', 'action'];

  dataSource!: TestDataSource;
  expandedElement: ITest | undefined;

  @ViewChild(MatPaginator) 
  paginator: MatPaginator | undefined;

  constructor(private testService: TestService,
              private router: Router) { }
  
  ngOnInit(): void {
    this.dataSource = new TestDataSource(this.testService);
    this.dataSource.loadTests(true, "", "", "", 0, 5);
  }

  ngAfterViewInit(): void {
    this.paginator?.page.pipe(map(() => this.loadPage())).subscribe();
  }

  loadPage() {
    this.dataSource.loadTests(true, "", "", "", this.paginator?.pageIndex!, this.paginator?.pageSize!)
  }

  editTest(id: number) {
    this.router.navigate(["test/edit/" + id]);
  }

  deleteTest(id: number) {
    if (confirm("Test id: " + id + "ni o'chirmoqchimisiz?")) {
      this.dataSource.delete(id).subscribe(() => this.loadPage());
    }
  }

  newTest() {
    this.testService.save(new Test(null,"Yangi test","Fani","Bo'limi",null!,false,"Muallifi"))
        .subscribe((test: Test) => this.editTest(test.id));
  }
}
