/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit } from '@angular/core';
import { Insomnia } from '@awesome-cordova-plugins/insomnia/ngx';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-local',
  templateUrl: './local.page.html',
  styleUrls: ['./local.page.scss'],
})
export class LocalPage implements OnInit {

  title = 'Local Match';
  match = 'Standard';
  pholder = 20;

  players = [
    {
      name: 'Allison',
      health: 20,
      poison: 0,
      cmdDmg: 0,
    },
  ];

  // eslint-disable-next-line max-len
  constructor(public actionSheetController: ActionSheetController, public alertController: AlertController, private insomnia: Insomnia) { }

  ngOnInit() {
    this.insomnia.keepAwake()
  .then(
    () => console.log('success'),
    () => console.log('error')
  );

  }


  addPlayer() {
    console.log('Adding Player');
    this.showAddPlayerPrompt();
  }

  async showAddPlayerPrompt() {
    const alert = this.alertController.create({
      header: 'Add player',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name:'health',
          placeholder: 'Starting Health: Default is ' + String(this.pholder),
        },
        {
          name:'poison',
          placeholder: 'Poison Counters',
        },
        {
          name:'cmdDmg',
          placeholder: 'Commander Damage',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: player => {
            console.log('Save Clicked', player);
            this.players.push(player);
          }
        }
      ]
    });
    (await alert).present();
  }

  addHealth(index){
    this.players[index].health = Number(this.players[index].health) + 1;
  }
  damage(index){
    this.players[index].health = Number(this.players[index].health) - 1;
  }

  delete(index) {
    this.players.splice(index,1);
  }
  addPoison(index){
    this.players[index].poison = Number(this.players[index].poison) + 1;
  }
  minusPoison(index){
    this.players[index].poison = Number(this.players[index].poison) + 1;
  }
  addCmdDmg(index){
    this.players[index].cmdDmg = Number(this.players[index].cmdDmg) + 1;
    this.players[index].health = Number(this.players[index].health) - 1;
  }
  minusCmdDmg(index){
    this.players[index].cmdDmg = Number(this.players[index].cmdDmg) - 1;
  }

  async optionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Standard',
          icon: 'checkmark-circle',
          handler: () => {
            console.log('Standared Clicked');
            this.match = 'Standard';
            this.pholder = 20;
            for(let i = 0; i < this.players.length; i++) {
              this.players[i].health = 20;
            }
          },
        },
        {
          text: 'Commander',
          icon: 'bulb',
          handler: () => {
            console.log('Commander clicked');
            this.match = 'Commander';
            this.pholder = 40;
            for(let i = 0; i < this.players.length; i++) {
              this.players[i].health = 40;
            }
          },
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


}
