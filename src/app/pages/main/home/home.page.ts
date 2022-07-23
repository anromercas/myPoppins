import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { GestureController, IonCard, Platform } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit{

  @ViewChildren(IonCard, {read: ElementRef }) cards: QueryList<ElementRef>;

  people = [
    {
      name: 'Jeff Bezos',
      age: 51,
      image: 'https://yourwikis.com/wp-content/uploads/2020/01/jeff-bezos-img.jpg',
      visible: true
    },
    {
      name: 'Beyonce',
      age: 41,
      image: 'https://artist1.cdn107.com/fb7/fb74b6769dcade4a829ee368b9c37526.jpg',
      visible: true
    },
    {
      name: 'Blanca Suarez',
      age: 33,
      image: 'https://okdiario.com/img/2019/07/22/blanca-suarez-y-el-extrano-movimiento-facial-que-es-capaz-de-realizar-655x368.jpg',
      visible: true
    },
    {
      name: 'Mario Casas',
      age: 35,
      image: 'https://xoxo.news/__export/1597473876909/sites/xoxo/img/2020/08/15/xoxo_-_2020-08-15t024415_696.jpg_1033241666.jpg',
      visible: true
    },
  ];
  width: any;
  height: number;
  cardArray: any;
  cardShowen: any;

  constructor(private platform: Platform, 
              public gestureCtrl: GestureController,
              private animationCtrl: AnimationController) { 
    platform.ready().then(() => {
      console.log('Width: ' + platform.width());
      console.log('Height: ' + platform.height());
      this.width = platform.width()
      this.height = platform.height()
    });
  }

  ngAfterViewInit() {
    this.cardArray = this.cards.toArray();
    this.cardShowen = this.cardArray[this.cardArray.length - 1];
    this.useTinderSwipe();
  }

  useTinderSwipe() {
    for ( let i = 0; i < this.cardArray.length; i++ ) {
      const card = this.cardArray[i];
      this.cardShowen = card;
      const gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'my-gesture',
        onStart: ev => {
          console.log(ev)
        },
        onMove: ev => {
          card.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`;
        },
        onEnd: ev => {
          card.nativeElement.style.transition = '.5s ease-out';

          if(ev.deltaX > 150) {
            card.nativeElement.style.transform = `translateX(${+this.platform.width() * 2}px) rotate(${ev.deltaX / 2}deg)`;
            this.deleteLastItemCardArray();
          } else if (ev.deltaX < -150 ) {
            card.nativeElement.style.transform = `translateX(-${+this.platform.width() * 2}px) rotate(${ev.deltaX / 2}deg)`;
            this.deleteLastItemCardArray();
          } else {
            card.nativeElement.style.transform = '';
          }
        }
      });
      gesture.enable(true);
    }
  }

  swipeleft() {
    for (let index = 0; index < this.platform.width()*2; index++) {
      this.cardShowen.nativeElement.style.transform = `translateX(${-index}px) rotate(${-index / 10}deg)`;
      this.cardShowen.nativeElement.style.transition = '.5s ease-out';
    }
    this.deleteLastItemCardArray();
    console.log(this.cardShowen.innerText)
  }

  swiperight() {
    for (let index = 0; index < this.platform.width()*2; index++) {
      this.cardShowen.nativeElement.style.transform = `translateX(${index}px) rotate(${index / 10}deg)`;
      this.cardShowen.nativeElement.style.transition = '.5s ease-out';
    }
    this.deleteLastItemCardArray();
    console.log(this.cardShowen.innerText)
  }

  deleteLastItemCardArray() {
    this.cardArray.pop();
    this.cardShowen = this.cardArray[this.cardArray.length - 1];
  }

}
