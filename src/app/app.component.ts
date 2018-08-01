import {Component, OnDestroy} from '@angular/core';
import {DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs';

let id = 0;

class Task {

  taskId: number;
  constructor(public ownerName: string, public img: string) {
    this.taskId = id++;

  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  title = 'TaskIt';

  boss = [
    new Task('Boss', 'assets/images/boss.png'),
    new Task('Boss', 'assets/images/boss.png'),
    new Task('Boss', 'assets/images/boss.png'),
    new Task('Boss', 'assets/images/boss.png'),
  ];

  wally = [];

  dilbert = [
    new Task('Dilbert', 'assets/images/dilbert.png'),
    new Task('Dilbert', 'assets/images/dilbert.png'),
  ];

  alice = [];

  subs = new Subscription();

  constructor(private dragulaService: DragulaService) {

    this.subs.add(dragulaService.dropModel('TASK')
      .subscribe(({el, target, source, sourceModel, targetModel, item}) => {
        item.img = 'assets/images/' + target.id + '.png';
        item.ownerName = target.id.charAt(0).toUpperCase() + target.id.slice(1);
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

//
// function onDragStart(event, data) {
//   event.dataTransfer.setData('data', data);
// }
//
// function onDrop(event, data) {
//   let dataTransfer = event.dataTransfer.getData('data');
//   event.preventDefault();
// }
//
// function allowDrop(event) {
//   event.preventDefault();
// }
