import { Component, OnInit, Inject } from '@angular/core';
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
        this.alertSend = false;
      }
    },
    {
      text: 'Confirm',
      handler: () => {
        this.sendForm();
      }
    }
  ];

  public imagem = {
    url: '',
    format: '',
    uploaded: false
  };

  public form: any = {};

  public sending = false;
  private docId = '0';

  constructor(
    @Inject(GeneralService) public general: GeneralService,
    @Inject(CepService) private cepService: CepService,
    @Inject(Firestore) private firestore: Firestore,
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(Storage) private storage: Storage,
    @Inject(Router) private router: Router
  ) { }

  getCep() {
    if (this.editForm.value.cep.length < 8 || this.editForm.value.cep.length > 9) return;

    this.cepService.getCep(this.editForm.value.cep).subscribe(
      (data) => {
        this.editForm.patchValue({
          logradouro: data.logradouro,
          local: data.localidade,
          bairro: data.bairro
        });
      }
    );

  }

  editForm: FormGroup = this.fb.group({
    name: ['', [Validators.minLength(3), Validators.pattern('[^0-9]*'), Validators.required]],
    email: ['', [Validators.minLength(5), Validators.email, Validators.required]],
    cep: ['', [Validators.minLength(8), Validators.pattern('[0-9]*'), Validators.required]],
    logradouro: ['', [Validators.minLength(3), Validators.required]],
    local: ['', [Validators.minLength(3), Validators.required]],
    bairro: ['', [Validators.minLength(3), Validators.required]],
    subject: ['', [Validators.minLength(3), Validators.required]],
    message: ['', [Validators.minLength(5), Validators.required]]
  });

  contactsCollection = collection(this.firestore, 'contacts');
  private docSnap!: DocumentSnapshot;
  public documents: any;

  async ngOnInit() {
    this.docId = history.state.index === undefined ? '0' : history.state.index;
    if (this.docId === '0') {
      this.router.navigate(['/home']);
      return; // Added return here to prevent further execution
    }

    try {
      this.docSnap = await getDoc(doc(this.firestore, 'contacts', this.docId));
      this.documents = this.docSnap.data();

      this.editForm.setValue({
        name: this.documents.form.name,
        email: this.documents.form.email,
        cep: this.documents.form.cep,
        logradouro: this.documents.form.logradouro,
        local: this.documents.form.local,
        bairro: this.documents.form.bairro,
        subject: this.documents.form.subject,
        message: this.documents.form.message
      });
    } catch (error) {
      console.error('Error fetching document:', error);
    }

    if (this.documents === undefined) {
      location.reload();
    }
  }

  ngOnDestroy() {
    this.general.formValues(this.form, null);
    this.general.formValues(this.documents, null);
  }

  async sendForm() {
    if (!this.imagem.uploaded) return;

    if (this.sending) return;
    this.sending = true;

    try {
      var nameImg = this.documents.imagem.name;
      if (this.imagem.uploaded) {
        const storage = getStorage();
        const desertRef = ref(storage, `${this.documents.imagem.name}.${this.documents.imagem.format}`);

        await deleteObject(desertRef).catch((error) => {
          console.log("Error deleting image", error);
          return;
        });

        nameImg = this.general.getRandomChars(10);
        const storageRef = ref(this.storage, `${nameImg}.${this.imagem.format}`);

        await uploadString(
          storageRef,
          this.imagem.url.split(',')[1],
          'base64',
          { contentType: `image/${this.imagem.format}` }
        );

        const res = await getDownloadURL(ref(storageRef));
        this.documents.imagem.url = res;
        this.documents.imagem.format = this.imagem.format;
      }

      await updateDoc(
        doc(this.firestore, 'contacts', this.docId),
        {
          'form': {
            'name': this.editForm.value.name,
            'email': this.editForm.value.email,
            'cep': this.editForm.value.cep,
            'logradouro': this.editForm.value.logradouro,
            'local': this.editForm.value.local,
            'bairro': this.editForm.value.bairro,
            'subject': this.editForm.value.subject,
            'message': this.editForm.value.message
          },
          'imagem': {
            'url': this.imagem.url,
            'format': this.imagem.format,
            'name': nameImg
          }
        }
      );

    } catch (error) {
      console.error('Error sending form', error);
      this.sending = false;
      return;
    } finally {
      this.general.formValues(this.form, null);
      this.general.formValues(this.documents, null);
      this.sending = false;
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1000);
    }

    

  }

}