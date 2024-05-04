import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}

  adicionar() {}
  editar() {
    // Coloque aqui o código que você deseja executar quando "Editar" for clicado
    console.log('Editar clicado');
  }

  eliminar() {
    // Coloque aqui o código que você deseja executar quando "Eliminar" for clicado
    console.log('Eliminar clicado');
  }
}
