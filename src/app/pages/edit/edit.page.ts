import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, updateDoc, doc, getDoc, DocumentSnapshot } from '@angular/fire/firestore';
import { Storage, getStorage, deleteObject, getDownloadURL, ref, uploadString } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CepService } from 'src/app/services/cep.service';
import { GeneralService } from 'src/app/services/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  public env = environment;
  public alertSend = false;
  public alertButtons = [
    {
      text: 'Cancel',
      handler: () => {
        this.alertSend = false
      }
    },
    {
      text: 'Confirm',
      handler: () => {
        this.sendForm()
      }
    }
  ];

  // Modela entidade imagem
  public imagem = {
    url: '',
    format: '',
    uploaded: false
  };

  public form = {
    name: '',
    email: '',
    cep: '',
    logradouro: '',
    local: '',
    bairro: '',
    subject: '',
    message: ''
  };

  public sending = false;
  private docId = '0';

  public general: GeneralService = inject(GeneralService);
  private cepService: CepService = inject(CepService);
  private firestore: Firestore = inject(Firestore);
  private storage: Storage = inject(Storage);
  private router: Router = inject(Router);

  // Referência à coleção "contacts" no Firestore.
  // Se a coleção não existe, será criada.
  contactsCollection = collection(this.firestore, 'contacts');
  private docSnap !: DocumentSnapshot;
  public documents: any;

  async ngOnInit() {
    // Recupera o index via post caso não tenha volta ao ínicio
    this.docId = (history.state.index === undefined) ? '0' : history.state.index;
    if (this.docId == '0') this.router.navigate(['/home']);

    this.docSnap = await getDoc(doc(this.firestore, 'contacts', this.docId));
    this.documents = await this.docSnap.data();
    if (this.documents == undefined) location.reload();

    this.form.name = this.documents.form.name;
    this.form.email = this.documents.form.email;
    this.form.cep = this.documents.form.cep;
    this.form.logradouro = this.documents.form.logradouro;
    this.form.local = this.documents.form.local;
    this.form.bairro = this.documents.form.bairro;
    this.form.subject = this.documents.form.subject;
    this.form.message = this.documents.form.message;
  }

  ngOnDestroy() {
    this.general.formValues(this.form, null);
    this.general.formValues(this.documents, null)
  }

  async sendForm() {
    if (!this.imagem.uploaded) return;

    // Se enviando(sending) for verdadeiro pare aqui, senão, continue.
    if (this.sending) return;
    this.sending = true;

    try {
      var nameImg = this.documents.imagem.name;
      if (this.imagem.uploaded) {
        const storage = getStorage();
        const desertRef = ref(storage, `${this.documents.imagem.name}.${this.documents.imagem.format}`);

        // Deleta o arquivo
        await deleteObject(desertRef).catch((error) => {
          console.log("Erro ao deletar a imagem", error);
          return
        });

        // Cria um nome aleatório para o novo arquivo.
        nameImg = this.general.getRandomChars(10);
        const storageRef = ref(this.storage, `${nameImg}.${this.imagem.format}`);

        // Envia o arquivo para o servidor.
        await uploadString(
          storageRef,
          // Extrai apenas o 'Base64' do arquivo.
          this.imagem.url.split(',')[1],
          'base64',
          { contentType: `image/${this.imagem.format}` }
        );

        // Se salvou a imagem, obtém o URL da imagem salva.
        const res = await getDownloadURL(ref(storageRef));
        this.documents.imagem.url = res;
        this.documents.imagem.format = this.imagem.format;
      }

      // O método 'updateDoc()' do Firestore atualiza um campo de um documento
      await updateDoc(
        doc(this.firestore, 'documents', this.docId),   // Referência do documento
        {                                               // campos + valores a serem alterados
          'form': {
            'name': this.form.name,
            'email': this.form.email,
            'cep': this.form.cep,
            'logradouro': this.form.logradouro,
            'local': this.form.local,
            'subject': this.form.subject,
            'message': this.form.message
          },
          'imagem': {
            'url': this.imagem.url,
            'format': this.imagem.format,
            'name': nameImg
          }
        }
      )

    } catch (error) {
      console.error('Erro ao enviar o formulário', error);
      this.sending = false;
      return

    } finally {
      this.general.formValues(this.form, null);
      this.general.formValues(this.documents, null);
      this.sending = false;
      setTimeout(() => {
        this.router.navigate(['/home'])
      }, 1000)
    }
  }

  getCep() {
    if (this.form.cep.length < 8 || this.form.cep.length > 9) return;

    this.cepService.getCep(this.form.cep).subscribe(
      (data) => {
        this.form.logradouro = data.logradouro;
        this.form.local = data.localidade;
        this.form.bairro = data.bairro
      })
  }
}