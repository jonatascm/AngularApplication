import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort,
         MatDialog, MatDialogConfig } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from '../models/client.model';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('callAPIDialog', {static: true}) callAPIDialog: TemplateRef<any>;

  clients: MatTableDataSource<any>;
  clientForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    gender: new FormControl('M'),
    email: new FormControl('', [Validators.required, Validators.email]),
    fone: new FormControl(''),
    document: new FormControl(''),
    birth: new FormControl(''),
  });
  displayedColumns: string[] = ['id', 'name', 'gender', 'email', 'fone', 'actions'];
  searchKey: String;

  constructor(private dialog: MatDialog) {
    // Create clients array
    let clients = [
      {
      id: 1,
      name: 'Jonatas',
      gender: 'M',
      email: 'jonatas.pvt@gmail.com',
      birth: new Date('1990-05-03'),
      document: '469272016',
      fone: '+55 16 997316213'},
      {
      id: 2,
      name: 'Renata',
      gender: 'F',
      email: 'renata@gmail.com',
      birth: new Date('1990-07-21'),
      document: '341234267',
      fone: '+55 16 997334232'},
      {
      id: 3,
      name: 'Alberto',
      gender: 'M',
      email: 'alberto@gmail.com',
      birth: new Date('1992-04-07'),
      document: '475743845',
      fone: '+55 16 813742635'}
    ];

    // Add clients array to table source
    this.clients = new MatTableDataSource(clients);

    // Create client object form
    this.clientForm.reset();
    this.initializeForm();
  }

  ngOnInit() {
    // Add sort and pagination to table
    this.clients.sort = this.sort;
    this.clients.paginator = this.paginator;
  }

  initializeForm(){
    this.clientForm.setValue({
      id: null,
      name: '',
      email: '',
      gender: 'M',
      fone: '',
      document: '',
      birth: ''
    });
  }

  // Clear new client form
  onClear() {
    this.clientForm.reset();
    this.initializeForm();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(this.callAPIDialog, dialogConfig);
  }

  onClose(){
    this.clientForm.reset();
    this.initializeForm();
    this.dialog.closeAll();
  }


  onSubmit() {
    if (this.clientForm.valid) {
      let clientsArray = this.clients.data;

      if(this.clientForm.get('id').value){
        let id = this.clientForm.get('id').value;
        let index = clientsArray.findIndex(o => o.id === id);
        clientsArray[index] = this.clientForm.value;
      } else {
        const client = this.clientForm.value;
        if (clientsArray.length){
          client.id = clientsArray.slice(-1).pop().id + 1;
        } else {
          client.id = 1;
        }

        clientsArray.push(this.clientForm.value);
      }
      this.clients = new MatTableDataSource(clientsArray);
      this.clients.sort = this.sort;
      this.clients.paginator = this.paginator;
      this.onClose();
    }
  }

  onEdit(client){
    this.clientForm.setValue(client);
    this.onCreate();
  }

  onDelete(client){
    let clientsArray = this.clients.data;
    clientsArray = clientsArray.filter(item => item.id !== client.id);
    this.clients = new MatTableDataSource(clientsArray);
    this.clients.sort = this.sort;
    this.clients.paginator = this.paginator;
  }
  // Clear search form
  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
  }

  // Apply filter
  applyFilter(){
    // Remove blank spaces and apply filter
    this.clients.filter = this.searchKey.trim().toLowerCase();
  }

}
