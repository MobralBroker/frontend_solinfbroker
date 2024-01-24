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
                  <CFormInput 
                       type="text"
                        id="nomeUsuario"
                        name="nomeUsuario"
                        placeholder="digite seu nome"
                        v-model="formUser.nomeUsuario"   
                  />

                  <Field
                          type="text"
                          id="nome"
                          name="nome"
                          class="form-control mb-2"
                          placeholder="digite seu nome"
                          style="display: none;"
                          :value="nomeUsuario"
                          v-model="dates"
                      />
                  
                </CInputGroup>
                
                
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput 
                            type="email"
                            id="emai"
                            name="email"
                            placeholder="digite seu email"
                            :rules="validateEmail"
                            v-model="formUser.email"
                  />
                
                
                </CInputGroup>


                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>

                  <CFormInput
                  type="password"
                        id="senha"
                        name="senha"
                        placeholder="Digite sua senha"
                        :rules="validatePassword"
                        v-model="formUser.senha"
                  />
                </CInputGroup>


                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                  type="text"
                        id="cpf"
                        name="cpf"
                        placeholder="Digite seu CPF sem pontos ou traços"
                        :rules="validateCPF"
                        v-model="formUser.pessoaFisica[0].cpf"
                  />
                </CInputGroup>


                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                        type="text" 
                        id="datanascimento"
                        name="datanascimento"
                        placeholder="Data de Nascimento 'dd/mm/aaaa'"
                        v-model="formUser.pessoaFisica[0].dataNascimento"
                  />
                </CInputGroup>  
                <div class="d-grid">
                  <CButton color="success" @click="RegisterUser" >Criar Conta</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
    import swal from 'sweetalert';
    import service from '../../service/controller'
    import{Form,Field,ErrorMessage, validate} from 'vee-validate'


    export default{

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
        components:{Form,Field,ErrorMessage},
        name:'Register',
        data(){
            return{
                formUser:{
                        email: '',
                        senha: '',
                        role: [{
                            id: '1', 
                            permissao: 'ROLE_ADMIN' 
                        }],
                        nomeUsuario:'',
                        saldo: '0.0',
                        pessoaFisica:[{ 
                            id: 0, 
                            cpf: '',
                            nome:'', 
                            dataNascimento:''
                        }] 
                }
            };
        },
        methods:{
            submitRegister(){},
            async RegisterUser(){
                try{
                    await service.register(this.formUser)
                    swal({
                        title: 'Excelente!',
                        text: 'Usuário(a) cadastrado com sucesso!',
                        icon: 'success',
                    }).then(()=>{
                        this.$router.push('/');
                    })
                }catch(error){
                        swal({
                        title: 'Erro!',
                        text: 'Nome ou Email ja cadastrados!!',
                        icon: 'error',
                    });
                }     
            },

            validateEmail(value){                
                const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                if (!regex.test(value)) {
                    return 'Este tipo de Email é invalido!';
                }
                // All is good
                return true;
            },
            
            validatePassword(value){
                
                if(!value){
                    return 'Campo obrigatorio!'
                }
                
                if(value.includes(' ')){
                    return "Senha não pode obter espaços"
                }
                if(value.length<=8 && value.length>=3){
                    return true
                }
                return 'A senha deve obter entre 3 e 8 caracters!'
                
            },            
            validateCPF(value){
            
                //TODO VALIDAt  E CPF

                
            }
            
        }
    }

</script>