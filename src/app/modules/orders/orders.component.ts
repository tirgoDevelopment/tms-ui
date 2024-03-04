import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { RouterModule } from "@angular/router";
@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RouterModule]
})
export class OrdersComponent implements OnInit {
    
    constructor() { }
    ngOnInit(): void { }
  }