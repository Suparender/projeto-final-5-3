import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionSnapshots } from '@angular/fire/firestore';
import { Auth, User, authState } from '@angular/fire/auth';
import { Storage, getDownloadURL, ref, uploadString } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { GeneralService } from 'src/app/services/general.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {
  public env = environment;
  public logged = false;
  public idSaved: any;

  // Modela entidade imagem
  public imagem = {
    url: '',
    format: '',
    uploaded: false
  };

  public sending = false;
  public sended = false;

  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);
  private storage: Storage = inject(Storage);
  public general: GeneralService = inject(GeneralService);
  private fb: FormBuilder = inject(FormBuilder);
  contactForm: FormGroup = this.fb.group({});

  // Referência à coleção "contacts" no Firestore.
  // Se a coleção não existe, será criada.
  contactsCollection = collection(this.firestore, 'contacts');

  // Prepara a autenticação do usuário.
  authState = authState(this.auth);
  authStateSubscription = new Subscription;

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.minLength(3), Validators.pattern('[^0-9]*'), Validators.required]],
      email: ['', [Validators.minLength(5), Validators.email, Validators.required]],
      subject: ['', [Validators.minLength(3), Validators.required]],
      message: ['', [Validators.minLength(5), Validators.required]]
    });

    // Observer que obtém status de usuário logado.
    this.authStateSubscription = this.authState.subscribe(
      (userData: User | null) => {
        // Se tem alguém logado.
        if (userData) {
          this.logged = true;
          this.contactForm.value.name = userData.displayName + '';
          this.contactForm.value.email = userData.email + '';
          return
        }

        this.logged = false
      }
    )
  }

  ngOnDestroy() {
    // Remove o observer ao concluir o componente.
    this.authStateSubscription.unsubscribe()
  }

  // Salva contato.
  async sendForm() {
    // Se enviando(sending) for verdadeiro pare aqui, senão, continue.
    if (this.sending) return;
    this.sending = true;

    const contact = {
      form: this.contactForm.value,
      imagem: {
        url: '',
        format: '',
        name: ''
      },
      date: '',
      status: ''
    };

    try {
      // Cria um nome aleatório e dps cria uma referência para o novo arquivo.
      const nameImg = this.general.getRandomChars(10);
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
      contact.imagem.url = res;
      contact.imagem.format = this.imagem.format;
      contact.imagem.name = nameImg;

      // Gera a data atual no formato ISO.
      const dt = new Date();
      contact.date = dt.toISOString().split('.')[0].replace('T', ' ');

      // Define o status do documento como enviado(received)
      contact.status = 'received';

      // Salva contato no Firestore
      const data = await addDoc(this.contactsCollection, contact);
      this.idSaved = data.id;
      this.sended = true

    } catch (error) {
      console.error('Opsss, deu erro', error)

    } finally {
      this.general.formValues(contact, null);
      this.general.formValues(this.contactForm.value, null);
      this.sending = false
    }
  }
}
