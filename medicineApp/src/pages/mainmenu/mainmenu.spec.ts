import { MainMenu } from './mainmenu';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AuthMock } from '../../mocks/authMock';
import { ModalCtrlMock } from '../../mocks/modalCtrlMock';
import { NavCtrlMock } from '../../mocks/navCtrlMock';
import { AlertCtrlMock } from '../../mocks/alertCtrlMock';
import { UserMock } from '../../mocks/userMock';
import { Auth } from '@ionic/cloud-angular';
import { PagesService } from '../../app/pages.service';
import { NavController, AlertController } from 'ionic-angular';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { Searchbar } from '../searchbar/searchbar';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MedicineInfo } from '../../pages/medicineinfo/medicineinfo';

let mainMenu = null;

describe('MainMenu Page Tests', () => {
    let fix: ComponentFixture<MainMenu>;
    let instance: MainMenu;
    let injector: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                MyApp, MainMenu, Searchbar
            ],
            
            imports: [
                IonicModule.forRoot(MyApp)
            ],
            providers: [
              MockBackend,
              BaseRequestOptions,
              {
                provide: Http,
                useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
                  return new Http(backend, options);
                },
                deps: [ MockBackend, BaseRequestOptions ]
              },
              {provide: Auth, useClass: AuthMock },
              {provide: AlertController, useClass: AlertCtrlMock },
              {provide: NavController, useClass: NavCtrlMock },
              PagesService
            ],
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents()
          .then(() => {
            fix = TestBed.createComponent(MainMenu);
            instance = fix.componentInstance;
            injector = fix.debugElement.injector;
          });
    }));

    it('should locate Ibuprofen', async(() => {
        let backend = injector.get(MockBackend);
        let responseBody = {
          title: "Ibuprofen",
          description: "Painkiller",
          side_effects: "None",
          benefits: "None",
          elderly: "No information",
          stores: "lloyds",
        };
        backend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                  body: responseBody
                }
              )));
          });         

        instance.getItemByBarcode("123");
        expect(instance.getNavCtrl().first()).toBe("Ibuprofen");
    }));
});
