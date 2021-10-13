import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

/**https://masteringionic.com/blog/2016-12-15-using-php-and-mysql-with-ionic */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public itens: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public http: HttpClient
  ) { }

  ionViewWillEnter(): void {
    this.load();
  }

  load(): void {
    this.http
      .get('http://localhost/bdionic/retrieve-data.php')
      .subscribe((data: any) => {
        console.dir(data);
        this.itens = data;
      },
        (error: any) => {
          console.dir(error);
        });
  }

  addEntry(): void {
    this.navCtrl.navigateForward('add-tecnologia');
  }

  viewEntry(param: any): void {
    console.log(param)
    this.navCtrl.navigateForward('add-tecnologia');
  }

}
