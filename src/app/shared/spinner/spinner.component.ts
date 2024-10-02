import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
@Input() spinner:boolean = false;
ngOnInit() {
  console.log("se ejecuto el spinner");
  console.log(this.spinner);
}

}
