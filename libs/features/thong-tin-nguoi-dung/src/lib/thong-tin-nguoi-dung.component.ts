import { log } from './../../../../web-config/src/lib/logger/logger';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer'; 

@Component({
  selector: 'app-thong-tin-nguoi-dung',
  templateUrl: './thong-tin-nguoi-dung.component.html',
  styleUrls: ['./thong-tin-nguoi-dung.component.scss']
})
export class ThongTinNguoiDungComponent implements OnInit {
  form!: FormGroup;
  currentUser : any;
  constructor( 
    private drawerRef: NzDrawerRef,
    protected formBuilder: FormBuilder,
  ) {
   
  } 

  ngOnInit() {  
    this.currentUser = JSON.parse(localStorage.getItem('jwt-token')!);
    this.form = this.formBuilder.group({
      tenNguoiDung: '',
      soDienThoai: '',
      diaChi: '',
    });
  }
	 
  close() {
    this.destroyModal();
  }

  destroyModal(): void {
    this.drawerRef.close(true);
  }

}