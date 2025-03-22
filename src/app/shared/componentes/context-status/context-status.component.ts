import { Component, input, OnInit, output } from '@angular/core';
import { IContextStatus } from '../../interface/mental-status.interfaces';

@Component({
  selector: 'app-context-status',
  templateUrl: './context-status.component.html',
  styleUrls: ['./context-status.component.scss'],
})
export class ContextStatusComponent  implements OnInit {
  
  contextInfo = input<IContextStatus[]>()
  selectedContext = input<IContextStatus[]>([])
  selectedContextChange = output<IContextStatus[]>()
  selectedContextCurrent: IContextStatus[] = [];
  

  constructor() { }

  ngOnInit(): void {
    this.selectedContextCurrent = this.selectedContext()
  }

  selectContext(context: IContextStatus): void {
    const index = this.selectedContext().findIndex(e => e.id === context.id);
    if (index === -1) {
        this.selectedContext().push(context);
    } else {
        this.selectedContext().splice(index, 1);
    }
    this.selectedContextChange.emit(this.selectedContext());
  }
  
    isSelected(context: IContextStatus): boolean {
      return this.selectedContext().some(e => e.id === context.id);
    }
}
