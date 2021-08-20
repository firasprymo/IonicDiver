import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  ionite: string;
  displayColumns: string[] = ['first_name', 'last_name', 'twitter'];
  dataSource = new MatTableDataSource<any>([
    {
      first_name: 'Max',
      last_name: 'Lynch',
      twitter: 'maxLynch'
    },
    {
      first_name: 'Matt',
      last_name: 'netkow',
      twitter: 'dotNetKow'
    },
    {
      first_name: 'Ben',
      last_name: 'Sperry',
      twitter: 'benspery'
    },
    {
      first_name: 'Max',
      last_name: 'Lynch',
      twitter: 'maxLynch'
    },
    {
      first_name: 'Matt',
      last_name: 'netkow',
      twitter: 'dotNetKow'
    },
    {
      first_name: 'Ben',
      last_name: 'Sperry',
      twitter: 'benspery'
    },
    {
      first_name: 'Max',
      last_name: 'Lynch',
      twitter: 'maxLynch'
    },
    {
      first_name: 'Matt',
      last_name: 'netkow',
      twitter: 'dotNetKow'
    },
    {
      first_name: 'Ben',
      last_name: 'Sperry',
      twitter: 'benspery'
    },
    {
      first_name: 'Max',
      last_name: 'Lynch',
      twitter: 'maxLynch'
    },
    {
      first_name: 'Matt',
      last_name: 'netkow',
      twitter: 'dotNetKow'
    },
    {
      first_name: 'Ben',
      last_name: 'Sperry',
      twitter: 'benspery'
    },
    {
      first_name: 'Max',
      last_name: 'Lynch',
      twitter: 'maxLynch'
    },
    {
      first_name: 'Matt',
      last_name: 'netkow',
      twitter: 'dotNetKow'
    },
    {
      first_name: 'Ben',
      last_name: 'Sperry',
      twitter: 'benspery'
    },
    {
      first_name: 'Max',
      last_name: 'Lynch',
      twitter: 'maxLynch'
    },
    {
      first_name: 'Matt',
      last_name: 'netkow',
      twitter: 'dotNetKow'
    },
    {
      first_name: 'Ben',
      last_name: 'Sperry',
      twitter: 'benspery'
    },
    {
      first_name: 'Max',
      last_name: 'Lynch',
      twitter: 'maxLynch'
    },
    {
      first_name: 'Matt',
      last_name: 'netkow',
      twitter: 'dotNetKow'
    },
    {
      first_name: 'Ben',
      last_name: 'Sperry',
      twitter: 'benspery'
    },
    {
      first_name: 'Max',
      last_name: 'Lynch',
      twitter: 'maxLynch'
    },
    {
      first_name: 'Matt',
      last_name: 'netkow',
      twitter: 'dotNetKow'
    },
    {
      first_name: 'Ben',
      last_name: 'Sperry',
      twitter: 'benspery'
    }
  ]);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }
  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    })
  }

}

