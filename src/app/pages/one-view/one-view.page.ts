import { Component, OnInit, inject } from '@angular/core';
import { DocumentSnapshot, Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { getStorage, ref, deleteObject } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-one-view',
  templateUrl: './one-view.page.html',
  styleUrls: ['./one-view.page.scss'],
})
export class OneViewPage implements OnInit {
  public env = environment;
  public alertDelete = false;
  public alertBreve = false;
  public alertButtons = [
    {
      text: 'Cancel',
      handler: () => {
        this.alertDelete = false
      }
    },
    {
      text: 'Confirm',
      handler: () => {
        this.delDoc()
      }
    }
  ];
  public breveButtons = [
    {
      text: 'Ok',
      handler: () => {
        this.alertBreve = false
      }
    }
  ];
  public deleting = false;

  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router);
  public general: GeneralService = inject(GeneralService);

  public docId = '';
  private docSnap !: DocumentSnapshot;
  public documents: any;

  async ngOnInit() {
    // Pega os dados do post e se não tiver volta ao ínicio
    this.docId = (history.state.index === undefined) ? '0' : history.state.index;
    if (this.docId == '0') this.router.navigate(['/home']);

    // Obtém o documento pelo Id
    this.docSnap = await getDoc(doc(this.firestore, 'contacts', this.docId));

    // Extrai dados do documento
    this.documents = await this.docSnap.data();

    if(this.documents == undefined) location.reload()
  }

  ngOnDestroy() {
    this.general.formValues(this.documents, null)
  }

  editDoc() {
    this.router.navigate(['/edit'], { state: { index: this.docId }})
  }

  async delDoc() {
    this.deleting = true;

    // O trecho de código abaixo não deve ir para um aplicativo final de uma empresa
    // Ela é apenas para limpar o storage do meu firebase
    const storage = getStorage();
    const desertRef = ref(storage, `${this.documents.imagem.name}.${this.documents.imagem.format}`);

    // Deleta o arquivo
    await deleteObject(desertRef).catch((error) => {
      console.log("Erro ao deletar a imagem", error);
      return
    });

    // O método 'updateDoc()' do Firestore atualiza um campo de um documento
    await updateDoc(
      await doc(this.firestore, 'contacts', this.docId),       // Referência do documento
      { 'status': 'deleted' }                                  // campo: valor a ser alterado
    ).then(() => {
      this.deleting = false;
      setTimeout(() => {
        this.router.navigate(['/home'])
      }, 1000)
    })
  }
}