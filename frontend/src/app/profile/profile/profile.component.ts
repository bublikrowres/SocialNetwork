import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'sn-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editStatus:boolean = false;
  currentUser: any = {};
  user: any = {
  };
  fileData: File = null;
  uploadOK: boolean = false;
  uploadMessage: string = '';
  constructor(
    private profileServices : ProfileService
  ) { }

  ngOnInit() {
    this.user.avatar = '';
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.profileServices.getUser(this.currentUser.id).subscribe((data)=>{
      this.user =data;
    })
  }

  updateUser(){
    this.profileServices.updateUser(this.user).subscribe((data)=>{
      console.log(data)
    })
  }

  edit(){
    if(this.editStatus){
      this.editStatus = false
    } else {
      this.editStatus= true
    }
  }
  uploadPhoto(fileInput: any){
    this.fileData = <File>fileInput.target.files[0];
    // console.log(this.fileData)
    if(!this.fileData.type.match(/image\/*/)){
      this.uploadOK = false;
      return this.uploadMessage = 'File is not of type image'
    } 
    if(this.fileData.size>1000000){
      this.uploadOK = false;
      return this.uploadMessage = 'File is to big(>1MB)'
    }
    return this.uploadOK = true;
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.profileServices.uploadPhoto(formData).subscribe((data) => {
      // console.log(data);
      this.user.avatar = data;
      this.uploadMessage = '';
      this.uploadOK = false;
      this.updateUser();
      }) 
  }

}
