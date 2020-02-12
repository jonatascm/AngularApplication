import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort,
         MatDialog, MatDialogConfig } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Equipment } from '../models/equipment.model';


@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit{
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('callAPIDialog', {static: true}) callAPIDialog: TemplateRef<any>;

  equipments: MatTableDataSource<any>;
  equipmentForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    description: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    muscles: new FormControl('', Validators.required),
  });
  displayedColumns: string[] = ['id', 'description', 'weight', 'muscles', 'actions'];
  searchKey: String;

  constructor(private dialog: MatDialog) {
    // Create equipments array
    let equipments = [
      {
        id: 1,
        description: 'Halter',
        weight: '5',
        muscles: 'Todos'
      },
      {
        id: 2,
        description: 'Barra',
        weight: '15',
        muscles: 'Peitoral'
      },
      {
        id: 3,
        description: 'Leg Press',
        weight: '20',
        muscles: 'Quadriceps'
      }
    ];

    // Add equipments array to table source
    this.equipments = new MatTableDataSource(equipments);

    // Create equipment object form
    this.equipmentForm.reset();
    this.initializeForm();
  }

  ngOnInit() {
    // Add sort and pagination to table
    this.equipments.sort = this.sort;
    this.equipments.paginator = this.paginator;
  }

  initializeForm(){
    this.equipmentForm.setValue({
      id: null,
      description: '',
      weight: '',
      muscles: ''
    });
  }

  // Clear new equipment form
  onClear() {
    this.equipmentForm.reset();
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
    this.equipmentForm.reset();
    this.initializeForm();
    this.dialog.closeAll();
  }


  onSubmit() {
    if (this.equipmentForm.valid) {
      let equipmentsArray = this.equipments.data;

      if(this.equipmentForm.get('id').value){
        let id = this.equipmentForm.get('id').value;
        let index = equipmentsArray.findIndex(o => o.id === id);
        equipmentsArray[index] = this.equipmentForm.value;
      } else {
        const equipment = this.equipmentForm.value;
        if (equipmentsArray.length){
          equipment.id = equipmentsArray.slice(-1).pop().id + 1;
        } else {
          equipment.id = 1;
        }

        equipmentsArray.push(this.equipmentForm.value);
      }
      this.equipments = new MatTableDataSource(equipmentsArray);
      this.equipments.sort = this.sort;
      this.equipments.paginator = this.paginator;
      this.onClose();
    }
  }

  onEdit(equipment){
    this.equipmentForm.setValue(equipment);
    this.onCreate();
  }

  onDelete(equipment){
    let equipmentsArray = this.equipments.data;
    equipmentsArray = equipmentsArray.filter(item => item.id !== equipment.id);
    this.equipments = new MatTableDataSource(equipmentsArray);
    this.equipments.sort = this.sort;
    this.equipments.paginator = this.paginator;
  }
  // Clear search form
  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
  }

  // Apply filter
  applyFilter(){
    // Remove blank spaces and apply filter
    this.equipments.filter = this.searchKey.trim().toLowerCase();
  }

}
