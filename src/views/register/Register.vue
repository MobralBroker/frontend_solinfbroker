<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm>
                <h1>Cadastro</h1>
                <p class="text-body-secondary">Crie agora sua conta</p>

                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput type="text" id="nomeUsuario" name="nomeUsuario" placeholder="digite seu nome"
                    v-model="formUser.nomeUsuario" />

                  <Field type="text" id="nome" name="nome" class="form-control mb-2" placeholder="digite seu nome"
                    style="display: none;" :value="nomeUsuario" v-model="dates" />

                </CInputGroup>


                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput type="email" id="emai" name="email" placeholder="digite seu email"
                    v-model="formUser.email" />


                </CInputGroup>


                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>

                  <CFormInput type="password" id="senha" name="senha" placeholder="Digite sua senha"
                    v-model="formUser.senha" />
                </CInputGroup>

                <div class="input-group mb-2">
                  <span class="input-group-text" id="basic-addon1">
                    <CIcon icon="cilNotes" />
                  </span>
                  <input type="text" id="cpf" name="cpf" class="form-control" placeholder="Digite seu CPF"
                    v-model="formUser.pessoaFisica[0].cpf" v-maska data-maska="###.###.###-##">
                </div>

                <div class="input-group mb-4">
                  <span class="input-group-text" id="basic-addon1">
                    <CIcon icon="cilCalendar" />
                  </span>
                  <input type="text" id="datanascimento" name="datanascimento" class="form-control" placeholder="Digite sua data de nascimento"
                    v-model="formUser.pessoaFisica[0].dataNascimento" v-maska data-maska="##/##/####">
                </div>

                <div class="d-grid">
                  <CButton color="success"
                    @click="this.valida_Registro(this.formUser.email, this.formUser.senha, this.formUser.pessoaFisica[0].cpf)">
                    Criar Conta</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script setup>
import { vMaska } from "maska";
</script>

<script>
import swal from 'sweetalert';
import service from '../../service/controller'
import { Form, Field, ErrorMessage, validate } from 'vee-validate'


export default {

  /*   OBJECT CADASTRO
  {
  {
    "email": "predri@gmail.com",
    "senha": "alexnadre",
    "role": [ { "id": 0, "permissao": "ROLE_ADMIN" } ],
    "nomeUsuario": "alere souto",
    "pessoaFisica":[ { 
      "id": 0, 
      "cpf": "18756678061",
      "nome":"alexandresouto", 
      "dataNascimento": "27/10/1988" 
      }] 
  }
  }*/
  components: { Form, Field, ErrorMessage },
  name: 'Register',
  data() {
    return {
      formUser: {
        email: '',
        senha: '',
        role: [{
          id: '1',
          permissao: 'ROLE_ADMIN'
        }],
        nomeUsuario: '',
        saldo: '0.0',
        pessoaFisica: [{
          id: 0,
          cpf: '',
          nome: '',
          dataNascimento: ''
        }]
      }
    };
  },
  methods: {
    submitRegister() { },
    async RegisterUser() {
      try {
        await service.register(this.formUser)
        swal({
          title: 'Excelente!',
          text: 'Usuário(a) cadastrado com sucesso!',
          icon: 'success',
        }).then(() => {
          this.$router.push('/');
        })
      } catch (error) {
        swal({
          title: 'Erro!',
          text: 'Este email já foi cadastrado!',
          icon: 'error',
        });
      }
    },

    validateEmail(value) {
      console.log(value)
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'Este tipo de Email é invalido!';
      }
      // All is good
      return true
    },

    validatePassword(value) {
      if (!value) {
        return 'Campo obrigatorio!'
      }
      if (value.includes(' ')) {
        return "Senha não pode obter espaços"
      }
      if (!(value.length <= 8 && value.length >= 3)) {
        return 'A senha deve obter entre 3 e 8 caracters!'
      }
      //All is good
      return true

    },
    validateCPF(value) {
      var cpf_sum = 0
      var cpf_remain = 0
      var i = 0
      if (!value) {
        return 'Campo obrigatório!'
      }
      if (value.includes('-') || value.includes('.')) {
        value = value.replace("-", "")
        value = value.replace(".", "")
        value = value.replace(".", "")
        this.formUser.pessoaFisica[0].cpf = value
      }
      for (i = 1; i <= 9; i++) {
        cpf_sum = cpf_sum + parseInt(value.substring(i - 1, i)) * (11 - i)
      }
      cpf_remain = (cpf_sum * 10) % 11
      if ((cpf_remain == 10) || (cpf_remain == 11)) {
        cpf_remain = 0
      }
      if (cpf_remain != parseInt(value.substring(10, 11))) {
        return 'CPF inválido'
      }
      cpf_sum = 0
      for (i = 1; i <= 10; i++) {
        cpf_sum = cpf_sum + parseInt(value.substring(i - 1, i)) * (12 - i)
      }
      cpf_remain = (cpf_sum * 10) % 11
      if ((cpf_remain == 10) || (cpf_remain == 11)) {
        cpf_remain = 0
      }
      if (cpf_remain != parseInt(value.substring(10, 11))) {
        return 'CPF inválido'
      }
      //All is good
      return true
    },
    valida_Registro(email, senha, cpf) {
      //Recebe o resultado de cada um dos testes em uma variável
      var test1 = this.validateEmail(email)
      var test2 = this.validatePassword(senha)
      var test3 = this.validateCPF(cpf)

      //Testa se os testes foram verdadeiros ou falsos para 
      if (test1 != true) {
        swal({
          title: 'Erro!',
          text: 'Email inválido, por favor ajuste.',
          icon: 'error',
        })
      } else {
        if (test2 != true) {
          swal({
            title: 'Erro!',
            text: 'Senha inválida, pro favor ajuste. Lembre que a senha precisa ter de 3 a 8 caracteres.',
            icon: 'error',
          })
        } else {
          if (test3 != true) {
            swal({
              title: 'Erro!',
              text: 'Inválido, por favor insira um CPF correto.',
              icon: 'error',
            })
          } else {
            this.RegisterUser()
            return true
          }
        }
      }
    },
  },
}

</script>