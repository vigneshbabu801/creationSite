import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Policy } from '../../policy';
import { ApiService } from '../../api.service';
import Map from 'ol/Map';
import Tile from 'ol/layer/Tile';
import {Vector as VectorLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import { transform } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Icon, Style} from 'ol/style';
import VectorSource from 'ol/source/Vector';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
   map;
  chicago;
  london: any;
  vectorSource;
  vectorLayer;
  public showaddsite:boolean = false;
  public showeditsite:boolean =  false;
  policiesTT: any = [];
  @ViewChild('myModal') public myModal: ModalDirective;
  createProjectForm: FormGroup;
  createnewsite: FormGroup;
  editSite: FormGroup;
  submitted = false;
  submitterCreateSite = false;
  submittereditSite = false;
  constructor(private formBuilder: FormBuilder,private apiService: ApiService) { }
  
  ngOnInit(): void {
    this.createProjectForm = this.formBuilder.group({
      projectname: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.createnewsite = this.formBuilder.group({
      selectproject: ['', Validators.required],
      sitename: ['', Validators.required],
      lati: ['', Validators.required],
      long: ['', Validators.required]
    });
    this.editSite = this.formBuilder.group({
      editproject: ['', Validators.required],
      editSitename: ['', Validators.required],
      lati: ['', Validators.required],
      long: ['', Validators.required]
    });
    this.initilizeMap();
    this.apiService.getProject().subscribe((policies) => {
      console.log(policies);
      this.policiesTT = policies['result']
    });
  }
  onClickLoad(){
    var one = localStorage.getItem("latitude");
    var two = localStorage.getItem("longitude");
     this.createnewsite.get("lati").setValue(one);
     this.createnewsite.get("long").setValue(two);
  }
  onClickLoadEdit(){
    var one = localStorage.getItem("latitude");
    var two = localStorage.getItem("longitude");
     this.editSite.get("lati").setValue(one);
     this.editSite.get("long").setValue(two);
  }
  initilizeMap() {
    this.chicago = new Feature({
      geometry: new Point(olProj.fromLonLat([	-87.623177, 41.881832]))
    });

    this.chicago.setStyle(new Style({
      image: new Icon(({
        color: '#8959A8',
        crossOrigin: 'anonymous',
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg',
        imgSize: [20, 20]
      }))
    }));
    this.vectorSource = new VectorSource({
      features: [this.chicago]
    });

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource
    });
    this.map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new OSM()
        }),this.vectorLayer
      ],
      view: new View({
        center: olProj.fromLonLat([-277.85, 17.83]),
        zoom: 4
      })
    });
    this.map.on('click', function(evt){
      console.log("transfer")

      let lonlat = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
       var latitu = lonlat[0].toFixed(4);
       var longit = lonlat[1].toFixed(4);
      localStorage.setItem("latitude",latitu);
      localStorage.setItem("longitude",longit);
    })
  }


  get f() { return this.createProjectForm.controls; }
  get c() { return this.createnewsite.controls; }
  get e() { return this.editSite.controls; }
  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createProjectForm.invalid) {
      return;
    }
    this.myModal.hide();
    this.apiService.createProject(this.createProjectForm.value).subscribe((policy: Policy) => {
      console.log('policy Created', policy);
      if(policy){
        alert("Project Created Successfully");
      }
    });
  }

  onSubmitCreateSite() {
    this.submitterCreateSite = true;

    // stop here if form is invalid
    if (this.createnewsite.invalid) {
      return;
    }
    console.log(this.createnewsite.value);
    this.apiService.createSite(this.createnewsite.value).subscribe((policy: Policy) => {
      console.log('policy Created', policy);
    });

    this.london = new Feature({
      geometry: new Point(olProj.fromLonLat([localStorage.getItem("latitude"), localStorage.getItem("longitude")]))
    });

    this.london.setStyle(new Style({
      image: new Icon(({
        color: '#8959A8',
        crossOrigin: 'anonymous',
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg',
        imgSize: [20, 20]
      }))
    }));
    this.vectorSource = new VectorSource({
      features: [this.chicago,this.london],
    });

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource
    });

  }

  onSubmitEditSite() {
    this.submittereditSite = true;

    // stop here if form is invalid
    if (this.editSite.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.editSite.value));
  }

  showcreate(){
    this.showaddsite = true
    this.showeditsite =  false
  }
  showedit(){
    this.showeditsite = true
    this.showaddsite =  false
  }
  

  onReset() {
    this.submitted = false;
    this.createProjectForm.reset();
  }
}
