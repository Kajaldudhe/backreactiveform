import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { ObjectUnsubscribedError } from 'rxjs';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  req: any = [];
  val!: string;
  reactiveForm!: any;
  reactivearray: any = [];
  btnText = "Submit";
  fromSubmitted!: boolean;
  selectindex: any;
  projectUser: any;
  RestApiService: any;
  state: any = [];
  baseURL: string = "https://awseauction-master.mahamining.com/master/";
  division: any;
  district: any;
  subdivision: any;
  taluka: any;
  village: any;
  restapi: any;
  userData: any;
  userProjectapi: any = [];
  userTypeapi: any = [];
  subusertypeapi: any;
  roleapi: any;
  geapi: any = [];
  value: any;
  frm: any;
  router: any;
  reactiveForm1!: any;
  editflag!: boolean;
  update_value: any;
  designationType: any = [];

  constructor(private formbuilber: FormBuilder, private api: RestApiService) {

  }


  ngOnInit(): void {

    this.reactiveForm = this.formbuilber.group({
      projectName: ['', [Validators.required]],
      userType: ['', [Validators.required]],
      subUserType: ['1', [Validators.required]],
      roleType: ['', [Validators.required]],
      name: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      userName: new FormControl('', [Validators.required]),
      designationType: ['', [Validators.required]],
      emailId: new FormControl('', [Validators.required, Validators.email]),
      userAddress: new FormControl('', [Validators.required]),
      state: ['', [Validators.required]],
      division: ['', [Validators.required]],
      district: ['', [Validators.required]],

    })

    this.reactiveForm1 = this.formbuilber.group({

      state: ['all'],
    })
    

    this.bindProject()
    this.bindUserType()
    this.getAllRegistration()
    this.getState();  
    this.bindDesignation();

    
  }

  


  Submit() {
    // debugger;
    console.log(this.update_value);
    const obj = {
      createdBy: 0,
      modifiedBy: 0,
      createdDate: "2022-06-14T12:55:13.585Z",
      modifiedDate: "2022-06-14T12:55:13.585Z",
      id: this.btnText == "submit" ? 0 : this.update_value.id,
      name: this.reactiveForm.value.name || 0,
      userAddress: this.reactiveForm.value.userAddress || 0,
      designation: this.reactiveForm.value.designation || 0,
      stateId: this.reactiveForm.value.state || 0,
      divisionId: this.reactiveForm.value.division || 0,
      districtId: this.reactiveForm.value.district || 0,
      mobileNo: this.reactiveForm.value.mobileNo || '',
      userName: this.reactiveForm.value.userName || 0,
      password: "",
      emailId: this.reactiveForm.value.emailId || 0,
      userTypeId: Number(this.reactiveForm.value.userType) || 0,
      bidderId: 0,
      sellerId: 0,
      approverId: 0,
      encryptionKey: "",
      projectId: Number(this.reactiveForm.value.projectName) || 0,
      subUserTypeId: Number(this.reactiveForm.value.subUserType) || 0,
      roleId: Number(this.reactiveForm.value.roleType) || 0,
      designationId:this.reactiveForm.value.designation || 0,
      talukaId: this.reactiveForm.value.taluka || 0,
      subDivisionId: 0,
      villageId: 0,
      isBlock: false,
      profilePath: ""
    }
    if (this.update_value.id) {
      this.api.onUpdate(obj).subscribe((response: any) => {
        if (response.statusCode == '200') {
          this.userTypeapi = response.responseData;
          document.getElementById('close-modal')?.click()
          this.reactiveForm.reset();
          alert("Details Updated Successfully");
        } else {
          alert("Can not update Details");
        }
      })

    } else {
      this.api.postSubmit(obj).subscribe((response: any) => {
        if (response.statusCode == '200') {
          this.userTypeapi = response.responseData;
          document.getElementById('close-modal')?.click()
          this.reactiveForm.reset();
          alert("Details Submitted Successfully");
        } else {
          alert("Invalid Details");
        }

      })

    }

    this.fromSubmitted = true;
    if (this.reactiveForm.valid) {
      if (this.btnText == 'Submit') {
        (this.reactiveForm.value);
        document.getElementById('close-modal')?.click()
        this.reactiveForm.reset();
        alert("Details Submitted Successfully")
      }
      else if (this.btnText == 'Update') {
        this.reactivearray[this.selectindex] = this.reactiveForm.value
        alert("Details updated  Successfully")
      }

      this.clear();
      this.btnText = 'Submit';
    } else {
      alert("Please Enter Correct Details")
    }
  }
  update(obj: any) {
    console.log(obj)
    this.btnText = 'Update';
    this.update_value = obj;
    this.editflag = true;
    this.reactiveForm.patchValue({
      id: obj.id,
      projectName: obj.projectId,
      name: obj.name,
      mobileNo: obj.mobileNo,
      userName: obj.userName,
      designation: obj.designation,
      emailId: obj.emailId,
      userAddress: obj.userAddress,
      subusertype: obj.subusertype,
      userType: obj.userType,
      subUserTypeId: obj.subUserTypeId,
      roleType: obj.roleType,
      state: obj.state,
      division: obj.division,
      district: obj.district,

    })
    this.bindUserType();
    
    //   
  }

  delTb(id: any) {
    debugger;
    this.selectindex = id;
    this.reactivearray.splice(this.selectindex, 1);
  }

  clear() {
    this.reactiveForm.reset();
    this.btnText = 'Submit';

  }

  get email() { return this.reactiveForm.get('emailId') }
  get userAddress() { return this.reactiveForm.get('userAddress') }
  get userName() { return this.reactiveForm.get('userName') }
  get mobileNo() { return this.reactiveForm.get('mobileNo') }
  get name() { return this.reactiveForm.get('name') }

  bindProject() {
    this.api.bindProject().subscribe((response: any) => {
      this.userProjectapi = response.responseData
    })
  }
  bindUserType() {
    this.api.bindUserType().subscribe((response: any) => {
      this.userTypeapi = response.responseData
      this.editflag == true ? (this.reactiveForm.controls['userType'].setValue(this.update_value?.userTypeId), this.bindSubUser(this.update_value?.userTypeId, this.update_value?.projectId)) : '';
    })
  }

  bindSubUser(uTypeId: any, projectID: any) {
    debugger
    this.api.bindSubUser(uTypeId, projectID).subscribe((response: any) => {

      this.subusertypeapi = response.responseData;
      console.log(response);
      this.editflag == true ? (this.reactiveForm.controls['subUserType'].setValue(this.update_value?.subUserTypeId), this.bindRole(this.update_value?.roleId, projectID)) : '';
      console.log(this.update_value?.subUserTypeId);
    })
  }
  bindRole(rTypeId: any, rprojectID: any) {
    console.log(rTypeId + "      " + rprojectID)
    this.api.bindRole(rTypeId, rprojectID).subscribe((response: any) => {
      this.roleapi = response.responseData;
      this.editflag == true ? this.reactiveForm.controls['roleType'].setValue(this.update_value?.roleId) : ''
    })
  }
  getAllRegistration() {
    this.api.getList().subscribe((response: any) => {
      this.reactivearray = response.responseData.responseData1;
    })
  }
  OnlyNumbersAllowed(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log('charCode restricted is' + charCode);
      return false;
    }
    return true;
  }
  openModal() {
    this.btnText = 'submit';
    this.reactiveForm.reset();
  }
  getState() {
    this.api.setHttp('get', 'state-master/GetAll',);
    this.api.getHttp().subscribe((res: any) => {
      this.state = res.responseData;
      this.editflag == true ? this.reactiveForm.controls['state'].setValue(this.update_value?.state) : ''

      
    })
  }

  getDivision(e: any) {
    let StateId = e.target.value;
    this.api.setHttp('get', 'division-master/GetByStateId?StateId='+StateId);
    this.api.getHttp().subscribe((res: any) => {
      this.division = res.responseData;
      this.editflag == true ? this.reactiveForm.controls['division'].setValue(this.update_value?.division) : ''

    })
  }


  getDistrict(e: any) {
    let divisionId = e.target.value;
    this.api.setHttp('get', 'district-master/getByDivisionId?DivisionId='+divisionId);
    this.api.getHttp().subscribe((res: any) => {
      this.district = res.responseData;
      this.editflag == true ? this.reactiveForm.controls['district'].setValue(this.update_value?.district) : ''

    })
  }

  getTaluka(e: any) {
    let districtId = e.target.value;
    this.api.setHttp('get', 'taluka-master/getByDistrictId?DistrictId='+districtId,);
    this.api.getHttp().subscribe((res: any) => {
      this.taluka = res.responseData;
      this.editflag == true ? this.reactiveForm.controls['taluka'].setValue(this.update_value?.taluka) : ''

    })
  }
  bindDesignation() {
    this.api.bindDesignation().subscribe((res: any) => {
      this.designationType = res.responseData;
      this.editflag == true ? this.reactiveForm.controls['designationType'].setValue(this.update_value?.designationType) : ''

    })
  }

}



