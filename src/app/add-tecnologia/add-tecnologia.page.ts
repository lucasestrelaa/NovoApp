import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-tecnologia',
  templateUrl: './add-tecnologia.page.html',
  styleUrls: ['./add-tecnologia.page.scss'],
})
export class AddTecnologiaPage implements OnInit {
  public form: FormGroup;
  public technologyName: any;
  public technologyDescription: any;
  public isEdited: boolean = false;
  public hideForm: boolean = false;
  public pageTitle: string;
  public recordID: any = null;
  private baseURI: string = "http://localhost/bdIonic/";


  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public NP: NavParams,
    public fb: FormBuilder,
    public toastCtrl: ToastController
  ) {
    this.form = fb.group({
      "name": ["", Validators.required],
      "description": ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.resetFields();

    if (this.NP.get("record")) {
      this.isEdited = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle = 'Amend entry';
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'Create entry';
    }
  }

  selectEntry(item: any): void {
    this.technologyName = item.name;
    this.technologyDescription = item.description;
    this.recordID = item.id;
  }

  createEntry(name: string, description: string): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "create", "name": name, "description": description },
      url: any = this.baseURI + "manage-data.php";

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // If the request was successful notify the user
        this.hideForm = true;
        this.sendNotification(`Congratulations the technology: ${name} was successfully added`);
      },
        (error: any) => {
          this.sendNotification('Something went wrong!');
        });
  }

  updateEntry(name: string, description: string): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "update", "name": name, "description": description, "recordID": this.recordID },
      url: any = this.baseURI + "manage-data.php";

    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data => {
        // If the request was successful notify the user         
        this.hideForm = true;
        this.sendNotification(`Congratulations the technology: ${name} was successfully updated`);
      },
        (error: any) => {
          this.sendNotification('Something went wrong!');
        });
  }

  deleteEntry(): void {
    let name: string = this.form.controls["name"].value,
      headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "delete", "recordID": this.recordID },
      url: any = this.baseURI + "manage-data.php";

    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data => {
        this.hideForm = true;
        this.sendNotification(`Congratulations the technology: ${name} was successfully deleted`);
      },
        (error: any) => {
          this.sendNotification('Something went wrong!');
        });
  }

  saveEntry(): void {
    let name: string = this.form.controls["name"].value,
      description: string = this.form.controls["description"].value;

    if (this.isEdited) {
      this.updateEntry(name, description);
    }
    else {
      this.createEntry(name, description);
    }
  }

  resetFields(): void {
    this.technologyName = "";
    this.technologyDescription = "";
  }

  sendNotification(message: string) {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    //notification.present();
  }


}
