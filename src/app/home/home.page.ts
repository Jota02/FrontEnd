import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  rows: any[] = [{}];
  editingIndex: number | null = null;

  constructor() {
    const storedRows = localStorage.getItem('rows');
    this.rows = storedRows ? JSON.parse(storedRows) : [{}];
  }

  adicionar() {
    this.rows.push({});
    localStorage.setItem('rows', JSON.stringify(this.rows));
  }
  editar(index: number) {
    console.log('Editar clicado para a linha', index);
    if (this.editingIndex === null) {
      this.editingIndex = index;
    } else {
      // Save changes
      this.editingIndex = null;
      localStorage.setItem('rows', JSON.stringify(this.rows));
    }
  }

  eliminar(index: number) {
    console.log('Eliminar clicado', index);
    this.rows.splice(index, 1);
    localStorage.setItem('rows', JSON.stringify(this.rows));
  }
}
