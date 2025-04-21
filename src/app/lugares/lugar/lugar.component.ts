import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LugarService } from '../lugar.service';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})

export class LugarComponent implements OnInit {
  camposForm: FormGroup;
  categorias: Categoria[] = [];
  
  constructor(private service: LugarService, private categoriaService: CategoriaService){
    this.camposForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      localizacao: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.categoriaService.obterTodas().subscribe({
      next: (listarCategorias) => this.categorias = listarCategorias,
      error: error => console.log("Erro: ", error)
    })
  }

  salvar(){
    this.camposForm.markAllAsTouched();
    if(this.camposForm.valid){
      this.service.salvar(this.camposForm.value)
        .subscribe({
          next: lugar => {
            //console.log("Salvo com sucesso! ", lugar);
            this.camposForm.reset();
          },
          error: erro => console.log("Erro ao salvar! ", erro)
        })
    }
  }

  isCampoInvalido(nomeCampo: string): boolean{
    const campo = this.camposForm.get(nomeCampo);
    return campo?.invalid && campo?.touched && campo?.errors?.['required'] || false;
  }
}
