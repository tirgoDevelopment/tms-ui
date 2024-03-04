import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { RouterModule } from "@angular/router";
@Component({
    selector: 'app-drivers',
    templateUrl: './drivers.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RouterModule]
})
export class DriversComponent implements OnInit {
    
    constructor() { }
    ngOnInit(): void { }
  }