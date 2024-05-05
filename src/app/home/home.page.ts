import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Info } from '../utils/info.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  rows: any[] = [{ selected: false }];
  editingIndex: number | null = null;

  constructor(private apiService: ApiService) {
    const storedRows = localStorage.getItem('rows');
    this.rows = storedRows ? JSON.parse(storedRows) : [{}];
  }

  add() {
    this.rows.push({ selected: false });
    localStorage.setItem('rows', JSON.stringify(this.rows));
  }
  edit(index: number) {
    console.log('Editar clicado para a linha', index);
    if (this.editingIndex === null) {
      this.editingIndex = index;
    } else {
      // Save changes
      this.editingIndex = null;
      localStorage.setItem('rows', JSON.stringify(this.rows));
    }
  }

  delete(index: number) {
    console.log('Eliminar clicado', index);
    this.rows.splice(index, 1);
    localStorage.setItem('rows', JSON.stringify(this.rows));
  }

  toggleSelected(row: any) {
    row.selected = !row.selected;
    localStorage.setItem('rows', JSON.stringify(this.rows));
    console.log(row.model, row.selected)
  }

  getInputValue(id: string){
    const input = document.getElementById(id) as HTMLInputElement;
    const value = input ? input.value : 'null';

    return value;
  }

  gatherInfo() {
    const info: Info[] = [];
    const urls = this.rows.filter(row => row.selected);

    const filters = new Map<string, string>();

    filters.set('km', this.getInputValue('km'));
    filters.set('fromYear', this.getInputValue('fromYear'));
    filters.set('toYear', this.getInputValue('toYear'));
    filters.set('fromPrice', this.getInputValue('fromPrice'));
    filters.set('toPrice', this.getInputValue('toPrice'));

    urls.forEach(url => {
      let data: Info = {
        km: filters.get('km') ?? 'null',
        fromYear: filters.get('fromYear') ?? 'null',
        toYear: filters.get('toYear') ?? 'null',
        fromPrice: filters.get('fromPrice') ?? 'null',
        toPrice: filters.get('toPrice') ?? 'null',
        url: url.link
      }

      info.push(data);
    });

    return info
  }

  scrape() {
    const requests: Info[] = this.gatherInfo();

    requests.forEach(request => {
      this.apiService.getLast10Cars(request)
        .subscribe(res => {
          console.log("Response: ", res);
        }), (error: any) => {
          console.error("Error: ", error);
        }
    });
  }


}
